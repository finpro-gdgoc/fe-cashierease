// src/services/auth.js
import axios from "axios";
import { apiurl } from "@/lib/globalvar";

const ACCESS_KEY = "accessToken";
const REFRESH_KEY = "refreshToken";
const USER_KEY = "user";
const ROLE_KEY = "role";
const USERID_KEY = "id";

export const tokenStore = {
  getAccess: () => localStorage.getItem(ACCESS_KEY),
  getRefresh: () => localStorage.getItem(REFRESH_KEY),
  set: (access, refresh) => {
    if (access) localStorage.setItem(ACCESS_KEY, access);
    if (refresh) localStorage.setItem(REFRESH_KEY, refresh);
  },
  clear: () => {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
  },
};

export const userStore = {
  set: (user) => {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      if (user.role) localStorage.setItem(ROLE_KEY, user.role);
      if (user.id != null) localStorage.setItem(USERID_KEY, String(user.id));
    }
  },
  get: () => {
    const raw = localStorage.getItem(USER_KEY);
    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
  clear: () => {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(USERID_KEY);
  },
};

// === Satu-satunya instance axios yang dipakai semua service ===
export const api = axios.create({
  baseURL: apiurl, // contoh: "http://localhost:8080/api/v1"
  headers: { "Content-Type": "application/json" },
});

// Request: sisipkan access token
api.interceptors.request.use((config) => {
  const token = tokenStore.getAccess();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// -------- Refresh Token Flow (response interceptor) ----------
let isRefreshing = false;
let refreshPromise = null; // biar 1 refresh dipakai rame2

async function doRefresh() {
  const rt = tokenStore.getRefresh();
  if (!rt) throw new Error("No refresh token");

  // pakai axios biasa (bukan `api`) agar interceptor tidak ikut-ikutan
  const res = await axios.post(`${apiurl}/auth/refresh`, {
    refresh_token: rt,
  });

  const data = res?.data || {};
  // backend kamu biasanya kirim access_token baru (kadang ada refresh baru juga)
  const newAccess =
    data.access_token ||
    data.accessToken ||
    data.token ||
    data?.data?.access_token;
  const newRefresh = data.refresh_token || data.refreshToken;

  if (!newAccess) throw new Error("No access token in refresh response");

  tokenStore.set(newAccess, newRefresh); // kalau refresh tidak ada, setter akan skip
  // set default header untuk request berikutnya
  api.defaults.headers.common.Authorization = `Bearer ${newAccess}`;
  return newAccess;
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    const status = error?.response?.status;

    // Jangan nge-loop di endpoint login/refresh
    const url = (original?.url || "").toLowerCase();
    const isAuthEndpoint =
      url.includes("/auth/login") || url.includes("/auth/refresh");

    // Kalau 401 dan belum pernah di-retry —> refresh
    if (status === 401 && !original?._retry && !isAuthEndpoint) {
      original._retry = true;

      try {
        if (!isRefreshing) {
          isRefreshing = true;
          refreshPromise = doRefresh()
            .catch((e) => {
              throw e;
            })
            .finally(() => {
              isRefreshing = false;
            });
        }

        // tunggu refresh (kalau ada 401 paralel, semuanya nunggu promise yang sama)
        const newAccess = await refreshPromise;

        // set header request yang gagal, lalu ulangi
        original.headers = original.headers || {};
        original.headers.Authorization = `Bearer ${newAccess}`;
        return api(original);
      } catch (e) {
        // refresh gagal —> bersihkan sesi & arahkan ke login
        try {
          tokenStore.clear();
          userStore.clear();
        } finally {
          window.location.href = "/";
        }
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);
// ------------------------------------------------------------

export async function PostLogin(payload) {
  const res = await api.post("/auth/login", payload);
  const data = res?.data;

  const access = data?.access_token || data?.accessToken || data?.token;
  const refresh = data?.refresh_token || data?.refreshToken;
  tokenStore.set(access, refresh);

  if (data?.data) userStore.set(data.data);

  return res;
}

export function Logout() {
  tokenStore.clear();
  userStore.clear();
  return Promise.resolve(true);
}

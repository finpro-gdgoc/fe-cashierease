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

export const api = axios.create({
  baseURL: apiurl,
  withCredentials: false,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = tokenStore.getAccess();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

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

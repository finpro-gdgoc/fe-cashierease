import { api } from "@/services/auth";

export async function GetUserById() {
  const raw = localStorage.getItem("user");
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.id != null) return parsed; // { id, nama, nomorPegawai, role }
    } catch {
      // ignore parse error, lanjut fetch
    }
  }

  const id = localStorage.getItem("id");
  if (!id) throw new Error("User ID not found. Please login again.");

  const res = await api.get(`/auth/${id}`);
  const user = res?.data?.data ?? res?.data ?? null;

  if (!user) throw new Error("Failed to fetch user.");

  try {
    localStorage.setItem("user", JSON.stringify(user));
    if (user.role) localStorage.setItem("role", user.role);
  } catch {
    // ignore quota/serialize issue
  }

  return user;
}

export async function GetAllUsers(search = "") {
  const res = await api.get("/auth", {
    // kalau backend belum dukung query, param ini akan diabaikan
    params: search ? { search } : undefined,
  });

  const rows = Array.isArray(res?.data?.data)
    ? res.data.data
    : Array.isArray(res?.data)
    ? res.data
    : [];

  // optional filter di sisi FE kalau backend belum support ?search=
  const filtered = search
    ? rows.filter((u) =>
        (u.nama ?? u.name ?? "")
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    : rows;

  return filtered.map((u, i) => ({
    id: u.id ?? u.ID ?? u._id ?? i,
    nama: u.nama ?? u.name ?? "",
    role:
      (u.role ?? u.user_role ?? "").toString().toLowerCase() === "cashier"
        ? "cashier"
        : "admin",
    lastActive: u.last_active ?? u.lastActive ?? "-",
  }));
}

export async function RegisterUser(payload) {
  // { nama, nomorPegawai, password, role }
  const res = await api.post("/auth/register", payload);
  return res?.data ?? res;
}

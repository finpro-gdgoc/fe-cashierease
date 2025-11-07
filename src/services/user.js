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

import { api } from "@/services/auth";
import { apiurl } from "@/lib/globalvar";

const API_BASE = apiurl.replace(/\/api\/v1\/?$/, ""); // http://localhost:8080

const absolutize = (url) => {
  if (!url) return null;
  if (/^https?:\/\//i.test(url)) return url; // sudah absolut
  if (url.startsWith("/")) return `${API_BASE}${url}`; // "/public/..." -> "http://localhost:8080/public/..."
  return `${API_BASE}/${url.replace(/^\.?\//, "")}`;
};

const norm = (s) =>
  String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim();

export async function getAllMenus(tipeProduk, search) {
  const params = {};
  if (tipeProduk) params.tipe_produk = tipeProduk;

  const res = await api.get("/produk/", { params });

  const rows = Array.isArray(res?.data?.data)
    ? res.data.data
    : Array.isArray(res?.data)
    ? res.data
    : [];

  let mapped = rows.map((item) => ({
    _id: item._id ?? item.id,
    nama_produk: item.nama_produk ?? item.nama ?? item.name ?? "",
    harga_produk: item.harga_produk ?? item.harga ?? 0,
    tipe_produk: item.tipe_produk ?? item.tipe ?? item.kategori ?? "",
    gambar_produk: absolutize(item.gambar_produk),
  }));

  // filter client-side (opsional, kalau backend belum support search)
  if (tipeProduk) {
    const t = norm(tipeProduk);
    mapped = mapped.filter((m) => norm(m.tipe_produk) === t);
  }
  if (search && search.trim()) {
    const q = norm(search);
    mapped = mapped.filter(
      (m) => norm(m.nama_produk).includes(q) || norm(m.tipe_produk).includes(q)
    );
  }

  return mapped;
}

export async function addMenu(payload) {
  // Interceptor `api` sudah otomatis pasang Bearer token
  const res = await api.post("/produk/", {
    nama_produk: payload.nama_produk,
    harga_produk: Number(payload.harga_produk) || 0,
    stok_produk: 50, // default
    tipe_produk: payload.tipe_produk,
    // kalau suatu saat ada URL gambar dari form:
    // gambar_produk: payload.gambar_produk ?? undefined,
  });
  return res?.data ?? res;
}

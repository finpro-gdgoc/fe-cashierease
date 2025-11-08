import { api } from "@/services/auth";

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
    nama_produk: item.nama_produk ?? item.nama ?? item.name,
    harga_produk: item.harga_produk ?? item.harga ?? 0,
    tipe_produk: item.tipe_produk ?? item.tipe ?? item.kategori ?? "",
    gambar_produk: item.gambar_produk ?? null,
  }));

  if (tipeProduk) {
    const t = norm(tipeProduk);
    mapped = mapped.filter((m) => norm(m.tipe_produk) === t);
  }

  if (search && search.trim().length > 0) {
    const q = norm(search);
    mapped = mapped.filter(
      (m) => norm(m.nama_produk).includes(q) || norm(m.tipe_produk).includes(q)
    );
  }

  return mapped;
}

export async function addMenu(payload) {
  // pastikan token admin otomatis diintercept oleh api
  const res = await api.post("/produk", {
    nama_produk: payload.nama_produk,
    harga_produk: payload.harga_produk,
    stok_produk: 50, // default stok 50
    tipe_produk: payload.tipe_produk,
  });

  return res?.data ?? res;
}

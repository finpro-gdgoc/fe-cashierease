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

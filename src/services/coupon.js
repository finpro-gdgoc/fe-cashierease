import { api } from "@/services/auth";

export async function GetAllCoupons() {
  const res = await api.get("/coupon/");
  const rows = Array.isArray(res?.data?.data)
    ? res.data.data
    : Array.isArray(res?.data)
    ? res.data
    : [];

  return rows.map((c) => ({
    _id: c._id ?? c.id ?? String(c.kode_coupon ?? c.kodeCoupon ?? ""),
    kodeCoupon: c.kodeCoupon ?? c.kode_coupon ?? c.code ?? "",
    besarDiscount: c.besarDiscount ?? c.besar_discount ?? Number(c.amount ?? 0),
    awalCoupon: c.awal_coupon ?? c.awalCoupon ?? null,
    akhirCoupon: c.akhir_coupon ?? c.akhirCoupon ?? null,
    deskripsi: c.deskripsi ?? c.description ?? "",
    paymentMethod: c.payment_method ?? c.paymentMethod ?? "ALL",
  }));
}

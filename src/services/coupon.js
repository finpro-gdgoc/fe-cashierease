import { api } from "@/services/auth";

export async function GetAllCoupons() {
  const res = await api.get("/coupon/");
  const rows = Array.isArray(res?.data?.data)
    ? res.data.data
    : Array.isArray(res?.data)
    ? res.data
    : [];

  return rows.map((c) => {
    const rawId = c.ID ?? c.id ?? c.coupon_id ?? c._id ?? c.couponId ?? null;
    const id = rawId != null ? Number(rawId) : null;

    return {
      id,
      _id: id,
      kodeCoupon: c.kodeCoupon ?? c.kode_coupon ?? c.code ?? "",
      besarDiscount:
        c.besarDiscount ?? c.besar_discount ?? Number(c.amount ?? 0),
      awalCoupon: c.awal_coupon ?? c.awalCoupon ?? null,
      akhirCoupon: c.akhir_coupon ?? c.akhirCoupon ?? null,
      deskripsi: c.deskripsi ?? c.description ?? "",
      paymentMethod: c.payment_method ?? c.paymentMethod ?? "ALL",
    };
  });
}

export async function DeleteCoupon(idOrObj) {
  const id =
    typeof idOrObj === "object"
      ? idOrObj?.id ?? idOrObj?._id ?? idOrObj?.coupon_id ?? idOrObj?.ID
      : idOrObj;

  if (!id && id !== 0) throw new Error("Missing coupon id");
  await api.delete(`/coupon/${id}`);
}

export async function CreateCoupon(payload) {
  const res = await api.post("/coupon/", payload);
  return res.data;
}

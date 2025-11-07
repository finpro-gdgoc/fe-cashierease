import { api } from "@/services/auth";

export async function PostOrder(order) {
  try {
    const items = Array.isArray(order?.order_items) ? order.order_items : [];
    if (!items.length)
      throw new Error("Order kosong. Tambahkan item terlebih dahulu.");

    const mappedItems = items.map((it) => {
      const idNum = Number(it.produk_id ?? it.id);
      const qtyNum = Number(it.qty ?? 1);
      if (!Number.isFinite(idNum) || idNum <= 0) {
        throw new Error(`Produk ID tidak valid: ${it?.id ?? it?.produk_id}`);
      }
      if (!Number.isFinite(qtyNum) || qtyNum <= 0) {
        throw new Error(
          `Qty tidak valid untuk produk ${it?.id ?? it?.produk_id}`
        );
      }
      return {
        produk_id: idNum,
        produkId: idNum,
        product_id: idNum,

        qty: qtyNum,
        jumlah: qtyNum,
        quantity: qtyNum,
      };
    });

    const payMethod = String(order?.payment_method || "").toUpperCase();
    if (!payMethod) throw new Error("Metode pembayaran wajib diisi.");

    const payload = {
      order_items: mappedItems,
      payment_method: payMethod,
    };
    if (order?.coupon) payload.coupon = order.coupon;

    const res = await api.post("/order/", payload);

    const d = res?.data?.data ?? res?.data ?? null;
    const createdId =
      d?.id ??
      d?.order_id ??
      d?.orderId ??
      d?.kode ??
      d?.code ??
      (typeof d === "string" || typeof d === "number" ? d : null);

    return createdId;
  } catch (err) {
    const serverMsg =
      err?.response?.data?.error ||
      err?.response?.data?.message ||
      err?.message ||
      "Gagal membuat order.";
    console.error("PostOrder error:", serverMsg, err?.response?.data);
    throw new Error(serverMsg);
  }
}

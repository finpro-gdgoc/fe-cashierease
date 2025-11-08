// src/services/statistic.js
import { apiurl } from "@/lib/globalvar";
import { api } from "@/services/auth";

/** =======================
 *  Helpers
 *  ======================= */
function pickNumber(...vals) {
  for (const v of vals) {
    const n = Number(v);
    if (Number.isFinite(n)) return n;
  }
  return 0;
}
// function pickString(...vals) {
//   for (const v of vals) {
//     if (typeof v === "string" && v.length) return v;
//   }
//   return "";
// }

/** =======================
 *  Overview (cards atas)
 *  GET /order/statistics/
 *  ======================= */
export async function GetStatistic() {
  const res = await api.get("/order/statistics/");
  const d = res?.data?.data ?? res?.data ?? {};

  return {
    // FE kamu pakai totalIncome, totalQuantity, totalOrders, totalCouponUse
    totalIncome: pickNumber(d.totalIncome, d.total_pemasukan, d.total_income),
    totalQuantity: pickNumber(d.totalQuantity, d.total_pesanan, d.total_orders),
    totalOrders: pickNumber(d.totalOrders, d.total_pelanggan, d.customers),
    totalCouponUse: pickNumber(
      d.totalCouponUse,
      d.total_kupon,
      d.total_coupon_used
    ),
  };
}

/** =======================
 *  Statistik pendapatan (timeseries)
 *  GET /order/statistics/pendapatan?days=7
 *  FE expects: [{ date, income }]
 *  ======================= */
export async function GetStatisticByDay(days = 7) {
  const res = await api.get("/order/statistics/pendapatan");

  const box = res?.data?.data ?? {};
  // Pilih bucket berdasar 'days' dari UI-mu
  // 7 / 31  -> oneMonth
  // 62      -> twoMonth (kalau nanti dipakai)
  // 93+     -> threeMonth
  let bucket;
  if (days <= 31) bucket = box.oneMonth;
  else if (days <= 62) bucket = box.twoMonth;
  else bucket = box.threeMonth;

  const rows = Array.isArray(bucket) ? bucket : [];

  // Normalisasi ke shape yang dipakai chart: { date, income }
  return rows.map((r) => ({
    date: r.week ?? r.label ?? "", // "Minggu ke-1"
    income: Number(r.income ?? r.value ?? 0), // 440000, dst.
  }));
}

/** =======================
 *  Statistik pelanggan (timeseries)
 *  GET /order/statistics/pelanggan?days=7
 *  FE expects: [{ date, orders }]
 *  ======================= */
export async function GetPelangganByDay(days = 7) {
  const res = await api.get("/order/statistics/pelanggan");

  const box = res?.data?.data ?? {};
  // Pilih bucket sesuai pilihan UI:
  // ≤7 hari  -> oneweek
  // ≤31 hari -> onemonth
  // >31 hari -> threemonth
  let bucket;
  if (days <= 7) bucket = box.oneweek;
  else if (days <= 31) bucket = box.onemonth;
  else bucket = box.threemonth;

  const rows = Array.isArray(bucket) ? bucket : [];

  // Normalisasi ke shape yang dipakai chart: { date, orders }
  return rows.map((r) => ({
    date: r.date ?? r.label ?? "",
    orders: Number(r.orders ?? r.value ?? 0),
  }));
}

/** =======================
 *  Histori transaksi (list kanan)
 *  Prefer: GET /order/statistics/transactions?hours=1
 *  Fallback: GET /order/ lalu filter by jam di FE
 *  ======================= */
// --- History Transaksi (by hours) ---
export async function GetTransactionByHour(hours = 1) {
  // pilih bucket sesuai jam yang kamu pakai di UI
  const bucketKey =
    hours === 1
      ? "ordersOneHour"
      : hours === 6
      ? "ordersSixHour"
      : hours === 12
      ? "ordersTwelveHour"
      : "ordersOneDay"; // 24 jam

  try {
    const res = await api.get(`${apiurl}/order/statistics/`);
    const raw = res?.data?.data?.[bucketKey] ?? [];

    // Kembalikan data + sedikit field turunan yang umum dipakai di UI
    return raw.map((o) => ({
      ...o,
      id: o.ID,
      date: o.order_date,
      method: o.payment_method, // "CASH" | "QRIS" | "DEBIT"
      total: o.total_price_with_tax || o.total_price || 0,
      items:
        o.order_items?.map((it) => ({
          ...it,
          id: it.ID,
          name: it.product_name,
          qty: it.quantity,
        })) ?? [],
    }));
  } catch (err) {
    console.error("GetTransactionByHour error:", err);
    return [];
  }
}

/** =======================
 *  (Opsional) Menu populer / bulan
 *  GET /order/statistics/popularMenu/:mon
 *  ======================= */
// Popular menu (0 = current month di backend)
export async function GetPopularMenu(month = 0) {
  try {
    const res = await api.get(
      `${apiurl}/order/statistics/popularMenu/${month}`
    );
    const raw = res?.data?.data ?? [];
    return raw.map((it, idx) => ({
      id: idx + 1,
      menu: it.product_name,
      jumlah: it.count,
    }));
  } catch (err) {
    console.error("GetPopularMenu error:", err);
    return [];
  }
}

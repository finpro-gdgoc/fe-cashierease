// Dummy data for coupons
const dummyCoupons = [
  {
    _id: "coupon_1",
    kodeCoupon: "DISKON10",
    besarDiscount: 0.1, // 10% discount
    description: "Diskon 10% untuk semua produk",
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
    minPurchase: 50000,
  },
  {
    _id: "coupon_2",
    kodeCoupon: "DISKON20",
    besarDiscount: 0.2, // 20% discount
    description: "Diskon 20% untuk pembelian di atas 100rb",
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    minPurchase: 100000,
  },
  {
    _id: "coupon_3",
    kodeCoupon: "CASHBACK5",
    besarDiscount: 0.05, // 5% discount
    description: "Cashback 5% untuk semua transaksi",
    validUntil: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    minPurchase: 25000,
  },
  {
    _id: "coupon_4",
    kodeCoupon: "NEWUSER",
    besarDiscount: 0.15, // 15% discount
    description: "Diskon khusus pengguna baru",
    validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    minPurchase: 0,
  },
];

// Simulate API call with delay
const simulateApiDelay = () =>
  new Promise((resolve) => setTimeout(resolve, 800));

export async function GetAllCoupons() {
  await simulateApiDelay();

  try {
    // Return dummy coupons array
    return dummyCoupons;
  } catch (err) {
    console.log("GetAllCoupons error:", err);
    throw new Error("Failed to fetch coupons.");
  }
}

export async function CreateCoupon() {
  await simulateApiDelay();

  try {
    // Dummy create coupon response
    const newCoupon = {
      _id: `coupon_${Date.now()}`,
      kodeCoupon: "NEW_COUPON",
      besarDiscount: 0.1,
      description: "New coupon",
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      minPurchase: 0,
    };

    dummyCoupons.push(newCoupon);

    return {
      success: true,
      data: newCoupon,
    };
  } catch (error) {
    console.log("CreateCoupon error:", error);
    throw new Error("Failed to create coupon.");
  }
}

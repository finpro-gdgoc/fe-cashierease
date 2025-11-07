// Dummy statistic service for React (no backend, for component integration)

export function GetStatistic() {
  return {
    totalIncome: 34800000,
    totalQuantity: 958,
    totalOrders: 358,
    totalCouponUse: 102,
  };
}

export function GetTransactionByHour(hour) {
  if (hour === 1) {
    return [
      {
        _id: "123456781",
        createdAt: new Date().toISOString(),
        total_price_with_tax: 57000,
        payment_method: "Tunai",
      },
      {
        _id: "223456782",
        createdAt: new Date().toISOString(),
        total_price_with_tax: 95000,
        payment_method: "QRIS",
      },
    ];
  }
  if (hour === 6) {
    return [
      // ...fill with 6-hour data
    ];
  }
  if (hour === 12) {
    return [
      // ...fill with 12-hour data
    ];
  }
  if (hour === 24) {
    return [
      // ...fill with 24-hour data
    ];
  }
  return [];
}

export function GetStatisticByDay(days) {
  // Format: [{ date: '12 Agustus', income: 2900000 }, ...]
  if (days === 7) {
    return [
      { date: "14 Agustus", income: 1350000 },
      { date: "15 Agustus", income: 2850000 },
      { date: "16 Agustus", income: 4000000 },
      { date: "17 Agustus", income: 3725000 },
      { date: "18 Agustus", income: 3750000 },
      { date: "19 Agustus", income: 2500000 },
      { date: "20 Agustus", income: 2650000 },
      { date: "21 Agustus", income: 2230000 },
    ];
  }
  if (days === 31) {
    return [
      // ...dummy for one month
    ];
  }
  if (days === 93) {
    return [
      // ...dummy for three months
    ];
  }
  if (days === 365) {
    return [
      // ...dummy for twelve months
    ];
  }
  return [];
}

export function GetPelangganByDay(days) {
  // Format: [{ date: '12 Agustus', orders: 11 }, ...]
  if (days === 7) {
    return [
      { date: "12 Agustus", orders: 11 },
      { date: "13 Agustus", orders: 6 },
      { date: "14 Agustus", orders: 7 },
      { date: "15 Agustus", orders: 10 },
      { date: "16 Agustus", orders: 13 },
      { date: "17 Agustus", orders: 8 },
      { date: "18 Agustus", orders: 9 },
    ];
  }
  if (days === 31) {
    return [
      // ...dummy for one month
    ];
  }
  if (days === 93) {
    return [
      // ...dummy for three months
    ];
  }
  if (days === 365) {
    return [
      // ...dummy for twelve months
    ];
  }
  return [];
}

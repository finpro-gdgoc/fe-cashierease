// Dummy data for toko
const dummyToko = {
  _id: "toko_1",
  namaToko: "CashierEase",
};

// Simulate API call with delay
const simulateApiDelay = () =>
  new Promise((resolve) => setTimeout(resolve, 800));

export async function getTokoName() {
  await simulateApiDelay();

  try {
    // Return single toko object
    return [dummyToko];
  } catch (err) {
    console.error("getTokoName error:", err);
    throw new Error("Failed to fetch toko data.");
  }
}

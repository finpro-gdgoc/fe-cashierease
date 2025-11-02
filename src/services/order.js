// Dummy data for orders
const dummyOrders = [];
let orderIdCounter = 1;

// Simulate API call with delay
const simulateApiDelay = () =>
  new Promise((resolve) => setTimeout(resolve, 1000));

function transformOrder(order) {
  return {
    ...order,
    order_items: order.order_items.map((item) => ({
      product_id: item.id,
      quantity: item.qty,
    })),
  };
}

export async function PostOrder(data) {
  await simulateApiDelay();

  try {
    const transformedOrder = transformOrder(data);
    const orderId = `order_${orderIdCounter++}`;

    // Create dummy order response
    const orderResult = {
      _id: orderId,
      ...transformedOrder,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    // Store in dummy orders array
    dummyOrders.push(orderResult);

    // Simulate API response structure
    return orderId; // Return just the ID as expected by Order.jsx
  } catch (err) {
    console.log("PostOrder error:", err.message);
    if (err.code === "ECONNABORTED") {
      throw new Error("Request timeout. Please try again.");
    }
    if (err.response?.status === 504) {
      throw new Error(
        "Server is temporarily unavailable. Please try again later."
      );
    }
    throw new Error("Failed to create order.");
  }
}

export async function GetAllOrders() {
  await simulateApiDelay();

  try {
    // Return dummy orders
    return dummyOrders.length > 0 ? dummyOrders : [];
  } catch (err) {
    console.log("GetAllOrders error:", err.message);
    if (err.code === "ECONNABORTED") {
      throw new Error("Request timeout. Please try again.");
    }
    if (err.response?.status === 504) {
      throw new Error(
        "Server is temporarily unavailable. Please try again later."
      );
    }
    throw new Error("Failed to fetch orders.");
  }
}

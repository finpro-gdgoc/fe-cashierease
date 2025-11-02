// Dummy data for users (should match auth.js users)
const dummyUsers = [
  {
    _id: "1",
    id: 1,
    nomorPegawai: "PGW001",
    nama: "Kasir 1",
    role: "kasir",
    toko: "Toko A",
    email: "kasir1@example.com",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "2",
    id: 2,
    nomorPegawai: "PGW002",
    nama: "Admin 1",
    role: "admin",
    toko: "Toko B",
    email: "admin1@example.com",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "3",
    id: 3,
    nomorPegawai: "PGW003",
    nama: "Manager 1",
    role: "manager",
    toko: "Toko C",
    email: "manager1@example.com",
    createdAt: new Date().toISOString(),
  },
];

// Simulate API call with delay
const simulateApiDelay = () =>
  new Promise((resolve) => setTimeout(resolve, 800));

export async function GetUserById() {
  await simulateApiDelay();

  try {
    // Get user ID from localStorage (similar to cookies in Next.js)
    const userId = localStorage.getItem("id");

    if (!userId) {
      throw new Error("User ID not found");
    }

    // Find user by ID (convert to number for comparison if needed)
    const userIdNum = parseInt(userId, 10);
    const user = dummyUsers.find(
      (u) =>
        u.id === userIdNum || u.id?.toString() === userId || u._id === userId
    );

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (err) {
    console.error("GetUserById error:", err);
    throw new Error("Failed to fetch user data.");
  }
}

export async function CreateUser(userData) {
  await simulateApiDelay();

  try {
    // Create new user
    const newUser = {
      _id: `user_${Date.now()}`,
      id: `user_${Date.now()}`,
      ...userData,
      createdAt: new Date().toISOString(),
    };

    // Add to dummy users array
    dummyUsers.push(newUser);

    return {
      success: true,
      data: newUser,
      message: "User created successfully",
    };
  } catch (error) {
    console.error("CreateUser error:", error);
    throw new Error("Error creating user: " + error.message);
  }
}

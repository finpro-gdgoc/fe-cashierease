// Dummy data for authentication
const dummyUsers = [
  {
    id: 1,
    nomorPegawai: "PGW001",
    password: "kasir123",
    nama: "Kasir 1",
    role: "kasir",
    toko: "Toko A",
  },
  {
    id: 2,
    nomorPegawai: "PGW002",
    password: "admin456",
    nama: "Admin 1",
    role: "admin",
    toko: "Toko B",
  },
  {
    id: 3,
    nomorPegawai: "PGW003",
    password: "manager789",
    nama: "Manager 1",
    role: "manager",
    toko: "Toko C",
  },
];

// Simulate API call with delay
const simulateApiDelay = () =>
  new Promise((resolve) => setTimeout(resolve, 1000));

export const PostLogin = async (credentials) => {
  await simulateApiDelay();

  const { nomorPegawai, password } = credentials;

  // Find user by nomorPegawai and password
  const user = dummyUsers.find(
    (u) => u.nomorPegawai === nomorPegawai && u.password === password
  );

  if (!user) {
    throw new Error("Invalid credentials");
  }

  // Return user data without password
  const { password: _, ...userWithoutPassword } = user;

  return {
    data: userWithoutPassword,
    token: "dummy_token_" + user.id,
    message: "Login berhasil",
  };
};

export const Logout = () => {
  localStorage.removeItem("id");
};

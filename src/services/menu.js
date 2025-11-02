// Dummy data for menus
const dummyProducts = [
  {
    _id: "prod_1",
    nama_produk: "Mie Ayam Spesial",
    tipe_produk: "makanan",
    harga_produk: 15000,
    gambar_produk: "/src/assets/images/mieayam.png",
  },
  {
    _id: "prod_2",
    nama_produk: "Mie Ayam Bakso",
    tipe_produk: "makanan",
    harga_produk: 18000,
    gambar_produk: "/src/assets/images/mieayam.png",
  },
  {
    _id: "prod_3",
    nama_produk: "Mie Ayam Ceker",
    tipe_produk: "makanan",
    harga_produk: 20000,
    gambar_produk: "/src/assets/images/mieayam.png",
  },
  {
    _id: "prod_4",
    nama_produk: "Mie Ayam Pangsit",
    tipe_produk: "makanan",
    harga_produk: 22000,
    gambar_produk: "/src/assets/images/mieayam.png",
  },
  {
    _id: "prod_5",
    nama_produk: "Mie Ayam Komplit",
    tipe_produk: "makanan",
    harga_produk: 25000,
    gambar_produk: "/src/assets/images/mieayam.png",
  },
  {
    _id: "prod_6",
    nama_produk: "Mie Ayam Original",
    tipe_produk: "makanan",
    harga_produk: 12000,
    gambar_produk: "/src/assets/images/mieayam.png",
  },
  {
    _id: "prod_7",
    nama_produk: "Nasi Goreng Spesial",
    tipe_produk: "makanan",
    harga_produk: 16000,
    gambar_produk: "/src/assets/images/mieayam.png",
  },
  {
    _id: "prod_8",
    nama_produk: "Nasi Goreng Seafood",
    tipe_produk: "makanan",
    harga_produk: 20000,
    gambar_produk: "/src/assets/images/mieayam.png",
  },
  {
    _id: "prod_9",
    nama_produk: "Es Teh Manis",
    tipe_produk: "minuman",
    harga_produk: 5000,
    gambar_produk: "/src/assets/images/mieayam.png",
  },
  {
    _id: "prod_10",
    nama_produk: "Es Jeruk",
    tipe_produk: "minuman",
    harga_produk: 6000,
    gambar_produk: "/src/assets/images/mieayam.png",
  },
  {
    _id: "prod_11",
    nama_produk: "Jus Alpukat",
    tipe_produk: "minuman",
    harga_produk: 10000,
    gambar_produk: "/src/assets/images/mieayam.png",
  },
  {
    _id: "prod_12",
    nama_produk: "Jus Mangga",
    tipe_produk: "minuman",
    harga_produk: 10000,
    gambar_produk: "/src/assets/images/mieayam.png",
  },
  {
    _id: "prod_13",
    nama_produk: "Kopi Hitam",
    tipe_produk: "minuman",
    harga_produk: 8000,
    gambar_produk: "/src/assets/images/mieayam.png",
  },
  {
    _id: "prod_14",
    nama_produk: "Kerupuk",
    tipe_produk: "snack",
    harga_produk: 3000,
    gambar_produk: "/src/assets/images/mieayam.png",
  },
  {
    _id: "prod_15",
    nama_produk: "Keripik Singkong",
    tipe_produk: "snack",
    harga_produk: 5000,
    gambar_produk: "/src/assets/images/mieayam.png",
  },
  {
    _id: "prod_16",
    nama_produk: "Kacang Goreng",
    tipe_produk: "snack",
    harga_produk: 4000,
    gambar_produk: "/src/assets/images/mieayam.png",
  },
];

// Simulate API call with delay
const simulateApiDelay = () =>
  new Promise((resolve) => setTimeout(resolve, 800));

// Search products helper function
export function searchProducts(products, search) {
  if (!search || search.trim() === "") {
    return products;
  }

  const searchLower = search.toLowerCase().trim();
  return products.filter((product) =>
    product.nama_produk.toLowerCase().includes(searchLower)
  );
}

export async function getAllMenus(type, search) {
  await simulateApiDelay();

  try {
    let data = [...dummyProducts];

    // Filter by type if provided
    if (type) {
      data = data.filter((product) => product.tipe_produk === type);
    }

    // Filter by search if provided
    if (search) {
      data = searchProducts(data, search);
    }

    return data;
  } catch (err) {
    console.error("getAllMenus error:", err);
    throw new Error("Failed to fetch menus.");
  }
}

import Product from "../models/Product.js";

// Ambil semua produk
export const getProducts = async (req, res) => {
  try {
    const { kategori } = req.query;
    let filter = {};

    if (kategori) {
      // enum check tidak wajib karena sudah divalidasi schema,
      // tapi bisa ditambahkan biar lebih "clean error"
      const allowedKategori = ["ikan", "valueadded", "cephalopoda", "udang"];
      if (!allowedKategori.includes(kategori)) {
        return res.status(400).json({ message: "Kategori tidak valid" });
      }
      filter.kategori = kategori;
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.status(200).json(products);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Tambah produk baru
export const createProduct = async (req, res) => {
  try {
    const products = new Product(req.body);
    const saved = await products.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// Ambil detail produk by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Produk tidak ditemukan" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update produk
export const updateProduct = async (req, res) => {
  try {
    const { name, description, kategori } = req.body;
    let updatedData = { name, description, kategori };

    // Jika ada file baru, update gambar
    if (req.file) {
      updatedData.image = `/uploads/${req.file.filename}`;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!product) return res.status(404).json({ message: "Produk tidak ditemukan" });

    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Hapus produk
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Produk tidak ditemukan" });

    res.status(200).json({ message: "Produk berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

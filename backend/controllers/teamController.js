import Team from "../models/Team.js";

// Ambil semua produk
export const getTeams = async (req, res) => {
  try {
    const teams = await Team.find().sort({ order: 1 }); // naik
    res.json(teams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Tambah team baru
export const createTeam = async (req, res) => {
  try {
    const { name, position, image, kategori } = req.body;
    // Validasi kategori
    const allowedKategori = ["dewan", "manager", "other", "asisten"];
    if (!allowedKategori.includes(kategori)) {
      return res.status(400).json({ message: "Kategori tidak valid" });
    }
    // cari urutan tertinggi
    const maxOrderTeam = await Team.findOne().sort({ order: -1 });
    const newOrder = maxOrderTeam ? maxOrderTeam.order + 1 : 1;

    const team = new Team({ name, position, image, kategori, order: newOrder });
    const saved = await team.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ambil detail produk by ID
export const getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ message: "Produk tidak ditemukan" });
    res.json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update produk
export const updateTeam = async (req, res) => {
  try {
    const { name, position, image, kategori, } = req.body;
    const team = await Team.findByIdAndUpdate(
      req.params.id,
      { name, position, image, kategori, },
      { new: true }
    );
    if (!team) return res.status(404).json({ message: "Produk tidak ditemukan" });
    res.json(team);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Hapus produk
export const deleteTeam = async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) return res.status(404).json({ message: "Produk tidak ditemukan" });

    res.json({ message: "Produk berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

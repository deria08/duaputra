import express from "express";
import {
  getTeams,
  createTeam,
  getTeamById,
  updateTeam,
  deleteTeam
} from "../controllers/teamController.js";
import Team from "../models/Team.js";

const router = express.Router();

// Get all team (urutkan berdasarkan order)
router.get("/", getTeams);

// Get team by kategori
router.get("/kategori/:kategori", async (req, res) => {
  try {
    const { kategori } = req.params;
    const team = await Team.find({ kategori }).sort({ order: 1 });
    res.json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get team by ID
router.get("/id/:id", getTeamById);

// Create team
router.post("/", createTeam);

// Update team
router.put("/id/:id", updateTeam);

// Delete team
router.delete("/id/:id", deleteTeam);

// 🔥 Tambah route untuk reorder
router.put("/reorder", async (req, res) => {
  const { id, direction } = req.body;
  try {
    const item = await Team.findById(id);
    if (!item) return res.status(404).json({ error: "Item tidak ditemukan" });

    // Ambil semua tim sesuai kategori
    const teams = await Team.find({ kategori: item.kategori }).sort("order");

    const index = teams.findIndex(t => t._id.toString() === id);

    if (direction === "up" && index > 0) {
      const prev = teams[index - 1];
      const temp = item.order;
      item.order = prev.order;
      prev.order = temp;
      await item.save();
      await prev.save();
    }

    if (direction === "down" && index < teams.length - 1) {
      const next = teams[index + 1];
      const temp = item.order;
      item.order = next.order;
      next.order = temp;
      await item.save();
      await next.save();
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;

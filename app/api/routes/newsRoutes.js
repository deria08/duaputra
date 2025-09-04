import express from "express";
import {
  createNews,
  getAllNews,
  getNewsById,
  updateNews,
  deleteNews,
} from "../controllers/newsController.js";

const router = express.Router();

router.post("/", createNews);   // Create
router.get("/", getAllNews);    // Read All
router.get("/:id", getNewsById); // Read One
router.put("/:id", updateNews);  // Update
router.delete("/:id", deleteNews); // Delete

export default router;

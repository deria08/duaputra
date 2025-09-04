import express from "express";
import { 
  getProducts, 
  createProduct, 
  getProductById, 
  updateProduct, 
  deleteProduct 
} from "../controllers/productController.js";
import Product from "../models/Product.js";

const router = express.Router();


// Get team by kategori
router.get("/kategori/:kategori", async (req, res) => {
  try {
    const { kategori } = req.params;
    const products = await Product.find({ kategori }).sort({ order: 1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post("/", createProduct);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;

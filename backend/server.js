import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import newsRoutes from "./routes/newsRoutes.js";
import uploadRoute from "./routes/upload.js";
import productRoutes from "./routes/productRoutes.js";
import teamRoutes from "./routes/teamroutes.js";
import fs from "fs";
import path from "path";
import contactRoutes from "./routes/contactRoutes.js"

dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("public/uploads")); // agar bisa diakses
const uploadDir = path.join("public", "uploads");

// buat folder kalau belum ada
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.use("/api/upload", uploadRoute);
app.use("/api/news", newsRoutes)
app.use("/api/products", productRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api", contactRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
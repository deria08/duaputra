import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    id: { type: String, required: true },
    en: { type: String, required: true },
  },
  image: {
    type: String, // simpan URL atau path gambar
    required: true,
  },
  description: {
    id: { type: String, required: true },
    en: { type: String, required: true },
  },
  kategori: {
    type: String,
    enum: ["ikan", "valueadded", "cephalopoda", "udang"],
    required: true,
  },
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;

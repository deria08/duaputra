import connectDB from "@/backend/config/db";
import Product from "@/backend/models/Product";
connectDB();

export async function GET(req, { params }) {
  try {
    const { kategori } = params;
    const allowedKategori = ["ikan", "valueadded", "cephalopoda", "udang"];

    if (!allowedKategori.includes(kategori)) {
      return new Response(JSON.stringify({ message: "Kategori tidak valid" }), { status: 400 });
    }

    const products = await Product.find({ kategori }).sort({ createdAt: -1 });
    return new Response(JSON.stringify(products), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

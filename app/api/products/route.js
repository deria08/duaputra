import connectDB from "@/backend/config/db";
import Product from "@/backend/models/Product";
import { NextResponse} from "next/server";
connectDB();
// GET all products (filter by kategori optional)
export async function GET(req) {
  return NextResponse.json({ message: "API Products jalan ✅" });
  try {
    const { searchParams } = new URL(req.url);
    const kategori = searchParams.get("kategori");

    let filter = {};
    if (kategori) {
      const allowedKategori = ["ikan", "valueadded", "cephalopoda", "udang"];
      if (!allowedKategori.includes(kategori)) {
        return new Response(JSON.stringify({ message: "Kategori tidak valid" }), { status: 400 });
      }
      filter.kategori = kategori;
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    return new Response(JSON.stringify(products), { status: 200 });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

// POST create new product
export async function POST(req) {
  try {
    const body = await req.json();
    const product = new Product(body);
    const saved = await product.save();
    return new Response(JSON.stringify(saved), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
}

// PUT update product
export async function PUT(req) {
  try {
    const body = await req.json();
    const url = new URL(req.url);
    const id = url.searchParams.get("id"); // /api/products?id=123
    if (!id) return new Response(JSON.stringify({ error: "ID required" }), { status: 400 });

    const updated = await Product.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!updated) return new Response(JSON.stringify({ message: "Produk tidak ditemukan" }), { status: 404 });

    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
}

// DELETE product
export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) return new Response(JSON.stringify({ error: "ID required" }), { status: 400 });

    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) return new Response(JSON.stringify({ message: "Produk tidak ditemukan" }), { status: 404 });

    return new Response(JSON.stringify({ message: "Produk berhasil dihapus" }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

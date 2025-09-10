import { NextResponse } from "next/server";
import connectDB from "@/backend/config/db";
import Product from "@/backend/models/Product";

// GET product by ID
export async function GET(req, context) {
  try {
    await connectDB();
    const { id } = await context.params; // ⬅️ pakai await
    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT update product
export async function PUT(req, context) {
  try {
    await connectDB();
    const { id } = await context.params; // ⬅️ pakai await
    const body = await req.json();

    const updated = await Product.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json({ message: "Produk tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

// DELETE product
export async function DELETE(req, context) {
  try {
    await connectDB();
    const { id } = await context.params; // ⬅️ pakai await
    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ message: "Produk tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({ message: "Produk berhasil dihapus" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

import connectDB from "@/backend/config/db";
import Product from "@/backend/models/Product";

// GET all products (optional filter by kategori)
export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const kategori = searchParams.get("kategori");

    const allowedKategori = ["ikan", "valueadded", "cephalopoda", "udang"];
    let filter = {};

    if (kategori) {
      if (!allowedKategori.includes(kategori)) {
        return new Response(
          JSON.stringify({ message: "Kategori tidak valid" }),
          { status: 400 }
        );
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
    await connectDB();
    const body = await req.json();
    const product = new Product(body);
    const saved = await product.save();

    return new Response(JSON.stringify(saved), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
}

// PUT update product (via ?id=...)
export async function PUT(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response(JSON.stringify({ error: "ID required" }), {
        status: 400,
      });
    }

    const body = await req.json();
    const updated = await Product.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return new Response(
        JSON.stringify({ message: "Produk tidak ditemukan" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
}

// DELETE product (via ?id=...)
export async function DELETE(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response(JSON.stringify({ error: "ID required" }), {
        status: 400,
      });
    }

    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return new Response(
        JSON.stringify({ message: "Produk tidak ditemukan" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Produk berhasil dihapus" }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

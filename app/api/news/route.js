import connectDB from "@/backend/config/db";
import News from "@/backend/models/News";

// GET all news
export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const lang = searchParams.get("lang") || "id";

    // Urutkan berdasarkan field "date", terbaru dulu
    const news = await News.find().sort({ date: -1 });

    const translated = news.map((n) => ({
      _id: n._id,
      title: n.title[lang],
      shortDesc: n.shortDesc[lang],
      fullDesc: n.fullDesc[lang],
      image: n.image,
      date: n.date,       // ⬅️ pakai date
      createdAt: n.createdAt,
    }));

    return new Response(JSON.stringify(translated), {
      status: 200,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

// POST create news
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    // Pastikan field date valid
    if (!body.date) {
      return new Response(JSON.stringify({ error: "Date is required" }), { status: 400 });
    }

    const news = new News({
      ...body,
      date: new Date(body.date), // ⬅️ pastikan format Date
    });

    const saved = await news.save();
    return new Response(JSON.stringify(saved), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
}

// PUT update news
export async function PUT(req) {
  try {
    await connectDB();
    const body = await req.json();
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) return new Response(JSON.stringify({ error: "ID required" }), { status: 400 });

    if (body.date) {
      body.date = new Date(body.date); // ⬅️ konversi ke Date
    }

    const updated = await News.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
}

// DELETE news
export async function DELETE(req) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) return new Response(JSON.stringify({ error: "ID required" }), { status: 400 });

    await News.findByIdAndDelete(id);
    return new Response(JSON.stringify({ message: "Deleted successfully" }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

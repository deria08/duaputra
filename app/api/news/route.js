import connectDB from "@/backend/config/db";
import News from "@/backend/models/News";

connectDB(); // pastikan koneksi DB terbuka sebelum request

// GET all news
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get("lang") || "id";
    const news = await News.find().sort({ createdAt: -1 });

    const translated = news.map(n => ({
      _id: n._id,
      title: n.title[lang],
      shortDesc: n.shortDesc[lang],
      fullDesc: n.fullDesc[lang],
      image: n.image,
      date: n.date,
      createdAt: n.createdAt,
    }));

    return new Response(JSON.stringify(translated), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

// POST create news
export async function POST(req) {
  try {
    const body = await req.json();
    const news = new News(body);
    const saved = await news.save();
    return new Response(JSON.stringify(saved), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
}

// PUT update news
export async function PUT(req) {
  try {
    const body = await req.json();
    const url = new URL(req.url);
    const id = url.searchParams.get("id"); // misal /api/news?id=123
    if (!id) return new Response(JSON.stringify({ error: "ID required" }), { status: 400 });

    const updated = await News.findByIdAndUpdate(id, body, { new: true });
    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
}

// DELETE news
export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) return new Response(JSON.stringify({ error: "ID required" }), { status: 400 });

    await News.findByIdAndDelete(id);
    return new Response(JSON.stringify({ message: "Deleted successfully" }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

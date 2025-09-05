import connectDB from "@/backend/config/db";
import Team from "@/backend/models/Team";

connectDB();

// GET all teams (urut berdasarkan order)
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const kategori = searchParams.get("kategori");
    
    let filter = {};
    if (kategori) filter.kategori = kategori;

    const teams = await Team.find(filter).sort({ order: 1 });
    return new Response(JSON.stringify(teams), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

// POST create team
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, position, image, kategori } = body;

    const allowedKategori = ["dewan", "manager", "other", "asisten"];
    if (!allowedKategori.includes(kategori)) {
      return new Response(JSON.stringify({ message: "Kategori tidak valid" }), { status: 400 });
    }

    const maxOrderTeam = await Team.findOne().sort({ order: -1 });
    const newOrder = maxOrderTeam ? maxOrderTeam.order + 1 : 1;

    const team = new Team({ name, position, image, kategori, order: newOrder });
    const saved = await team.save();

    return new Response(JSON.stringify(saved), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

// PUT update team
export async function PUT(req) {
  try {
    const body = await req.json();
    const url = new URL(req.url);
    const id = url.searchParams.get("id"); // /api/teams?id=123
    if (!id) return new Response(JSON.stringify({ error: "ID required" }), { status: 400 });

    const { name, position, image, kategori } = body;

    const updated = await Team.findByIdAndUpdate(id, { name, position, image, kategori }, { new: true });
    if (!updated) return new Response(JSON.stringify({ message: "Team tidak ditemukan" }), { status: 404 });

    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
}

// DELETE team
export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) return new Response(JSON.stringify({ error: "ID required" }), { status: 400 });

    const deleted = await Team.findByIdAndDelete(id);
    if (!deleted) return new Response(JSON.stringify({ message: "Team tidak ditemukan" }), { status: 404 });

    return new Response(JSON.stringify({ message: "Team berhasil dihapus" }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

import connectDB from "@/backend/config/db";
import Team from "@/backend/models/Team";

export async function GET(req, { params }) {
  await connectDB();
  try {
    const { kategori } = params; // ambil dari URL: /api/teams/dewan
    const allowedKategori = ["dewan", "manager", "other", "asisten"];
    if (!allowedKategori.includes(kategori)) {
      return new Response(JSON.stringify({ message: "Kategori tidak valid" }), { status: 400 });
    }

    const teams = await Team.find({ kategori }).sort({ order: 1 });
    return new Response(JSON.stringify(teams), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

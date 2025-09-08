import connectDB from "@/backend/config/db";
import Team from "@/backend/models/Team";

export async function GET(req, context) {
  try {
    await connectDB();

    // ⬅️ Ambil kategori dari context.params dengan await
    const { kategori } = await context.params;

    const allowedKategori = ["dewan", "manager", "other", "asisten"];
    if (!allowedKategori.includes(kategori)) {
      return new Response(JSON.stringify({ message: "Kategori tidak valid" }), {
        status: 400,
      });
    }

    const teams = await Team.find({ kategori }).sort({ order: 1 });
    return new Response(JSON.stringify(teams), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}

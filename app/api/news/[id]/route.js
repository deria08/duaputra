import { NextResponse } from "next/server";
import connectDB from "@/backend/config/db";
import News from "@/backend/models/News";

// GET news by ID
export async function GET(req, { params }) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get("lang") || "id"; // default "id"

    const news = await News.findById(params.id).lean();
    if (!news) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    // 🔑 Ambil sesuai bahasa
    const responseData = {
      _id: news._id,
      title: news.title?.[lang] || news.title?.id,
      shortDesc: news.shortDesc?.[lang] || news.shortDesc?.id,
      fullDesc: news.fullDesc?.[lang] || news.fullDesc?.id,
      image: news.image,
      date: news.createdAt,
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT update news
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const body = await req.json();

    const updated = await News.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json({ message: "News not found" }, { status: 404 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

// DELETE news
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const deleted = await News.findByIdAndDelete(params.id);

    if (!deleted) {
      return NextResponse.json({ message: "News not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

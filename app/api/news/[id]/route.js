import { NextResponse } from "next/server";
import connectDB from "@/backend/config/db";
import News from "@/backend/models/News";

// GET news by ID
export async function GET(req, context) {
  try {
    await connectDB();
    const { id } = await context.params;
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get("lang") || "id";

    const news = await News.findById(id).lean();
    if (!news) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    let responseData;

    if (lang === "all") {
      // untuk edit page
      responseData = {
        _id: news._id,
        title: news.title,
        shortDesc: news.shortDesc,
        fullDesc: news.fullDesc,
        image: news.image,
        date: news.date,       // ⬅️ pakai date dari form
        createdAt: news.createdAt,
      };
    } else {
      // untuk public page
      responseData = {
        _id: news._id,
        title: news.title?.[lang] || news.title?.id,
        shortDesc: news.shortDesc?.[lang] || news.shortDesc?.id,
        fullDesc: news.fullDesc?.[lang] || news.fullDesc?.id,
        image: news.image,
        date: news.date,       // ⬅️ pakai date dari form
      };
    }

    return NextResponse.json(responseData, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT update news
export async function PUT(req, context) {
  await connectDB();
  const body = await req.json();
  const { id } = await context.params;

  if (body.date) {
    body.date = new Date(body.date); // ⬅️ pastikan format Date
  }

  const updated = await News.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });

  if (!updated) {
    return NextResponse.json({ message: "News not found" }, { status: 404 });
  }

  return NextResponse.json(updated, { status: 200 });
}

// DELETE news
export async function DELETE(req, context) {
  await connectDB();
  const { id } = await context.params;

  const deleted = await News.findByIdAndDelete(id);

  if (!deleted) {
    return NextResponse.json({ message: "News not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
}

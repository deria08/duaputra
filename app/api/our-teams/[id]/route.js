import { NextResponse } from "next/server";
import connectDB from "@/backend/config/db";
import Team from "@/backend/models/Team";

// GET team by ID
export async function GET(req, context) {
  try {
    await connectDB();
    const { id } = await context.params; // ⬅️ pakai await
    const team = await Team.findById(id);

    if (!team) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }
    return NextResponse.json(team);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// UPDATE team by ID
export async function PUT(req, context) {
  try {
    await connectDB();
    const { id } = await context.params; // ⬅️ pakai await
    const body = await req.json();

    const updated = await Team.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE team by ID
export async function DELETE(req, context) {
  try {
    await connectDB();
    const { id } = await context.params; // ⬅️ pakai await

    const deleted = await Team.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

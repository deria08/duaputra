import { NextResponse } from "next/server";
import connectDB from "@/backend/config/db";
import Team from "@/backend/models/Team";

// GET team by ID
export async function GET(req, { params }) {
  try {
    await connectDB();
    const team = await Team.findById(params.id);
    if (!team) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }
    return NextResponse.json(team);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// UPDATE team by ID
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const body = await req.json();
    const updated = await Team.findByIdAndUpdate(params.id, body, {
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
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    await Team.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Deleted" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

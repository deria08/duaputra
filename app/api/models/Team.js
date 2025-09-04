import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  position: { type: String, required: true },
  kategori: {
    type: String,
    enum: ["dewan", "manager", "other", "asisten"],
    required: true,
  },
  order: { type: Number, default: 0 }, // 👈 penting untuk urutan
}, { timestamps: true });

const Team = mongoose.model("Team", teamSchema);
export default Team;

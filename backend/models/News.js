import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: {
      id: { type: String, required: true },
      en: { type: String, required: true },
    },
    image: String,
    shortDesc: {
      id: { type: String },
      en: { type: String },
    },
    fullDesc: {
      id: { type: String },
      en: { type: String },
    },
    date: {
      type: Date,
      required: true, // wajib input dari form
    },
  },
  { timestamps: true } // createdAt & updatedAt tetap ada untuk tracking
);

const News = mongoose.models.News || mongoose.model("News", newsSchema);

export default News;

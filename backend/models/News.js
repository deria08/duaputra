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
  },
  { timestamps: true }
);

const News = mongoose.models.News || mongoose.model("News", newsSchema);

export default News;

import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: {
      id: { type: String, required: true },
      en: { type: String, required: true },
    },
    image: { type: String, required: true },
    shortDesc: {
      id: { type: String, required: true },
      en: { type: String, required: true },
    },
    fullDesc: {
      id: { type: String, required: true },
      en: { type: String, required: true },
    },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

const News = mongoose.model("News", newsSchema);

export default News;

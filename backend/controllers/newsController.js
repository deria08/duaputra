import News from "../models/news.js";

// CREATE
export const createNews = async (req, res) => {
  try {
    const news = new News(req.body);
    const saved = await news.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ ALL
export const getAllNews = async (req, res) => {
  try {
    const lang = req.query.lang || "id"; // default bahasa Indonesia
    const news = await News.find().sort({ createdAt: -1 });

    const translated = news.map((n) => ({
      _id: n._id,
      title: n.title[lang],
      shortDesc: n.shortDesc[lang],
      fullDesc: n.fullDesc[lang],
      image: n.image,
      date: n.date,
      createdAt: n.createdAt,
    }));

    res.json(translated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ DETAIL
export const getNewsById = async (req, res) => {
  try {
    const lang = req.query.lang || "id";
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: "Not found" });

    const translated = {
      _id: news._id,
      title: news.title[lang],
      shortDesc: news.shortDesc[lang],
      fullDesc: news.fullDesc[lang],
      image: news.image,
      date: news.date,
      createdAt: news.createdAt,
    };

    res.json(translated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
export const updateNews = async (req, res) => {
  try {
    const updated = await News.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
export const deleteNews = async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

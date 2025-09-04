"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsCard from "@/components/NewsCard";

const NewsList = () => {
  const { lang } = useLanguage();
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/news?lang=${lang}`)
      .then((res) => res.json())
      .then((data) => {
        setNewsList(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [lang]); // fetch ulang kalau bahasa ganti

  // filter pencarian
  const filteredNews = newsList.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      (item.shortDesc || item.summary || "")
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  if (loading) return <p className="p-6 text-center">Loading...</p>;

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-12 pt-40">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-6">
            {lang === "id" ? "Berita Terbaru" : "Latest News"}
          </h1>

          {/* input search */}
          <div className="mb-8 flex justify-center">
            <input
              type="text"
              placeholder={lang === "id" ? "Cari berita..." : "Search news..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* grid berita */}
          {filteredNews.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredNews.map((news) => (
                <NewsCard key={news._id} news={news} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              {lang === "id"
                ? "Tidak ada berita ditemukan."
                : "No news found."}
            </p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NewsList;

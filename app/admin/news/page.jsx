"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function NewsListPage() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("/api/news")
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Hapus berita ini?")) return;
    await fetch(`/api/news/${id}`, { method: "DELETE" });
    setNews(news.filter((item) => item._id !== id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manajemen Berita</h1>
      <Link
        href="/admin/news/add"
        className="bg-blue-600 text-white px-4 py-2 rounded inline-block mb-4"
      >
        + Tambah Berita
      </Link>

      {news.length === 0 ? (
        <p>Tidak ada berita.</p>
      ) : (
        <ul className="space-y-4">
          {news.map((item) => (
            <li
              key={item._id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold">{item.title}</h2>
                <p className="text-sm text-gray-600">{item.shortDesc}</p>
              </div>
              <div className="flex flex-col space-y-2">
              <Link
                href={`/admin/news/edit/${item._id}`}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Hapus
              </button>
            </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

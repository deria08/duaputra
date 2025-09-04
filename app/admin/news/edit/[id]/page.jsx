"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditNewsPage() {
  const router = useRouter();
  const { id } = useParams();
  const [news, setNews] = useState({
    title: { id: "", en: "" },
    image: "",
    shortDesc: { id: "", en: "" },
    fullDesc: { id: "", en: "" },
    date: "",
  });
  const [uploading, setUploading] = useState(false);

useEffect(() => {
  if (!id) return;
  const fetchNews = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/news/${id}?lang=all`);
      if (!res.ok) throw new Error("Data berita tidak ditemukan");
      const data = await res.json();

      // mapping supaya selalu sesuai dengan struktur state
      setNews({
        title: {
          id: data?.title?.id || data?.title_id || "",
          en: data?.title?.en || data?.title_en || "",
        },
        image: data.image || "",
        shortDesc: {
          id: data?.shortDesc?.id || data?.short_id || "",
          en: data?.shortDesc?.en || data?.short_en || "",
        },
        fullDesc: {
          id: data?.fullDesc?.id || data?.full_id || "",
          en: data?.fullDesc?.en || data?.full_en || "",
        },
        date: data.date || "",
        });
        } catch (err) {
          console.error(err);
        }
      };
      fetchNews();
    }, [id]);


  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5000/api/news/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(news),
    });
    router.push("/admin/news");
  };
const handleFileUpload = async (e) => {
  if (!e.target.files?.[0]) return;
  const formData = new FormData();
  formData.append("file", e.target.files[0]);
  setUploading(true);

  try {
    const res = await fetch("http://localhost:5000/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setNews({ ...news, image: data.url });
  } catch (err) {
    console.error("Upload gagal:", err);
  } finally {
    setUploading(false);
  }
};

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Edit Berita</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        {/* Judul */}
        <input className="w-full border p-2 rounded" value={news.title.id} onChange={(e) => setNews({ ...news, title: { ...news.title, id: e.target.value } })} placeholder="Judul (ID)" />
        <input className="w-full border p-2 rounded" value={news.title.en} onChange={(e) => setNews({ ...news, title: { ...news.title, en: e.target.value } })} placeholder="Judul (EN)" />

        {/* Gambar */}
        {/* <input className="w-full border p-2 rounded" value={news.image} onChange={(e) => setNews({ ...news, image: e.target.value })} placeholder="URL Gambar" /> */}
        <p>Masukkan Gambar</p>
        <input type="file" accept="image/*" onChange={handleFileUpload} />
        {uploading && <p>Mengunggah file...</p>}
        
        {/* Deskripsi Singkat */}
        <input className="w-full border p-2 rounded" value={news.shortDesc.id} onChange={(e) => setNews({ ...news, shortDesc: { ...news.shortDesc, id: e.target.value } })} placeholder="Deskripsi Singkat (ID)" />
        <input className="w-full border p-2 rounded" value={news.shortDesc.en} onChange={(e) => setNews({ ...news, shortDesc: { ...news.shortDesc, en: e.target.value } })} placeholder="Deskripsi Singkat (EN)" />

        {/* Deskripsi Lengkap */}
        <textarea className="w-full border p-2 rounded" value={news.fullDesc.id} onChange={(e) => setNews({ ...news, fullDesc: { ...news.fullDesc, id: e.target.value } })} placeholder="Deskripsi Lengkap (ID)" />
        <textarea className="w-full border p-2 rounded" value={news.fullDesc.en} onChange={(e) => setNews({ ...news, fullDesc: { ...news.fullDesc, en: e.target.value } })} placeholder="Deskripsi Lengkap (EN)" />

        <input type="date" className="w-full border p-2 rounded" value={news.date} onChange={(e) => setNews({ ...news, date: e.target.value })} />

        <button type="submit" className="bg-yellow-600 text-white px-4 py-2 rounded">Update</button>
      </form>

      {news.image && (
        <div className="mt-4">
          <p className="font-medium">Preview Gambar:</p>
          <img src={news.image} alt="Preview" className="max-w-full mt-2 rounded" />
        </div>
      )}
    </div>
  );
}

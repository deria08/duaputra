"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { handleFileUpload } from "@/utils/HandleFileUpload";

export default function AddNewsPage() {
  const router = useRouter();

  const [titleId, setTitleId] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState(null);
  const [shortId, setShortId] = useState("");
  const [shortEn, setShortEn] = useState("");
  const [fullId, setFullId] = useState("");
  const [fullEn, setFullEn] = useState("");
  const [date, setDate] = useState("");
  const [uploading, setUploading] = useState(false);

  // const handleFileUpload = async (e) => {
  //   if (!e.target.files?.[0]) return;
  //   const formData = new FormData();
  //   formData.append("file", e.target.files[0]);
  //   setUploading(true);

  //   try {
  //     const res = await fetch("http://localhost:5000/api/upload", {
  //       method: "POST",
  //       body: formData,
  //     });
  //     const data = await res.json();
  //     setImage(data.url);
  //   } catch (err) {
  //     console.error("Upload gagal:", err);
  //   } finally {
  //     setUploading(false);
  //   }
  // };
  const onFileChange = async (e) => {
      setUploading(true);
      const url = await handleFileUpload(e); // ✅ panggil util
      if (url) setImage(url); // ✅ simpan URL Cloudinary ke state
      setUploading(false);
    };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titleId || !titleEn || !shortId || !shortEn || !fullId || !fullEn || !image || !date) {
      alert("Semua field wajib diisi!");
      return;
    }

    await fetch("/api/news", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: { id: titleId, en: titleEn },
        image,
        shortDesc: { id: shortId, en: shortEn },
        fullDesc: { id: fullId, en: fullEn },
        date: new Date(date),
      }),
    });

    router.push("/admin/news");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Tambah Berita</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Judul */}
        <input className="w-full border p-2 rounded" placeholder="Judul (ID)" value={titleId} onChange={(e) => setTitleId(e.target.value)} />
        <input className="w-full border p-2 rounded" placeholder="Judul (EN)" value={titleEn} onChange={(e) => setTitleEn(e.target.value)} />

        {/* Gambar */}
        {/* <input className="w-full border p-2 rounded" placeholder="URL Gambar" value={image} onChange={(e) => setImage(e.target.value)} /> */}
        <p>Masukkan Gambar</p>
        <input type="file" accept="image/*" onChange={onFileChange} />
        {uploading && <p>Mengunggah gambar...</p>}
        {image && (
          <img src={image} alt="Preview" className="mt-2 w-32 rounded shadow" />
        )}

        {/* Deskripsi Singkat */}
        <input className="w-full border p-2 rounded" placeholder="Deskripsi Singkat (ID)" value={shortId} onChange={(e) => setShortId(e.target.value)} />
        <input className="w-full border p-2 rounded" placeholder="Deskripsi Singkat (EN)" value={shortEn} onChange={(e) => setShortEn(e.target.value)} />

        {/* Deskripsi Lengkap */}
        <textarea className="w-full border p-2 rounded" placeholder="Deskripsi Lengkap (ID)" value={fullId} onChange={(e) => setFullId(e.target.value)} />
        <textarea className="w-full border p-2 rounded" placeholder="Deskripsi Lengkap (EN)" value={fullEn} onChange={(e) => setFullEn(e.target.value)} />

        <input type="date" className="w-full border p-2 rounded" value={date} onChange={(e) => setDate(e.target.value)} />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Simpan Berita</button>
      </form>
    </div>
  );
}

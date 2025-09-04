"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();

  const [name, setName] = useState({ id: "", en: "" });
  const [description, setDescription] = useState({ id: "", en: "" });
  const [image, setImage] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [kategori,setKategori] = useState("ikan")

  const handleFileUpload = async (e) => {
    if (!e.target.files || !e.target.files[0]) return;
    setFile(e.target.files[0]);

    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    setUploading(true);

    try {
      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setImage(data.url);
    } catch (err) {
      console.error("Upload gagal:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.id || !name.en || !description.id || !description.en || !image) {
      alert("Semua field wajib diisi!");
      return;
    }

    await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, image, kategori }),
    });

    router.push("/admin/products");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Tambah Produk</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nama Produk Bahasa Indonesia */}
        <input
          className="w-full border p-2 rounded"
          placeholder="Nama Produk (ID)"
          value={name.id}
          onChange={(e) => setName({ ...name, id: e.target.value })}
        />

        {/* Nama Produk Bahasa Inggris */}
        <input
          className="w-full border p-2 rounded"
          placeholder="Nama Produk (EN)"
          value={name.en}
          onChange={(e) => setName({ ...name, en: e.target.value })}
        />
        
        {/* URL Gambar */}
        {/* <input
          className="w-full border p-2 rounded"
          placeholder="URL Gambar"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        /> */}
        <p>Masukkan Gambar</p>
        {/* Upload File */}
        <input type="file" accept="image/*" onChange={handleFileUpload} />
        {uploading && <p>Mengunggah file...</p>}

        {/* Deskripsi Bahasa Indonesia */}
        <textarea
          className="w-full border p-2 rounded"
          placeholder="Deskripsi Produk (ID)"
          value={description.id}
          onChange={(e) => setDescription({ ...description, id: e.target.value })}
        />

        {/* Deskripsi Bahasa Inggris */}
        <textarea
          className="w-full border p-2 rounded"
          placeholder="Deskripsi Produk (EN)"
          value={description.en}
          onChange={(e) => setDescription({ ...description, en: e.target.value })}
        />
        {/* Dropdown kategori */}
        <select
          className="w-full border p-2 rounded"
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
        >
          <option value="ikan">Ikan</option>
          <option value="valueadded">Value Added</option>
          <option value="cephalopoda">Cephalopoda</option>
          <option value="udang">Udang</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Simpan Produk
        </button>
      </form>

      {/* Preview Gambar */}
      {image && (
        <div className="mt-4">
          <p className="font-medium">Preview Gambar:</p>
          <img src={image} alt="Preview" className="max-w-full mt-2 rounded" />
        </div>
      )}
    </div>
  );
}

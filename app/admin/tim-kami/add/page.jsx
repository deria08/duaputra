"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTeamPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [position, setPosition] = useState("");
  const [file, setFile] = useState(null);
  const [kategori, setKategori] = useState("dewan");
  const [uploading, setUploading] = useState(false);
  const handleFileUpload = async (e) => {
        if (!e.target.files || !e.target.files[0]) return;
        setFile(e.target.files[0]);

        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        setUploading(true);

        try {
        const res = await fetch("http://localhost:5000/api/upload", {
            method: "POST",
            body: formData, // jangan set Content-Type
        });

        const data = await res.json();
        setImage(data.url); // simpan URL ke state image
        } catch (err) {
        console.error("Upload gagal:", err);
        } finally {
        setUploading(false);
        }
    };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !image || !position || !kategori) {
      alert("Semua field wajib diisi!");
      return;
    }

    await fetch("http://localhost:5000/api/teams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, image, position, kategori }),
    });

    router.push("/admin/tim-kami");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Tambah Anggota Tim</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          placeholder="Nama"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p>Masukkan Gambar</p>
        {/* <input
          className="w-full border p-2 rounded"
          placeholder="URL Gambar"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        /> */}

        {/* Upload file */}
        <input type="file" accept="image/*" onChange={handleFileUpload} />
        {uploading && <p>Mengunggah file...</p>}

        <input
          className="w-full border p-2 rounded"
          placeholder="Posisi"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />

        {/* Dropdown kategori */}
        <select
          className="w-full border p-2 rounded"
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
        >
          <option value="dewan">Dewan</option>
          <option value="manager">Manager</option>
          <option value="other">Other</option>
          <option value="asisten">Asisten</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Simpan
        </button>
      </form>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { handleFileUpload } from "@/utils/HandleFileUpload"; // ✅ import helper upload

export default function AddTeamPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [image, setImage] = useState(""); // ✅ tambahin lagi
  const [position, setPosition] = useState("");
  const [kategori, setKategori] = useState("dewan");
  const [uploading, setUploading] = useState(false); // ✅ biar ada indikator

  const onFileChange = async (e) => {
    setUploading(true);
    const url = await handleFileUpload(e); // ✅ panggil util
    if (url) setImage(url); // ✅ simpan URL Cloudinary ke state
    setUploading(false);
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
        <input type="file" accept="image/*" onChange={onFileChange} />
        {uploading && <p>Mengunggah gambar...</p>}
        {image && (
          <img src={image} alt="Preview" className="mt-2 w-32 rounded shadow" />
        )}

        <input
          className="w-full border p-2 rounded"
          placeholder="Posisi"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />

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

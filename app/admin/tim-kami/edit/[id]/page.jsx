"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditTeamPage() {
  const { id } = useParams();
  const router = useRouter();
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState(null);
  const [position, setPosition] = useState("");
  const [kategori, setKategori] = useState("dewan");
  const [uploading, setUploading] = useState(false);

  // fetch data team by id
  useEffect(() => {
    if (!id) return;
    fetch(`${API_BASE}/api/teams/id/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.name || "");
        setImage(data.image || "");
        setPosition(data.position || "");
        setKategori(data.kategori || "dewan");
      });
  }, [id, API_BASE]);

  // ✅ fungsi upload ada di scope komponen
  const handleFileUpload = async (e) => {
    if (!e.target.files || !e.target.files[0]) return;
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const formData = new FormData();
    formData.append("file", selectedFile);
    setUploading(true);

    try {
      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData, // biarkan fetch atur Content-Type
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

    await fetch(`http://localhost:5000/api/teams/id/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, image, position, kategori }),
    });

    router.push("/admin/tim-kami");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Edit Anggota Tim</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          placeholder="Nama"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <p>Masukkan Gambar</p>
        <input type="file" accept="image/*" onChange={handleFileUpload} />
        {uploading && <p>Mengunggah file...</p>}
        {image && (
        <img
          src={image} // langsung pake URL dari server/Cloudinary
          alt="Preview"
          className="w-40 mt-2 rounded"
        />
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
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
}

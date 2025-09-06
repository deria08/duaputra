"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { handleFileUpload } from "@/utils/HandleFileUpload";

export default function AddProductPage() {
  const router = useRouter();

  const [products, setProducts] = useState({
    name: { id: "", en: "" },
    description: { id: "", en: "" },
    image: "",
    kategori: "ikan",
  });

  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, description, image, kategori } = products;

    if (!name.id || !name.en || !description.id || !description.en || !image) {
      alert("Semua field wajib diisi!");
      return;
    }

    try {
      await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, image, kategori }),
      });
      router.push("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan produk!");
    }
  };

  const handleFileChange = async (e) => {
    setUploading(true);
    const url = await handleFileUpload(e);
    if (url) setProducts({ ...products, image: url });
    setUploading(false);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Tambah Produk</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nama Produk ID */}
        <input
          className="w-full border p-2 rounded"
          placeholder="Nama Produk (ID)"
          value={products.name.id}
          onChange={(e) =>
            setProducts({ ...products, name: { ...products.name, id: e.target.value } })
          }
        />

        {/* Nama Produk EN */}
        <input
          className="w-full border p-2 rounded"
          placeholder="Nama Produk (EN)"
          value={products.name.en}
          onChange={(e) =>
            setProducts({ ...products, name: { ...products.name, en: e.target.value } })
          }
        />

        {/* Upload Gambar */}
        <div>
          <p>Masukkan Gambar</p>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {uploading && <p className="text-sm text-gray-500">Mengupload...</p>}
        </div>

        {/* Deskripsi ID */}
        <textarea
          className="w-full border p-2 rounded"
          placeholder="Deskripsi Produk (ID)"
          value={products.description.id}
          onChange={(e) =>
            setProducts({
              ...products,
              description: { ...products.description, id: e.target.value },
            })
          }
        />

        {/* Deskripsi EN */}
        <textarea
          className="w-full border p-2 rounded"
          placeholder="Deskripsi Produk (EN)"
          value={products.description.en}
          onChange={(e) =>
            setProducts({
              ...products,
              description: { ...products.description, en: e.target.value },
            })
          }
        />

        {/* Dropdown Kategori */}
        <select
          className="w-full border p-2 rounded"
          value={products.kategori}
          onChange={(e) => setProducts({ ...products, kategori: e.target.value })}
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
      {products.image && (
        <div className="mt-4">
          <p className="font-medium">Preview Gambar:</p>
          <img src={products.image} alt="Preview" className="max-w-full mt-2 rounded" />
        </div>
      )}
    </div>
  );
}

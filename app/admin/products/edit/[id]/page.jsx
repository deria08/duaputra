"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { handleFileUpload } from "@/utils/HandleFileUpload";

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: { id: "", en: "" },
    description: { id: "", en: "" },
    image: "",
    kategori: ""
  });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!res.ok) throw new Error("Data produk tidak ditemukan");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProduct();
  }, [id]);

  // const handleFileUpload = async (e) => {
  //   if (!e.target.files || !e.target.files[0]) return;

  //   const selectedFile = e.target.files[0];
  //   setFile(selectedFile);

  //   const formData = new FormData();
  //   formData.append("file", selectedFile);

  //   setUploading(true);
  //   try {
  //     const res = await fetch("http://localhost:5000/api/upload", {
  //       method: "POST",
  //       body: formData,
  //     });
  //     const data = await res.json();
  //     setProduct({ ...product, image: data.url });
  //   } catch (err) {
  //     console.error("Upload gagal:", err);
  //   } finally {
  //     setUploading(false);
  //   }
  // };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    router.push("/admin/products");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Edit Produk</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        {/* Nama Produk ID */}
        <input
          className="w-full border p-2 rounded"
          placeholder="Nama Produk (ID)"
          value={product.name.id}
          onChange={(e) =>
            setProduct({ ...product, name: { ...product.name, id: e.target.value } })
          }
        />

        {/* Nama Produk EN */}
        <input
          className="w-full border p-2 rounded"
          placeholder="Nama Produk (EN)"
          value={product.name.en}
          onChange={(e) =>
            setProduct({ ...product, name: { ...product.name, en: e.target.value } })
          }
        />
        
        {/* URL Gambar */}
        {/* <input
          className="w-full border p-2 rounded"
          value={product.image}
          onChange={(e) => setProduct({ ...product, image: e.target.value })}
          placeholder="URL Gambar"
        /> */}
        <p>Masukkan Gambar</p>
        {/* Upload File */}
        <input
        type="file"
        accept="image/*"
        onChange={(e) => handleFileUpload(e, setProduct)}
      />


        {/* Deskripsi ID */}
        <textarea
          className="w-full border p-2 rounded"
          placeholder="Deskripsi Produk (ID)"
          value={product.description.id}
          onChange={(e) =>
            setProduct({
              ...product,
              description: { ...product.description, id: e.target.value },
            })
          }
        />
        {/* Deskripsi EN */}
        <textarea
          className="w-full border p-2 rounded"
          placeholder="Deskripsi Produk (EN)"
          value={product.description.en}
          onChange={(e) =>
            setProduct({
              ...product,
              description: { ...product.description, en: e.target.value },
            })
          }
        />
                <select
          className="w-full border p-2 rounded"
          value={product.kategori}
          onChange={(e) =>
            setProduct({ ...product, kategori: e.target.value })
          }
        >
          <option value="ikan">Ikan</option>
          <option value="valueadded">Value Added</option>
          <option value="cephalopoda">Cephalopoda</option>
          <option value="udang">Udang</option>
        </select>

        <button
          type="submit"
          className="bg-yellow-600 text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </form>

      {/* Preview Gambar */}
      {product.image && (
        <div className="mt-4">
          <p className="font-medium">Preview Gambar:</p>
          <img
            src={product.image}
            alt="Preview"
            className="max-w-full mt-2 rounded"
          />
        </div>
      )}
    </div>
  );
}

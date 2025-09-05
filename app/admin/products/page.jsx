"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ProductListPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
  fetch("/api/products")
    .then((res) => res.json())
    .then((data) => {
      // kalau backend return { products: [...] }
      setProducts(Array.isArray(data) ? data : data.products || []);
    })
    .catch((err) => console.error(err));
}, []);


  const handleDelete = async (id) => {
    if (!confirm("Apakah Anda yakin ingin menghapus produk ini?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    setProducts(products.filter((item) => item._id !== id));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manajemen Produk</h1>
        <Link
          href="/admin/products/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          + Tambah Produk
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-600">Belum ada produk.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border">Gambar</th>
                <th className="p-3 border">Nama Produk</th>
                <th className="p-3 border">Kategori</th>
                <th className="p-3 border">Deskripsi</th>
                <th className="p-3 border text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="p-3 border">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name?.id}
                        width={80}
                        height={80}
                        className="object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">No Image</span>
                    )}
                  </td>
                  <td className="p-3 border font-medium">{item.name?.id}</td>
                  <td className="p-3 border capitalize">{item.kategori}</td>
                  <td className="p-3 border text-sm text-gray-600">
                    {item.description?.id?.slice(0, 50)}...
                  </td>
                  <td className="p-3 border text-center space-x-2">
                    <Link
                      href={`/admin/products/edit/${item._id}`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function TeamListPage() {
  const [teams, setTeams] = useState([]);

  const fetchTeams = async () => {
    try {
      const res = await fetch("/api/our-teams");
      const data = await res.json();
      setTeams(data);
    } catch (err) {
      console.error("Gagal fetch tim:", err);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Hapus anggota tim ini?")) return;

    await fetch(`/api/our-teams/${id}`, { // ✅ endpoint sesuai App Router
      method: "DELETE",
    });

    setTeams((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manajemen Tim</h1>
      <Link
        href="/admin/tim-kami/add"
        className="bg-blue-600 text-white px-4 py-2 rounded inline-block mb-4"
      >
        + Tambah Anggota
      </Link>

      {teams.length === 0 ? (
        <p>Belum ada data tim.</p>
      ) : (
        <ul className="space-y-4">
          {teams.map((item) => (
            <li
              key={item._id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-600">{item.position}</p>
                <p className="text-xs text-gray-500 italic">{item.kategori}</p>
              </div>
              <div className="flex flex-col space-y-2 items-end">
                <Link
                  href={`/admin/tim-kami/edit/${item._id}`}
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

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function TeamListPage() {
  const [teams, setTeams] = useState([]);

  const fetchTeams = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/teams");
      const data = await res.json();
      setTeams(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Hapus anggota tim ini?")) return;
    await fetch(`http://localhost:5000/api/teams/id/${id}`, {
      method: "DELETE",
    });
    setTeams(teams.filter((item) => item._id !== id));
  };

  const handleMove = async (id, direction) => {
  await fetch(`http://localhost:5000/api/teams/reorder`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, direction }), // kirim ID + arah
  });
  fetchTeams(); // refresh data
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
          {teams.map((item, index) => (
            <li
              key={item._id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-600">{item.position}</p>
                <p className="text-xs text-gray-500 italic">
                  {item.kategori}
                </p>
              </div>
              <div className="flex flex-col space-y-2 items-end">
                <div className="flex space-x-2">
                  {/* Tombol geser */}
                  <button
                    disabled={index === 0}
                    onClick={() => handleMove(item._id, "up")}
                    className="bg-gray-300 px-2 py-1 rounded disabled:opacity-50"
                  >
                    ↑
                  </button>
                  <button
                    disabled={index === teams.length - 1}
                    onClick={() => handleMove(item._id, "down")}
                    className="bg-gray-300 px-2 py-1 rounded disabled:opacity-50"
                  >
                    ↓
                  </button>
                </div>
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

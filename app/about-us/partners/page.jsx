"use client";
import React from "react";
import { useLanguage } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { assets } from "@/assets/assets";
import Image from "next/image";

export default function PartnersClients() {
  const { lang } = useLanguage(); // "id" atau "en"

  return (
    <>
      <Navbar />
      <section className="bg-white text-gray-800 py-16 px-6 pt-40">
        <div className="max-w-6xl mx-auto">
          {/* Judul */}
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-blue-900">
            {lang === "id" ? "Klien & Mitra" : "Clients & Partnership"}
          </h2>

          <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Gambar */}
          <div className="relative w-full aspect-[4/3] md:h-[650px] flex justify-center">
            <Image
              src={assets.clients}
              alt="Manufacturing Partners"
              fill
              className="object-contain rounded-lg shadow-md"
            />
          </div>


          {/* Cold Storage + Deskripsi */}
          <div>
            <h3 className="text-lg font-bold text-blue-900 mb-6 uppercase">
              {lang === "id" ? "Cold Storage" : "Cold Storage"}
            </h3>
            <div className="border border-gray-300 rounded-lg p-4 mb-6">
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>PT CPI Salatiga</li>
                <li>PT Central Pertiwi Bahari</li>
                <li>CV Wahana Berkah Sejahtera</li>
                <li>PT Rama Putra Jaya</li>
                <li>CV Surya Pangan Sejahtera</li>
                <li>CV Gemilang Setia Sejahtera</li>
                <li>PT Sinar Pahala Utama</li>
              </ul>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
              {lang === "id"
                ? "Produk manufaktur yang memenuhi standar tertinggi dalam kualitas, keamanan pangan, persyaratan hukum, keselamatan dan kesehatan lingkungan, sertifikasi halal, serta keberlanjutan."
                : "Manufacturing products that comply with the highest standards of quality, food safety, legal requirements, health and environmental safety, halal certification, and sustainability."}
            </p>
          </div>
        </div>

        </div>
      </section>
      <Footer />
    </>
  );
}

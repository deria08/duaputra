"use client";
import React from "react";
import { useLanguage } from "@/context/AppContext";
import { milestonesData } from "@/assets/assets";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Timeline() {
  const { lang } = useLanguage(); // "id" atau "en"
  const milestones = milestonesData[lang] || milestonesData.en;

  return (
    <>
      <Navbar />
      <div className="bg-white text-gray-700 py-12 px-6 pt-40">
        <div className="max-w-4xl mx-auto">
          {/* Judul */}
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-blue-900 text-left">
            {lang === "id" ? "Tonggak " : "Business "}
            <span className="text-yellow-500">
              {lang === "id" ? "Sejarah" : "Milestone"}
            </span>
          </h2>

          {/* Subjudul */}
          <p className="mb-12 text-gray-600 max-w-2xl">
            <span className="font-semibold">
              {lang === "id" ? "Kompetensi inti:" : "Core competencies:"}
            </span>{" "}
            <br />
            {lang === "id"
              ? "Diversifikasi Produk yang Siap untuk Pertumbuhan Jangka Panjang"
              : "Product Diversification that Well Positioned for Long-Term Growth"}
          </p>

          {/* Timeline */}
          <div className="relative border-l-4 border-blue-900 ml-6">
            {milestones.map((item, index) => (
              <div key={index} className="mb-12 ml-6 relative">
                {/* Titik bulat */}
                <span className="absolute -left-[1.625rem] top-1 w-5 h-5 rounded-full bg-blue-900 border-4 border-white"></span>

                {/* Tahun */}
                <h3 className="text-xl font-bold mb-3 text-blue-900">
                  {item.year}
                </h3>

                {/* Detail */}
                <div className="space-y-2">
                  {item.details.map((detail, i) => (
                    <p
                      key={i}
                      className="relative before:content-['•'] before:text-blue-900 before:mr-2 pl-4"
                    >
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {/* Closing Statement */}
            <p className="text-xl font-bold text-blue-900 mt-8 ml-6">
              {lang === "id"
                ? "Menjadi Perusahaan Perikanan Terkemuka di Dunia."
                : "To be The Leading Fisheries Company In The Worls."}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

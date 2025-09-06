"use client";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/AppContext";
import { useState, useEffect } from "react";

export default function ProductPage() {
  const { lang } = useLanguage();

  // State per kategori
  const [ikan, setIkan] = useState([]);
  const [udang, setUdang] = useState([]);
  const [valueAdded, setValueAdded] = useState([]);
  const [cephalopoda, setCephalopoda] = useState([]);

  useEffect(() => {
  fetch("/api/products/kategori/ikan")
    .then(res => res.json())
    .then(data => setIkan(data));

  fetch("/api/products/kategori/udang")
    .then(res => res.json())
    .then(data => setUdang(data));

  fetch("/api/products/kategori/valueadded")
    .then(res => res.json())
    .then(data => setValueAdded(data));

  fetch("/api/products/kategori/cephalopoda")
    .then(res => res.json())
    .then(data => setCephalopoda(data));
}, [lang]);


  const productSubmenu = [
    { name: lang === "id" ? "Ikan" : "Fish", path: "#ikan" },
    { name: lang === "id" ? "Udang" : "Shrimp", path: "#udang" },
    { name: lang === "id" ? "Makanan Olahan" : "Processed Food", path: "#valueadded" },
    { name: lang === "id" ? "Cephalopoda" : "Cephalopods", path: "#cephalopoda" },
  ];

  // Komponen untuk render tiap kategori
  const ProductSection = ({ id, title, items }) => (
    <section id={id} className="py-16 border-t border-gray-300">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">{title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {items.map((item) => (
          <a
            key={item._id}
            className="group relative block rounded-xl overflow-hidden shadow-md hover:shadow-lg transition"
          >
            {/* Gambar */}
            <Image
              src={item.image}
              alt={item.name[lang]}
              width={600}
              height={400}
              className="w-full h-45 sm:h-52 md:h-64 object-cover transform transition duration-500 group-hover:scale-110"
            />

            {/* Nama Produk */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <h2 className="text-white text-sm sm:text-base md:text-xl font-bold text-center drop-shadow-lg">
                {/* {item.name[lang]} */}
              </h2>
            </div>
          </a>
        ))}
      </div>
      </div>
    </section>
  );

  return (
    <>
      <Navbar submenu={productSubmenu} />

      <section className="py-16 bg-gray-50 pt-40">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            {lang === "id" ? "Produk Kami" : "Our Products"}
          </h1>
        </div>
      </section>

      {/* Render per kategori */}
      <ProductSection
        id="ikan"
        title={lang === "id" ? "Ikan" : "Fish"}
        items={ikan}
      />
      <ProductSection
        id="udang"
        title={lang === "id" ? "Udang" : "Shrimp"}
        items={udang}
      />
      <ProductSection
        id="valueadded"
        title={lang === "id" ? "Makanan Olahan" : "Processed Food"}
        items={valueAdded}
      />
      <ProductSection
        id="cephalopoda"
        title={lang === "id" ? "Cephalopoda" : "Cephalopods"}
        items={cephalopoda}
      />

      <Footer />
    </>
  );
}

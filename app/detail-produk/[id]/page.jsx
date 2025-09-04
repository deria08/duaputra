"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/AppContext";

const ProductDetail = () => {
  const { lang } = useLanguage();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [otherProducts, setOtherProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch produk utama
  useEffect(() => {
    if (!id) return;
    setLoading(true);

    fetch(`http://localhost:5000/api/products/${id}?lang=${lang}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id, lang]);

  // Fetch produk lain
  useEffect(() => {
    fetch(`http://localhost:5000/api/products?lang=${lang}`)
      .then((res) => res.json())
      .then((data) => {
        const others = data.filter((item) => item._id !== id);
        setOtherProducts(others);
      });
  }, [id, lang]);

  if (loading || !product)
    return <p className="p-6 text-center">Loading...</p>;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-32 px-4 sm:px-6 lg:px-12 py-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Konten Utama */}
          <article className="lg:col-span-2 bg-white rounded-xl shadow-sm p-5 sm:p-6">
            {/* Breadcrumb */}
            <nav className="flex flex-wrap items-center text-xs sm:text-sm text-gray-500 mb-4 gap-1">
              <Link href="/" className="hover:text-blue-600">🏠 Home</Link>
              <span>/</span>
              <Link href="/produk" className="hover:text-blue-600">
                {lang === "id" ? "Daftar Produk" : "Product List"}
              </Link>
              <span>/</span>
              <span className="text-gray-800 font-medium">
                {lang === "id" ? "Detail Produk" : "Product Detail"}
              </span>
            </nav>

            <h1 className="text-2xl sm:text-3xl font-bold mb-4 leading-snug">
              {product.name[lang]}
            </h1>

            {/* Gambar Utama */}
            <div className="w-full mb-4 rounded-lg overflow-hidden">
              <Image
                src={`http://localhost:5000${product.image}`}
                alt={product.name[lang]}
                width={1200}
                height={800}
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Deskripsi */}
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {product.description[lang]}
            </p>
          </article>

          {/* Sidebar */}
          <aside className="space-y-4">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 border-b pb-2">
              {lang === "id" ? "Produk Lainnya" : "Other Products"}
            </h2>
            <div className="space-y-3">
              {otherProducts.map((item) => (
                <Link
                  key={item._id}
                  href={`/detail-produk/${item._id}`}
                  className="block bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition"
                >
                  <div className="flex gap-3">
                    <div className="relative w-20 h-14 sm:w-24 sm:h-16 flex-shrink-0 rounded-md overflow-hidden">
                      <Image
                        src={`http://localhost:5000${item.image}`}
                        alt={item.name[lang]}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
                        {item.name[lang]}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-2">
                        {item.description[lang]}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetail;

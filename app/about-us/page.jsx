// app/about-us/page.jsx
"use client";
import { assets } from "@/assets/assets";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useLanguage } from "@/context/AppContext";

export default function TentangKami() {
  const [timDewan, setTimDewan] = useState([]);
  const [timManager, setTimManager] = useState([]);
  const [otherTim, setOtherTim] = useState([]);
  const [timAsisten, setTimAsisten] = useState(null);
  const { lang } = useLanguage();

  useEffect(() => {
  fetch("http://localhost:5000/api/teams/kategori/dewan")
    .then(res => res.json())
    .then(data => setTimDewan(data));

  fetch("http://localhost:5000/api/teams/kategori/manager")
    .then(res => res.json())
    .then(data => setTimManager(data));

  fetch("http://localhost:5000/api/teams/kategori/other")
    .then(res => res.json())
    .then(data => setOtherTim(data));

  fetch("http://localhost:5000/api/teams/kategori/asisten")
    .then(res => res.json())
    .then(data => setTimAsisten(data[0])); // asisten hanya 1 orang
}, []);


  // Submenu khusus untuk page ini
  const aboutSubmenu = [
    { name: lang === "id" ? "Profil": "Profile", path: "#profil" },
    { name: lang === "id" ? "Visi Misi": "Vision Mission", path: "#visi-misi" },
    { name: lang === "id" ? "Tim Kami": "Our Team", path: "#tim" },
  ];

  return (
    <>
      {/* Navbar dengan submenu dinamis */}
      <Navbar submenu={aboutSubmenu} />

            {/* Hero / gambar perusahaan */}
      <section className="relative w-full h-[800px]">
        <Image
          src={assets.gedung} // ganti dengan gambar Anda
          alt="Gedung Perusahaan"
          fill
          className="object-cover"
        />
      </section>
      
       {/* Profil Perusahaan
      <section id="profil" className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {lang === "id" ? "Tentang Kami" : "About Us"}
        </h2>
        {profilPerusahaan.description.map((paragraf, idx) => (
        <p key={idx} className="text-gray-600 mb-3">{paragraf}</p>
        ))}
      </section>

      {/* Visi & Misi */}
      {/* <section id="visi-misi" className="py-16">
        <div className="max-w-5xl mx-auto px-6"> {/* samakan max-w dengan Profil Perusahaan */}
          {/* <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
            {lang === "id" ? "Visi Misi" : "Vision Mission"}
          </h2>
          <div className="space-y-6"> {/* beri jarak antar item */}
            {/* {visiMisi.items.map((item, i) => (
              <div key={i}>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

       {/* Profil Perusahaan */}
      <section id="profil" className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {lang === "id" ? "Tentang Kami" : "About Us"}
        </h2>
        <p className="text-gray-600 mb-3">
          {lang === "id" ? "    Didirikan pada tahun 2025, PT Dua Putra Utama Makmur Tbk (DPUM) adalah perusahaan terkemuka di industri makanan laut beku yang berbasis di Jawa Tengah. Perusahaan berkomitmen untuk menyediakan produk makanan laut beku berkualitas tinggi untuk pasar domestik dan internasional. Dibangun di atas fondasi integritas dan profesionalisme yang kuat, kami mengutamakan kualitas, inovasi, dan layanan terbaik untuk menjadi mitra bisnis tepercaya di industri makanan laut." : 
          "   Founded in 2025, PT Dua Putra Utama Makmur Tbk (DPUM) is a leading company in the frozen seafood industry based in Central Java. The Company is committed to providing high-quality frozen seafood products for domestic and international markets. Built on a strong foundation of integrity and professionalism, we prioritize quality, innovation, and the best service to become a trusted business partner in the seafood industry."}
        </p>
        <p className="text-gray-600 mb-3">
          {lang === "id" ? "  Didukung oleh fasilitas pabrik modern dan penyimpanan dingin berkapasitas besar, PT Dua Putra Utama Makmur mampu memenuhi permintaan pasar secara konsisten, tepat waktu, dan sesuai dengan standar kualitas internasional." : 
          "   Supported by modern factory facilities and large-capacity cold storage, PT Dua Putra Utama Makmur is able to meet market demand consistently, on time, and in accordance with international quality standards."}
        </p>
        <p className="text-gray-600 mb-3">
          {lang === "id" ? "    Kami menyediakan berbagai macam produk makanan laut beku, baik mentah maupun olahan, termasuk: Udang Beku (Nobashi, Vannamei, Black Tiger, Seacaught, Ebifry, Tempura; Cephalopoda Beku (Cumi-cumi, Gurita), Ikan, Makanan Laut dan Akuakultur dan produk olahan Tangkapan Laut dan Siap Saji (produk bernilai tambah). Kami juga menyediakan fasilitas OEM dan label pribadi untuk mitra internasional." : 
          "   We provide a variety of frozen seafood products, both raw and processed, including: Frozen Shimp (Nobashi, Vannamei, Black Tiger, Seacaught, Ebifry, Tempura; Frozen Cephalopods (Squid, Octopus), Fish, Seafood and Aquaculture and sea Caught and Ready-to-eat processed products (value-added products). We also provide OEM and private label facilities for international partners."}
        </p>
        <p className="text-gray-600 mb-3">
          {lang === "id" ? "    Didukung oleh pabrik modern dengan sertifikasi ISO 9001, HACCP, Standar Global BRC, GMP, FDA dan Halal dengan peralatan berteknologi tinggi dan sistem pemrosesan serta penyimpanan dingin berkapasitas besar untuk menjaga kesegaran produk. Proses kontrol kualitas yang ketat dari bahan baku hingga pengemasan." : 
          "   Supported by modern factory with ISO 9001, HACCP, BRC Global Standards, GMP, FDA and Halal certification with High-tech equipment and processing systems and large-capacity cold storage to maintain product freshness. Strict quality control processes from raw materials to packaging."}
        </p>
      </section>

      {/* Visi & Misi */}
      <section id="visi-misi" className="py-16">
        <div className="max-w-5xl mx-auto px-6"> {/* samakan max-w dengan Profil Perusahaan */}
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
            {lang === "id" ? "Visi Misi" : "Vision Mission"}
          </h2>
          <div className="space-y-5"> {/* beri jarak antar item */}
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{lang === "id" ? "PERFORMA YANG BAIK" : "GOOD PERFORMANCE"}</h3>
                <p className="text-gray-600 leading-relaxed">{lang === "id" ? "Kami berkomitmen untuk memproduksi produk yang mengikuti standar Kualitas, Keamanan Pangan, Legal, Kesehatan dan Keamanan Lingkungan, Halal, dan Berkelanjutan." : 
                "We are committed to producing products that comply with Quality, Food Safety, Legal, Health and Environmental Safety, Halal, and Sustainable standards."}</p>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{lang === "id" ? "KINERJA YANG SANGAT BAIK" : "EXCELLENT PERFORMANCE"}</h3>
                <p className="text-gray-600 leading-relaxed">{lang === "id" ? "Kami bergerak maju dengan menerapkan strategi keberlanjutan kami sendiri." : 
                "We are moving forward with implementing our own sustainability strategy."}</p>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{lang === "id" ? "KERJA TIM" : "TEAM WORK"}</h3>
                <p className="text-gray-600 leading-relaxed">{lang === "id" ? "Hubungan kerja yang baik dan saling mendukung dalam segala lini, menjadi faktor penting untuk mewujudkan visi dan misi Perseroan." : 
                "Good work relations and mutual support in all lines, become an important factor for realizing the company's vision and mission."}</p>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{lang === "id" ? "FASILITAS TERBAIK" : "BEST FACILITIES"}</h3>
                <p className="text-gray-600 leading-relaxed">{lang === "id" ? "Teknologi terbaru untuk memaksimalkan kualitas dan efisiensi dalam mengantarkan produk segar dan higienis." : 
                "The latest technology to maximize the quality and efficiency in delivering fresh and hygienic products."}</p>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{lang === "id" ? "ORANG-ORANG YANG LUAR BIASA" : "EXCELLENT PEOPLE"}</h3>
                <p className="text-gray-600 leading-relaxed">{lang === "id" ? "Memberikan pelayanan terbaik dengan karyawan terbaik." : 
                "Providing the best service with the best employees."}</p>
          </div>
        </div>
      </section>


      {/* Tim Kami */}

      {/* Tim Kami */}
<section id="tim"className="py-16">
  <div className="max-w-5xl mx-auto px-6"> {/* samakan max-w dengan Profil & Visi Misi */}
    <h2 className="text-2xl font-bold mb-10 text-gray-800 text-center">{lang === "id" ? "Tim Kami" : "Our Team"}</h2>
    <div className="grid md:grid-cols-3 gap-8"> {/* gap konsisten */}
      {timDewan.map((orang, i) => (
        <div key={i} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
          <Image 
            src={`http://localhost:5000${orang.image}`} 
            alt={orang.name} 
            width={250} 
            height={250} 
            className="rounded-lg shadow-sm mb-4" 
          />
          <h3 className="text-lg font-semibold text-gray-800">{orang.name}</h3>
          <p className="text-blue-600">{orang.position}</p>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Tim Manager */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-10 text-gray-800 text-center">{lang === "id" ? "Manajer" : "Manager"}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {timManager.map((orang, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
                <Image
                  src={`http://localhost:5000${orang.image}`}
                  alt={orang.name}
                  width={250}
                  height={250}
                  className="rounded-lg shadow-sm mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">{orang.name}</h3>
                <p className="text-blue-600">{orang.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tim Lainnya */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-10 text-gray-800 text-center">{lang === "id" ? "Lainnya" : "Other"}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {otherTim.map((orang, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
                <Image 
                  src={`http://localhost:5000${orang.image}`} 
                  alt={orang.name} 
                  width={250} 
                  height={250} 
                  className="rounded-lg shadow-sm mb-4" 
                />
                <h3 className="text-lg font-semibold text-gray-800">{orang.name}</h3>
                <p className="text-blue-600">{orang.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Asisten Manager */}
      {timAsisten && (
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold mb-8 text-gray-800">{timAsisten.position}</h2>
            <Image 
              src={`http://localhost:5000${timAsisten.image}`} 
              alt={timAsisten.name} 
              width={1200} 
              height={600} 
              className="rounded-lg shadow-md mb-6 mx-auto" 
            />
          </div>
        </section>
      )}
      <Footer />
    </>
  );
}
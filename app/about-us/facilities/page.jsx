"use client";

import React from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/AppContext";

export default function FacilitiesTechnologyPage() {
    const {lang}= useLanguage()
  return (
    <>
      <Navbar />
      <div className="bg-white text-gray min-h-screen pt-40 pb-16 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Header Facilities */}
          <div className="mb-12">
            <h1 className="text-2xl md:text-3xl text-blue-900 leading-snug uppercase">
              Facilities & &nbsp;
              <br />
              <span className="font-bold">Infrastructure</span>
            </h1>
          </div>

          {/* Processing Plants Section */}
          <div className="mb-12">
            <h2 className="text-lg md:text-xl uppercase text-blue-900 mb-4">
              Processing <span className="font-bold">Plant</span>
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb:6">
              {lang === "id"
            ? "PT. Dua Putra Utama Makmur Tbk (DPUM) mengoperasikan fasilitas pemrosesan modern yang dirancang untuk menangani berbagai produk makanan laut, termasuk udang, cumi-cumi, gurita, dan ikan. Pabrik-pabrik ini dilengkapi dengan mesin dan teknologi canggih yang meningkatkan efisiensi produksi dan kualitas produk:"
            : "PT. Dua Putra Utama Makmur Tbk (DPUM) operates modern processing facilities designed to handle a variety of seafood products, including shrimp, squid, octopus, and fish. These plants are equipped with advanced machinery and technology that improve production efficiency and product quality:"}
            </p>
          </div>

          {/* Facilities Images */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {[
              { src: assets.fasilitas, alt: "Seafood on conveyor belt in processing plant" },
              { src: assets.fasilitas1, alt: "Blue trays with seafood on conveyor belt" },
              { src: assets.fasilitas2, alt: "Metal detector machine labeled MD 3" },
              { src: assets.fasilitas3, alt: "Worker in yellow protective gear" },
              { src: assets.fasilitas4, alt: "Workers in green protective gear" },
              { src: assets.fasilitas5, alt: "Worker in yellow protective gear checking clipboard" },
            ].map((item, idx) => (
              <div key={idx} className="relative w-full h-60">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover rounded"
                />
              </div>
            ))}
          </div>

          {/* Facilities Text */}
          <div className="text-sm md:text-base text-gray-700 space-y-6 leading-relaxed mb-16">
            <p>
              <strong>{lang=== "id"?"Pengolahan Makanan Laut Mentah:":"Raw Seafood Processing:"}</strong>
              {lang==="id"
              ?" Fasilitas pengolahan makanan laut mentah perusahaan dilengkapi dengan sistem konveyor dan tangki pengumpan berefisiensi tinggi. Proses yang efisien ini meningkatkan produktivitas sekaligus menjaga integritas produk dari penerimaan hingga pengemasan."
              :" The company's raw seafood processing facilities are equipped with high-efficiency conveyor systems and feeder tanks. This streamlined process increases productivity while maintaining product integrity from reception to packaging."}
            </p>
            <p>
              <strong>{lang==="id"?"Pengolahan Makanan Laut Matang:":"Cooked Seafood Processing:"}</strong>
              {lang==="id"
              ?" Fasilitas pengolahan DPUM juga mencakup bagian khusus untuk produk matang, seperti tempura udang dan produk bernilai tambah. Penggunaan mesin masak canggih, peralatan penggorengan, dan Freezer Terowongan IQF (Individual Quick Freezing) memastikan produk dimasak sempurna dan segera dibekukan untuk menjaga kesegarannya."
              :" DPUM's processing facilities also include dedicated sections for cooked products, such as shrimp tempura and value-added items. The use of advanced cooking machines, frying equipment, and IQF (Individual Quick Freezing) Tunnel Freezers ensures that products are cooked to perfection and frozen immediately to lock in freshness." } 
            </p>
            <p>
              <strong>{lang==="id"?"Pengolahan Cephalopoda:":"Cephalopod Processing:"}</strong>
              {lang==="id"
              ?" Fasilitas ini juga menangani pengolahan Cephalopoda, termasuk cumi-cumi dan gurita. Area pemotongan, pemilahan, dan pembersihan khusus ini mempertahankan standar kebersihan dan presisi yang tinggi untuk memenuhi persyaratan pasar internasional."
            :" The facility also handles the processing of cephalopods, including squid and octopus. This dedicated cutting, sorting, and cleaning area maintains high standards of cleanliness and precision to meet international market requirements."} 
            </p>
          </div>

          {/* ================= Technology Section ================= */}

          {/* Advanced Technology Section */}
          <div className="mb-12">
            <h2 className="text-lg md:text-xl uppercase text-blue-900 mb-4">
              Advanced <span className="font-bold">Technology & Equipment</span>
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              {lang==="id"
              ?"PT Dua Putra Utama Makmur Tbk (DPUM) telah berinvestasi besar dalam teknologi pemrosesan dan pembekuan canggih untuk memaksimalkan efisiensi dan memastikan konsistensi produk. Teknologi-teknologi utama meliputi:"
            :"PT. Dua Putra Utama Makmur Tbk (DPUM) has invested heavily in advanced processing and freezing technology to maximize efficiency and ensure product consistency. Key technologies include:"}
            </p>
          </div>

          {/* Technology Images */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-12">
            {[
              { src: assets.techno, alt: "Workers in protective gear operating control panel" },
              { src: assets.techno1, alt: "Workers in protective suits handling boxes" },
              { src: assets.techno2, alt: "Worker in mask and gloves handling seafood" },
            ].map((item, idx) => (
              <div key={idx} className="relative w-full h-60">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover rounded"
                />
              </div>
            ))}
          </div>

          {/* Water Treatment Section */}
          <div className="mb-12">
            <h2 className="text-lg md:text-xl uppercase text-blue-900 mb-4">
              Water <span className="font-bold">Treatment & Waste Management</span>
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-6">
              {lang==="id"
              ?"DPUM berkomitmen terhadap keberlanjutan lingkungan dan telah menerapkan sistem pengelolaan air dan limbah di fasilitasnya:"
              :"DPUM is committed to environmental sustainability and has implemented water and waste management systems at its facilities:"}
            </p>

            {/* WTP */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="relative w-full h-60">
                <Image
                  src={assets.techno3}
                  alt="Water treatment plant"
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div className="sm:col-span-2 text-sm md:text-base text-gray-700 leading-relaxed text-justify">
                <p>
                  <strong>Water Treatment Plant (WTP):</strong>
                  {lang==="id"
                  ?" Untuk memastikan pasokan air bersih untuk proses pengolahan, DPUM mengoperasikan Instalasi Pengolahan Air berbasis filtrasi. Instalasi ini memastikan air yang digunakan dalam proses pengolahan bebas dari kotoran, yang penting untuk menjaga standar kebersihan tertinggi."
                  :" To ensure a clean water supply for processing, DPUM operates a filtration-based Water Treatment Plant. This plant ensures that water used in processing is free of impurities, which is essential for maintaining the highest hygiene standards."
                  }
                </p>
              </div>
            </div>

            {/* WWTP */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2 text-sm md:text-base text-gray-700 leading-relaxed text-justify order-2 sm:order-1">
                <p>
                  <strong>Waste Water Treatment Plant (WWTP):</strong>
                  {lang==="id"
                  ?"DPUM juga telah memasang Instalasi Pengolahan Air Limbah (IPAL) untuk mengolah dan menghilangkan kontaminan dari air limbah yang dihasilkan selama pengolahan makanan laut. Sistem ini memastikan kepatuhan terhadap peraturan lingkungan dan membantu meminimalkan jejak ekologis perusahaan."
                  :"DPUM has also installed a Waste Water Treatment Plant to treat and remove contaminants from the waste water produced during seafood processing. This system ensures compliance with environmental regulations and helps minimize the company’s ecological footprint."} 
                </p>
              </div>
              <div className="relative w-full h-60 order-1 sm:order-2">
                <Image
                  src={assets.techno4}
                  alt="Waste water treatment plant"
                  fill
                  className="object-cover rounded"
                />
              </div>
            </div>
          </div>
          {/* COLD STORAGE */}
          <section>
            <div className="mb-12">
              <h1 className="text-2xl md:text-3xl font-bold text-blue-900 leading-snug">
                Cold Storage <span className="uppercase">Capacity</span>
              </h1>
            </div>

            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-6">
              {lang==="id"
              ?"Salah satu kekuatan utama PT. Dua Putra Utama Makmur Tbk (DPUM) adalah infrastruktur penyimpanan dinginnya yang luas, yang dirancang untuk menjaga kualitas dan kesegaran produk. Fasilitas penyimpanan dingin perusahaan berlokasi strategis di Pati dan Juwana, Jawa Tengah, dengan kapasitas gabungan sebesar 25.000 ton."
              :"One of PT. Dua Putra Utama Makmur Tbk (DPUM)'s core strengths is its extensive cold storage infrastructure, designed to maintain product quality and freshness. The company's cold storage facilities are located strategically in Pati and Juwana, Central Java, with a combined capacity of 25,000 tons."}
            </p>

            {/* Images grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-6">
              <div className="relative w-full h-48">
                <Image
                  src={assets.coldstor}
                  alt="Cold storage interior"
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div className="relative w-full h-48">
                <Image
                  src={assets.coldstor1}
                  alt="Worker in orange jacket checking boxes"
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div className="relative w-full h-48">
                <Image
                  src={assets.coldstor2}
                  alt="Two workers in cold storage"
                  fill
                  className="object-cover rounded"
                />
              </div>
            </div>

            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
              {lang==="id"
              ?"Fasilitas Pati merupakan pusat penyimpanan utama perusahaan, dengan kapasitas penyimpanan dingin sebesar 24.500 ton. Fasilitas ini dilengkapi dengan sistem refrigerasi modern, termasuk teknologi berbasis amonia, yang mempercepat waktu pembekuan sekaligus mengurangi biaya operasional."
              :"The Pati facility is the company's primary storage center, with a cold storage capacity of 24,500 tons. It is equipped with modern refrigeration systems, including ammonia-based technology, which speeds up freezing times while reducing operational costs."}
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-10">
              {lang==="id"
              ?"Logistik Terkendali Suhu: Fasilitas penyimpanan dingin DPUM merupakan bagian integral dari rantai pasokannya, memastikan produk makanan laut tetap berada pada suhu optimal selama pemrosesan, pengemasan, dan transportasi. Infrastruktur ini memungkinkan DPUM memenuhi standar internasional untuk keamanan dan kesegaran produk."
              :"Temperature-Controlled Logistics: DPUM's cold storage facilities are an integral part of its supply chain, ensuring that seafood products are kept at optimal temperatures during processing, packaging, and transportation. This infrastructure allows DPUM to meet international standards for product safety and freshness."}
            </p>

            {/* Logistics */}
            <h3 className="text-lg md:text-xl font-semibold text-blue-900 mb-4 uppercase">
              Logistic
            </h3>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-6">
              {lang==="id"
              ?"Truk kontainer siap dikirim - Proses pemuatan ekspor di pelabuhan/kapal - Label pengiriman dengan negara tujuan."
              :"Container trucks ready for delivery - Export loading process at port/ship - Shipping labels with destination country."}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <div className="relative w-full h-40">
                <Image
                  src={assets.logistic}
                  alt="Container trucks outside warehouse"
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div className="relative w-full h-40">
                <Image
                  src={assets.logistic1}
                  alt="White container truck at night"
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div className="relative w-full h-40">
                <Image
                  src={assets.logistic2}
                  alt="Aerial view of port with shipping containers"
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div className="relative w-full h-40">
                <Image
                  src={assets.logistic3}
                  alt="Cargo ship with shipping containers"
                  fill
                  className="object-cover rounded"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}

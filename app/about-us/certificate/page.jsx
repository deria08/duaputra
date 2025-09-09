"use client";

import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { assets } from "@/assets/assets";

export default function CertificatePage() {
  return (
    <>
      <Navbar />
      <div className="bg-white min-h-screen pt-40 px-4 sm:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-[#0f2f5a] text-3xl sm:text-4xl font-extrabold mb-6 select-none">
            CERTIFICATION
          </h1>

          <div className="bg-gray-100 bg-opacity-90 rounded-md p-4 sm:p-8 space-y-8">
            {/* First Row */}
            <div className="flex flex-col sm:flex-row sm:space-x-8">
              {/* Sidebar List */}
              <div className="flex flex-col space-y-1 text-xs sm:text-sm text-[#0f2f5a] w-full sm:w-48 flex-shrink-0">
                <span>GMP Shrimp</span>
                <span>GMP Value Added</span>
                <span>GMP Cooked Shrimp</span>
                <span>GMP Chepalopod</span>
                <span>GMP Dimersal Fish</span>
                <span>GMP Pelagic Fish</span>
              </div>
              {/* Certificates */}
              <div className="flex-1 grid grid-cols-3 gap-6 text-center text-[10px] sm:text-xs text-[#0f2f5a]">
                {[
                  {
                    no: "01.",
                    title: "Certificate",
                    src: assets.certificate,
                    label: "ISO 9001 : 2015",
                  },
                  {
                    no: "02.",
                    title: "Certificate",
                    src: assets.certificate1,
                    label: "BRC ISSUE 9",
                  },
                  {
                    no: "03.",
                    title: "Certificate",
                    src: assets.certificate2,
                    label: "HALAL MUI",
                  },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-[8px] sm:text-[10px] mb-1 font-semibold">
                      <span>{item.no}</span>
                      <span>{item.title}</span>
                    </div>
                    <Image
                      src={item.src}
                      alt={item.label}
                      width={120}
                      height={160}
                      className="mx-auto"
                    />
                    <div className="mt-1 font-semibold text-gray-600">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Second Row */}
            <div className="flex flex-col sm:flex-row sm:space-x-8">
              {/* Sidebar */}
              <div className="flex flex-col space-y-1 text-xs sm:text-sm text-[#0f2f5a] w-full sm:w-48 flex-shrink-0">
                <span>BPOM Calamari</span>
                <span>BPOM Marugoto</span>
                <span>BPOM Ebi Fry</span>
                <span>BPOM Ebi Fritter</span>
                <span>BPOM Bakso Cumi</span>
                <span>BPOM Nuget Cumi</span>
                <span>BPOM Tahu Bakso Cumi</span>
                <span>BPOM Nuget Udang</span>
                <span>BPOM Rolade Cumi</span>
                <span>BPOM Stick Ikan</span>
              </div>
              {/* Certificates */}
              <div className="flex-1 grid grid-cols-3 gap-6 text-center text-[10px] sm:text-xs text-[#0f2f5a]">
                {[
                  {
                    no: "04.",
                    title: "Certificate",
                    src: assets.certificate5,
                    label: "FDA",
                  },
                  {
                    no: "05.",
                    title: "Certificate",
                    src: assets.certificate3,
                    label: "GMP",
                  },
                  {
                    no: "06.",
                    title: "Certificate",
                    src: assets.certificate4,
                    label: "BPOM",
                  },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-[8px] sm:text-[10px] mb-1 font-semibold">
                      <span>{item.no}</span>
                      <span>{item.title}</span>
                    </div>
                    <Image
                      src={item.src}
                      alt={item.label}
                      width={120}
                      height={160}
                      className="mx-auto"
                    />
                    <div className="mt-1 font-semibold text-[#a3b0c0]">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Third Row */}
            <div className="flex flex-col sm:flex-row sm:space-x-8">
              {/* Sidebar */}
              <div className="flex flex-col space-y-1 text-xs sm:text-sm text-[#0f2f5a] w-full sm:w-48 flex-shrink-0">
                <span>HACCP Shrimp</span>
                <span>HACCP Chepalopod</span>
                <span>HACCP VA</span>
                <span>HACCP Cooked</span>
                <span>HACCP Pelagic Fish</span>
                <span>HACCP Dimersal Fish</span>
              </div>
              {/* Certificates */}
              <div className="flex-1 grid grid-cols-3 gap-6 text-center text-[10px] sm:text-xs text-[#0f2f5a]">
                <div className="col-span-3 sm:col-span-1">
                  <div className="flex justify-between text-[8px] sm:text-[10px] mb-1 font-semibold">
                    <span>07.</span>
                    <span>Certificate</span>
                  </div>
                  <Image
                    src={assets.certificate6}
                    alt="HACCP"
                    width={120}
                    height={160}
                    className="mx-auto"
                  />
                  <div className="mt-1 font-semibold">HACCP</div>
                </div>
                <div className="col-span-3 sm:col-span-2 mt-4 sm:mt-0">
                  <Image
                    src={assets.certificate7}
                    alt="Certificate of Achievement"
                    width={240}
                    height={160}
                    className="mx-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

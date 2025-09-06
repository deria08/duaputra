import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useLanguage } from "@/context/AppContext";

export default function Footer() {
  const {lang} = useLanguage();
  return (
    <div className="w-full">
      {/* Footer Section */}
      <footer className="bg-gradient-to-r from-[#0A1931] to-[#1B1F3B] text-white">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row md:justify-between md:items-start gap-8">
          {/* Logo + Alamat */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start sm:gap-8 w-full md:w-1/2">
        <Image
          src={assets.logo}
          alt="logo"
          width={180}
          height={180}
          className="object-contain mb-4 sm:mb-0"
        />
        <div className="text-sm leading-relaxed max-w-xs text-center sm:text-left">
          <p className="font-bold mb-2">PT. Dua Putra Utama Makmur Tbk.</p>
          <p>
            Jl. Raya Pati - Juwana No.km.7, Dukuh Guyangan, 
            RT 01/RW 05, Purworejo, Pati, Jawa Tengah, 59119
          </p>
        </div>
      </div>


          {/* Menu Links + Contact */}
          <div className="flex flex-col md:flex-row md:gap-10 w-full md:w-1/2 justify-between">
            <div className="flex flex-col gap-3 mb-6 md:mb-0">
              <h4 className="text-white text-lg font-semibold mb-1">{lang === "id" ? "Media Sosial" : "Social Media"}</h4>
              <Link href="https://www.instagram.com/pt.duaputrautamamakmur.tbk" className="hover:underline">
                Instagram
              </Link>
              <Link href="#" className="hover:underline">
                Twitter
              </Link>
              <Link href="/kontak" className="hover:underline">
                Facebook
              </Link>
            </div>
            <div className="flex flex-col gap-3 font-normal text-sm">
              <div>
               <h4 className="text-white text-lg font-semibold mb-3">{lang === "id" ? "Kontak" : "Contact"}</h4>
               <p>Tel: (0295) 4199011</p>
             </div>
              <Link
                href="mailto:marketing@duaputra.co.id"
                className="flex items-center gap-2 hover:underline"
              >marketing@duaputra.co.id
                <i className="fas fa-envelope"></i>
                <span className="font-semibold"></span>
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-[#1B1F3B] text-center text-white text-xs py-3">
          © PT. Dua Putra Utama Makmur Tbk. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

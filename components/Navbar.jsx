"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { useLanguage } from "@/context/AppContext";

const Navbar = ({ submenu = [] }) => {
  const pathname = usePathname();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  const { lang, toggleLang } = useLanguage();

  // halaman transparan
  const isTransparentPage = pathname === "/" || pathname === "/about-us";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowNavbar(currentScrollY <= lastScrollY);
      setLastScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    if (typeof window !== "undefined") {
      const adminFlag = localStorage.getItem("isAdmin") === "true";
      setIsAdmin(adminFlag);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // menu berdasarkan bahasa
  const mainMenus = [
    { name: lang === "id" ? "Beranda" : "Home", path: "/" },
    { name: lang === "id" ? "Tentang Kami" : "About Us", path: "#",
      children: [
      { name: lang === "id" ? "Perjalanan Kami" : "Our Journey", path: "/about-us/journey" },
      { name: lang === "id" ? "Tentang Kami" : "About us", path: "/about-us" },
      // { name: lang === "id" ? "Visi Misi" : "Vision Mission", path: "/about-us/vision-mission" },
      { name: lang === "id" ? "Mitra" : "Partners", path: "/about-us/partners" },
      { name: lang === "id" ? "Sertifikasi" : "Certification", path: "/about-us/certificate" },
      { name: lang === "id" ? "Fasilitas" : "Facilities", path: "/about-us/facilities" },
      
    ],
     },
    { name: lang === "id" ? "Berita" : "News", path: "/berita-list" },
    { name: lang === "id" ? "Produk" : "Products", path: "/produk" },
    { name: lang === "id" ? "Kontak" : "Contact", path: "/kontak" },
  ];
  if (isAdmin) mainMenus.push({ name: "Admin", path: "/admin/news" });

  const isNavColored = !isTransparentPage || isScrolled || isHovered;
  const menuTextClass = isNavColored
    ? "text-white hover:text-yellow-400"
    : "text-white hover:text-yellow-400";
  const logoTextClass = isNavColored ? "text-gray-900" : "text-white";

  return (
    <div
      className="font-sans text-gray-800"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 backdrop-blur-md ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        } ${isNavColored ? "bg-[#1E3A8A] bg-opacity-95 shadow-md" : "bg-transparent"}`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={assets.logoteks}
              alt="logo"
              width={200}
              height={200}
              className="object-contain w-32 sm:w-40 md:w-48 lg:w-60 h-auto"
              priority
            />
            {/* <span
              className={`font-heading font-semibold text-sm md:text-base tracking-wide ${logoTextClass}`}
            >
              PT Dua Putra Utama Makmur Tbk
            </span> */}
            {/* <Image
              src={assets.logoteks1}
              alt="logo"
              width={200}
              height={200}
              className="object-contain"
            /> */}
          </Link>

          {/* Menu Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {/* Tombol Bahasa */}
            <div className="flex gap-2 border rounded-md overflow-hidden">
              <button
                onClick={() => toggleLang("id")}
                className={`px-3 py-1 text-sm ${
                  lang === "id"
                    ? "bg-yellow-400 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                ID
              </button>
              <button
                onClick={() => toggleLang("en")}
                className={`px-3 py-1 text-sm ${
                  lang === "en"
                    ? "bg-yellow-400 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                EN
              </button>
            </div>

            {mainMenus.map((menu) => (
          <div key={menu.path} className="relative group">
            <Link
              href={menu.path}
              className={`font-heading text-sm tracking-wide transition-colors ${
                pathname === menu.path
                  ? "text-yellow-400 font-semibold"
                  : menuTextClass
              }`}
            >
              {menu.name}
            </Link>

            {/* Dropdown */}
            {menu.children && (
              <div className="absolute left-0 top-full mt-2 w-48 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-200">
                {menu.children.map((child) => (
                  <Link
                    key={child.path}
                    href={child.path}
                    className={`block px-4 py-2 text-sm transition-colors
                    ${
                      pathname === child.path
                        ? "text-yellow-400 font-semibold"
                        : "text-gray-700 hover:bg-gray-100 hover:text-[#1E3A8A]"
                    }`}
                  >
                    {child.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

          {/* Tombol Mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 transition-colors ${menuTextClass}`}
          >
            ☰
          </button>
        </div>

       {/* Menu Mobile */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md border-t">
          {/* Tombol Bahasa */}
          <div className="flex gap-2 p-3 border-b">
            <button
              onClick={() => toggleLang("id")}
              className={`px-3 py-1 text-sm rounded ${
                lang === "id"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              ID
            </button>
            <button
              onClick={() => toggleLang("en")}
              className={`px-3 py-1 text-sm rounded ${
                lang === "en"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              EN
            </button>
          </div>

          {/* Menu List */}
          <div className="flex flex-col p-4 gap-2">
            {mainMenus.map((menu) => (
              <div key={menu.path} className="flex flex-col">
                {/* Item utama */}
                <button
                  onClick={() => {
                    if (menu.children) {
                      setOpenMenu(openMenu === menu.path ? null : menu.path);
                    } else {
                      setIsOpen(false);
                    }
                  }}
                  className={`flex justify-between items-center text-left font-heading text-sm py-2 ${
                    pathname === menu.path
                      ? "text-blue-600 font-semibold"
                      : "text-gray-800"
                  }`}
                >
                  <Link href={menu.path} onClick={() => !menu.children && setIsOpen(false)}>
                    {menu.name}
                  </Link>

                  {/* Panah kalau ada submenu */}
                  {menu.children && (
                    <span className={`ml-2 transform transition-transform ${openMenu === menu.path ? "rotate-180" : ""}`}>
                      ▼
                    </span>
                  )}
                </button>

                {/* Submenu (muncul hanya saat diklik) */}
                {menu.children && openMenu === menu.path && (
                  <div className="flex flex-col gap-0 pl-4 border-l border-gray-200">
                    {menu.children.map((child) => (
                      <Link
                        key={child.path}
                        href={child.path}
                        className={`text-sm py-2 ${
                          pathname === child.path
                            ? "text-blue-600 font-semibold"
                            : "text-gray-600 hover:text-blue-600"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      </header>
      {/* Submenu (dinamis dari props) */}
      {submenu.length > 0 && (
          <div
            className={`fixed left-0 w-full border-b z-40 transition-all duration-300 ${
              showNavbar ? "top-[92px]" : "top-0"
            } ${isNavColored ? "bg-[#1E3A8A]" : "bg-transparent"}`}
          >
            <div className="max-w-7xl mx-auto flex gap-8 px-4 py-2 text-xs md:text-sm font-medium uppercase">
              {submenu.map((sub) => (
                <Link
                  key={sub.path}
                  href={sub.path}
                  className={`font-heading transition-colors ${
                    isNavColored ? "text-white hover:text-yellow-400" : "text-white hover:text-yellow-400"
                  }`}
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          </div>
      )}
    </div>
  );
};

export default Navbar;

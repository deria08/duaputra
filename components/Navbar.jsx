// "use client";
// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import Image from "next/image";

// const Navbar = () => {
//   const pathname = usePathname();
//   const [showNavbar, setShowNavbar] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > lastScrollY) {
//         setShowNavbar(false);
//       } else {
//         setShowNavbar(true);
//       }
//       setLastScrollY(window.scrollY);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [lastScrollY]);

//   const mainMenus = [
//     { name: "Beranda", path: "/" },
//     { name: "Berita", path: "/berita-list" },
//     { name: "Produk", path: "/produk" },
//     { name: "Kontak", path: "/kontak" },
//   ];

//   return (
//     <div className="font-sans text-gray-800">
//       {/* Navbar utama */}
//       <header
//         className={`fixed top-0 left-0 w-full bg-white shadow transition-transform duration-300 z-50 ${
//           showNavbar ? "translate-y-0" : "-translate-y-full"
//         }`}
//       >
//         <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
//           {/* Logo */}
//           <div className="flex items-center gap-2">
//             <Link href="/">
//               <Image
//                 src="/logoku.png"
//                 alt="logo"
//                 width={50}
//                 height={50}
//                 className="object-contain"
//               />
//             </Link>
//             <Link href="/" className="font-bold text-blue-600 text-sm md:text-base">
//               PT Dua Putra Utama Makmur Tbk
//             </Link>
//           </div>

//           {/* Menu Desktop */}
//           <nav className="hidden md:flex gap-6">
//             {mainMenus.map((menu) => (
//               <Link
//                 key={menu.path}
//                 href={menu.path}
//                 className={`text-gray-700 font-medium pb-1 transition hover:text-blue-600 hover:border-b-2 hover:border-blue-600 ${
//                   pathname === menu.path
//                     ? "text-blue-600 border-b-2 border-blue-600"
//                     : ""
//                 }`}
//               >
//                 {menu.name}
//               </Link>
//             ))}
//           </nav>

//           {/* Tombol Mobile */}
//           <button
//             onClick={() => setIsOpen(true)}
//             className="md:hidden p-2 text-gray-700 hover:text-blue-600"
//           >
//             ☰
//           </button>
//         </div>
//       </header>

//       {/* Submenu */}
//       <div
//         className={`fixed left-0 pt-1 w-full bg-white border-b z-40 transition-all duration-300 ${
//           showNavbar ? "top-[70px]" : "top-0"
//         }`}
//       >
//         <div className="max-w-6xl mx-auto flex gap-6 px-4 py-2 text-sm font-medium text-gray-600">
//           <Link href="about-us" className="hover:text-blue-600 hover:border-b-2 hover:border-blue-600 pb-1">
//             Tentang Kami
//           </Link>
//           <Link href="#" className="hover:text-blue-600 hover:border-b-2 hover:border-blue-600 pb-1">
//             Lokasi
//           </Link>
//         </div>
//       </div>

//       {/* Offcanvas Mobile Menu */}
//       <div
//         className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
//           isOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         {/* Header Offcanvas */}
//         <div className="flex justify-between items-center p-4 border-b">
//           <span className="font-bold text-lg text-blue-600">Menu</span>
//           <button
//             onClick={() => setIsOpen(false)}
//             className="text-2xl text-gray-600 hover:text-red-500"
//           >
//             ✕
//           </button>
//         </div>

//         {/* List Menu */}
//         <nav className="flex flex-col p-4 space-y-4">
//           {mainMenus.map((menu) => (
//             <Link
//               key={menu.path}
//               href={menu.path}
//               onClick={() => setIsOpen(false)}
//               className={`block text-gray-700 font-medium transition hover:text-blue-600 ${
//                 pathname === menu.path ? "text-blue-600" : ""
//               }`}
//             >
//               {menu.name}
//             </Link>
//           ))}
//         </nav>
//       </div>

//       {/* Background Overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-40 z-40"
//           onClick={() => setIsOpen(false)}
//         ></div>
//       )}
//     </div>
//   );
// };

// export default Navbar;
// components/Navbar.jsx
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
    { name: lang === "id" ? "Tentang Kami" : "About Us", path: "/about-us" },
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
              width={240}
              height={240}
              className="object-contain"
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
              <Link
                key={menu.path}
                href={menu.path}
                className={`font-heading text-sm tracking-wide transition-colors ${
                  pathname === menu.path
                    ? "text-yellow-400 font-semibold"
                    : menuTextClass
                }`}
              >
                {menu.name}
              </Link>
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
            <div className="flex flex-col p-4 gap-3">
              {mainMenus.map((menu) => (
                <Link
                  key={menu.path}
                  href={menu.path}
                  className={`font-heading text-sm ${
                    pathname === menu.path
                      ? "text-blue-600 font-semibold"
                      : "text-gray-800"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {menu.name}
                </Link>
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

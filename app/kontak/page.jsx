"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/AppContext";

export default function Kontak() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { lang } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(e.target);
    const data = {
      nama: formData.get("nama"),
      email: formData.get("email"),
      subjek: formData.get("subjek"),
      pesan: formData.get("pesan"),
    };

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (res.ok) {
        setMessage("Message sent successfully ✅");
        e.target.reset();
      } else {
        setMessage(result.message || "Failed to send message ❌");
      }
    } catch (err) {
      console.error(err);
      setMessage("Terjadi kesalahan server ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-white text-gray-900 font-sans pt-28 pb-8 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6 md:mb-10 text-center md:text-left">
            {lang === "id" ? "Kontak" : "Contact"}
          </h1>

          {/* Wrapper Form & Info */}
          <div className="flex flex-col md:flex-row md:gap-10">
            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-md border border-gray-200 rounded-lg p-4 md:p-6 w-full md:w-1/2 space-y-4 md:space-y-6"
            >
              {/* Nama & Email */}
              <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
                <div className="flex flex-col w-full">
                  <label htmlFor="nama" className="text-sm font-medium text-gray-700 mb-1">
                    {lang === "id" ? "Nama" : "Name"} <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="nama"
                    name="nama"
                    type="text"
                    required
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>

                <div className="flex flex-col w-full">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
              </div>

              {/* Subjek */}
              <div className="flex flex-col">
                <label htmlFor="subjek" className="text-sm font-medium text-gray-700 mb-1">
                  {lang === "id" ? "Subjek" : "Subject"} <span className="text-red-600">*</span>
                </label>
                <input
                  id="subjek"
                  name="subjek"
                  type="text"
                  required
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              {/* Pesan */}
              <div className="flex flex-col">
                <label htmlFor="pesan" className="text-sm font-medium text-gray-700 mb-1">
                  {lang === "id" ? "Pesan" : "Message"} <span className="text-red-600">*</span>
                </label>
                <textarea
                  id="pesan"
                  name="pesan"
                  rows={4}
                  required
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              {/* Tombol Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white justify-center px-4 py-2 rounded-md flex items-center gap-2 shadow-md text-sm md:text-base"
              >
                <i className="fas fa-paper-plane" />
                <span>{loading ? "Sending..." : "Send Message 📩"}</span>
              </button>

              {message && (
                <p className="text-center text-xs md:text-sm mt-2">{message}</p>
              )}
            </form>

            {/* Info Perusahaan */}
            <div className="mt-8 md:mt-0 w-full md:w-1/2 space-y-4 md:space-y-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.282939738735!2d111.08875801098281!3d-6.7352961932327435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e70d32d02257bad%3A0xbfc4a7a957338d9d!2sPT.%20Dua%20Putra%20Utama%20Makmur%20Tbk!5e0!3m2!1sid!2sid!4v1755666317593!5m2!1sid!2sid"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps location of PT DUA PUTRA UTAMA MAKMUR Tbk"
                className="rounded-lg shadow-md"
              />

              <div className="space-y-2 md:space-y-3 text-center md:text-left text-sm md:text-base">
                <div>
                  <p className="font-semibold">{lang === "id" ? "Alamat" : "Address"}</p>
                  <p className="text-gray-700 leading-relaxed">
                    Jl. Raya Pati - Juwana No.km.7, Dukuh Guyangan, RT 01/RW 05,
                    Purworejo, Pati, Jawa Tengah, 59119
                  </p>
                </div>

                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-gray-700">marketing@duaputra.co.id</p>
                </div>

                <div>
                  <p className="font-semibold">{lang === "id" ? "No. Telepon" : "Phone Number"}</p>
                  <p className="text-gray-700">(0295) 4199011</p>
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

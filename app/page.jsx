"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeaderSlider from "@/components/HeaderSlider";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />
      <div>
      <section className="w-full">
        <HeaderSlider />
      </section>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;

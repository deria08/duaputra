"use client";
import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* === Hero Gambar Full Width === */}
      <section className="relative w-full h-[70vh] md:h-[90vh]">
        <Image
          src="/images/goals.png" // simpan gambar di public/images/goals.png
          alt="Company Goals"
          fill
          priority
          className="object-cover"
        />
        {/* Overlay gelap tipis agar teks di navbar tetap terbaca */}
        <div className="absolute inset-0 bg-black/20" />
      </section>

      {/* === Vision & Mission === */}
      <section className="bg-white text-gray-800 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-12 text-center">
            Get To Know <span className="text-gray-900">Our Goals</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Vision */}
            <div>
              <h3 className="text-xl font-bold text-blue-900 mb-3 text-center md:text-left">
                Our Vision
              </h3>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed text-center md:text-left">
                “To deliver the highest quality by becoming a global leader in
                innovative and premium ready-to-eat seafood products, empowered
                by the richness of Indonesia’s marine resources, advanced cold
                chain technology, and strategic global partnerships—providing
                exceptional value and quality to consumers and investors
                worldwide.”
              </p>
            </div>

            {/* Mission */}
            <div>
              <h3 className="text-xl font-bold text-blue-900 mb-3 text-center md:text-left">
                Our Mission
              </h3>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed text-center md:text-left">
                “To provide high-quality, fresh, and convenient ready-to-eat
                seafood products through excellent service, extensive FMCG
                distribution, and an efficient cold chain logistics system to
                satisfy customers around the globe.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* === Way of Work === */}
      <section className="bg-white text-gray-800 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Way of <span className="text-yellow-500">Work</span>
          </h2>
          <p className="text-gray-500 italic mb-8">
            Corporate values / Core principles
          </p>

          <p className="text-gray-700 leading-relaxed mb-10">
            <span className="font-semibold text-blue-900">
              Guidance by Excellence: Our Core Principles
            </span>
            <br />
            As a company engaged in the frozen seafood sector, PT Dua Putra
            Utama Makmur Tbk upholds principles that guide every aspect of our
            business. These principles are the foundation of how we work, serve,
            and grow with our business partners.
          </p>

          {/* Grid Prinsip */}
          <div className="grid md:grid-cols-2 gap-10 text-sm md:text-base">
            {/* 1 */}
              <div>
                <h3 className="font-bold text-blue-900 mb-2">
                  1. Integrity and Transparency
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We believe that trust is key in business. Therefore, we
                  conduct our business with honesty, transparency, and a high
                  work ethic, both in internal and external relationships.
                  Conduct business with honesty and ethical practices.
                </p>
              </div>

              {/* 2 */}
              <div>
                <h3 className="font-bold text-blue-900 mb-2">
                  2. Customer-Focused Excellence
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Customer satisfaction is our top priority. We listen to our
                  partners’ needs and provide the best solutions, prioritizing
                  quality, timeliness, and professional service. Strive to
                  exceed customer expectation in every interaction.
                </p>
              </div>

              {/* 3 */}
              <div>
                <h3 className="font-bold text-blue-900 mb-2">
                  3. Quality Without Compromise
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We are committed to providing fresh, safe, and high-quality
                  frozen seafood products in accordance with national and
                  international standards. Every part of our production process
                  is strictly controlled through a trusted quality management
                  system.
                </p>
              </div>

              {/* 4 */}
              <div>
                <h3 className="font-bold text-blue-900 mb-2">
                  4. Innovation and Adaptability
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We continuously innovate to create value-added products and
                  increase efficiencies in our business processes. We are open
                  to new technologies and fresh ideas that can strengthen our
                  competitiveness in the global market. Embrace change and adapt
                  to market trends.
                </p>
              </div>

              {/* 5 */}
              <div>
                <h3 className="font-bold text-blue-900 mb-2">
                  5. Sustainability and Responsibility
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We uphold the principle of sustainability in managing marine
                  resources. Through partnerships with local fishermen and
                  responsible supply chains, we contribute to preserving the
                  ocean for future generations. Engage in corporate social
                  responsibility initiatives to benefit the community.
                </p>
              </div>

              {/* 6 */}
              <div>
                <h3 className="font-bold text-blue-900 mb-2">
                  6. Employee Empowerment and Growth
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We build a collaborative, professional, and supportive work
                  culture. Our team thrives through continuous training, skills
                  development, and rewards for outstanding performance. Create a
                  supportive environment that encourages personal and
                  professional growth.
                </p>
              </div>

              {/* 7 */}
              <div className="md:col-span-2">
                <h3 className="font-bold text-blue-900 mb-2">
                  7. Partnership Built on Trust
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We build long-term relationships with our partners based on
                  commitment, consistency, and trust. We believe that true
                  success is shared success.
                </p>
              </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

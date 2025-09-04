import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/AppContext";
import { sliderData } from "@/assets/assets";

const HeaderSlider = () => {
  const { lang, toggleLang } = useLanguage(); // PAKAI kurung ()
  console.log("Bahasa sekarang:", lang);
  
  const data = sliderData[lang] || sliderData["id"]; 

  const [currentSlide, setCurrentSlide] = useState(0);
  const [transitionDirection, setTransitionDirection] = useState("next");

  useEffect(() => {
    const interval = setInterval(() => {
      setTransitionDirection("next");
      setCurrentSlide((prev) => (prev + 1) % data.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [data.length]);

  const handlePrev = () => {
    setTransitionDirection("prev");
    setCurrentSlide((prev) =>
      prev === 0 ? data.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setTransitionDirection("next");
    setCurrentSlide((prev) => (prev + 1) % data.length);
  };

  const handleSlideChange = (index) => {
    setTransitionDirection(index > currentSlide ? "next" : "prev");
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900">
      <div className="relative w-full h-full">
        {data.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide
                ? "opacity-100 z-10"
                : "opacity-0 pointer-events-none"
            }`}
          >
            {/* Layout untuk Desktop (split 2) & Mobile (stack) */}
            <div className="flex flex-col md:flex-row w-full h-full">
              {/* Bagian Kiri */}
              <div
                className={`relative w-full md:w-1/2 h-1/2 md:h-full transition-all duration-1000 ease-out ${
                  index === currentSlide
                    ? "translate-x-0 opacity-100"
                    : transitionDirection === "next"
                    ? "-translate-x-full opacity-0"
                    : "translate-x-full opacity-0"
                }`}
              >
                <Image
                  src={slide.leftImg}
                  alt={`Slide ${index + 1} - Kiri`}
                  fill
                  priority={index === currentSlide}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>

                {/* Teks kiri */}
                <div className="absolute inset-0 flex items-center justify-center md:justify-start z-10 px-6 md:px-12">
                  <div className="text-white max-w-lg">
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 md:mb-6 tracking-wide leading-snug md:leading-tight break-words">
                      {slide.title}
                    </h1>
                    <div className="w-16 md:w-20 h-1 bg-white mb-4 md:mb-6"></div>
                    <p className="text-base md:text-lg leading-relaxed">
                      {slide.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bagian Kanan */}
              <div
                className={`relative w-full md:w-1/2 h-1/2 md:h-full transition-all duration-1000 ease-out delay-300 ${
                  index === currentSlide
                    ? "translate-x-0 opacity-100"
                    : transitionDirection === "next"
                    ? "translate-x-full opacity-0"
                    : "-translate-x-full opacity-0"
                }`}
              >
                <Image
                  src={slide.rightImg}
                  alt={`Slide ${index + 1} - Kanan`}
                  fill
                  priority={index === currentSlide}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-black/80 to-transparent"></div>

                {/* Teks kanan */}
                <div className="absolute inset-0 flex items-center justify-center md:justify-end z-10 px-6 md:px-12">
                  <div className="text-white max-w-lg text-center md:text-right">
                    <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-4 md:mb-6 tracking-wide leading-snug md:leading-tight break-words">
                      {slide.productTitle}
                    </h2>
                    <div className="w-16 md:w-20 h-1 bg-white mx-auto md:ml-auto mb-4 md:mb-6"></div>
                    <p className="text-base md:text-lg leading-relaxed">
                      {slide.productDescription}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigasi manual (optional) */}
      <button
        onClick={handlePrev}
        className="hidden md:flex absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-20 transition-all duration-300"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={handleNext}
        className="hidden md:flex absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-20 transition-all duration-300"
      >
        <ChevronRight size={28} />
      </button>

      {/* Indicator */}
      <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-3 z-20">
        {data.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-3 w-3 rounded-full cursor-pointer transition-all duration-300 ${
              currentSlide === index
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;

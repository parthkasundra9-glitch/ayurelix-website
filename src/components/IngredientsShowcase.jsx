import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import saffronImg from "../assets/banner_herbs.jpg";
import turmericImg from "../assets/turmeric.png";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

const slides = [
  {
    title: "THE SECRET OF AYURVEDA",
    subtitle: "Organic Saffron (Kesar)",
    description: "Discover the healing secrets of organic saffron, the precious golden thread of Ayurveda. Celebrated for its legendary skin-brightening, blemish-fading, and cellular-regeneration properties, Saffron restores your natural golden glow.",
    image: saffronImg,
  },
  {
    title: "THE GOLDEN GODDESS",
    subtitle: "Wild Turmeric (Haldi)",
    description: "Unlock the ancient power of turmeric, the 'Golden Goddess' of wellness. Rich in curcumin and anti-inflammatory antioxidants, it promotes a radiant, balanced complexion from the inside out.",
    image: turmericImg,
  }
];

export default function IngredientsShowcase() {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="bg-[#FAF8F5] py-20 px-4 sm:px-6 md:px-8 overflow-hidden relative">
      {/* Background glow decorator */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-[#B89355]/3 blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto z-10 relative text-center">
        
        {/* Five Star rating header */}
        <div className="flex justify-center gap-1 mb-3 text-[#B89355]">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} size={15} />
          ))}
        </div>

        {/* Section Heading */}
        <h2 
          className="text-2xl sm:text-3xl font-black tracking-widest text-[#1A2B49] font-serif uppercase mb-10"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          {slides[active].title}
        </h2>

        {/* Slider Card with layout similar to the screenshot */}
        <div className="relative flex flex-col items-center justify-center">
          
          {/* Left navigation arrow */}
          <button
            onClick={handlePrev}
            className="absolute -left-2 sm:-left-12 top-[40%] -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white hover:bg-[#1A2B49] text-[#1A2B49] hover:text-white border border-[#1A2B49]/10 shadow-sm flex items-center justify-center transition duration-300 cursor-pointer"
            aria-label="Previous Slide"
          >
            <FiChevronLeft size={20} />
          </button>

          {/* Right navigation arrow */}
          <button
            onClick={handleNext}
            className="absolute -right-2 sm:-right-12 top-[40%] -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white hover:bg-[#1A2B49] text-[#1A2B49] hover:text-white border border-[#1A2B49]/10 shadow-sm flex items-center justify-center transition duration-300 cursor-pointer"
            aria-label="Next Slide"
          >
            <FiChevronRight size={20} />
          </button>

          {/* Active slide display */}
          <div className="w-full max-w-2xl bg-white border border-slate-100 rounded-[32px] p-6 shadow-[0_8px_30px_rgba(26,43,73,0.03)] space-y-6">
            
            {/* Image Block */}
            <div className="h-64 sm:h-80 w-full overflow-hidden rounded-[24px] border border-slate-100 relative">
              <AnimatePresence mode="wait">
                <motion.img
                  key={active}
                  src={slides[active].image}
                  alt={slides[active].subtitle}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>

            {/* Slide Text Content */}
            <div className="space-y-3 px-2 sm:px-6">
              <h3 className="text-lg sm:text-xl font-bold font-serif text-[#B89355]" style={{ fontFamily: "'Cinzel', serif" }}>
                {slides[active].subtitle}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 font-medium leading-relaxed max-w-xl mx-auto">
                {slides[active].description}
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <a
                href="/products"
                className="inline-block px-8 py-3 bg-[#1A2B49] hover:bg-[#B89355] text-white text-[10px] font-bold tracking-widest uppercase rounded-xl transition duration-300 shadow-md hover:shadow-lg active:scale-95"
              >
                SIGN ON MORE
              </a>
            </div>
          </div>
        </div>

        {/* Carousel indicators dots */}
        <div className="flex justify-center gap-2 mt-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                index === active ? "w-6 bg-[#B89355]" : "w-1.5 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import sliderAyurelixProducts from "../assets/slider_ayurelix_products.jpg";
import sliderSaffron from "../assets/slider_saffron.jpg";
import sliderLavenderFloral from "../assets/slider_lavender_floral.jpg";

const slides = [
  {
    id: 1,
    title: "Premium Ayurvedic Skincare",
    subtitle: "Pure Botanical Formulations",
    description: "Discover our handcrafted range of face pack remedies, hair oils, and serums derived from ancient scriptures and modern science.",
    cta: "Explore Shop",
    image: sliderAyurelixProducts,
    align: "left",
    badge: "100% Organic & Handcrafted",
    accentColor: "#B89355"
  },
  {
    id: 2,
    title: "Natural Skin Rejuvenation",
    subtitle: "Authentic Saffron & Kumkumadi",
    description: "Infused with pure Kashmiri Saffron and Sandalwood to reduce fine lines, erase blemishes, and reveal your skin's inner radiance.",
    cta: "View Serum",
    image: sliderSaffron,
    align: "right",
    badge: "Pure Saffron Elixir",
    accentColor: "#9E2A2B"
  },
  {
    id: 3,
    title: "Ancient Beauty Secrets",
    subtitle: "Pure Botanical Wellness",
    description: "Crafted with pure herbal extracts, Neem, Lodhra, and Turmeric to combat pigmentation, acne scars, and restore balanced skin tone.",
    cta: "Shop Herbal Care",
    image: sliderLavenderFloral,
    align: "center",
    badge: "Herbal & Chemical Free",
    accentColor: "#6B46C1"
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(timer);
  }, [current]);

  const handleNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleDotClick = (index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const handleScrollToProducts = () => {
    const section = document.getElementById("featured-products-section") || document.getElementById("category-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Slide animation variants
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir) => ({
      x: dir < 0 ? "100%" : "-100%",
      opacity: 0
    })
  };

  const activeSlide = slides[current];

  return (
    <section className="relative w-full h-[340px] sm:h-[480px] md:h-[580px] lg:h-[640px] overflow-hidden bg-[#FAF8F5] mt-[56px] lg:mt-[140px] select-none">
      
      {/* Main Slider Track */}
      <div className="relative w-full h-full">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Background High-Res Image */}
            <div className="relative w-full h-full overflow-hidden">
              <img
                src={activeSlide.image}
                alt={activeSlide.title}
                className="w-full h-full object-cover object-center transform scale-100 transition-transform duration-1000 ease-out"
                style={{ imageRendering: "high-quality" }}
                loading="eager"
              />

              {/* Layout-specific gradient overlays for optimal text contrast and sharpness */}
              {activeSlide.align === "left" && (
                <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5]/90 via-[#FAF8F5]/50 to-transparent md:w-3/5 pointer-events-none" />
              )}
              {activeSlide.align === "right" && (
                <div className="absolute inset-0 bg-gradient-to-l from-[#FAF8F5]/90 via-[#FAF8F5]/50 to-transparent md:left-2/5 pointer-events-none" />
              )}
              {activeSlide.align === "center" && (
                <div className="absolute inset-0 bg-radial from-[#FAF8F5]/80 via-[#FAF8F5]/30 to-transparent pointer-events-none" />
              )}
              
              {/* Soft overlay on mobile screens for full readability */}
              <div className="absolute inset-0 bg-white/40 md:bg-transparent pointer-events-none" />
            </div>

            {/* Slide Text & CTA Overlay */}
            <div className="absolute inset-0 max-w-7xl mx-auto px-6 sm:px-12 md:px-16 flex flex-col justify-center z-20">
              <div
                className={`max-w-xl flex flex-col space-y-3 sm:space-y-5 ${
                  activeSlide.align === "right"
                    ? "items-end text-right ml-auto"
                    : activeSlide.align === "center"
                    ? "items-center text-center mx-auto max-w-2xl"
                    : "items-start text-left"
                }`}
              >
                {/* Badge Tag */}
                <motion.span
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                  className="inline-block px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase bg-[#B89355]/15 text-[#B89355] border border-[#B89355]/30 backdrop-blur-sm"
                >
                  {activeSlide.subtitle}
                </motion.span>

                {/* Main Heading */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.5 }}
                  className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-serif tracking-wide leading-tight text-[#1A2B49] drop-shadow-sm"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {activeSlide.title}
                </motion.h1>

                {/* Description Text */}
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.5 }}
                  className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed font-sans max-w-md sm:max-w-lg font-medium"
                >
                  {activeSlide.description}
                </motion.p>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.5 }}
                  className="pt-2"
                >
                  <button
                    onClick={handleScrollToProducts}
                    className="px-6 py-2.5 sm:px-8 sm:py-3.5 rounded-full bg-[#B89355] hover:bg-[#1A2B49] text-white font-bold tracking-wider text-xs sm:text-sm shadow-md hover:shadow-xl transition-all duration-300 uppercase cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    {activeSlide.cta}
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrow Controls */}
      <button
        onClick={handlePrev}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-white/70 hover:bg-[#B89355] text-[#1A2B49] hover:text-white shadow-md backdrop-blur-md transition-all duration-300 border border-white/60 hover:border-[#B89355] hover:scale-110 active:scale-95 cursor-pointer"
        aria-label="Previous Slide"
      >
        <FiChevronLeft size={22} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-white/70 hover:bg-[#B89355] text-[#1A2B49] hover:text-white shadow-md backdrop-blur-md transition-all duration-300 border border-white/60 hover:border-[#B89355] hover:scale-110 active:scale-95 cursor-pointer"
        aria-label="Next Slide"
      >
        <FiChevronRight size={22} />
      </button>

      {/* Dots Indicator Navigation */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex gap-2.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer shadow-sm ${
              index === current ? "w-8 bg-[#B89355]" : "w-2.5 bg-gray-400/50 hover:bg-gray-600/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}


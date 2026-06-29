import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import premiumSkincare from "../assets/premium_skincare.png";
import ancientBeauty from "../assets/ancient_beauty.png";
import glowingSkin from "../assets/glowing_skin.jpg";
import kumkumadiSerum from "../assets/kumkumadi_serum.jpg";

const slides = [
  {
    id: 1,
    title: "Premium Ayurvedic Skincare",
    subtitle: "Pure Botanical Formulations",
    description: "Discover our handcrafted range of face pack remedies and serums derived from ancient scriptures and modern science.",
    cta: "Explore Shop",
    image: premiumSkincare,
    align: "right",
    layout: "full"
  },
  {
    id: 2,
    title: "Natural Skin Rejuvenation",
    subtitle: "Authentic Kumkumadi Oil",
    description: "Infused with pure Saffron and Sandalwood to reduce fine lines, erase blemishes, and reveal your skin's inner radiance.",
    cta: "View Serum",
    image: kumkumadiSerum,
    align: "left",
    layout: "split"
  },
  {
    id: 3,
    title: "Ancient Beauty Secrets",
    subtitle: "Pure Organic Face Pack",
    description: "Crafted with Lodhra, Neem, and Turmeric to combat pigmentation, acne scars, and restore clean, balanced skin tone.",
    cta: "View Cream",
    image: ancientBeauty,
    align: "left",
    layout: "split"
  },
  {
    id: 4,
    title: "Healthy Glowing Skin",
    subtitle: "Daily Skincare Rituals",
    description: "Transform your daily skincare routine with chemical-free formulations safe for all skin types. 100% natural, active wellness.",
    cta: "Shop Now",
    image: glowingSkin,
    align: "left",
    layout: "split"
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 4000);
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
    const section = document.getElementById("featured-products-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Variants for slide transition animation
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

  return (
    <section className="relative w-full h-[280px] sm:h-[450px] md:h-[650px] overflow-hidden bg-[#FAF8F5] mt-16 md:mt-20">
      
      {/* Slider Slides Container */}
      <div className="relative w-full h-full">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            {slides[current].layout === "split" ? (
              <div className="w-full h-full flex flex-col md:flex-row relative">
                {/* Text Content (Left on Desktop, Overlay on Mobile) */}
                <div className="absolute inset-0 md:relative md:w-1/2 h-full z-20 flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-24 text-white md:text-[#1A2B49] bg-black/60 md:bg-[#FAF8F5]">
                  <div className="max-w-xl space-y-2 md:space-y-6 flex flex-col items-start text-left">
                    <motion.span
                      initial={{ opacity: 0, y: -15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.25em] text-[#D3B685] md:text-[#B89355] uppercase block"
                    >
                      {slides[current].subtitle}
                    </motion.span>
                    <motion.h1
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-serif tracking-wide leading-tight text-white md:text-[#1A2B49]"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      {slides[current].title}
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-[10px] sm:text-sm md:text-base text-white/90 md:text-gray-600 leading-relaxed font-sans max-w-[260px] sm:max-w-md"
                    >
                      {slides[current].description}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <button
                        onClick={handleScrollToProducts}
                        className="px-4 py-2 sm:px-8 sm:py-4 rounded-full bg-[#B89355] hover:bg-[#1A2B49] text-white font-bold tracking-wider text-[10px] sm:text-xs md:text-sm shadow-lg hover:shadow-xl transition-all duration-300 uppercase cursor-pointer"
                      >
                        {slides[current].cta}
                      </button>
                    </motion.div>
                  </div>
                </div>

                {/* Image (Right on Desktop, Background on Mobile) */}
                <div className="absolute inset-0 md:relative md:w-1/2 h-full z-0 md:z-10 overflow-hidden">
                  <img
                    src={slides[current].image}
                    alt={slides[current].title}
                    className="w-full h-full object-cover object-center contrast-[1.04] saturate-[1.02] brightness-[1.01]"
                  />
                  {/* Subtle right-to-left gradient on desktop to blend the edge of the image */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5]/40 via-transparent to-transparent md:block hidden z-10 pointer-events-none" />
                </div>
              </div>
            ) : (
              /* Full Bleed Standard Layout (For Slide 1 and Slide 2) */
              <div className="relative w-full h-full">
                <img
                  src={slides[current].image}
                  alt={slides[current].title}
                  className="w-full h-full object-cover object-center contrast-[1.04] saturate-[1.02] brightness-[1.01]"
                />
                <div className={`absolute inset-0 bg-gradient-to-${slides[current].align === "right" ? "l" : "r"} from-black/50 via-black/20 to-transparent max-md:bg-black/60 z-10`} />

                <div className={`absolute inset-0 max-w-7xl mx-auto px-4 sm:px-8 md:px-12 flex flex-col justify-center ${slides[current].align === "right" ? "items-end" : "items-start"} z-20 text-white select-none`}>
                  <div className={`max-w-xl space-y-2 md:space-y-6 flex flex-col ${slides[current].align === "right" ? "items-end text-right" : "items-start text-left"}`}>
                    <motion.span
                      initial={{ opacity: 0, y: -15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.25em] text-[#D3B685] uppercase block"
                    >
                      {slides[current].subtitle}
                    </motion.span>
                    <motion.h1
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xl sm:text-4xl md:text-6xl font-black font-serif tracking-wide leading-tight"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      {slides[current].title}
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-[10px] sm:text-sm md:text-base text-white/95 leading-relaxed font-sans max-w-[260px] sm:max-w-md"
                    >
                      {slides[current].description}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <button
                        onClick={handleScrollToProducts}
                        className="px-4 py-2 sm:px-8 sm:py-4 rounded-full bg-[#B89355] hover:bg-[#1A2B49] text-white font-bold tracking-wider text-[10px] sm:text-xs md:text-sm shadow-lg hover:shadow-xl transition-all duration-300 uppercase cursor-pointer"
                      >
                        {slides[current].cta}
                      </button>
                    </motion.div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrow Controls */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition border border-white/10 hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Previous Slide"
      >
        <FiChevronLeft size={20} className="md:w-6 md:h-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition border border-white/10 hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Next Slide"
      >
        <FiChevronRight size={20} className="md:w-6 md:h-6" />
      </button>

      {/* Dots Indicator Navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              index === current ? "w-8 bg-[#B89355]" : "w-2 bg-white/50 hover:bg-white"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

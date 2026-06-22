import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import bannerHerbs from "../assets/banner_herbs.jpg";

const slides = [
  {
    id: 1,
    title: "Premium Ayurvedic Skincare",
    subtitle: "Pure Botanical Formulations",
    description: "Discover our handcrafted range of face pack remedies and serums derived from ancient scriptures and modern science.",
    cta: "Explore Shop",
    image: bannerHerbs,
    align: "right"
  },
  {
    id: 2,
    title: "Natural Skin Rejuvenation",
    subtitle: "Authentic Kumkumadi Oil",
    description: "Infused with pure Saffron and Sandalwood to reduce fine lines, erase blemishes, and reveal your skin's inner radiance.",
    cta: "View Serum",
    image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=1600&auto=format&fit=crop",
    align: "left"
  },
  {
    id: 3,
    title: "Ancient Beauty Secrets",
    subtitle: "Pure Organic Face Pack",
    description: "Crafted with Lodhra, Neem, and Turmeric to combat pigmentation, acne scars, and restore clean, balanced skin tone.",
    cta: "View Cream",
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=1600&auto=format&fit=crop",
    align: "left"
  },
  {
    id: 4,
    title: "Healthy Glowing Skin",
    subtitle: "Daily Skincare Rituals",
    description: "Transform your daily skincare routine with chemical-free formulations safe for all skin types. 100% natural, active wellness.",
    cta: "Shop Now",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1600&auto=format&fit=crop",
    align: "left"
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
    <section className="relative w-full h-[450px] md:h-[650px] overflow-hidden bg-[#FAF8F5] mt-16 md:mt-20">
      
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
            {/* Background Image */}
            <img
              src={slides[current].image}
              alt={slides[current].title}
              className="w-full h-full object-cover object-center"
            />
            {/* Ambient Overlay to make text legible */}
            <div className={`absolute inset-0 bg-gradient-to-${slides[current].align === "right" ? "l" : "r"} from-black/50 via-black/20 to-transparent max-md:bg-black/60 z-10`} />

            {/* Content Card Panel */}
            <div className={`absolute inset-0 max-w-7xl mx-auto px-6 sm:px-8 md:px-12 flex flex-col justify-center ${slides[current].align === "right" ? "items-end" : "items-start"} z-20 text-white select-none`}>
              <div className={`max-w-xl space-y-4 md:space-y-6 flex flex-col ${slides[current].align === "right" ? "items-end text-right" : "items-start text-left"}`}>
                <motion.span
                  initial={{ opacity: 0, y: -15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xs sm:text-sm font-bold tracking-[0.25em] text-[#D3B685] uppercase block"
                >
                  {slides[current].subtitle}
                </motion.span>
                <motion.h1
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl sm:text-5xl md:text-6xl font-black font-serif tracking-wide leading-tight"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {slides[current].title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xs sm:text-base text-white/95 leading-relaxed font-sans max-w-md"
                >
                  {slides[current].description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <button
                    onClick={handleScrollToProducts}
                    className="px-6 py-3 md:px-8 md:py-4 rounded-full bg-[#B89355] hover:bg-[#3C5A44] text-white font-bold tracking-wider text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all duration-300 uppercase cursor-pointer"
                  >
                    {slides[current].cta}
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

import React, { useRef } from "react";
import { motion } from "framer-motion";
import saffronImg from "../assets/banner_herbs.jpg";
import turmericImg from "../assets/turmeric.png";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const ingredients = [
  {
    name: "Saffron",
    sanskrit: "Crocus sativus",
    description: "The precious golden thread of Ayurveda, Saffron is the star botanical of Kumkumadi Oil, celebrated for its legendary skin-brightening and complexion-evening properties.",
    benefits: ["Fades dark spots, blemishes, & pigmentation", "Rich in carotenoids and powerful antioxidants", "Enhances cell regeneration for a youthful glow"],
    image: saffronImg,
    glowColor: "group-hover:shadow-[0_0_30px_rgba(197,160,89,0.15)]"
  },
  {
    name: "Turmeric",
    sanskrit: "Curcuma longa",
    description: "The 'Golden Goddess' of Ayurveda, turmeric contains curcumin, a compound with scientifically proven antioxidant and anti-inflammatory properties.",
    benefits: ["Supports joint comfort, mobility, & cellular health", "Promotes radiant, clear skin from the inside out", "Supports digestive efficiency and liver detoxification"],
    image: turmericImg,
    glowColor: "group-hover:shadow-[0_0_30px_rgba(230,193,115,0.15)]"
  }
];

export default function IngredientsShowcase() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollAmount = direction === "left" ? -380 : 380;
      scrollRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="bg-white py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto overflow-hidden relative">
      {/* Decorative background blur */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#B89355]/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">
        {/* Header Info */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#B89355] uppercase tracking-[0.25em] text-xs font-bold block mb-3"
          >
            Botanical Intelligence
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1A2B49] font-serif mb-6"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            The Alchemy of Ayurveda
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed"
          >
            We extract the potent life force of active botanicals, ethically sourced and scientifically validated, to restore balance to your modern life.
          </motion.p>
        </div>

        {/* Slidable Carousel Wrapper */}
        <div className="relative group max-w-5xl mx-auto">
          {/* Left Arrow Button */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#FAF8F5] hover:bg-[#1A2B49] text-[#1A2B49] hover:text-white border border-[#1A2B49]/10 shadow-lg flex items-center justify-center transition duration-300 opacity-0 group-hover:opacity-100 max-md:opacity-100 cursor-pointer"
            aria-label="Scroll Left"
          >
            <FiChevronLeft size={20} />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#FAF8F5] hover:bg-[#1A2B49] text-[#1A2B49] hover:text-white border border-[#1A2B49]/10 shadow-lg flex items-center justify-center transition duration-300 opacity-0 group-hover:opacity-100 max-md:opacity-100 cursor-pointer"
            aria-label="Scroll Right"
          >
            <FiChevronRight size={20} />
          </button>

          {/* Cards Container */}
          <div
            ref={scrollRef}
            className={`flex gap-8 overflow-x-auto scrollbar-none scroll-smooth py-4 px-2 justify-start ${
              ingredients.length <= 2 ? "md:justify-center" : "md:justify-start"
            }`}
          >
            {ingredients.map((ing, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                className="w-[280px] sm:w-[320px] shrink-0 bg-[#fbf9f4] border border-[#1A2B49]/5 rounded-3xl overflow-hidden group hover:border-[#B89355]/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(14,26,48,0.06)] flex flex-col justify-between"
              >
                {/* Image Container */}
                <div className="h-64 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#fbf9f4] via-transparent to-transparent z-10 opacity-70" />
                  <img
                    src={ing.image}
                    alt={ing.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute bottom-4 left-6 z-20">
                    <span className="text-[10px] text-[#B89355] uppercase font-bold tracking-[0.2em] bg-white/95 px-3 py-1 rounded-full border border-[#B89355]/25 shadow-sm">
                      {ing.sanskrit}
                    </span>
                  </div>
                </div>

                {/* Text Container */}
                <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold font-serif text-[#1A2B49] mb-3">
                      {ing.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                      {ing.description}
                    </p>
                  </div>

                  <div className="border-t border-[#1A2B49]/5 pt-4 space-y-2.5">
                    <h4 className="text-xs font-bold text-[#B89355] uppercase tracking-wider">Key Wellness Actions:</h4>
                    {ing.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-gray-600">
                        <span className="text-[#B89355] mt-0.5">•</span>
                        <span className="leading-relaxed">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

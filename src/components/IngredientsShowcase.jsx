import React from "react";
import { motion } from "framer-motion";
import saffronImg from "../assets/banner_herbs.jpg";
import turmericImg from "../assets/turmeric.png";

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
  return (
    <section className="py-6 w-full relative">
      <div className="z-10 relative">
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
            className="text-3xl sm:text-4xl font-black text-[#3C5A44] font-serif mb-6"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            The Alchemy of Ayurveda
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-600 text-sm max-w-sm mx-auto leading-relaxed"
          >
            We extract the potent life force of active botanicals, ethically sourced and scientifically validated, to restore balance to your modern life.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-6 max-w-md mx-auto">
          {ingredients.map((ing, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className="bg-[#fbf9f4] border border-[#3C5A44]/5 rounded-3xl overflow-hidden group hover:border-[#B89355]/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(14,26,48,0.06)] flex flex-col justify-between"
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
                  <h3 className="text-2xl font-bold font-serif text-[#3C5A44] mb-3">
                    {ing.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {ing.description}
                  </p>
                </div>

                <div className="border-t border-[#3C5A44]/5 pt-4 space-y-2.5">
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
    </section>
  );
}

import React from "react";
import { motion } from "framer-motion";
import ashwagandhaImg from "../assets/ashwagandha.png";
import turmericImg from "../assets/turmeric.png";
import gotukolaImg from "../assets/gotu_kola.png";

const ingredients = [
  {
    name: "Ashwagandha",
    sanskrit: "Withania somnifera",
    description: "Known as 'Indian Ginseng', this powerful adaptogen has been used for over 3,000 years to relieve stress, increase energy levels, and improve concentration.",
    benefits: ["Calms the nervous system & lowers cortisol", "Enhances strength, stamina, & physical recovery", "Supports cognitive function and memory recall"],
    image: ashwagandhaImg,
    glowColor: "group-hover:shadow-[0_0_30px_rgba(197,160,89,0.15)]"
  },
  {
    name: "Turmeric",
    sanskrit: "Curcuma longa",
    description: "The 'Golden Goddess' of Ayurveda, turmeric contains curcumin, a compound with scientifically proven antioxidant and anti-inflammatory properties.",
    benefits: ["Supports joint comfort, mobility, & cellular health", "Promotes radiant, clear skin from the inside out", "Supports digestive efficiency and liver detoxification"],
    image: turmericImg,
    glowColor: "group-hover:shadow-[0_0_30px_rgba(230,193,115,0.15)]"
  },
  {
    name: "Gotu Kola",
    sanskrit: "Centella asiatica",
    description: "Revered as the 'Herb of Longevity' and 'Student Herb', it is celebrated for its capacity to revitalize brain cells and support skin microcirculation.",
    benefits: ["Sharpens mental focus and concentration", "Supports natural collagen synthesis & tissue repair", "Promotes healthy, stress-free capillary circulation"],
    image: gotukolaImg,
    glowColor: "group-hover:shadow-[0_0_30px_rgba(72,187,120,0.15)]"
  }
];

export default function IngredientsShowcase() {
  return (
    <section className="bg-white py-24 px-8 relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#c5a059]/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#c5a059] uppercase tracking-[0.25em] text-xs font-bold block mb-3"
          >
            Botanical Intelligence
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-black text-[#0e1a30] font-serif mb-6"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            The Alchemy of Ayurveda
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            We extract the potent life force of active botanicals, ethically sourced and scientifically validated, to restore balance to your modern life.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {ingredients.map((ing, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className="bg-[#fbf9f4] border border-[#0e1a30]/5 rounded-3xl overflow-hidden group hover:border-[#c5a059]/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(14,26,48,0.06)] flex flex-col justify-between"
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
                  <span className="text-[10px] text-[#c5a059] uppercase font-bold tracking-[0.2em] bg-white/95 px-3 py-1 rounded-full border border-[#c5a059]/25 shadow-sm">
                    {ing.sanskrit}
                  </span>
                </div>
              </div>

              {/* Text Container */}
              <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold font-serif text-[#0e1a30] mb-3">
                    {ing.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {ing.description}
                  </p>
                </div>

                <div className="border-t border-[#0e1a30]/5 pt-4 space-y-2.5">
                  <h4 className="text-xs font-bold text-[#c5a059] uppercase tracking-wider">Key Wellness Actions:</h4>
                  {ing.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-gray-600">
                      <span className="text-[#c5a059] mt-0.5">•</span>
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

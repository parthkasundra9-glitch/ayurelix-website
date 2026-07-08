import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { FiCheck } from "react-icons/fi";

const testimonials = [
  {
    id: 1,
    name: "Aarav Mehta",
    role: "Verified Buyer",
    rating: 5,
    text: "The Kumkumadi Oil is absolute magic! My pigmentation and dark spots faded visibly within just two weeks of daily night use. My skin feels incredibly smooth and naturally radiant.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Ananya Sen",
    role: "Skincare Enthusiast",
    rating: 5,
    text: "The Anti Pigmentation Cream is cooling, soothing, and highly effective. It has drastically reduced my acne scars and balances oil production. Truly feels like a luxury spa experience at home.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Rohan Nair",
    role: "Daily Ritual User",
    rating: 5,
    text: "I love that Ayurelix formulations are completely chemical-free. It's safe for my highly sensitive skin and leaves a rich, soothing herbal aroma. My daily skin routine is finally complete.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop"
  }
];

export default function CustomerReviews() {
  return (
    <section className="bg-[#FAF8F5] py-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto overflow-hidden relative">
      
      {/* Background glow decorator */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#B89355]/3 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative space-y-12">
        
        {/* Header */}
        <div className="text-center">
          <span className="text-[#B89355] uppercase tracking-[0.25em] text-xs font-black block mb-3">
            Real Experiences
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
            Loved By Our Community
          </h2>
        </div>

        {/* Responsive Testimonials Grid with Horizontal Scroll on Mobile */}
        <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 scrollbar-none snap-x snap-mandatory">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="w-[285px] md:w-full shrink-0 snap-center bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-[0_4px_20px_rgba(26,43,73,0.02)] hover:shadow-[0_12px_40px_rgba(26,43,73,0.05)] transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Header: Profile & Checkmark */}
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border border-[#B89355]/20 shadow-sm shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-[#1A2B49] font-serif">{t.name}</h4>
                      {/* Verified Buyer Checkmark Badge */}
                      <span className="p-0.5 bg-blue-500 text-white rounded-full flex items-center justify-center text-[8px]" title="Verified Buyer">
                        <FiCheck strokeWidth={3} />
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase">{t.role}</p>
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="flex gap-0.5 text-[#B89355]">
                  {[...Array(t.rating)].map((_, i) => (
                    <FaStar key={i} size={13} />
                  ))}
                </div>

                {/* Quote review text */}
                <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed italic">
                  "{t.text}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

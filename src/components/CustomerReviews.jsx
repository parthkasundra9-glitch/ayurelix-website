import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

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
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-white py-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto overflow-hidden relative">
      
      {/* Decorative quotes background graphic */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 text-gray-100/60 text-9xl font-serif pointer-events-none select-none">
        <FaQuoteLeft />
      </div>

      <div className="max-w-3xl mx-auto z-10 relative text-center space-y-8">
        
        {/* Header */}
        <div>
          <span className="text-[#B89355] uppercase tracking-[0.25em] text-xs font-black block mb-3">
            Real Experiences
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
            Loved by Our Community
          </h2>
        </div>

        {/* Testimonial Active Card */}
        <div className="h-64 sm:h-56 relative flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center space-y-4"
            >
              {/* Testimonial text */}
              <p className="text-base sm:text-lg text-slate-700 italic leading-relaxed max-w-2xl">
                "{testimonials[current].text}"
              </p>

              {/* Star Rating */}
              <div className="flex justify-center gap-1 text-[#B89355]">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <FaStar key={i} size={16} />
                ))}
              </div>

              {/* User Bio */}
              <div className="flex items-center gap-3 pt-3">
                <img
                  src={testimonials[current].avatar}
                  alt={testimonials[current].name}
                  className="w-10 h-10 rounded-full object-cover border border-[#B89355]/30 shadow-sm shrink-0"
                />
                <div className="text-left">
                  <h4 className="text-sm font-bold text-[#1A2B49] font-serif">{testimonials[current].name}</h4>
                  <p className="text-[10px] text-gray-500 font-semibold tracking-wider uppercase">{testimonials[current].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Testimonial dots navigation */}
        <div className="flex justify-center gap-2 pt-4">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                index === current ? "w-6 bg-[#B89355]" : "w-1.5 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>

    </section>
  );
}

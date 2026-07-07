import { motion } from "framer-motion";

const pillars = [
  {
    title: "100% Ayurvedic",
    desc: "Formulations rooted in ancient scriptures, preserving raw, natural plant properties.",
    icon: (
      <svg className="w-8 h-8 text-[#B89355]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    )
  },
  {
    title: "Natural Ingredients",
    desc: "Sourced directly from native herbs, harvested at peak potency for skin health.",
    icon: (
      <svg className="w-8 h-8 text-[#B89355]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M5.3 5.3l13.4 13.4M5.3 18.7L18.7 5.3" opacity="0.1" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-4-4 1.41-1.41L10 14.17l5.59-5.59L17 10l-7 7z" />
      </svg>
    )
  },
  {
    title: "Chemical Free",
    desc: "Zero artificial parabens, sulfates, toxic silicones, or harmful synthetics.",
    icon: (
      <svg className="w-8 h-8 text-[#B89355]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    title: "Trusted Formula",
    desc: "Lab-tested for heavy metals and purity, backed by standard batch safety audits.",
    icon: (
      <svg className="w-8 h-8 text-[#B89355]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.746 3.746 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    )
  },
  {
    title: "Premium Quality",
    desc: "Prepared using traditional processes like slow-heating for absolute botanical extraction.",
    icon: (
      <svg className="w-8 h-8 text-[#B89355]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.198-.39.782-.39.98 0l3.07 6.225 6.87 1.002c.433.063.606.592.293.898l-4.97 4.84 1.17 6.847c.074.433-.382.764-.766.559L12 20.364l-6.13 3.225c-.384.202-.84-.13-.766-.559l1.17-6.847-4.97-4.84c-.313-.306-.14-.835.293-.898l6.87-1.002 3.07-6.225z" />
      </svg>
    )
  },
  {
    title: "Safe For Daily Use",
    desc: "Meticulously balanced skincare remedies designed for sustained long-term efficacy.",
    icon: (
      <svg className="w-8 h-8 text-[#B89355]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    )
  }
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#FAF8F5] py-20 px-4 sm:px-6 md:px-8 relative overflow-hidden">
      
      {/* Decorative glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#B89355]/3 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#B89355] uppercase tracking-[0.25em] text-xs font-black block mb-3">
            Pure Trust & Transparency
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
            The Ayurelix Promise
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto mt-4">
            We adhere to absolute standards of purity, combining ancient knowledge with verified, clean procedures.
          </p>
        </div>

        {/* Grid Layout - 3 Columns Desktop, 2 Tablet, 1 Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((pil, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              className="bg-white border border-[#1A2B49]/5 hover:border-[#B89355]/30 rounded-3xl p-6 sm:p-8 hover:shadow-[0_12px_40px_rgba(26,43,73,0.05)] transition-all duration-300 flex items-start gap-4"
            >
              {/* Icon Container */}
              <div className="p-3 bg-[#FAF8F5] border border-[#1A2B49]/5 rounded-2xl shrink-0">
                {pil.icon}
              </div>

              {/* Text info */}
              <div className="space-y-2">
                <h3 className="text-lg font-serif font-black text-[#1A2B49]">
                  {pil.title}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                  {pil.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}

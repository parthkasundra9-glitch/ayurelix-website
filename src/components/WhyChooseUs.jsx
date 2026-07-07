import { motion } from "framer-motion";

const pillars = [
  {
    title: "Purity Guaranteed",
    desc: "Our formulations contain premium organic saffron, turmeric and pure active botanicals, entirely free of heavy metals.",
    icon: (
      <svg className="w-8 h-8 text-[#B89355]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.5c4.5 0 8-3.5 8-8s-8-11.5-8-11.5S4 9 4 13.5s3.5 8 8 8z" />
      </svg>
    )
  },
  {
    title: "Organic Growth",
    desc: "Herbal roots and seeds are ethically harvested at peak biological potency, ensuring maximum healing properties.",
    icon: (
      <svg className="w-8 h-8 text-[#B89355]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-4-3-6-3-6s3 2 3 6zM12 11c0-4 3-6 3-6s-3 2-3 6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 11v11M5 16s3-1 7-1 7 1 7 1" />
      </svg>
    )
  },
  {
    title: "Authentic Rituals",
    desc: "Handcrafted using traditional slow-heating processes to preserve active botanical enzymes.",
    icon: (
      <svg className="w-8 h-8 text-[#B89355]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-4.5 3-6 7.5-6 11.5a6 6 0 0012 0c0-4-1.5-8.5-6-11.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17" />
      </svg>
    )
  },
  {
    title: "Cruelty Free",
    desc: "Formulated with absolute respect for nature. 100% vegan, cruelty-free, and safe for daily use.",
    icon: (
      <svg className="w-8 h-8 text-[#B89355]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21C12 21 4 14 4 9C4 6 6.5 3.5 9.5 3.5C11.5 3.5 12 5 12 5C12 5 12.5 3.5 14.5 3.5C17.5 3.5 20 6 20 9C20 14 12 21 12 21Z" />
      </svg>
    )
  }
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#FAF8F5] py-20 px-4 sm:px-6 md:px-8 relative overflow-hidden">
      
      {/* Background glow decorator */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#B89355]/3 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
            The Ayurvedic Principle
          </h2>
        </div>

        {/* Minimalist 4 Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pil, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              className="bg-white border border-slate-100 rounded-3xl p-6 hover:shadow-[0_12px_40px_rgba(26,43,73,0.05)] transition-all duration-300 flex flex-col items-center text-center space-y-4"
            >
              {/* Icon Container */}
              <div className="p-3 bg-[#FAF8F5] border border-slate-50 rounded-2xl shrink-0">
                {pil.icon}
              </div>

              {/* Text info */}
              <div className="space-y-2">
                <h3 className="text-base font-serif font-bold text-[#1A2B49]">
                  {pil.title}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed font-medium">
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

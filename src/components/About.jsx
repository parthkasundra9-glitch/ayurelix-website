import Navbar from "./Navbar";
import Footer from "./Footer";
import { motion } from "framer-motion";
import Logo from "./Logo";

export default function About() {
  const values = [
    {
      title: "100% Organic",
      description: "Sourced directly from native herbs, grown sustainably and harvested at peak potency."
    },
    {
      title: "Ancient Wisdom",
      description: "Formulations derived from thousands of years of traditional Ayurvedic scriptures."
    },
    {
      title: "Modern Science",
      description: "Rigorous testing and scientific research to validate the effectiveness of every product."
    }
  ];

  return (
    <div className="bg-white min-h-screen text-[#3C5A44] relative overflow-hidden">
      {/* Premium Backlight Glows */}
      <div className="absolute w-[500px] md:w-[800px] h-[500px] md:h-[800px] rounded-full bg-[#B89355]/4 blur-[150px] top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute w-[500px] md:w-[800px] h-[500px] md:h-[800px] rounded-full bg-[#f4efe2]/60 blur-[150px] bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <Navbar />

      <section className="max-w-7xl mx-auto py-32 px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          <div>
            <span className="text-[#B89355] uppercase tracking-[0.25em] text-xs font-bold block mb-3">
              Our sacred heritage
            </span>
            <h1
              className="text-5xl md:text-7xl font-black mb-8 leading-tight text-[#3C5A44] font-serif"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              ABOUT AYURELIX
            </h1>
            <p className="text-slate-600 text-lg mb-6 leading-relaxed">
              At Ayurelix, we believe wellness is a harmonious balance of body, mind, and spirit. 
              Our journey started with a vision to bridge the gap between ancient Ayurvedic wisdom and modern lifestyle needs.
            </p>
            <p className="text-slate-500 text-base leading-relaxed">
              We work closely with traditional practitioners and modern researchers to offer clean, plant-based remedies that nurture your body without artificial chemicals or side-effects.
            </p>
          </div>

          <div className="relative h-96 flex flex-col items-center justify-center">
            {/* Background design elements */}
            <div className="absolute w-80 h-80 rounded-full bg-[#B89355]/10 blur-[80px]" />
            <div className="w-full h-80 flex items-center justify-center">
              <Logo size="xl" variant="gold" layout="vertical" />
            </div>
            <span className="text-[#B89355] text-sm font-bold tracking-[0.25em] uppercase mt-4">
              Established 2026
            </span>
          </div>
        </motion.div>

        {/* Brand Values section */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <span className="text-[#B89355] uppercase tracking-[0.2em] text-xs font-bold block mb-2">Philosophy</span>
            <h2 className="text-4xl font-bold font-serif text-[#3C5A44]" style={{ fontFamily: "'Cinzel', serif" }}>Our Core Values</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((val, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-[#fbf9f4]/80 border border-[#3C5A44]/10 hover:border-[#B89355]/40 rounded-3xl p-8 backdrop-blur-lg hover:shadow-[0_8px_30px_rgba(14,26,48,0.05)] transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-[#B89355] mb-4 font-serif">{val.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{val.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


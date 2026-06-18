import { motion } from "framer-motion";
import Logo from "./Logo";
import bannerHerbs from "../assets/banner_herbs.png";

export default function Hero() {
  const handleScrollToProducts = () => {
    const section = document.getElementById("best-sellers-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden bg-[#FAF8F5] mt-16 md:mt-20">
      
      {/* Decorative herbal ambient glows */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-[#B89355]/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-[#3C5A44]/5 blur-[120px]" />
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto z-10 w-full relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column - Brand Info Card */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6 bg-white/80 backdrop-blur-md p-6 sm:p-8 md:p-10 rounded-3xl border border-[#3C5A44]/5 shadow-xl max-w-2xl mx-auto lg:mx-0 w-full">
            
            {/* Animated Brand Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 bg-[#FAF8F5]/90 border border-[#B89355]/30 px-3.5 py-1.5 rounded-full"
            >
              <Logo size="sm" showText={false} variant="gold" layout="iconOnly" className="w-5 h-5" />
              <span className="text-[10px] font-bold text-[#B89355] tracking-[0.2em] uppercase">
                ESTABLISHED 2026
              </span>
            </motion.div>

            {/* Brand Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black font-serif text-[#3C5A44] tracking-wider leading-tight"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Ayurelix
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-base sm:text-lg text-slate-600 font-sans tracking-wide leading-relaxed"
            >
              Ancient Ayurvedic Wisdom. <br className="md:hidden" />
              <span className="text-[#B89355] font-semibold">Modern Botanical Science.</span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-xs sm:text-sm text-slate-500 font-sans leading-relaxed"
            >
              Experience a premium skincare line crafted exclusively with Kumkumadi Oil and Anti Pigmentation Cream. Clean, plant-based remedies made to nurture your skin without artificial chemicals.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="pt-2 w-full sm:w-auto"
            >
              <button
                onClick={handleScrollToProducts}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#3C5A44] hover:bg-[#B89355] text-white font-black tracking-wider shadow-lg hover:shadow-xl transition duration-300 text-center cursor-pointer uppercase text-xs"
              >
                Shop Formulations
              </button>
            </motion.div>
          </div>

          {/* Right Column - Large Prominent Hero Banner Image */}
          <div className="lg:col-span-5 w-full flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative w-full max-w-lg lg:max-w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5] bg-white"
            >
              <img
                src={bannerHerbs}
                alt="Ayurelix Natural Apothecary Banner"
                className="w-full h-full object-cover object-center select-none hover:scale-105 transition-transform duration-700"
              />
              {/* Image Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
              
              {/* Banner Label Overlay */}
              <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                <span className="text-[9px] uppercase font-bold tracking-[0.2em] bg-[#B89355] px-3 py-1 rounded-full text-white">
                  Featured Apothecary
                </span>
                <h2 className="mt-3 text-xl sm:text-2xl font-serif font-black text-white leading-tight" style={{ fontFamily: "'Cinzel', serif" }}>
                  Organic. Sustainable. Pure.
                </h2>
                <p className="text-[10px] text-white/80 font-sans tracking-wide mt-1">
                  Made with the finest traditional Indian herbs
                </p>
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 cursor-pointer flex flex-col items-center gap-1 opacity-50 hover:opacity-100 transition"
        onClick={handleScrollToProducts}
      >
        <span className="text-[9px] text-gray-500 font-bold uppercase tracking-[0.2em]">Explore</span>
        <div className="w-1 h-4 rounded-full bg-gray-300 flex justify-center p-0.5">
          <div className="w-0.5 h-1 bg-[#B89355] rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}

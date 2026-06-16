import { motion } from "framer-motion";
import Logo from "./Logo";
import bannerHerbs from "../assets/banner_herbs.png";
import kumkumadiSerum from "../assets/kumkumadi_serum.jpg";
import antiPigmentation from "../assets/anti_pigmentation.jpg";

export default function Hero() {
  const handleScrollToProducts = () => {
    const section = document.getElementById("best-sellers-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="
      min-h-screen
      bg-white
      flex items-center justify-center
      relative overflow-hidden
      py-24
      "
    >
      {/* Premium Backlight Glows */}
      <div
        className="
        absolute
        w-[500px] md:w-[800px]
        h-[500px] md:h-[800px]
        rounded-full
        bg-[#B89355]/6
        blur-[150px]
        top-1/4 left-1/4
        -translate-x-1/2 -translate-y-1/2
        "
      />
      <div
        className="
        absolute
        w-[500px] md:w-[800px]
        h-[500px] md:h-[800px]
        rounded-full
        bg-[#f4efe2]/80
        blur-[150px]
        bottom-1/4 right-1/4
        translate-x-1/2 translate-y-1/2
        "
      />

      <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-12 gap-12 items-center z-10 w-full pt-12">
        
        {/* Left Column - Brand Info */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          
          {/* Animated Brand Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-[#fbf9f4] border border-[#B89355]/30 px-4 py-2 rounded-full backdrop-blur-md"
          >
            <Logo size="sm" showText={false} variant="gold" layout="iconOnly" className="w-5 h-5" />
            <span className="text-xs font-bold text-[#B89355] tracking-[0.2em] uppercase">
              ESTABLISHED 2026
            </span>
          </motion.div>

          {/* Brand Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="
            text-5xl md:text-7xl xl:text-8xl
            font-black
            font-serif
            text-[#3C5A44]
            tracking-wider
            leading-tight
            "
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Ayurelix
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="
            text-lg md:text-xl xl:text-2xl
            text-gray-600
            font-sans
            tracking-wide
            max-w-xl
            "
          >
            Ancient Ayurvedic Wisdom. <br className="md:hidden" />
            <span className="text-[#B89355] font-medium">Modern Botanical Science.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-6"
          >
            <button
              onClick={handleScrollToProducts}
              className="
              px-8 py-4
              rounded-full
              bg-[#3C5A44]
              hover:bg-[#B89355]
              text-white
              font-black
              tracking-wider
              hover:shadow-[0_4px_20px_rgba(14,26,48,0.15)]
              transition duration-300
              "
            >
              Shop Formulations
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="lg:col-span-5 relative flex justify-center items-center w-full mt-10 lg:mt-0 px-4 md:px-8"
        >
          {/* Main banner background card */}
          <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-[#3C5A44]/15 group">
            <img
              src={bannerHerbs}
              alt="Ayurelix Natural Apothecary"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Soft overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            
            {/* Text overlay on banner */}
            <div className="absolute bottom-6 left-6 right-6 text-white text-left z-10">
              <span className="text-[#B89355] text-[10px] font-bold tracking-[0.25em] uppercase block mb-1">
                Pure Botanicals
              </span>
              <h3 className="font-serif text-xl font-bold tracking-wide leading-tight">
                Ayurelix Apothecary
              </h3>
              <p className="text-white/80 text-xs mt-1.5 font-sans leading-relaxed">
                100% organic, sustainably sourced ingredients handcrafted for modern wellness.
              </p>
            </div>
          </div>

          {/* Floating Product Card 1: Kumkumadi Serum */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            whileHover={{ y: -5 }}
            className="absolute -bottom-8 -left-2 md:-left-6 bg-white/95 backdrop-blur-md border border-[#3C5A44]/10 rounded-2xl p-3 shadow-xl flex items-center gap-3 w-48 md:w-56 pointer-events-auto cursor-pointer"
            onClick={handleScrollToProducts}
          >
            <img
              src={kumkumadiSerum}
              alt="Kumkumadi Face Serum"
              className="w-12 h-12 rounded-lg object-cover border border-[#3C5A44]/5"
            />
            <div className="min-w-0">
              <h4 className="text-[11px] font-bold text-[#3C5A44] truncate">Kumkumadi Face Serum</h4>
              <div className="flex items-center gap-1 text-[10px] text-[#B89355] font-semibold mt-0.5">
                <span>★ 4.9</span>
                <span className="text-gray-400 font-normal">(42)</span>
              </div>
              <p className="text-xs font-bold text-[#3C5A44] mt-0.5">₹799</p>
            </div>
          </motion.div>

          {/* Floating Product Card 2: Anti Pigmentation Pack */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            whileHover={{ y: -5 }}
            className="absolute -top-8 -right-2 md:-right-6 bg-white/95 backdrop-blur-md border border-[#3C5A44]/10 rounded-2xl p-3 shadow-xl flex items-center gap-3 w-48 md:w-56 pointer-events-auto cursor-pointer"
            onClick={handleScrollToProducts}
          >
            <img
              src={antiPigmentation}
              alt="Anti Pigmentation Face Pack"
              className="w-12 h-12 rounded-lg object-cover border border-[#3C5A44]/5"
            />
            <div className="min-w-0">
              <h4 className="text-[11px] font-bold text-[#3C5A44] truncate">Anti Pigmentation Pack</h4>
              <div className="flex items-center gap-1 text-[10px] text-[#B89355] font-semibold mt-0.5">
                <span>★ 4.8</span>
                <span className="text-gray-400 font-normal">(36)</span>
              </div>
              <p className="text-xs font-bold text-[#3C5A44] mt-0.5">₹499</p>
            </div>
          </motion.div>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 cursor-pointer flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition"
        onClick={handleScrollToProducts}
      >
        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">Explore</span>
        <div className="w-1.5 h-6 rounded-full bg-gray-300 flex justify-center p-0.5">
          <div className="w-0.5 h-1.5 bg-[#B89355] rounded-full" />
        </div>
      </motion.div>

    </section>
  );
}



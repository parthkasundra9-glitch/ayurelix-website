import { motion } from "framer-motion";
import Logo from "./Logo";
import ThreeDLogo from "./ThreeDLogo";

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
        bg-[#c5a059]/6
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
            className="inline-flex items-center gap-2 bg-[#fbf9f4] border border-[#c5a059]/30 px-4 py-2 rounded-full backdrop-blur-md"
          >
            <Logo size="sm" showText={false} variant="gold" layout="iconOnly" className="w-5 h-5" />
            <span className="text-xs font-bold text-[#c5a059] tracking-[0.2em] uppercase">
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
            text-[#0e1a30]
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
            <span className="text-[#c5a059] font-medium">Modern Botanical Science.</span>
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
              bg-[#0e1a30]
              hover:bg-[#c5a059]
              text-white
              font-black
              tracking-wider
              hover:shadow-[0_4px_20px_rgba(14,26,48,0.15)]
              transition duration-300
              "
            >
              Shop Formulations
            </button>
            
            <button
              onClick={() => {
                const quizSection = document.getElementById("dosha-quiz-section");
                if (quizSection) quizSection.scrollIntoView({ behavior: "smooth" });
              }}
              className="
              px-8 py-4
              rounded-full
              border border-[#0e1a30]
              text-[#0e1a30]
              hover:bg-[#0e1a30] hover:text-white
              font-bold
              tracking-wider
              transition duration-300
              "
            >
              Take Dosha Test
            </button>
          </motion.div>
        </div>

        {/* Right Column - 3D Logo Canvas Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="lg:col-span-5 flex justify-center items-center h-[350px] md:h-[450px] lg:h-[550px] w-full"
        >
          <ThreeDLogo height="100%" width="100%" fallbackSize="xxl" />
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
          <div className="w-0.5 h-1.5 bg-[#c5a059] rounded-full" />
        </div>
      </motion.div>

    </section>
  );
}



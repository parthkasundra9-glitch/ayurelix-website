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

  const handleScrollToAbout = () => {
    const section = document.getElementById("certifications-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center py-12 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-12 bg-[#FAF8F5] mt-16 md:mt-20">
      
      {/* Decorative premium ambient glows */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full bg-[#B89355]/5 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full bg-[#3C5A44]/5 blur-[100px]" />
      </div>

      {/* Main Grid Wrapper */}
      <div className="max-w-7xl mx-auto z-10 w-full relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Right Column (Hero Image) - Stacks FIRST on mobile (order-1), second on desktop (lg:order-2) */}
          <div className="lg:col-span-6 w-full flex justify-center items-center order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative w-full max-w-lg lg:max-w-full rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-2xl shadow-[#3C5A44]/10 border border-[#3C5A44]/10 aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5] bg-white group"
            >
              <img
                src={bannerHerbs}
                alt="Ayurelix Premium Ayurvedic Skincare"
                className="w-full h-full object-cover object-center select-none group-hover:scale-[1.03] transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                <span className="text-[9px] uppercase font-bold tracking-[0.2em] bg-[#B89355] px-3.5 py-1.5 rounded-full text-white shadow-sm">
                  Organic Ingredients
                </span>
                <p className="mt-3 text-lg sm:text-xl font-serif font-black text-white leading-tight" style={{ fontFamily: "'Cinzel', serif" }}>
                  Pure. Sustainable. Proven.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Left Column (Brand Info) - Stacks SECOND on mobile (order-2), first on desktop (lg:order-1) */}
          <div className="lg:col-span-6 flex flex-col items-start text-left space-y-6 lg:space-y-8 w-full order-2 lg:order-1 mt-6 lg:mt-0">
            
            {/* Tagline Badge */}
            <div className="flex items-center gap-2 border-b border-[#B89355]/20 pb-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#B89355] font-black">
                Premium Ayurvedic Skincare
              </span>
            </div>

            {/* Typography Heading */}
            <h1
              className="text-4xl sm:text-5xl lg:text-[56px] font-black font-serif text-[#3C5A44] leading-[1.1] tracking-wide"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Ancient <span className="text-[#B89355]">Ayurvedic Wisdom</span> For Modern Skin
            </h1>

            {/* Structured Content Description */}
            <p className="text-sm sm:text-base text-gray-600 font-sans leading-relaxed">
              Restore your natural glow with our signature formulations. Discover the power of <strong>Kumkumadi Oil</strong> and <strong>Anti Pigmentation Cream</strong>, crafted using 100% active natural ingredients and a completely chemical-free formula to nourish and balance your skin daily.
            </p>

            {/* Checkmark Benefits List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 w-full border-t border-b border-[#3C5A44]/5 py-5 sm:py-6">
              <div className="flex items-center gap-2.5">
                <span className="text-[#B89355] text-lg font-bold">✓</span>
                <span className="text-xs sm:text-sm font-semibold text-[#3C5A44]/80">100% Natural</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-[#B89355] text-lg font-bold">✓</span>
                <span className="text-xs sm:text-sm font-semibold text-[#3C5A44]/80">Traditional Ayurvedic Formula</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-[#B89355] text-lg font-bold">✓</span>
                <span className="text-xs sm:text-sm font-semibold text-[#3C5A44]/80">Made For Daily Use</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-[#B89355] text-lg font-bold">✓</span>
                <span className="text-xs sm:text-sm font-semibold text-[#3C5A44]/80">Chemical Free Formula</span>
              </div>
            </div>

            {/* Call To Actions */}
            <div className="flex flex-col sm:flex-row gap-4 w-full pt-2">
              <button
                onClick={handleScrollToProducts}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#3C5A44] hover:bg-[#B89355] text-white font-bold tracking-wider hover:shadow-lg active:scale-[0.98] transition-all duration-300 text-center cursor-pointer text-xs uppercase"
              >
                Shop Now
              </button>
              <button
                onClick={handleScrollToAbout}
                className="w-full sm:w-auto px-8 py-4 rounded-full border border-[#3C5A44]/30 hover:border-[#3C5A44] hover:bg-[#3C5A44]/5 text-[#3C5A44] font-bold tracking-wider active:scale-[0.98] transition-all duration-300 text-center cursor-pointer text-xs uppercase"
              >
                Learn More
              </button>
            </div>
            
          </div>
          
        </div>
      </div>
    </section>
  );
}

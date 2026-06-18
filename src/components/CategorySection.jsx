import { motion } from "framer-motion";

const categories = [
  {
    name: "Facial Oils",
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop",
    count: "Pure Kumkumadi Oils"
  },
  {
    name: "Skin Brightening",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop",
    count: "Radiant Skin Blends"
  },
  {
    name: "Anti Pigmentation",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
    count: "Spot Corrector Packs"
  },
  {
    name: "Herbal Care",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600&auto=format&fit=crop",
    count: "Organic Botanicals"
  },
  {
    name: "Daily Skincare",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop",
    count: "Nurturing Routines"
  },
  {
    name: "Ayurvedic Essentials",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop",
    count: "Traditional Blends"
  }
];

export default function CategorySection() {
  const handleScrollToProducts = () => {
    const section = document.getElementById("featured-products-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-white py-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto overflow-hidden">
      
      {/* Header Info */}
      <div className="text-center mb-12 sm:mb-16">
        <span className="text-[#B89355] uppercase tracking-[0.25em] text-xs font-black block mb-3">
          Explore by formulation
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#3C5A44] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
          Curated Skincare Categories
        </h2>
        <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto mt-4">
          Discover traditional Ayurvedic therapies organized specifically to target and nurture your unique skin profile.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
        {categories.map((cat, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -6 }}
            onClick={handleScrollToProducts}
            className="group cursor-pointer flex flex-col items-center bg-[#FAF8F5] border border-[#3C5A44]/5 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-[#B89355]/30 transition-all duration-300 p-3"
          >
            {/* Visual circle image */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border border-[#3C5A44]/10 relative shadow-inner shrink-0">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[#3C5A44]/5 group-hover:bg-transparent transition duration-300" />
            </div>

            {/* Labels */}
            <h3 className="text-sm font-bold text-[#3C5A44] font-serif mt-4 text-center group-hover:text-[#B89355] transition duration-200">
              {cat.name}
            </h3>
            <p className="text-[10px] text-gray-500 font-semibold mt-1 tracking-wide text-center">
              {cat.count}
            </p>
          </motion.div>
        ))}
      </div>

    </section>
  );
}

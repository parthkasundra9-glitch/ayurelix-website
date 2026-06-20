import { motion } from "framer-motion";

const categories = [
  {
    id: 1,
    name: "Facial Oils",
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop",
    subtitle: "Pure Kumkumadi Oils"
  },
  {
    id: 2,
    name: "Skin Brightening",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop",
    subtitle: "Radiant Skin Blends"
  },
  {
    id: 3,
    name: "Anti Pigmentation",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
    subtitle: "Spot Corrector Packs"
  },
  {
    id: 4,
    name: "Herbal Care",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600&auto=format&fit=crop",
    subtitle: "Organic Botanicals"
  },
  {
    id: 5,
    name: "Daily Skincare",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop",
    subtitle: "Nurturing Routines"
  },
  {
    id: 6,
    name: "Ayurvedic Essentials",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop",
    subtitle: "Traditional Blends"
  }
];

export default function CategorySection() {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto overflow-hidden">
      
      {/* Header Info */}
      <div className="text-center mb-12 sm:mb-16">
        <span className="text-[#B89355] uppercase tracking-[0.25em] text-xs font-black block mb-3">
          Explore by formulation
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#3C5A44] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
          Categories
        </h2>
        <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto mt-4">
          Explore our complete range of Ayurvedic wellness products.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
        {categories.map((cat) => (
          <motion.div
            key={cat.id}
            whileHover={{ y: -6 }}
            className="group flex flex-col items-center bg-[#FAF8F5] border border-[#3C5A44]/5 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-[#B89355]/30 transition-all duration-300 p-3 select-none"
          >
            {/* Visual circle image */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border border-[#3C5A44]/10 relative shadow-inner shrink-0">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[#3C5A44]/5 transition duration-300" />
            </div>

            {/* Labels */}
            <h3 className="text-sm font-bold text-[#3C5A44] font-serif mt-4 text-center transition duration-200">
              {cat.name}
            </h3>
            {cat.subtitle && (
              <p className="text-[10px] text-gray-500 font-semibold mt-1 tracking-wide text-center">
                {cat.subtitle}
              </p>
            )}
          </motion.div>
        ))}
      </div>

    </section>
  );
}

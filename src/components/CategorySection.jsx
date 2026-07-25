import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const categories = [
  {
    id: 6,
    name: "Body Care",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop",
    subtitle: "Nurturing Body Rituals"
  },
  {
    id: 2,
    name: "Face Care",
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=600&auto=format&fit=crop",
    subtitle: "Radiant Facial Blends"
  },
  {
    id: 5,
    name: "Hair & Skin Care",
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop",
    subtitle: "Dual Purpose Alchemy"
  },
  {
    id: 3,
    name: "Hair Care",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop",
    subtitle: "Lustrous Lock Elixirs"
  },
  {
    id: 1,
    name: "Skincare",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
    subtitle: "Daily Derm Shield"
  },
  {
    id: "facial-oils",
    name: "Facial Oils",
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop",
    subtitle: "Pure Kumkumadi Serums"
  }
];

export default function CategorySection() {
  return (
    <section className="bg-[#FAF8F5] pt-10 pb-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto overflow-hidden">
      
      {/* Header Info */}
      <div className="text-center mb-16 space-y-4">
        <span className="text-[#B89355] uppercase tracking-[0.25em] text-xs font-black block">
          Explore by formulation
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
          Categories
        </h2>
        <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Explore our complete range of Ayurvedic wellness products.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
        {categories.map((cat) => (
          <Link
            to={cat.id === "facial-oils" ? "/products?search=oil" : `/products?category=${cat.id}`}
            key={cat.id}
            className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 cursor-pointer select-none"
          >
            {/* Background Image */}
            <img
              src={cat.image}
              alt={cat.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            
            {/* Premium Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent group-hover:from-[#1A2B49]/95 transition duration-500" />
            
            {/* Fine border highlights */}
            <div className="absolute inset-0 border border-white/5 group-hover:border-[#B89355]/30 rounded-2xl transition duration-500" />

            {/* Content overlay */}
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex flex-col justify-end text-left transform translate-y-3 group-hover:translate-y-0 transition duration-500 ease-out">
              <span className="text-[#B89355] text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] mb-1.5 opacity-80 group-hover:opacity-100 transition duration-300">
                {cat.subtitle}
              </span>
              <h3 className="text-xs sm:text-base font-bold text-white font-serif tracking-wide leading-snug" style={{ fontFamily: "'Cinzel', serif" }}>
                {cat.name}
              </h3>
              
              {/* Gold line transition */}
              <div className="h-[1px] w-0 group-hover:w-8 bg-[#B89355] mt-2.5 transition-all duration-500" />
              <span className="text-[8px] uppercase tracking-widest text-[#B89355] opacity-0 group-hover:opacity-100 mt-2 transition duration-500 font-bold block">
                Explore →
              </span>
            </div>
          </Link>
        ))}
      </div>

    </section>
  );
}

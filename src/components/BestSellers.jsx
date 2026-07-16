import { useState, useEffect, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { supabase } from "../supabaseClient";
import ProductDetailsModal from "./ProductDetailsModal";
import ProductCard from "./ProductCard";

import { useCart } from "../context/CartContext";

export default function BestSellers() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { products, loadingProducts } = useCart();
  const scrollRef = useRef(null);

  const bestsellers = products.filter(p => p.is_bestseller === true);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollAmount = direction === "left" ? -380 : 380;
      scrollRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: "smooth"
      });
    }
  };

  if (loading) {
    return (
      <div className="bg-white py-20 text-center">
        <p className="text-[#1A2B49] font-semibold">Loading best sellers...</p>
      </div>
    );
  }

  if (bestsellers.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#FAF8F5] py-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto overflow-hidden">
      
      {/* Header Info matching the screenshot */}
      <div className="flex justify-between items-end mb-8 border-b border-[#1A2B49]/10 pb-4">
        <h2 className="text-2xl sm:text-3xl font-black text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
          Best Seller
        </h2>
        <a href="/products" className="text-xs font-bold uppercase tracking-widest text-[#B89355] hover:text-[#1A2B49] transition duration-300 flex items-center gap-1">
          View All &gt;
        </a>
      </div>

      {/* Slidable Carousel Wrapper */}
      <div className="relative group max-w-7xl mx-auto">
        {/* Left Arrow Button */}
        <button
          onClick={() => scroll("left")}
          className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#FAF8F5] hover:bg-[#1A2B49] text-[#1A2B49] hover:text-white border border-[#1A2B49]/10 shadow-md flex items-center justify-center transition duration-300 opacity-0 group-hover:opacity-100 max-md:opacity-100 cursor-pointer"
          aria-label="Scroll Left"
        >
          <FiChevronLeft size={18} />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={() => scroll("right")}
          className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#FAF8F5] hover:bg-[#1A2B49] text-[#1A2B49] hover:text-white border border-[#1A2B49]/10 shadow-md flex items-center justify-center transition duration-300 opacity-0 group-hover:opacity-100 max-md:opacity-100 cursor-pointer"
          aria-label="Scroll Right"
        >
          <FiChevronRight size={18} />
        </button>

        {/* Cards Container */}
        {loadingProducts && bestsellers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 space-y-3">
            <div className="w-10 h-10 rounded-full border-2 border-[#B89355]/20 border-t-[#1A2B49] animate-spin" />
            <p className="text-gray-500 font-serif italic text-xs">Purity in transit...</p>
          </div>
        ) : (
          <div
            ref={scrollRef}
            className="flex gap-3 sm:gap-6 overflow-x-auto scrollbar-none scroll-smooth py-4 px-1 justify-start"
          >
            {bestsellers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onView={(p) => setSelectedProduct(p)}
                isGrid={false}
              />
            ))}
          </div>
        )}
      </div>

      {/* Dynamic Overlay Product Detail Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

    </section>
  );
}

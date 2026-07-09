import { useState, useEffect, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { products as fallbackProducts } from "../data/products";
import { supabase } from "../supabaseClient";
import ProductDetailsModal from "./ProductDetailsModal";
import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
  const [productsList, setProductsList] = useState(fallbackProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("id", { ascending: true });

        if (error) {
          console.error("Error fetching products from database:", error.message);
        } else if (data) {
          setProductsList(data);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    }
    fetchProducts();
  }, []);

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

  return (
    <section id="featured-products-section" className="bg-[#FAF8F5] py-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto overflow-hidden relative">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full bg-[#B89355]/3 blur-[150px] pointer-events-none" />

      <div className="z-10 relative">
        {/* Header Info matching Best Seller layout */}
        <div className="flex justify-between items-end mb-8 border-b border-[#1A2B49]/10 pb-4">
          <h2 className="text-2xl sm:text-3xl font-black text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
            Products
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
          <div
            ref={scrollRef}
            className={`flex gap-3 sm:gap-8 overflow-x-auto scrollbar-none scroll-smooth py-4 px-2 justify-start ${
              productsList.length <= 2 ? "md:justify-center" : "md:justify-start"
            }`}
          >
            {productsList.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onView={(p) => setSelectedProduct(p)}
                isGrid={false}
              />
            ))}
          </div>
        </div>
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

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiShoppingBag, FiHeart, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { products as fallbackProducts, getProductImage } from "../data/products";
import { supabase } from "../supabaseClient";
import ProductDetailsModal from "./ProductDetailsModal";

export default function FeaturedProducts() {
  const { addToCart, setIsCartOpen, toggleWishlist, isInWishlist } = useCart();
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

  const handleQuickAdd = (e, product) => {
    e.stopPropagation();
    if (product.stock <= 0) return;
    addToCart(product, 1);
    setIsCartOpen(true);
  };

  const handleWishlistToggle = (e, product) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

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
    <section id="featured-products-section" className="bg-[#FAF8F5] py-24 px-4 sm:px-6 md:px-8 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full bg-[#B89355]/3 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">
        {/* Header Info */}
        <div className="text-center mb-16">
          <span className="text-[#B89355] uppercase tracking-[0.25em] text-xs font-black block mb-3">
            Organic Skincare Elixirs
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
            Products
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto mt-4">
            Experience our highly potent flagship formulations, lovingly prepared to elevate your natural beauty.
          </p>
        </div>

        {/* Slidable Carousel Wrapper */}
        <div className="relative group max-w-5xl mx-auto">
          {/* Left Arrow Button */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white hover:bg-[#1A2B49] text-[#1A2B49] hover:text-white border border-[#1A2B49]/10 shadow-lg flex items-center justify-center transition duration-300 opacity-0 group-hover:opacity-100 max-md:opacity-100 cursor-pointer"
            aria-label="Scroll Left"
          >
            <FiChevronLeft size={20} />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white hover:bg-[#1A2B49] text-[#1A2B49] hover:text-white border border-[#1A2B49]/10 shadow-lg flex items-center justify-center transition duration-300 opacity-0 group-hover:opacity-100 max-md:opacity-100 cursor-pointer"
            aria-label="Scroll Right"
          >
            <FiChevronRight size={20} />
          </button>

          {/* Cards Container */}
          <div
            ref={scrollRef}
            className={`flex gap-8 overflow-x-auto scrollbar-none scroll-smooth py-4 px-2 justify-start ${
              productsList.length <= 2 ? "md:justify-center" : "md:justify-start"
            }`}
          >
            {productsList.map((product) => {
              const isWishlisted = isInWishlist(product.id);
              const imageSrc = getProductImage(product.image_url, product.id, product.name);
              
              return (
                <motion.div
                  key={product.id}
                  whileHover={{ y: -8 }}
                  onClick={() => setSelectedProduct(product)}
                  className="w-[300px] sm:w-[350px] shrink-0 group cursor-pointer bg-white border border-[#1A2B49]/5 hover:border-[#B89355]/40 rounded-3xl p-5 sm:p-6 transition-all duration-500 shadow-md hover:shadow-xl flex flex-col justify-between"
                >
                  <div>
                    {/* Visual Image */}
                    <div className="h-64 sm:h-72 rounded-2xl bg-[#FAF8F5] relative overflow-hidden flex items-center justify-center border border-[#1A2B49]/5">
                      {product.stock <= 0 && (
                        <div className="absolute top-3 left-3 bg-[#c55959]/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm z-10">
                          Out of Stock
                        </div>
                      )}
                      {imageSrc ? (
                        <img
                          src={imageSrc}
                          alt={product.name}
                          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                            product.stock <= 0 ? "opacity-60 grayscale-[40%]" : ""
                          }`}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#B89355] to-[#1A2B49] flex items-center justify-center text-white text-3xl font-bold">
                          A
                        </div>
                      )}

                      {/* Wishlist Button Overlay */}
                      <button
                        onClick={(e) => handleWishlistToggle(e, product)}
                        className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 hover:bg-white text-gray-500 hover:text-red-500 border border-[#1A2B49]/5 shadow-md transition-all duration-300 z-10 cursor-pointer"
                        title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                      >
                        <FiHeart
                          size={18}
                          className={isWishlisted ? "fill-red-500 text-red-500" : "transition-colors"}
                        />
                      </button>

                      {/* Quick View Overlay */}
                      <div className="absolute inset-0 bg-[#1A2B49]/5 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none" />
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mt-5">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} size={14} className="text-[#B89355]" />
                      ))}
                      <span className="text-[11px] text-gray-500 font-bold ml-1 uppercase tracking-wider">
                        5.0 (48 Reviews)
                      </span>
                    </div>

                    {/* Info */}
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1A2B49] mt-3 group-hover:text-[#B89355] transition duration-200">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm mt-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Purchase Footer */}
                  <div className="mt-6 pt-4 border-t border-[#1A2B49]/5 flex items-center justify-between">
                    <span className="text-2xl font-black text-[#B89355]">
                      ₹{product.price}
                    </span>

                    <button
                      onClick={(e) => handleQuickAdd(e, product)}
                      disabled={product.stock <= 0}
                      className="flex items-center gap-2 px-5 py-3 bg-[#1A2B49] hover:bg-[#B89355] text-white text-xs font-black tracking-wider uppercase rounded-xl transition duration-300 shadow-md active:scale-95 cursor-pointer disabled:opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {product.stock <= 0 ? (
                        <span>Out of Stock</span>
                      ) : (
                        <>
                          <FiShoppingBag size={14} />
                          <span>Add To Cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
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

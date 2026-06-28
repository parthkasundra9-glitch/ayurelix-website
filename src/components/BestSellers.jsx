import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiShoppingBag, FiHeart, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { supabase } from "../supabaseClient";
import { getProductImage } from "../data/products";
import ProductDetailsModal from "./ProductDetailsModal";

export default function BestSellers() {
  const { addToCart, setIsCartOpen, toggleWishlist, isInWishlist } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [bestsellers, setBestsellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    async function fetchBestsellers() {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("is_bestseller", true)
          .order("id", { ascending: true });

        if (error) {
          console.error("Error fetching bestsellers:", error.message);
        } else if (data) {
          setBestsellers(data);
        }
      } catch (err) {
        console.error("Error fetching bestsellers:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBestsellers();
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
    <section className="bg-white py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto overflow-hidden">
      
      {/* Header Info */}
      <div className="text-center mb-16">
        <span className="text-[#B89355] uppercase tracking-[0.25em] text-xs font-black block mb-3">
          Highly Loved Remedies
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
          Best Seller
        </h2>
        <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto mt-4">
          Explore our community's favorites, formulation mixtures designed to soothe and refresh your skin daily.
        </p>
      </div>

      {/* Slidable Carousel Wrapper */}
      <div className="relative group max-w-5xl mx-auto">
        {/* Left Arrow Button */}
        <button
          onClick={() => scroll("left")}
          className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#FAF8F5] hover:bg-[#1A2B49] text-[#1A2B49] hover:text-white border border-[#1A2B49]/10 shadow-lg flex items-center justify-center transition duration-300 opacity-0 group-hover:opacity-100 max-md:opacity-100 cursor-pointer"
          aria-label="Scroll Left"
        >
          <FiChevronLeft size={20} />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={() => scroll("right")}
          className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#FAF8F5] hover:bg-[#1A2B49] text-[#1A2B49] hover:text-white border border-[#1A2B49]/10 shadow-lg flex items-center justify-center transition duration-300 opacity-0 group-hover:opacity-100 max-md:opacity-100 cursor-pointer"
          aria-label="Scroll Right"
        >
          <FiChevronRight size={20} />
        </button>

        {/* Cards Container */}
        <div
          ref={scrollRef}
          className={`flex gap-8 overflow-x-auto scrollbar-none scroll-smooth py-4 px-2 justify-start ${
            bestsellers.length <= 2 ? "md:justify-center" : "md:justify-start"
          }`}
        >
          {bestsellers.map((product) => {
            const isWishlisted = isInWishlist(product.id);
            const productImg = getProductImage(product.image_url, product.id, product.name);
            const rating = product.rating || 5.0;
            const reviewsCount = product.reviews || 18;
            
            return (
              <motion.div
                key={product.id}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedProduct(product)}
                className="w-[280px] sm:w-[320px] shrink-0 group cursor-pointer bg-[#FAF8F5] border border-[#1A2B49]/5 hover:border-[#B89355]/40 rounded-3xl p-4 transition-all duration-500 shadow-sm hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  {/* Visual Image */}
                  <div className="h-56 rounded-2xl bg-white relative overflow-hidden flex items-center justify-center border border-[#1A2B49]/5">
                    {product.stock <= 0 && (
                      <div className="absolute top-3 left-3 bg-[#c55959]/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm z-10">
                        Out of Stock
                      </div>
                    )}
                    {productImg ? (
                      <img
                        src={productImg}
                        alt={product.name}
                        className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                          product.stock <= 0 ? "opacity-60 grayscale-[40%]" : ""
                        }`}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#B89355] via-[#8F6E35] to-[#1A2B49] flex items-center justify-center text-white/30 text-5xl font-serif">
                        A
                      </div>
                    )}

                    {/* Wishlist Button Overlay */}
                    <button
                      onClick={(e) => handleWishlistToggle(e, product)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/95 hover:bg-white text-gray-500 hover:text-red-500 border border-[#1A2B49]/5 shadow-sm transition-all duration-300 z-10 cursor-pointer"
                      title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                    >
                      <FiHeart
                        size={16}
                        className={isWishlisted ? "fill-red-500 text-red-500" : "transition-colors"}
                      />
                    </button>

                    <div className="absolute inset-0 bg-[#1A2B49]/5 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none" />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-0.5 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} size={12} className="text-[#B89355]" />
                    ))}
                    <span className="text-[10px] text-gray-500 font-bold ml-1 uppercase tracking-wider">
                      {rating} ({reviewsCount})
                    </span>
                  </div>

                  {/* Info */}
                  <h3 className="text-lg font-serif font-bold text-[#1A2B49] mt-2 group-hover:text-[#B89355] transition duration-200 truncate">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-xs mt-1.5 leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                </div>

                {/* Purchase Footer */}
                <div className="mt-5 pt-3 border-t border-[#1A2B49]/5 flex items-center justify-between">
                  <span className="text-lg font-black text-[#B89355]">
                    ₹{product.price}
                  </span>

                  <button
                    onClick={(e) => handleQuickAdd(e, product)}
                    disabled={product.stock <= 0}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-[#1A2B49] hover:bg-[#B89355] text-white text-[10px] font-black tracking-wider uppercase rounded-lg transition duration-300 shadow-sm active:scale-95 cursor-pointer disabled:opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {product.stock <= 0 ? (
                      <span>Out</span>
                    ) : (
                      <>
                        <FiShoppingBag size={12} />
                        <span>Add</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
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

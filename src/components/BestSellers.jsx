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
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-none scroll-smooth py-4 px-1 justify-start"
        >
          {bestsellers.map((product) => {
            const isWishlisted = isInWishlist(product.id);
            const productImg = getProductImage(product.image_url, product.id, product.name);
            const rating = product.rating || 5.0;
            const reviewsCount = product.reviews || 18;
            const isEven = product.id % 2 === 0;
            
            return (
              <motion.div
                key={product.id}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedProduct(product)}
                className="w-[280px] shrink-0 group cursor-pointer bg-white border border-slate-100 rounded-3xl p-4 transition-all duration-300 shadow-[0_4px_15px_rgba(26,43,73,0.02)] hover:shadow-[0_12px_30px_rgba(26,43,73,0.06)] flex flex-col justify-between"
              >
                <div>
                  {/* Image Container with Badges */}
                  <div className="h-64 rounded-2xl bg-[#FAF8F5] relative overflow-hidden flex items-center justify-center border border-slate-50">
                    
                    {/* Golden Ribbon Tag (New Launch / Best Seller) */}
                    <div className="absolute top-0 left-0 bg-[#B89355] text-white text-[8px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-br-lg rounded-tl-2xl z-10">
                      {isEven ? "New Formula" : "Best Seller"}
                    </div>

                    {product.stock <= 0 && (
                      <div className="absolute top-3 left-3 bg-[#c55959]/90 backdrop-blur-sm text-white text-[8px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm z-10">
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

                    {/* Wishlist Heart Icon Circle */}
                    <button
                      onClick={(e) => handleWishlistToggle(e, product)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white hover:bg-slate-50 text-gray-500 hover:text-red-500 shadow-sm border border-slate-100 transition-all duration-300 z-10 cursor-pointer"
                      title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                    >
                      <FiHeart
                        size={14}
                        className={isWishlisted ? "fill-red-500 text-red-500" : "transition-colors"}
                      />
                    </button>

                    {/* Shopping Bag Overlay Quick-Add Circle */}
                    {product.stock > 0 && (
                      <button
                        onClick={(e) => handleQuickAdd(e, product)}
                        className="absolute bottom-3 right-3 p-2 rounded-full bg-white text-[#1A2B49] hover:text-[#B89355] shadow-sm border border-slate-100 transition-all duration-300 z-10 cursor-pointer"
                        title="Quick Add to Cart"
                      >
                        <FiShoppingBag size={14} />
                      </button>
                    )}

                    <div className="absolute inset-0 bg-[#1A2B49]/2 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none" />
                  </div>

                  {/* Rating Section */}
                  <div className="flex items-center gap-0.5 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} size={11} className="text-[#B89355]" />
                    ))}
                    <span className="text-[10px] text-gray-400 font-bold ml-1 tracking-wider">
                      ({reviewsCount})
                    </span>
                  </div>

                  {/* Product Title & Short Info */}
                  <h3 className="text-base font-serif font-bold text-[#1A2B49] mt-2 group-hover:text-[#B89355] transition duration-200 truncate">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                </div>

                {/* Purchase Area with Full-width Add to Cart Button */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs uppercase font-bold text-gray-400">Price</span>
                    <span className="text-lg font-black text-[#B89355]">
                      ₹{product.price}
                    </span>
                  </div>

                  <button
                    onClick={(e) => handleQuickAdd(e, product)}
                    disabled={product.stock <= 0}
                    className="w-full py-2.5 bg-[#1A2B49] hover:bg-[#B89355] text-white text-[10px] font-bold tracking-widest uppercase rounded-xl transition duration-300 shadow-sm active:scale-98 cursor-pointer disabled:opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
                  >
                    {product.stock <= 0 ? (
                      <span>Out of Stock</span>
                    ) : (
                      <>
                        <FiShoppingBag size={12} />
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

      {/* Dynamic Overlay Product Detail Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

    </section>
  );
}

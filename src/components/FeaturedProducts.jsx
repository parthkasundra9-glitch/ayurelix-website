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
              const rating = product.rating || 5.0;
              const reviewsCount = product.reviews || 18;
              
              return (
                <motion.div
                  key={product.id}
                  whileHover={{ y: -6 }}
                  onClick={() => setSelectedProduct(product)}
                  className="w-[170px] sm:w-[300px] shrink-0 group cursor-pointer bg-white border border-slate-100 rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 transition-all duration-300 shadow-[0_4px_15px_rgba(26,43,73,0.02)] hover:shadow-[0_12px_30px_rgba(26,43,73,0.06)] flex flex-col justify-between"
                >
                  <div>
                    {/* Visual Image */}
                    <div className="h-36 sm:h-60 rounded-xl sm:rounded-2xl bg-[#FAF8F5] relative overflow-hidden flex items-center justify-center border border-slate-50">
                      {product.stock <= 0 && (
                        <div className="absolute top-2 left-2 bg-[#c55959]/90 backdrop-blur-sm text-white text-[7px] sm:text-[8px] font-bold uppercase tracking-wider px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded shadow-sm z-10">
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
                        className="absolute top-2 right-2 p-1.5 sm:p-2.5 rounded-full bg-white hover:bg-slate-50 text-gray-500 hover:text-red-500 shadow-sm border border-slate-100 transition-all duration-300 z-10 cursor-pointer"
                        title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                      >
                        <FiHeart
                          size={12}
                          className={isWishlisted ? "fill-red-500 text-red-500" : "transition-colors"}
                        />
                      </button>

                      {/* Quick Add Overlay */}
                      {product.stock > 0 && (
                        <button
                          onClick={(e) => handleQuickAdd(e, product)}
                          className="absolute bottom-2 right-2 p-1.5 sm:p-2 rounded-full bg-white text-[#1A2B49] hover:text-[#B89355] shadow-sm border border-slate-100 transition-all duration-300 z-10 cursor-pointer"
                          title="Quick Add to Cart"
                        >
                          <FiShoppingBag size={12} />
                        </button>
                      )}

                      <div className="absolute inset-0 bg-[#1A2B49]/2 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none" />
                    </div>

                    {/* Rating Section */}
                    <div className="flex items-center gap-0.5 mt-2.5 sm:mt-4">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-[#B89355] w-2 h-2 sm:w-2.5 sm:h-2.5" />
                      ))}
                      <span className="text-[8px] sm:text-[10px] text-gray-400 font-bold ml-1 tracking-wider">
                        ({reviewsCount})
                      </span>
                    </div>

                    {/* Product Title & Info */}
                    <h3 className="text-xs sm:text-lg font-serif font-bold text-[#1A2B49] mt-1 sm:mt-2 group-hover:text-[#B89355] transition duration-200 truncate">
                      {product.name}
                    </h3>
                    <p className="text-gray-500 text-[10px] sm:text-xs mt-1 leading-relaxed line-clamp-2 hidden sm:block">
                      {product.description}
                    </p>
                  </div>

                  {/* Purchase Area with Full-width Add to Cart Button */}
                  <div className="mt-2.5 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-100">
                    <div className="flex justify-between items-center mb-2 sm:mb-3">
                      <span className="text-[8px] sm:text-xs uppercase font-bold text-gray-400">Price</span>
                      <span className="text-sm sm:text-lg font-black text-[#B89355]">
                        ₹{product.price}
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleQuickAdd(e, product)}
                      disabled={product.stock <= 0}
                      className="w-full py-1.5 sm:py-2.5 bg-[#1A2B49] hover:bg-[#B89355] text-white text-[8px] sm:text-[10px] font-bold tracking-wider sm:tracking-widest uppercase rounded-lg sm:rounded-xl transition duration-300 shadow-sm active:scale-98 cursor-pointer disabled:opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-1"
                    >
                      {product.stock <= 0 ? (
                        <span>Out of Stock</span>
                      ) : (
                        <>
                          <FiShoppingBag className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
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

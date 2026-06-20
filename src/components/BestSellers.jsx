import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiShoppingBag, FiHeart } from "react-icons/fi";
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
    addToCart(product, 1);
    setIsCartOpen(true);
  };

  const handleWishlistToggle = (e, product) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  if (loading) {
    return (
      <div className="bg-white py-20 text-center">
        <p className="text-[#3C5A44] font-semibold">Loading best sellers...</p>
      </div>
    );
  }

  if (bestsellers.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto overflow-hidden">
      
      {/* Header Info */}
      <div className="text-center mb-16">
        <span className="text-[#B89355] uppercase tracking-[0.25em] text-xs font-black block mb-3">
          Highly Loved Remedies
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#3C5A44] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
          The Best Sellers
        </h2>
        <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto mt-4">
          Explore our community's favorites, formulation mixtures designed to soothe and refresh your skin daily.
        </p>
      </div>

      {/* Grid Layout - 4 Columns Desktop, 2 Tablet, 1 Mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
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
              className="group cursor-pointer bg-[#FAF8F5] border border-[#3C5A44]/5 hover:border-[#B89355]/40 rounded-3xl p-4 transition-all duration-500 shadow-sm hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Visual Image */}
                <div className="h-56 rounded-2xl bg-white relative overflow-hidden flex items-center justify-center border border-[#3C5A44]/5">
                  {productImg ? (
                    <img
                      src={productImg}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#B89355] via-[#8F6E35] to-[#3C5A44] flex items-center justify-center text-white/30 text-5xl font-serif">
                      A
                    </div>
                  )}

                  {/* Wishlist Button Overlay */}
                  <button
                    onClick={(e) => handleWishlistToggle(e, product)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/95 hover:bg-white text-gray-500 hover:text-red-500 border border-[#3C5A44]/5 shadow-sm transition-all duration-300 z-10 cursor-pointer"
                    title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                  >
                    <FiHeart
                      size={16}
                      className={isWishlisted ? "fill-red-500 text-red-500" : "transition-colors"}
                    />
                  </button>

                  <div className="absolute inset-0 bg-[#3C5A44]/5 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none" />
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
                <h3 className="text-lg font-serif text-[#3C5A44] mt-2 group-hover:text-[#B89355] transition duration-200 truncate">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-xs mt-1.5 leading-relaxed line-clamp-2">
                  {product.description}
                </p>
              </div>

              {/* Purchase Footer */}
              <div className="mt-5 pt-3 border-t border-[#3C5A44]/5 flex items-center justify-between">
                <span className="text-lg font-black text-[#B89355]">
                  ₹{product.price}
                </span>

                <button
                  onClick={(e) => handleQuickAdd(e, product)}
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-[#3C5A44] hover:bg-[#B89355] text-white text-[10px] font-black tracking-wider uppercase rounded-lg transition duration-300 shadow-sm active:scale-95 cursor-pointer"
                >
                  <FiShoppingBag size={12} />
                  <span>Add</span>
                </button>
              </div>
            </motion.div>
          );
        })}
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

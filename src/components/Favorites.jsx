import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ProductCard from "./ProductCard";
import ProductDetailsModal from "./ProductDetailsModal";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiHeart, FiShoppingBag, FiArrowRight } from "react-icons/fi";

export default function Favorites() {
  const { wishlistItems } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    document.title = "My Wishlist | Ayurelix";
  }, []);

  return (
    <div className="bg-white min-h-screen text-[#1A2B49] flex flex-col justify-between relative overflow-hidden">
      <Navbar />

      {/* Decorative background glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-[#B89355]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full bg-[#f4efe2]/60 blur-[120px] pointer-events-none" />

      <section className="max-w-7xl mx-auto py-32 px-4 sm:px-6 md:px-8 w-full flex-grow z-10 relative">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 space-y-4"
        >
          <span className="text-[#B89355] uppercase tracking-[0.25em] text-xs font-bold block">
            Your sacred selections
          </span>
          <h1
            className="text-[#1A2B49] text-5xl md:text-6xl font-black font-serif flex items-center justify-center gap-3"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            <FiHeart className="text-red-500 fill-red-500 animate-pulse" size={40} />
            <span>MY WISHLIST</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Keep track of your favorite Ayurvedic wellness formulations and daily skincare essentials.
          </p>
        </motion.div>

        {/* Wishlist Items Grid */}
        <AnimatePresence mode="wait">
          {wishlistItems.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="text-center py-20 bg-[#fbf9f4]/80 border border-[#1A2B49]/5 rounded-3xl max-w-lg mx-auto shadow-sm backdrop-blur-sm space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mx-auto shadow-inner">
                <FiHeart size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                  Your Wishlist is Empty
                </h3>
                <p className="text-gray-500 text-sm max-w-xs mx-auto mt-2 leading-relaxed">
                  Explore our premium, dynamic formulations and tap the heart icon on any product to save it here.
                </p>
              </div>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A2B49] hover:bg-[#B89355] text-white text-xs font-black tracking-wider uppercase rounded-xl transition duration-300 shadow-md hover:shadow-lg"
              >
                <span>Browse Products</span>
                <FiArrowRight size={14} />
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto"
            >
              {wishlistItems.map((product) => (
                <motion.div key={product.id} layout>
                  <ProductCard
                    product={product}
                    onView={(p) => setSelectedProduct(p)}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <Footer />

      {/* Dynamic Overlay Product Detail Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}

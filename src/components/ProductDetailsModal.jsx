import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { FiX, FiPlus, FiMinus, FiShoppingBag, FiCheck, FiShield, FiTruck, FiRefreshCw, FiAward } from "react-icons/fi";
import ProductReviews from "./ProductReviews";
import { getProductImage, getProductImages } from "../data/products";
import { motion } from "framer-motion";

export default function ProductDetailsModal({ product, isOpen, onClose }) {
  const { addToCart, setIsCartOpen } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (product) {
      setQuantity(product.stock <= 0 ? 0 : 1);
      setActiveImageIndex(0);
    }
  }, [product, isOpen]);

  if (!product || !isOpen) return null;

  const images = getProductImages(product.image_url, product.id, product.name);
  const activeImage = images[activeImageIndex] || getProductImage(product.image_url, product.id, product.name);

  const sellPrice = Number(product.price);
  const originalPrice = product.original_price ? Number(product.original_price) : 0;
  const hasDiscount = originalPrice > sellPrice;
  const discountPercent = hasDiscount 
    ? Math.round(((originalPrice - sellPrice) / originalPrice) * 100)
    : 0;
  const savings = hasDiscount ? (originalPrice - sellPrice) : 0;

  const handleAddToCart = () => {
    if (product.stock <= 0) return;
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
      setIsCartOpen(true);
    }, 600);
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal Container */}
      <div 
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl bg-white border border-[#1A2B49]/10 rounded-3xl overflow-y-auto shadow-2xl flex flex-col md:flex-row max-h-[92vh] md:max-h-[88vh] font-sans scrollbar-thin"
        >
          {/* Close Icon Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 md:right-6 md:top-6 p-2.5 rounded-full bg-white/80 hover:bg-white text-[#1A2B49] transition z-30 shadow-md border border-[#1A2B49]/10 cursor-pointer"
            aria-label="Close details"
          >
            <FiX size={18} />
          </button>

          {/* Left Side: Crisp Image Gallery Display */}
          <div className="w-full md:w-1/2 p-6 md:p-8 bg-[#FAF8F5] flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#1A2B49]/5 shrink-0">
            
            {/* Main Product Artwork Frame */}
            <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden bg-white border border-[#1A2B49]/5 shadow-inner flex items-center justify-center">
              {activeImage ? (
                <img
                  src={activeImage}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#B89355] to-[#1A2B49] flex items-center justify-center text-white text-6xl font-serif">
                  A
                </div>
              )}

              {/* Discount / Stock Badge Overlays */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                {hasDiscount && product.stock > 0 && (
                  <span className="bg-red-500 text-white text-[9px] font-black px-2.5 py-1 rounded-md shadow-sm uppercase tracking-wider">
                    {discountPercent}% OFF
                  </span>
                )}
                {product.stock <= 0 && (
                  <span className="bg-red-600 text-white text-[9px] font-black px-2.5 py-1 rounded-md shadow-sm uppercase tracking-wider">
                    Out of Stock
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Row */}
            {images.length > 1 && (
              <div className="flex gap-2.5 mt-4 overflow-x-auto py-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                      idx === activeImageIndex 
                        ? "border-[#B89355] scale-105 shadow-md" 
                        : "border-gray-200 hover:border-gray-400 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Micro Trust Seals below gallery */}
            <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-[#1A2B49]/5 text-[10px] text-gray-500 font-semibold">
              <div className="flex items-center gap-1.5">
                <FiAward className="text-[#B89355] text-sm shrink-0" />
                <span>100% Ayurvedic</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FiTruck className="text-[#B89355] text-sm shrink-0" />
                <span>Free Express Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Side: Product Specs, Pricing, Trust Signals & Action */}
          <div className="w-full md:w-1/2 flex flex-col bg-white h-auto">
            
            {/* Content Area */}
            <div className="p-6 md:p-8 space-y-6 flex-grow">
              
              {/* Category & Title */}
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#B89355] block mb-1">
                  Pure Organic Formulation
                </span>
                <h2 className="text-2xl md:text-3xl font-black font-serif text-[#1A2B49] leading-tight" style={{ fontFamily: "'Cinzel', serif" }}>
                  {product.name}
                </h2>
              </div>

              {/* Pricing & Rating */}
              <div className="pb-4 border-b border-[#1A2B49]/5 space-y-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-[#B89355] text-sm">★</span>
                  ))}
                  <span className="text-xs font-bold text-gray-400 ml-1.5">
                    5.0 (24 Verified Reviews)
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {hasDiscount && (
                    <span className="text-base text-gray-400 line-through font-medium">
                      ₹{originalPrice}
                    </span>
                  )}
                  <span className={`text-2xl font-black ${hasDiscount ? "text-emerald-700" : "text-[#B89355]"}`}>
                    ₹{sellPrice}
                  </span>
                  {hasDiscount && (
                    <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Save ₹{savings}
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2">
                  Formulation Details & Benefits
                </h4>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal whitespace-pre-line">
                  {product.description}
                </p>
              </div>

              {/* Customer Reviews Component */}
              <div className="border-t border-[#1A2B49]/5 pt-6">
                <ProductReviews productId={product.id} />
              </div>
            </div>

            {/* Sticky Bottom Action Bar */}
            <div className="sticky bottom-0 z-20 border-t border-[#1A2B49]/10 p-4 md:p-6 bg-[#FAF8F5] flex items-center justify-between gap-4 shrink-0 shadow-[0_-4px_15px_rgba(0,0,0,0.05)]">
              {product.stock > 0 && (
                <div className="flex items-center bg-white border border-[#1A2B49]/10 rounded-xl p-1 shrink-0 shadow-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:text-[#B89355] transition text-gray-500 cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <FiMinus size={14} />
                  </button>
                  <span className="px-3.5 text-sm font-bold text-[#1A2B49] min-w-[24px] text-center select-none">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock || 99, quantity + 1))}
                    className="p-2 hover:text-[#B89355] transition text-gray-500 cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <FiPlus size={14} />
                  </button>
                </div>
              )}

              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0 || added}
                className="flex-grow py-3.5 px-6 bg-[#1A2B49] hover:bg-[#B89355] disabled:bg-gray-300 text-white font-black rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
              >
                {product.stock <= 0 ? (
                  <span>Out of Stock</span>
                ) : added ? (
                  <>
                    <FiCheck className="text-lg" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <FiShoppingBag className="text-lg" />
                    <span>Add to Cart • ₹{sellPrice * quantity}</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </>
  );
}

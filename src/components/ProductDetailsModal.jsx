import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { FiX, FiPlus, FiMinus, FiShoppingBag, FiCheck } from "react-icons/fi";
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

  if (!product) return null;

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
    }, 800);
  };

  return (
    <>
      {isOpen && (
        <>
          <div
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />

          <div 
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl bg-white border border-[#1A2B49]/5 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh]"
            >
              <button
                onClick={onClose}
                className="absolute right-4 top-4 md:right-6 md:top-6 p-2 rounded-full bg-black/5 hover:bg-black/10 text-gray-500 hover:text-[#1A2B49] transition z-20 shadow-sm"
              >
                <FiX size={20} />
              </button>

              {/* Left Side: Images section */}
              <div className="w-full md:w-5/12 p-6 md:p-8 flex flex-col justify-between relative overflow-hidden h-64 md:h-auto border-b md:border-b-0 md:border-r border-[#1A2B49]/5 bg-[#fbf9f4] shrink-0">
                {activeImage ? (
                  <div className="absolute inset-0 z-0">
                    <img
                      src={activeImage}
                      alt={product.name}
                      className="w-full h-full object-cover transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                  </div>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#B89355] via-[#8F6E35] to-[#1A2B49] z-0" />
                    <div className="absolute inset-0 opacity-10 flex items-center justify-center scale-150 pointer-events-none z-0">
                      <svg width="200" height="200" viewBox="0 0 100 100" fill="none">
                        <circle cx="50" cy="50" r="40" stroke="#fbf9f4" strokeWidth="2" />
                      </svg>
                    </div>
                  </>
                )}
                
                {/* Thumbnails overlaid at the bottom of the image area */}
                <div className="z-10 text-white flex flex-col justify-end h-full gap-4">
                  {images.length > 1 && (
                    <div className="flex flex-wrap gap-2 mb-1">
                      {images.map((img, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveImageIndex(idx);
                          }}
                          className={`w-11 h-11 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                            idx === activeImageIndex ? "border-[#B89355] scale-105 shadow-md" : "border-white/40 hover:border-white"
                          }`}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                  <div>
                    <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#B89355] mb-1">
                      Premium Formulation
                    </span>
                    <h3 className="text-2xl font-black font-serif uppercase tracking-wide leading-tight" style={{ fontFamily: "'Cinzel', serif" }}>
                      {product.name}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Right Side: Details and Cart action */}
              <div className="w-full md:w-7/12 flex flex-col max-h-[calc(90vh-16rem)] md:max-h-[85vh] overflow-hidden bg-white">
                {/* Scrollable Content Area */}
                <div className="flex-grow overflow-y-auto p-6 md:p-8 space-y-6">
                  {/* Rating Stars & Pricing with Slide-in Animation */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col gap-2 pb-4 border-b border-[#1A2B49]/5"
                  >
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-[#B89355] text-xs">★</span>
                      ))}
                      <span className="text-[10px] text-gray-400 font-bold ml-1">
                        (Verified Reviews)
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {hasDiscount && (
                        <span className="text-sm md:text-base text-[#9CA3AF] line-through font-medium">
                          ₹{originalPrice}
                        </span>
                      )}
                      <motion.span 
                        whileHover={{ scale: 1.05 }}
                        className={`text-xl md:text-2xl font-black transition-colors duration-200 cursor-default ${
                          hasDiscount ? "text-emerald-700" : "text-[#B89355]"
                        }`}
                      >
                        ₹{sellPrice}
                      </motion.span>
                      {hasDiscount && (
                        <motion.span 
                          whileHover={{ scale: 1.08 }}
                          className="bg-red-500 text-white text-[9px] md:text-[10px] font-black px-2 py-0.5 rounded-lg shadow-sm tracking-wider uppercase cursor-default"
                        >
                          {discountPercent}% OFF
                        </motion.span>
                      )}
                    </div>
                    {hasDiscount && (
                      <p className="text-xs text-emerald-600 font-bold">
                        You Save ₹{savings} ({discountPercent}%)
                      </p>
                    )}
                  </motion.div>

                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-2">
                      Description
                    </span>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-line font-medium">
                      {product.description}
                    </p>
                  </div>

                  <div className="border-t border-[#1A2B49]/5 pt-6">
                    <ProductReviews productId={product.id} />
                  </div>
                </div>

                {/* Fixed Bottom Action Bar */}
                <div className="border-t border-[#1A2B49]/5 p-6 bg-[#fbf9f4] flex items-center justify-between gap-4 shrink-0">
                  {product.stock > 0 && (
                    <div className="flex items-center bg-white border border-[#1A2B49]/10 rounded-xl p-1 shrink-0">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 hover:text-[#B89355] transition text-gray-500 cursor-pointer"
                      >
                        <FiMinus size={14} />
                      </button>
                      <span className="px-4 text-sm font-bold text-[#1A2B49] min-w-[20px] text-center select-none">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        className="p-2 hover:text-[#B89355] transition text-gray-500 cursor-pointer"
                      >
                        <FiPlus size={14} />
                      </button>
                    </div>
                  )}

                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock <= 0 || added}
                    className="flex-grow py-3 px-6 bg-[#1A2B49] hover:bg-[#B89355] disabled:bg-gray-200 text-white font-black rounded-xl hover:shadow-md transition-all duration-300 disabled:opacity-50 text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {product.stock <= 0 ? (
                      <span>Out of Stock</span>
                    ) : added ? (
                      <>
                        <FiCheck className="text-lg" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <FiShoppingBag className="text-lg" />
                        <span>Add to Cart - ₹{product.price * quantity}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

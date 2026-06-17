import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { FiX, FiPlus, FiMinus, FiShoppingBag, FiCheck } from "react-icons/fi";
import ProductReviews from "./ProductReviews";
import { getProductImage } from "../data/products";

const productDetailsMap = {
  1: {
    ingredients: ["Saffron (Kumkuma)", "Sandalwood (Chandana)", "Manjistha", "Licorice (Yashtimadhu)", "Goat Milk & Sesame Oil Base"],
    benefits: [
      "Brightens skin complexion and reduces hyperpigmentation.",
      "Acts as a natural anti-aging serum, smoothing fine lines and wrinkles.",
      "Improves skin texture and adds a natural, youthful glow."
    ],
    usage: "Gently massage 3-4 drops of Kumkumadi Face Serum on clean face and neck in upward strokes before sleeping. Leave overnight for best results.",
    cautions: "For external use only. Oily/acne-prone skin types should start with 1-2 drops."
  },
  2: {
    ingredients: ["Lodhra Extract", "Neem Bark Powder", "Turmeric Root", "Multani Mitti (Fuller's Earth)", "Rose Water Extract"],
    benefits: [
      "Targeted action against dark spots, pigmentation, and acne scars.",
      "Intensively brightens skin and evens out skin tone.",
      "Absorbs excess oil and tightens pores for a smooth skin texture."
    ],
    usage: "Mix 1 tablespoon of Face Pack with water or rose water to form a smooth paste. Apply evenly to face and neck, avoiding eyes. Leave for 15 minutes, then rinse with cool water.",
    cautions: "Patch test recommended before first use. Avoid contact with eyes."
  }
};

export default function ProductDetailsModal({ product, isOpen, onClose }) {
  const { addToCart, setIsCartOpen } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const info = productDetailsMap[product.id] || {
    ingredients: ["Traditional Ayurvedic Herbs"],
    benefits: ["Promotes general wellness, vitality, and balance in skin and body systems."],
    usage: "As directed by an Ayurvedic practitioner.",
    cautions: "Keep out of reach of children."
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
      setIsCartOpen(true); // Open the cart drawer to show the item was added
    }, 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div 
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              className="relative w-full max-w-3xl bg-white border border-[#3C5A44]/5 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh]"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 md:right-6 md:top-6 p-2 rounded-full bg-black/5 hover:bg-black/10 text-gray-500 hover:text-[#3C5A44] transition z-20"
              >
                <FiX size={20} />
              </button>

              {/* Product Visual Area */}
              <div className="w-full md:w-5/12 p-6 md:p-8 flex flex-col justify-between relative overflow-hidden h-48 md:h-auto border-b md:border-b-0 md:border-r border-[#3C5A44]/5 bg-[#fbf9f4] shrink-0">
                {product.image_url ? (
                  <div className="absolute inset-0 z-0">
                    <img
                      src={getProductImage(product.image_url)}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  </div>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#B89355] via-[#8F6E35] to-[#3C5A44] z-0" />
                    <div className="absolute inset-0 opacity-10 flex items-center justify-center scale-150 pointer-events-none z-0">
                      <svg width="200" height="200" viewBox="0 0 100 100" fill="none">
                        <circle cx="50" cy="50" r="40" stroke="#fbf9f4" strokeWidth="2" />
                      </svg>
                    </div>
                  </>
                )}

                <div className="z-10 relative">
                  <span className="text-[11px] tracking-[0.2em] font-serif uppercase text-white bg-white/15 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                    Pure Formulation
                  </span>
                  <h3 className="text-3xl md:text-4xl font-serif font-black text-white mt-4 leading-tight" style={{ fontFamily: "'Cinzel', serif" }}>
                    {product.name}
                  </h3>
                </div>

                <div className="z-10 relative mt-auto text-white pt-16">
                  <p className="text-3xl font-bold text-white">₹{product.price}</p>
                </div>
              </div>

              {/* Product Details Section */}
              <div className="w-full md:w-7/12 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[calc(90vh-12rem)] md:max-h-none">

                <div className="space-y-6">
                  {/* Ingredients */}
                  <div>
                    <h4 className="text-xs uppercase tracking-[0.2em] text-[#B89355] font-bold mb-2">Key Ingredients</h4>
                    <div className="flex flex-wrap gap-2">
                      {info.ingredients.map((ing, i) => (
                        <span key={i} className="text-xs bg-[#fbf9f4] text-[#3C5A44] px-3 py-1.5 rounded-lg border border-[#3C5A44]/5">
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h4 className="text-xs uppercase tracking-[0.2em] text-[#B89355] font-bold mb-2">Key Benefits</h4>
                    <ul className="space-y-2">
                      {info.benefits.map((benefit, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-start gap-2 leading-relaxed">
                          <span className="text-[#B89355] mt-1 shrink-0">•</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* How to use */}
                  <div>
                    <h4 className="text-xs uppercase tracking-[0.2em] text-[#B89355] font-bold mb-1.5">How To Use</h4>
                    <p className="text-sm text-gray-600 leading-relaxed bg-[#fbf9f4] p-3 rounded-xl border border-[#3C5A44]/5">
                      {info.usage}
                    </p>
                  </div>

                  {/* Safety Info */}
                  <p className="text-[11px] text-gray-500 italic">
                    *Caution: {info.cautions}
                  </p>

                  {/* Product Reviews */}
                  <ProductReviews productId={product.id} />
                </div>

                {/* Purchase Area */}
                <div className="mt-8 pt-6 border-t border-[#3C5A44]/10 flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex items-center bg-[#fbf9f4] border border-[#3C5A44]/10 rounded-xl p-1">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="p-2 hover:text-[#B89355] text-gray-500 transition"
                    >
                      <FiMinus size={14} />
                    </button>
                    <span className="px-4 text-base font-bold text-[#3C5A44]">{quantity}</span>
                    <button
                      onClick={() => setQuantity(q => q + 1)}
                      className="p-2 hover:text-[#B89355] text-gray-500 transition"
                    >
                      <FiPlus size={14} />
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    disabled={added}
                    className="flex-grow py-3 px-8 bg-[#3C5A44] hover:bg-[#B89355] text-white font-black rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition duration-200"
                  >
                    {added ? (
                      <>
                        <FiCheck className="text-lg" />
                        <span>Added to Cart</span>
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
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

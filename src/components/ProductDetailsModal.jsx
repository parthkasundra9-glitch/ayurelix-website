import { useState, useEffect } from "react";
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

  useEffect(() => {
    if (product) {
      setQuantity(product.stock <= 0 ? 0 : 1);
    }
  }, [product, isOpen]);

  if (!product) return null;

  const info = productDetailsMap[product.id] || {
    ingredients: ["Traditional Ayurvedic Herbs"],
    benefits: ["Promotes general wellness, vitality, and balance in skin and body systems."],
    usage: "As directed by an Ayurvedic practitioner.",
    cautions: "Keep out of reach of children."
  };

  const handleAddToCart = () => {
    if (product.stock <= 0) return;
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
      setIsCartOpen(true); // Open the cart drawer to show the item was added
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
                className="absolute right-4 top-4 md:right-6 md:top-6 p-2 rounded-full bg-black/5 hover:bg-black/10 text-gray-500 hover:text-[#1A2B49] transition z-20"
              >
                <FiX size={20} />
              </button>

              <div className="w-full md:w-5/12 p-6 md:p-8 flex flex-col justify-between relative overflow-hidden h-48 md:h-auto border-b md:border-b-0 md:border-r border-[#1A2B49]/5 bg-[#fbf9f4] shrink-0">
                {getProductImage(product.image_url, product.id, product.name) ? (
                  <div className="absolute inset-0 z-0">
                    <img
                      src={getProductImage(product.image_url, product.id, product.name)}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
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
                
                <div className="z-10 text-white flex flex-col justify-end h-full">
                  <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#B89355] mb-1">
                    Premium Formulation
                  </span>
                  <h3 className="text-2xl font-black font-serif uppercase tracking-wide leading-tight" style={{ fontFamily: "'Cinzel', serif" }}>
                    {product.name}
                  </h3>
                </div>
              </div>

              <div className="w-full md:w-7/12 p-6 md:p-8 overflow-y-auto max-h-[calc(90vh-12rem)] md:max-h-[85vh] flex flex-col justify-between">
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mb-1">
                      Overview
                    </span>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mb-2">
                      Key Botanicals
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {info.ingredients.map((ing, idx) => (
                        <span key={idx} className="bg-[#FAF8F5] border border-[#1A2B49]/5 px-2.5 py-1 rounded-lg text-[10px] text-[#1A2B49] font-medium">
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mb-2">
                      Ayurvedic Benefits
                    </span>
                    <ul className="list-disc pl-4 space-y-1 text-xs text-gray-600">
                      {info.benefits.map((benefit, idx) => (
                        <li key={idx} className="leading-relaxed">{benefit}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mb-1">
                      Daily Ritual
                    </span>
                    <p className="text-xs text-gray-600 leading-relaxed italic bg-[#FAF8F5] border-l-2 border-[#B89355] p-3 rounded-r-xl">
                      {info.usage}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mb-1">
                      Cautions
                    </span>
                    <p className="text-[10px] text-gray-500 leading-relaxed">
                      {info.cautions}
                    </p>
                  </div>

                  <div className="border-t border-[#1A2B49]/5 pt-6">
                    <ProductReviews productId={product.id} />
                  </div>
                </div>

                <div className="border-t border-[#1A2B49]/5 pt-6 mt-8 flex items-center justify-between gap-4">
                  {product.stock > 0 && (
                    <div className="flex items-center bg-[#FAF8F5] border border-[#1A2B49]/10 rounded-xl p-1 shrink-0">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 hover:text-[#B89355] transition text-gray-500"
                      >
                        <FiMinus size={14} />
                      </button>
                      <span className="px-4 text-sm font-bold text-[#1A2B49] min-w-[20px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        className="p-2 hover:text-[#B89355] transition text-gray-500"
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

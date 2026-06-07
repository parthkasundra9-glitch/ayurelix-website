import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { FiX, FiPlus, FiMinus, FiShoppingBag, FiCheck } from "react-icons/fi";
import ProductReviews from "./ProductReviews";

const productDetailsMap = {
  1: {
    ingredients: ["Organic Ashwagandha Root", "Wildcrafted Giloy (Guduchi)", "Amalaki (Amla) Fruit", "Tulsi (Holy Basil) Leaf"],
    dosha: "Vata & Kapha Balancing",
    benefits: [
      "Enhances natural immune response and white blood cell defense.",
      "Reduces physical and mental stress by lowering cortisol.",
      "Supports sustainable stamina and energy levels without caffeine crashes."
    ],
    usage: "Take 1-2 capsules daily with warm milk or water, preferably after breakfast.",
    cautions: "Consult a physician if pregnant, nursing, or taking blood thinners."
  },
  2: {
    ingredients: ["Extract of Bhringraj (False Daisy)", "Brahmi Leaf Extract", "Amla (Gooseberry)", "Cold-pressed Sesame & Coconut Base Oil"],
    dosha: "Pitta Soothing & Cool-down",
    benefits: [
      "Strengthens hair roots from the follicle, reducing hair fall and thinning.",
      "Cools the mind, reduces stress, and promotes deep, restful sleep.",
      "Prevents premature graying and nourishes dry, itchy scalps."
    ],
    usage: "Gently massage oil into scalp in circular motions. Leave for at least 45 minutes (or overnight) before washing with a sulfate-free shampoo.",
    cautions: "External use only. Avoid contact with eyes."
  },
  3: {
    ingredients: ["Haritaki Fruit", "Bibhitaki Fruit", "Amalaki Fruit", "Purified Ginger & Neem Bark"],
    dosha: "Tridoshic (Balances Vata, Pitta, & Kapha)",
    benefits: [
      "Assists natural internal detoxification and supports digestive regularity.",
      "Purifies blood and eliminates accumulated metabolic toxins (Ama).",
      "Cleanses the skin from within, promoting a healthy, radiant complexion."
    ],
    usage: "Mix 1/2 to 1 teaspoon of powder in a cup of warm water and drink before bedtime, or take 2 capsules after dinner.",
    cautions: "Not recommended for children under 12 years of age."
  }
};

export default function ProductDetailsModal({ product, isOpen, onClose }) {
  const { addToCart, setIsCartOpen } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const info = productDetailsMap[product.id] || {
    ingredients: ["Traditional Ayurvedic Herbs"],
    dosha: "Tridoshic Balance",
    benefits: ["Promotes general wellness, vitality, and balance in body systems."],
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
              className="relative w-full max-w-4xl bg-white border border-[#0e1a30]/5 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute right-6 top-6 p-2 rounded-full bg-black/5 hover:bg-black/10 text-gray-500 hover:text-[#0e1a30] transition z-10"
              >
                <FiX size={20} />
              </button>

              {/* Product Visual Area */}
              <div className="w-full md:w-5/12 bg-gradient-to-br from-[#c5a059] via-[#9c772c] to-[#0e1a30] p-8 flex flex-col justify-between relative overflow-hidden min-h-[300px] md:min-h-auto">
                {/* Wreath decoration background */}
                <div className="absolute inset-0 opacity-10 flex items-center justify-center scale-150 pointer-events-none">
                  <svg width="200" height="200" viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="50" r="40" stroke="#fbf9f4" strokeWidth="2" />
                  </svg>
                </div>

                <div>
                  <span className="text-[11px] tracking-[0.2em] font-serif uppercase text-[#fbf9f4]/80 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                    Pure Formulation
                  </span>
                  <h3 className="text-3xl md:text-4xl font-serif font-black text-[#fbf9f4] mt-4 leading-tight" style={{ fontFamily: "'Cinzel', serif" }}>
                    {product.name}
                  </h3>
                </div>

                <div className="z-10">
                  <p className="text-[#fbf9f4]/80 text-sm font-semibold tracking-wider">Ayurvedic suitability</p>
                  <p className="text-xl text-[#fbf9f4] font-bold font-serif mt-1">{info.dosha}</p>
                  <p className="text-3xl font-bold text-[#fbf9f4] mt-6">₹{product.price}</p>
                </div>
              </div>

              {/* Product Details Section */}
              <div className="w-full md:w-7/12 p-8 md:p-10 flex flex-col justify-between max-h-[85vh] md:max-h-none overflow-y-auto">

                <div className="space-y-6">
                  {/* Ingredients */}
                  <div>
                    <h4 className="text-xs uppercase tracking-[0.2em] text-[#c5a059] font-bold mb-2">Key Ingredients</h4>
                    <div className="flex flex-wrap gap-2">
                      {info.ingredients.map((ing, i) => (
                        <span key={i} className="text-xs bg-[#fbf9f4] text-[#0e1a30] px-3 py-1.5 rounded-lg border border-[#0e1a30]/5">
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h4 className="text-xs uppercase tracking-[0.2em] text-[#c5a059] font-bold mb-2">Key Benefits</h4>
                    <ul className="space-y-2">
                      {info.benefits.map((benefit, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-start gap-2 leading-relaxed">
                          <span className="text-[#c5a059] mt-1 shrink-0">•</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* How to use */}
                  <div>
                    <h4 className="text-xs uppercase tracking-[0.2em] text-[#c5a059] font-bold mb-1.5">How To Use</h4>
                    <p className="text-sm text-gray-600 leading-relaxed bg-[#fbf9f4] p-3 rounded-xl border border-[#0e1a30]/5">
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
                <div className="mt-8 pt-6 border-t border-[#0e1a30]/10 flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex items-center bg-[#fbf9f4] border border-[#0e1a30]/10 rounded-xl p-1">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="p-2 hover:text-[#c5a059] text-gray-500 transition"
                    >
                      <FiMinus size={14} />
                    </button>
                    <span className="px-4 text-base font-bold text-[#0e1a30]">{quantity}</span>
                    <button
                      onClick={() => setQuantity(q => q + 1)}
                      className="p-2 hover:text-[#c5a059] text-gray-500 transition"
                    >
                      <FiPlus size={14} />
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    disabled={added}
                    className="flex-grow py-3 px-8 bg-[#0e1a30] hover:bg-[#c5a059] text-white font-black rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition duration-200"
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

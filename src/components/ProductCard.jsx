import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { FiShoppingBag, FiEye } from "react-icons/fi";
import { getProductImage } from "../data/products";

export default function ProductCard({ product, onView }) {
  const { addToCart, setIsCartOpen } = useCart();

  // Distinct gradients representing formulations
  const gradients = {
    1: "from-[#B89355] via-[#8F6E35] to-[#3C5A44]", // Immunity (Warm Earthy Gold)
    2: "from-[#a0c559] via-[#B89355] to-[#3C5A44]", // Hair Care (Fresh Herbal Gold)
    3: "from-[#c55959] via-[#B89355] to-[#3C5A44]"  // Detox (Fiery Deep Gold)
  }[product.id] || "from-[#B89355] via-[#8F6E35] to-[#3C5A44]";

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsCartOpen(true);
  };

  return (
    <motion.div
      whileHover={{
        y: -10,
        boxShadow: "0 20px 40px rgba(14, 26, 48, 0.06), 0 0 20px rgba(197,160,89,0.05)"
      }}
      onClick={() => onView(product)}
      className="
      bg-[#fbf9f4]
      backdrop-blur-xl
      border border-[#3C5A44]/5
      hover:border-[#B89355]/40
      rounded-3xl
      p-6
      cursor-pointer
      transition-all duration-300
      flex flex-col justify-between
      h-full
      group
      "
    >
      <div>
        {/* Product Visual */}
        {/* Product Visual */}
        <div className="h-56 rounded-2xl bg-[#fbf9f4] relative overflow-hidden flex items-center justify-center border border-[#3C5A44]/5">
          {product.image_url ? (
            <img
              src={getProductImage(product.image_url)}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${gradients} flex items-center justify-center`}>
              {/* Subtle logo wreath outline on the card visual */}
              <div className="absolute inset-0 opacity-10 flex items-center justify-center scale-110 pointer-events-none">
                <svg width="150" height="150" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="40" stroke="#fbf9f4" strokeWidth="2" />
                </svg>
              </div>
              <div className="text-white/30 text-7xl font-serif select-none" style={{ fontFamily: "'Cinzel', serif" }}>
                A
              </div>
            </div>
          )}

          {/* Quick Hover Overlay */}
          <div className="absolute inset-0 bg-white/70 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition duration-300">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                onView(product);
              }}
              className="w-12 h-12 rounded-full bg-white text-[#3C5A44] flex items-center justify-center shadow-lg border border-[#3C5A44]/5"
            >
              <FiEye size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleQuickAdd}
              className="w-12 h-12 rounded-full bg-[#B89355] text-white flex items-center justify-center shadow-lg font-bold"
            >
              <FiShoppingBag size={18} />
            </motion.button>
          </div>
        </div>

        <h2 className="text-[#3C5A44] text-2xl font-serif mt-5 group-hover:text-[#B89355] transition duration-200">
          {product.name}
        </h2>

        <p className="text-gray-600 text-sm mt-2.5 leading-relaxed">
          {product.description}
        </p>
      </div>

      <div>
        <p className="text-[#B89355] mt-4 text-3xl font-bold">
          ₹{product.price}
        </p>

        <div className="grid grid-cols-5 gap-2 mt-5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onView(product);
            }}
            className="
            col-span-3
            py-3
            border border-[#B89355]
            text-[#B89355]
            hover:bg-[#B89355] hover:text-white
            rounded-xl
            font-bold text-sm
            transition duration-300
            "
          >
            Details
          </button>
          <button
            onClick={handleQuickAdd}
            className="
            col-span-2
            py-3
            bg-[#3C5A44] hover:bg-[#B89355]
            text-white
            rounded-xl
            font-black text-sm
            flex items-center justify-center gap-1.5
            transition duration-300
            "
          >
            <FiShoppingBag size={14} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}


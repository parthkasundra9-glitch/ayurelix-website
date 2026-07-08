import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { FiShoppingBag, FiHeart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { getProductImage } from "../data/products";

export default function ProductCard({ product, onView, isGrid = false }) {
  const { addToCart, setIsCartOpen, toggleWishlist, isInWishlist } = useCart();

  const isWishlisted = isInWishlist(product.id);
  const rating = product.rating || 5.0;
  const reviewsCount = product.reviews || 18;
  const isEven = product.id % 2 === 0;

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    if (product.stock <= 0) return;
    addToCart(product, 1);
    setIsCartOpen(true);
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const cardWidthClass = isGrid 
    ? "w-full" 
    : "w-[170px] sm:w-[280px] shrink-0";

  return (
    <motion.div
      whileHover={{ y: -6 }}
      onClick={() => onView(product)}
      className={`${cardWidthClass} group cursor-pointer bg-white border border-slate-100 rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 transition-all duration-300 shadow-[0_4px_15px_rgba(26,43,73,0.02)] hover:shadow-[0_12px_30px_rgba(26,43,73,0.06)] flex flex-col justify-between`}
    >
      <div>
        {/* Image Container with Badges */}
        <div className="h-36 sm:h-64 rounded-xl sm:rounded-2xl bg-[#FAF8F5] relative overflow-hidden flex items-center justify-center border border-slate-50">
          
          {/* Golden Ribbon Tag (New Launch / Best Seller) */}
          <div className="absolute top-0 left-0 bg-[#B89355] text-white text-[7px] sm:text-[8px] font-bold uppercase tracking-wider px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-br-lg rounded-tl-xl sm:rounded-tl-2xl z-10">
            {product.is_bestseller ? "Best Seller" : isEven ? "New Formula" : "New Launch"}
          </div>

          {product.stock <= 0 && (
            <div className="absolute top-2 left-2 bg-[#c55959]/90 backdrop-blur-sm text-white text-[7px] sm:text-[8px] font-bold uppercase tracking-wider px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded shadow-sm z-10">
              Out of Stock
            </div>
          )}

          {getProductImage(product.image_url, product.id, product.name) ? (
            <img
              src={getProductImage(product.image_url, product.id, product.name)}
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
            onClick={handleWishlistToggle}
            className="absolute top-2 right-2 p-1.5 sm:p-2 rounded-full bg-white hover:bg-slate-50 text-gray-500 hover:text-red-500 shadow-sm border border-slate-100 transition-all duration-300 z-10 cursor-pointer"
            title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            <FiHeart
              size={12}
              className={isWishlisted ? "fill-red-500 text-red-500" : "transition-colors"}
            />
          </button>

          {/* Shopping Bag Overlay Quick-Add Circle */}
          {product.stock > 0 && (
            <button
              onClick={handleQuickAdd}
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

        {/* Product Title & Short Info */}
        <h3 className="text-xs sm:text-base font-serif font-bold text-[#1A2B49] mt-1 sm:mt-2 group-hover:text-[#B89355] transition duration-200 truncate">
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
          onClick={handleQuickAdd}
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
}

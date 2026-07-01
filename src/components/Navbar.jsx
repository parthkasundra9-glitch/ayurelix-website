import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import { useCart } from "../context/CartContext";
import { FiShoppingBag, FiHeart, FiUser, FiShield, FiMenu, FiX, FiSearch, FiChevronDown } from "react-icons/fi";
import { supabase } from "../supabaseClient";

export default function Navbar() {
  const { setIsCartOpen, cartCount, wishlistCount } = useCart();
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user: currentUser } }) => {
      setUser(currentUser);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data, error } = await supabase
          .from("categories")
          .select("*")
          .order("name", { ascending: true });
        if (data) {
          setCategories(data);
        }
      } catch (err) {
        console.error("Error fetching categories for navbar:", err);
      }
    }
    fetchCategories();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMenuOpen(false);
    }
  };

  const isAdmin = user?.email === "admin@ayurelix.com";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="
      fixed top-0 left-0 right-0 z-40
      bg-white/95 shadow-sm backdrop-blur-md
      border-b border-[#1A2B49]/5
      "
    >
      {/* ---------------- DESKTOP HEADER (Double Row) ---------------- */}
      <div className="hidden lg:block">
        {/* Upper Row: Logo, Search, Action Buttons */}
        <div className="max-w-7xl mx-auto px-8 py-2.5 flex justify-between items-center border-b border-[#1A2B49]/5">
          {/* Left: Brand Logo */}
          <Link to="/" className="outline-none">
            <Logo size="sm" variant="gold" showText={true} />
          </Link>

          {/* Center: Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md mx-8">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search premium Ayurvedic formulations..."
              className="w-full bg-[#FAF8F5] border border-[#1A2B49]/10 rounded-full px-5 py-2.5 pl-11 text-sm text-[#1A2B49] focus:outline-none focus:border-[#B89355] focus:ring-1 focus:ring-[#B89355] shadow-inner transition duration-300"
            />
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-base" />
            <button type="submit" className="hidden">Search</button>
          </form>

          {/* Right: Actions (Wishlist, Cart, Profile, Admin) */}
          <div className="flex items-center gap-6">
            {/* Wishlist Icon Button */}
            <Link
              to="/wishlist"
              className="relative p-2 rounded-full hover:bg-black/5 text-[#1A2B49] hover:text-red-500 transition duration-300 outline-none"
              title="My Wishlist"
            >
              <FiHeart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Icon Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full hover:bg-black/5 text-[#1A2B49] hover:text-[#B89355] transition duration-300 outline-none cursor-pointer"
              title="Shopping Cart"
            >
              <FiShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#B89355] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Auth Menu */}
            {user ? (
              <div className="flex items-center gap-4 border-l border-black/10 pl-4">
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#B89355]/10 border border-[#B89355]/20 text-[#B89355] hover:bg-[#B89355]/20 transition duration-300 text-xs font-bold uppercase tracking-wider"
                  >
                    <FiShield size={13} />
                    <span>Admin</span>
                  </Link>
                )}
                
                <Link
                  to="/profile"
                  className="flex items-center gap-1.5 text-gray-600 hover:text-[#1A2B49] transition duration-300 text-sm font-semibold"
                >
                  <FiUser size={16} className="text-[#B89355]" />
                  <span className="max-w-[80px] truncate">
                    {user.user_metadata?.full_name || user.email.split("@")[0]}
                  </span>
                </Link>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-5 py-2.5 rounded-full bg-[#1A2B49] hover:bg-[#B89355] text-white font-bold text-sm transition duration-300 shadow-md"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Lower Row: Centered Navigation Links */}
        <div className="max-w-7xl mx-auto px-8 py-1.5 flex justify-center gap-10 text-[#1A2B49] text-sm font-bold uppercase tracking-wider">
          <Link to="/" className="hover:text-[#B89355] transition duration-300">
            Home
          </Link>
          <Link to="/products" className="hover:text-[#B89355] transition duration-300">
            Products
          </Link>
          <div 
            className="relative"
            onMouseEnter={() => setIsCategoriesDropdownOpen(true)}
            onMouseLeave={() => setIsCategoriesDropdownOpen(false)}
          >
            <button className="hover:text-[#B89355] transition duration-300 cursor-pointer uppercase font-bold text-sm flex items-center gap-1">
              <span>Categories</span>
              <FiChevronDown size={14} className={`transition-transform duration-300 ${isCategoriesDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            
            <AnimatePresence>
              {isCategoriesDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-1/2 -translate-x-1/2 mt-2 w-56 bg-white border border-[#1A2B49]/10 rounded-2xl shadow-xl py-3 z-50 overflow-hidden text-left"
                >
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/products?category=${cat.id}`}
                      onClick={() => setIsCategoriesDropdownOpen(false)}
                      className="block px-6 py-2.5 text-xs text-gray-700 hover:bg-[#FAF8F5] hover:text-[#B89355] transition duration-150 font-bold normal-case"
                    >
                      {cat.name}
                    </Link>
                  ))}
                  {categories.length === 0 && (
                    <span className="block px-6 py-2.5 text-xs text-gray-400 italic">
                      No categories found
                    </span>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link to="/about" className="hover:text-[#B89355] transition duration-300">
            About
          </Link>
          <Link to="/contact" className="hover:text-[#B89355] transition duration-300">
            Contact
          </Link>
        </div>
      </div>

      {/* ---------------- MOBILE HEADER (Single Row) ---------------- */}
      <div className="lg:hidden max-w-7xl mx-auto px-4 py-1.5 flex justify-between items-center">
        
        {/* Left: Brand Logo */}
        <Link to="/" className="outline-none" onClick={() => setIsMenuOpen(false)}>
          <Logo size="sm" variant="gold" showText={true} />
        </Link>

        {/* Right: Hamburger & Cart icons */}
        <div className="flex items-center gap-3">
          
          {/* Wishlist Link */}
          <Link
            to="/wishlist"
            className="relative p-1.5 rounded-full hover:bg-black/5 text-[#1A2B49] transition outline-none"
            title="Wishlist"
          >
            <FiHeart size={20} />
            {wishlistCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[8px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart Icon Toggle */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-1.5 rounded-full hover:bg-black/5 text-[#1A2B49] transition outline-none cursor-pointer"
          >
            <FiShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-[#B89355] text-white text-[8px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Toggle Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1.5 rounded-full hover:bg-black/5 text-[#1A2B49] transition cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* ---------------- MOBILE DRAWER MENU ---------------- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-[#1A2B49]/5 bg-white px-6 py-6 flex flex-col gap-6 shadow-inner"
          >
            {/* Mobile Search input */}
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-[#FAF8F5] border border-[#1A2B49]/10 rounded-full px-5 py-2.5 pl-11 text-sm text-[#1A2B49] focus:outline-none focus:border-[#B89355]"
              />
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-base" />
            </form>

            {/* Mobile Nav Links */}
            <div className="flex flex-col gap-4 text-base font-bold text-[#1A2B49]">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-[#B89355] py-2 border-b border-[#1A2B49]/5 transition"
              >
                Home
              </Link>
              <Link
                to="/products"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-[#B89355] py-2 border-b border-[#1A2B49]/5 transition"
              >
                Products
              </Link>
              <div>
                <button
                  onClick={() => setIsMobileCategoriesOpen(!isMobileCategoriesOpen)}
                  className="w-full text-left font-bold text-base hover:text-[#B89355] py-2 border-b border-[#1A2B49]/5 transition bg-transparent cursor-pointer flex justify-between items-center"
                >
                  <span>Categories</span>
                  <FiChevronDown size={16} className={`transition-transform duration-300 ${isMobileCategoriesOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {isMobileCategoriesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pl-4 flex flex-col gap-2.5 mt-2.5 border-l border-[#1A2B49]/10"
                    >
                      {categories.map((cat) => (
                        <Link
                          key={cat.id}
                          to={`/products?category=${cat.id}`}
                          onClick={() => {
                            setIsMenuOpen(false);
                            setIsMobileCategoriesOpen(false);
                          }}
                          className="text-sm text-gray-600 hover:text-[#B89355] py-1 transition font-bold"
                        >
                          {cat.name}
                        </Link>
                      ))}
                      {categories.length === 0 && (
                        <span className="text-sm text-gray-400 italic py-1">
                          No categories found
                        </span>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Link
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-[#B89355] py-2 border-b border-[#1A2B49]/5 transition"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-[#B89355] py-2 border-b border-[#1A2B49]/5 transition"
              >
                Contact
              </Link>
            </div>

            {/* Auth & Account actions in mobile drawer */}
            {user ? (
              <div className="flex flex-col gap-4 pt-2">
                <div className="flex items-center gap-3 text-[#1A2B49]">
                  <FiUser size={18} className="text-[#B89355]" />
                  <span className="font-semibold">{user.user_metadata?.full_name || user.email.split("@")[0]}</span>
                </div>

                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#B89355]/10 border border-[#B89355]/20 text-[#B89355] font-bold text-sm uppercase tracking-wider"
                  >
                    <FiShield size={16} />
                    <span>Admin Dashboard</span>
                  </Link>
                )}

                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[#1A2B49]/10 text-[#1A2B49] font-bold text-sm"
                >
                  My Profile
                </Link>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="w-full py-3 bg-[#1A2B49] hover:bg-[#B89355] text-white text-center font-black rounded-xl text-sm uppercase tracking-wider transition shadow-md"
              >
                Login / Register
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

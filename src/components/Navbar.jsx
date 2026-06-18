import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import { useCart } from "../context/CartContext";
import { FiShoppingBag, FiHeart, FiUser, FiLogOut, FiShield, FiMenu, FiX, FiSearch } from "react-icons/fi";
import { supabase } from "../supabaseClient";

export default function Navbar() {
  const { setIsCartOpen, cartCount, wishlistCount } = useCart();
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsMenuOpen(false);
    navigate("/");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMenuOpen(false);
    }
  };

  const handleCategoryClick = () => {
    setIsMenuOpen(false);
    const section = document.getElementById("category-section") || document.getElementById("featured-products-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/#featured-products-section");
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
      border-b border-[#3C5A44]/5
      "
    >
      {/* ---------------- DESKTOP HEADER (Double Row) ---------------- */}
      <div className="hidden lg:block">
        {/* Upper Row: Logo, Search, Action Buttons */}
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center border-b border-[#3C5A44]/5">
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
              className="w-full bg-[#FAF8F5] border border-[#3C5A44]/10 rounded-full px-5 py-2.5 pl-11 text-sm text-[#3C5A44] focus:outline-none focus:border-[#B89355] focus:ring-1 focus:ring-[#B89355] shadow-inner transition duration-300"
            />
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-base" />
            <button type="submit" className="hidden">Search</button>
          </form>

          {/* Right: Actions (Wishlist, Cart, Profile, Admin) */}
          <div className="flex items-center gap-6">
            {/* Wishlist Icon Button */}
            <Link
              to="/profile?tab=wishlist"
              className="relative p-2 rounded-full hover:bg-black/5 text-[#3C5A44] hover:text-red-500 transition duration-300 outline-none"
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
              className="relative p-2 rounded-full hover:bg-black/5 text-[#3C5A44] hover:text-[#B89355] transition duration-300 outline-none cursor-pointer"
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
                  className="flex items-center gap-1.5 text-gray-600 hover:text-[#3C5A44] transition duration-300 text-sm font-semibold"
                >
                  <FiUser size={16} className="text-[#B89355]" />
                  <span className="max-w-[80px] truncate">
                    {user.user_metadata?.full_name || user.email.split("@")[0]}
                  </span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="p-2 rounded-full hover:bg-red-500/10 text-gray-500 hover:text-red-600 transition duration-300 cursor-pointer"
                  title="Sign Out"
                >
                  <FiLogOut size={16} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-5 py-2.5 rounded-full bg-[#3C5A44] hover:bg-[#B89355] text-white font-bold text-sm transition duration-300 shadow-md"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Lower Row: Centered Navigation Links */}
        <div className="max-w-7xl mx-auto px-8 py-3 flex justify-center gap-10 text-[#3C5A44] text-sm font-bold uppercase tracking-wider">
          <Link to="/" className="hover:text-[#B89355] transition duration-300">
            Home
          </Link>
          <Link to="/products" className="hover:text-[#B89355] transition duration-300">
            Products
          </Link>
          <button onClick={handleCategoryClick} className="hover:text-[#B89355] transition duration-300 cursor-pointer uppercase font-bold text-sm">
            Categories
          </button>
          <Link to="/about" className="hover:text-[#B89355] transition duration-300">
            About
          </Link>
          <Link to="/contact" className="hover:text-[#B89355] transition duration-300">
            Contact
          </Link>
        </div>
      </div>

      {/* ---------------- MOBILE HEADER (Single Row) ---------------- */}
      <div className="lg:hidden max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Left: Brand Logo */}
        <Link to="/" className="outline-none" onClick={() => setIsMenuOpen(false)}>
          <Logo size="sm" variant="gold" showText={true} />
        </Link>

        {/* Right: Hamburger & Cart icons */}
        <div className="flex items-center gap-3">
          
          {/* Wishlist Link */}
          <Link
            to="/profile?tab=wishlist"
            className="relative p-1.5 rounded-full hover:bg-black/5 text-[#3C5A44] transition outline-none"
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
            className="relative p-1.5 rounded-full hover:bg-black/5 text-[#3C5A44] transition outline-none cursor-pointer"
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
            className="p-1.5 rounded-full hover:bg-black/5 text-[#3C5A44] transition cursor-pointer"
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
            className="lg:hidden border-t border-[#3C5A44]/5 bg-white px-6 py-6 flex flex-col gap-6 shadow-inner"
          >
            {/* Mobile Search input */}
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-[#FAF8F5] border border-[#3C5A44]/10 rounded-full px-5 py-2.5 pl-11 text-sm text-[#3C5A44] focus:outline-none focus:border-[#B89355]"
              />
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-base" />
            </form>

            {/* Mobile Nav Links */}
            <div className="flex flex-col gap-4 text-base font-bold text-[#3C5A44]">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-[#B89355] py-2 border-b border-[#3C5A44]/5 transition"
              >
                Home
              </Link>
              <Link
                to="/products"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-[#B89355] py-2 border-b border-[#3C5A44]/5 transition"
              >
                Products
              </Link>
              <button
                onClick={handleCategoryClick}
                className="text-left font-bold text-base hover:text-[#B89355] py-2 border-b border-[#3C5A44]/5 transition bg-transparent cursor-pointer"
              >
                Categories
              </button>
              <Link
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-[#B89355] py-2 border-b border-[#3C5A44]/5 transition"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-[#B89355] py-2 border-b border-[#3C5A44]/5 transition"
              >
                Contact
              </Link>
            </div>

            {/* Auth & Account actions in mobile drawer */}
            {user ? (
              <div className="flex flex-col gap-4 pt-2">
                <div className="flex items-center gap-3 text-[#3C5A44]">
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
                  className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[#3C5A44]/10 text-[#3C5A44] font-bold text-sm"
                >
                  My Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full py-3 bg-red-50 text-red-600 border border-red-100 font-bold rounded-xl text-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FiLogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="w-full py-3 bg-[#3C5A44] hover:bg-[#B89355] text-white text-center font-black rounded-xl text-sm uppercase tracking-wider transition shadow-md"
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

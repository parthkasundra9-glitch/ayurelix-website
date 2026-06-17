import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import { useCart } from "../context/CartContext";
import { FiShoppingBag, FiUser, FiLogOut, FiShield, FiMenu, FiX } from "react-icons/fi";
import { supabase } from "../supabaseClient";

export default function Navbar() {
  const { setIsCartOpen, cartCount } = useCart();
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Get current session user
    supabase.auth.getUser().then(({ data: { user: currentUser } }) => {
      setUser(currentUser);
    });

    // Listen to authentication state changes
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

  const isAdmin = user?.email === "admin@ayurelix.com";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="
      fixed top-0 left-0 right-0 z-40
      bg-white/95 md:bg-white/80
      backdrop-blur-xl
      border-b border-[#3C5A44]/5
      "
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        
        {/* Brand Logo */}
        <Link to="/" className="outline-none" onClick={() => setIsMenuOpen(false)}>
          <Logo size="sm" variant="gold" showText={true} />
        </Link>

        {/* Desktop Links (hidden on mobile) */}
        <div className="hidden md:flex gap-8 text-[#3C5A44] items-center">
          
          <Link
            to="/"
            className="text-sm font-semibold tracking-wide hover:text-[#B89355] transition duration-300"
          >
            Home
          </Link>

          <Link
            to="/products"
            className="text-sm font-semibold tracking-wide hover:text-[#B89355] transition duration-300"
          >
            Products
          </Link>

          <Link
            to="/about"
            className="text-sm font-semibold tracking-wide hover:text-[#B89355] transition duration-300"
          >
            About
          </Link>

          <Link
            to="/contact"
            className="text-sm font-semibold tracking-wide hover:text-[#B89355] transition duration-300"
          >
            Contact
          </Link>

          {/* Cart Icon Toggle Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-full hover:bg-black/5 text-[#3C5A44] hover:text-[#B89355] transition duration-300 outline-none cursor-pointer"
          >
            <FiShoppingBag size={20} />
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="
                absolute -top-1 -right-1
                bg-[#B89355] text-white
                text-[10px] font-black
                w-4 h-4 rounded-full
                flex items-center justify-center
                "
              >
                {cartCount}
              </motion.span>
            )}
          </button>

          {/* Auth Conditional Menu */}
          {user ? (
            <div className="flex items-center gap-4 border-l border-black/10 pl-4">
              {isAdmin && (
                <Link
                  to="/admin"
                  className="
                  flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                  bg-[#B89355]/10 border border-[#B89355]/20 text-[#B89355]
                  hover:bg-[#B89355]/20 transition duration-300 text-xs font-bold uppercase tracking-wider
                  "
                >
                  <FiShield size={13} />
                  <span>Admin</span>
                </Link>
              )}
              
              <Link
                to="/profile"
                className="
                flex items-center gap-1.5 text-gray-600 hover:text-[#3C5A44] transition duration-300 text-sm font-semibold
                "
              >
                <FiUser size={16} className="text-[#B89355]" />
                <span className="max-w-[80px] truncate">
                  {user.user_metadata?.full_name || user.email.split("@")[0]}
                </span>
              </Link>

              <button
                onClick={handleLogout}
                className="
                p-2 rounded-full hover:bg-red-500/10 text-gray-500 hover:text-red-600
                transition duration-300 cursor-pointer
                "
                title="Sign Out"
              >
                <FiLogOut size={16} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="
              px-5 py-2.5 rounded-full
              bg-[#3C5A44] hover:bg-[#B89355] text-white
              font-bold text-sm
              transition duration-300
              "
            >
              Login
            </Link>
          )}

        </div>

        {/* Mobile controls (visible on mobile only) */}
        <div className="flex md:hidden items-center gap-2">
          {/* Cart Icon Toggle Button */}
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
            className="p-1.5 rounded-full hover:bg-black/5 text-[#3C5A44] transition"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer/Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-[#3C5A44]/5 bg-white px-6 py-4 flex flex-col gap-4 shadow-inner"
          >
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="text-base font-bold text-[#3C5A44] hover:text-[#B89355] py-2 border-b border-[#3C5A44]/5 transition"
            >
              Home
            </Link>
            <Link
              to="/products"
              onClick={() => setIsMenuOpen(false)}
              className="text-base font-bold text-[#3C5A44] hover:text-[#B89355] py-2 border-b border-[#3C5A44]/5 transition"
            >
              Products
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className="text-base font-bold text-[#3C5A44] hover:text-[#B89355] py-2 border-b border-[#3C5A44]/5 transition"
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="text-base font-bold text-[#3C5A44] hover:text-[#B89355] py-2 border-b border-[#3C5A44]/5 transition"
            >
              Contact
            </Link>

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
                className="w-full py-3 bg-[#3C5A44] hover:bg-[#B89355] text-white text-center font-black rounded-xl text-sm uppercase tracking-wider transition"
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

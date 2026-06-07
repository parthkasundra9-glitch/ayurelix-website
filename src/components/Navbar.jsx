import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "./Logo";
import { useCart } from "../context/CartContext";
import { FiShoppingBag, FiUser, FiLogOut, FiShield } from "react-icons/fi";
import { supabase } from "../supabaseClient";

export default function Navbar() {
  const { setIsCartOpen, cartCount } = useCart();
  const [user, setUser] = useState(null);
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
    navigate("/");
  };

  const isAdmin = user?.email === "admin@ayurelix.com";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="
      fixed top-0 left-0 right-0 z-40
      bg-white/80
      backdrop-blur-xl
      border-b border-[#0e1a30]/5
      "
    >
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
        
        {/* Brand Logo */}
        <Link to="/" className="outline-none">
          <Logo size="sm" variant="gold" showText={true} />
        </Link>

        {/* Links */}
        <div className="flex gap-8 text-[#0e1a30] items-center">
          
          <Link
            to="/"
            className="text-sm font-semibold tracking-wide hover:text-[#c5a059] transition duration-300"
          >
            Home
          </Link>

          <Link
            to="/products"
            className="text-sm font-semibold tracking-wide hover:text-[#c5a059] transition duration-300"
          >
            Products
          </Link>

          <Link
            to="/about"
            className="text-sm font-semibold tracking-wide hover:text-[#c5a059] transition duration-300"
          >
            About
          </Link>

          <Link
            to="/contact"
            className="text-sm font-semibold tracking-wide hover:text-[#c5a059] transition duration-300"
          >
            Contact
          </Link>

          {/* Cart Icon Toggle Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-full hover:bg-black/5 text-[#0e1a30] hover:text-[#c5a059] transition duration-300 outline-none cursor-pointer"
          >
            <FiShoppingBag size={20} />
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="
                absolute -top-1 -right-1
                bg-[#c5a059] text-white
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
                  bg-[#c5a059]/10 border border-[#c5a059]/20 text-[#c5a059]
                  hover:bg-[#c5a059]/20 transition duration-300 text-xs font-bold uppercase tracking-wider
                  "
                >
                  <FiShield size={13} />
                  <span>Admin</span>
                </Link>
              )}
              
              <Link
                to="/profile"
                className="
                flex items-center gap-1.5 text-gray-600 hover:text-[#0e1a30] transition duration-300 text-sm font-semibold
                "
              >
                <FiUser size={16} className="text-[#c5a059]" />
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
              bg-[#0e1a30] hover:bg-[#c5a059] text-white
              font-bold text-sm
              transition duration-300
              "
            >
              Login
            </Link>
          )}

        </div>
      </div>
    </motion.nav>
  );
}

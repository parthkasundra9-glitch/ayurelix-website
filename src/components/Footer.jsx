import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { FiInstagram, FiFacebook, FiTwitter, FiMail, FiCheck, FiMapPin, FiPhone, FiCompass } from "react-icons/fi";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const navigate = useNavigate();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const handleCategoryClick = () => {
    const section = document.getElementById("category-section") || document.getElementById("featured-products-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/#featured-products-section");
    }
  };

  return (
    <footer className="bg-[#FAF8F5] border-t border-[#1A2B49]/10 pt-16 pb-8 px-6 sm:px-8 relative overflow-hidden">
      
      {/* Decorative background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] rounded-full bg-[#B89355]/3 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">
        
        {/* ==================== NEWSLETTER SECTION ==================== */}
        <div className="border-b border-[#1A2B49]/10 pb-12 mb-16 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="max-w-md text-center lg:text-left space-y-2">
            <h3 className="text-2xl font-serif font-black text-[#1A2B49]" style={{ fontFamily: "'Cinzel', serif" }}>
              Get Exclusive Ayurvedic Wellness Updates
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              Subscribe to receive Ayurvedic skincare guides, wellness rituals, and product releases.
            </p>
          </div>

          <div className="w-full max-w-md">
            {subscribed ? (
              <div className="flex items-center justify-center gap-2 text-[#B89355] font-bold text-sm bg-white border border-[#B89355]/30 p-4 rounded-xl shadow-sm">
                <FiCheck size={16} />
                <span>Successfully Subscribed to Updates!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 w-full">
                <div className="relative flex-grow">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full bg-white border border-[#1A2B49]/15 rounded-xl pl-11 pr-4 py-3.5 text-sm text-[#1A2B49] focus:outline-none focus:border-[#B89355] shadow-sm transition"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-[#1A2B49] hover:bg-[#B89355] text-white font-black text-xs uppercase tracking-wider rounded-xl active:scale-95 transition shadow-md cursor-pointer shrink-0"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ==================== FOOTER LINKS GRID ==================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 text-center md:text-left">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-6 flex flex-col items-center md:items-start">
            <Logo size="sm" variant="gold" showText={true} />
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-xs">
              Ayurelix bridges ancient Ayurvedic wisdom with modern botanical science to offer premium, chemical-free, organic skincare formulations.
            </p>
            <div className="flex gap-3.5 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-white border border-[#1A2B49]/10 flex items-center justify-center text-gray-500 hover:text-[#B89355] hover:border-[#B89355]/40 transition shadow-sm">
                <FiInstagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white border border-[#1A2B49]/10 flex items-center justify-center text-gray-500 hover:text-[#B89355] hover:border-[#B89355]/40 transition shadow-sm">
                <FiFacebook size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white border border-[#1A2B49]/10 flex items-center justify-center text-gray-500 hover:text-[#B89355] hover:border-[#B89355]/40 transition shadow-sm">
                <FiTwitter size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="space-y-5">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#B89355] font-black">Navigation</h4>
            <div className="flex flex-col space-y-3 text-xs sm:text-sm text-gray-600 font-semibold">
              <Link to="/" className="hover:text-[#B89355] transition">Home</Link>
              <Link to="/products" className="hover:text-[#B89355] transition">Products</Link>
              <button onClick={handleCategoryClick} className="text-center md:text-left hover:text-[#B89355] transition bg-transparent cursor-pointer font-semibold text-xs sm:text-sm text-gray-600">
                Categories
              </button>
              <Link to="/about" className="hover:text-[#B89355] transition">About Us</Link>
              <Link to="/contact" className="hover:text-[#B89355] transition">Contact</Link>
            </div>
          </div>

          {/* Column 3: Legal & Help Policies */}
          <div className="space-y-5">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#B89355] font-black">Policy & Support</h4>
            <div className="flex flex-col space-y-3 text-xs sm:text-sm text-gray-600 font-semibold">
              <Link to="/shipping-delivery" className="hover:text-[#B89355] transition">Shipping & Delivery</Link>
              <Link to="/refund-policy" className="hover:text-[#B89355] transition">Refund Policy</Link>
              <Link to="/terms-of-service" className="hover:text-[#B89355] transition">Terms of Service</Link>
              <Link to="/privacy-policy" className="hover:text-[#B89355] transition">Privacy Policy</Link>
            </div>
          </div>

          {/* Column 4: Contact Info */}
          <div className="space-y-5">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#B89355] font-black">Contact Info</h4>
            <div className="flex flex-col space-y-4 text-xs sm:text-sm text-gray-600 font-semibold items-center md:items-start">
              <div className="flex items-start gap-2.5">
                <FiMapPin className="text-[#B89355] text-base shrink-0 mt-0.5" />
                <span className="text-center md:text-left">A-12, Wellness Park, Bangalore, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <FiPhone className="text-[#B89355] text-base shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2.5">
                <FiCompass className="text-[#B89355] text-base shrink-0" />
                <span>ayurelix512@gmail.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* ==================== BOTTOM BAR ==================== */}
        <div className="border-t border-[#1A2B49]/10 pt-8 flex flex-col md:flex-row items-center justify-between text-center gap-4 text-xs text-gray-500 font-bold uppercase tracking-wider">
          <span>&copy; 2026 Ayurelix Private Limited. All rights reserved.</span>
          <span className="font-serif text-[10px] tracking-[0.25em] text-[#B89355]" style={{ fontFamily: "'Cinzel', serif" }}>
            The Elixir of Ayurveda
          </span>
        </div>

      </div>
    </footer>
  );
}

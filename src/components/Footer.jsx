import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { FiInstagram, FiFacebook, FiTwitter, FiMail, FiCheck } from "react-icons/fi";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-[#fbf9f4] border-t border-[#3C5A44]/5 pt-16 pb-8 px-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-[#B89355]/3 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info Column */}
          <div className="space-y-6 text-center md:text-left">
            <Logo size="md" variant="gold" showText={true} layout="horizontal" />
            <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
              Bridging ancient Ayurvedic formulations and modern herbal science to provide clean, plant-based remedies that nurture your body.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-[#3C5A44]/5 flex items-center justify-center text-gray-500 hover:text-[#B89355] hover:border-[#B89355]/30 transition shadow-sm">
                <FiInstagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-[#3C5A44]/5 flex items-center justify-center text-gray-500 hover:text-[#B89355] hover:border-[#B89355]/30 transition shadow-sm">
                <FiFacebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-[#3C5A44]/5 flex items-center justify-center text-gray-500 hover:text-[#B89355] hover:border-[#B89355]/30 transition shadow-sm">
                <FiTwitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-5 text-center md:text-left">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#B89355] font-bold">Navigation</h4>
            <div className="flex flex-col space-y-2.5 text-sm text-gray-600 font-semibold">
              <Link to="/" className="hover:text-[#B89355] transition">Home</Link>
              <Link to="/products" className="hover:text-[#B89355] transition">Products</Link>
              <Link to="/about" className="hover:text-[#B89355] transition">About Us</Link>
              <Link to="/contact" className="hover:text-[#B89355] transition">Contact</Link>
            </div>
          </div>

          {/* Legal / Trust Column */}
          <div className="space-y-5 text-center md:text-left">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#B89355] font-bold">Policy & Help</h4>
            <div className="flex flex-col space-y-2.5 text-sm text-gray-600 font-semibold">
              <Link to="/shipping-delivery" className="hover:text-[#B89355] transition">Shipping & Delivery</Link>
              <Link to="/refund-policy" className="hover:text-[#B89355] transition">Refund Policy</Link>
              <Link to="/terms-of-service" className="hover:text-[#B89355] transition">Terms of Service</Link>
              <Link to="/privacy-policy" className="hover:text-[#B89355] transition">Privacy Policy</Link>
            </div>
          </div>

          {/* Newsletter subscription */}
          <div className="space-y-5 text-center md:text-left">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#B89355] font-bold">Subscribe to wellness</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Sign up for wellness tips, Ayurvedic recipes, and exclusive brand announcements.
            </p>
            {subscribed ? (
              <div className="flex items-center justify-center md:justify-start gap-2 text-[#B89355] font-bold text-sm bg-white p-3.5 rounded-xl border border-[#B89355]/30 shadow-sm">
                <FiCheck size={16} />
                <span>Successfully Subscribed!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-grow">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email..."
                    className="w-full bg-white border border-[#3C5A44]/10 rounded-xl pl-11 pr-4 py-3 text-sm text-[#3C5A44] focus:outline-none focus:border-[#B89355] shadow-sm transition"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-3 bg-[#3C5A44] hover:bg-[#B89355] text-white font-bold rounded-xl active:scale-[0.98] transition shadow-md"
                >
                  Join
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#3C5A44]/5 pt-8 flex flex-col md:flex-row items-center justify-between text-center gap-4 text-xs text-gray-600 font-bold uppercase tracking-wider">
          <span>&copy; 2026 Ayurelix Private Limited. All rights reserved.</span>
          <span className="font-serif text-[10px] tracking-[0.25em] text-[#B89355]" style={{ fontFamily: "'Cinzel', serif" }}>
            Ancient Ayurveda. Modern Wellness.
          </span>
        </div>
      </div>
    </footer>
  );
}

import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PolicySidebar from "./PolicySidebar";
import { motion } from "framer-motion";

export default function CustomerSupport() {
  return (
    <div className="bg-white min-h-screen text-[#1A2B49] relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[#B89355]/4 blur-[130px] top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[#f4efe2]/60 blur-[130px] bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <Navbar />

      {/* Main Layout Container */}
      <section className="max-w-7xl mx-auto py-32 px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-[#B89355] uppercase tracking-[0.25em] text-xs font-bold block mb-2">
            Store Support
          </span>
          <h1
            className="text-4xl md:text-5xl font-black text-[#1A2B49] font-serif"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            CUSTOMER SUPPORT
          </h1>
          <p className="text-slate-500 text-sm mt-2 font-semibold">
            Last Updated: June 2026
          </p>
        </motion.div>

        {/* Content & Sidebar Grid */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Sidebar */}
          <PolicySidebar active="support" />

          {/* Policy Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex-grow space-y-8 text-slate-600 leading-relaxed text-sm bg-white p-8 lg:p-12 border border-[#1A2B49]/10 rounded-3xl shadow-sm"
          >
            <div>
              <p className="text-base text-slate-700 font-medium mb-4">
                At Ayurelix, your satisfaction is our priority. We are here to assist you with any questions, concerns, or support you may need regarding our products or your orders.
              </p>
            </div>

            <hr className="border-[#1A2B49]/5" />

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                📩 CONTACT US
              </h2>
              <p>For any queries, feel free to reach out to us:</p>
              <ul className="space-y-2 pl-4 text-[#1A2B49] font-semibold">
                <li>📧 <strong>Email:</strong> <a href="mailto:ayurelix512@gmail.com" className="underline">ayurelix512@gmail.com</a></li>
                <li>📞 <strong>Phone / WhatsApp:</strong> <a href="tel:+919726299878" className="underline">+91 9726299878</a></li>
                <li>📍 <strong>Location:</strong> Gujarat, India</li>
              </ul>
              <p className="pt-2 text-xs text-slate-400">
                <strong>Support Hours:</strong> Monday to Saturday – 10:00 AM to 7:00 PM (Sunday Closed)
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                📦 ORDER SUPPORT
              </h2>
              <p>Need help with your order? We can assist you with:</p>
              <ul className="list-disc list-inside space-y-1.5 pl-4">
                <li>Order tracking</li>
                <li>Delivery updates</li>
                <li>Order modifications (before dispatch)</li>
                <li>Missing or incorrect items</li>
              </ul>
              <p className="italic text-xs text-slate-400 font-semibold">
                * Please share your Order ID for faster support.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                🔄 RETURNS & REFUNDS
              </h2>
              <p>If you received a damaged, defective, or incorrect product:</p>
              <ul className="list-disc list-inside space-y-1.5 pl-4">
                <li>Contact us within 48 hours of delivery</li>
                <li>Share clear images or videos as proof</li>
                <li>Our team will verify and guide you with the next steps</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                💬 PRODUCT RELATED QUERIES
              </h2>
              <p>
                Not sure which product is right for you? We’re happy to help you choose the best solution based on your skin or hair concerns.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                ⚠️ IMPORTANT NOTE
              </h2>
              <ul className="list-disc list-inside space-y-1.5 pl-4">
                <li>Please ensure all details (address, phone number) are correct while placing your order</li>
                <li>Ayurelix is not responsible for delays caused by courier services</li>
                <li>Response time may take up to 24–48 working hours</li>
              </ul>
            </div>

            <div className="pt-6 border-t border-[#1A2B49]/5 text-center">
              <h3 className="text-lg font-bold text-[#B89355] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                ❤️ WE’RE HERE FOR YOU
              </h3>
              <p className="text-xs text-slate-400 mt-2 font-medium">
                Your trust means everything to us. Whether it’s a small question or a major concern, our team is always ready to help you.
              </p>
              <p className="text-sm font-bold text-[#1A2B49] mt-3">
                Thank you for choosing Ayurelix.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

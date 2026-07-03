import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PolicySidebar from "./PolicySidebar";
import { motion } from "framer-motion";

export default function TermsOfService() {
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
            Store Policies
          </span>
          <h1
            className="text-4xl md:text-5xl font-black text-[#1A2B49] font-serif"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            TERMS OF SERVICE
          </h1>
          <p className="text-slate-500 text-sm mt-2 font-semibold">
            Last Updated: June 2026
          </p>
        </motion.div>

        {/* Content & Sidebar Grid */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Sidebar */}
          <PolicySidebar active="terms" />

          {/* Policy Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex-grow space-y-8 text-slate-600 leading-relaxed text-sm bg-white p-8 lg:p-12 border border-[#1A2B49]/10 rounded-3xl shadow-sm"
          >
            <div>
              <p className="text-base text-slate-700 font-medium mb-4">
                Welcome to Ayurelix. These Terms & Conditions (“Terms”) govern your use of our website and purchase of our products. By accessing this website or placing an order, you agree to be bound by these Terms.
              </p>
            </div>

            <hr className="border-[#1A2B49]/5" />

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                1. GENERAL
              </h2>
              <p>
                This website is owned and operated by Ayurelix, Gujarat, India. By using this website, you confirm that you are at least 18 years old or using it under the supervision of a parent or guardian.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                2. PRODUCTS
              </h2>
              <p>
                Ayurelix offers Ayurvedic skincare, haircare, and beauty products for personal use only.
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>All products are intended for external use unless stated otherwise.</li>
                <li>Product results may vary from person to person.</li>
                <li>We reserve the right to modify or discontinue any product at any time without notice.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                3. PRICING & PAYMENTS
              </h2>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>All prices are listed in Indian Rupees (₹).</li>
                <li>Prices are inclusive of applicable taxes unless stated otherwise.</li>
                <li>We accept payments via secure payment gateways available on the website.</li>
                <li>Ayurelix reserves the right to change pricing at any time without prior notice.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                4. ORDER CONFIRMATION
              </h2>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Once an order is placed, you will receive a confirmation message/email.</li>
                <li>We reserve the right to cancel any order due to stock unavailability, pricing errors, or suspicious activity.</li>
                <li>If payment is already made, a refund will be issued in such cases.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                5. SHIPPING & DELIVERY
              </h2>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Orders are processed within 2–4 working days.</li>
                <li>Delivery usually takes 4–8 working days, depending on location.</li>
                <li>Delays caused by courier partners or unforeseen circumstances are not under our control.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                6. RETURNS & REFUNDS
              </h2>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Returns are accepted only in case of damaged, defective, or incorrect products.</li>
                <li>Customers must contact us within 48 hours of delivery with proof (images/video).</li>
                <li>Approved refunds will be processed within 5–7 working days.</li>
                <li>No returns are accepted for opened or used products.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                7. PRODUCT DISCLAIMER
              </h2>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Ayurelix products are made using Ayurvedic and herbal ingredients.</li>
                <li>A patch test is recommended before use.</li>
                <li>We are not responsible for any allergic reactions, misuse, or individual sensitivities.</li>
                <li>For serious skin conditions, consult a dermatologist before use.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                8. INTELLECTUAL PROPERTY
              </h2>
              <p>
                All content on this website, including logo, text, images, and branding, is the property of Ayurelix and is protected under applicable laws. Unauthorized use is strictly prohibited.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                9. USER CONDUCT
              </h2>
              <p>You agree not to:</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Use the website for unlawful purposes</li>
                <li>Attempt to harm or disrupt the website</li>
                <li>Upload harmful or malicious content</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                10. LIMITATION OF LIABILITY
              </h2>
              <p>Ayurelix shall not be held liable for:</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Any indirect or incidental damages</li>
                <li>Product misuse or incorrect application</li>
                <li>Delays beyond our control</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                11. PRIVACY
              </h2>
              <p>
                Your personal information is handled securely and in accordance with our Privacy Policy.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                12. GOVERNING LAW
              </h2>
              <p>
                These Terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in Gujarat, India.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                13. CHANGES TO TERMS
              </h2>
              <p>
                We reserve the right to update these Terms at any time. Continued use of the website means you accept the revised Terms.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                14. CONTACT US
              </h2>
              <p>For any questions or concerns, please contact:</p>
              <ul className="space-y-2 pl-4">
                <li>📧 <strong>Email:</strong> ayurelix512@gmail.com</li>
                <li>📞 <strong>Phone:</strong> +91 00000 00000</li>
                <li>📍 <strong>Location:</strong> Gujarat, India</li>
              </ul>
            </div>

            <div className="pt-4 border-t border-[#1A2B49]/5 text-xs italic text-slate-400">
              By using this website, you agree to these Terms & service.
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

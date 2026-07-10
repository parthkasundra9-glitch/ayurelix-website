import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PolicySidebar from "./PolicySidebar";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
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
            PRIVACY POLICY
          </h1>
          <p className="text-slate-500 text-sm mt-2 font-semibold">
            Last Updated: June 2026
          </p>
        </motion.div>

        {/* Content & Sidebar Grid */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Sidebar */}
          <PolicySidebar active="privacy" />

          {/* Policy Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex-grow space-y-8 text-slate-600 leading-relaxed text-sm bg-white p-8 lg:p-12 border border-[#1A2B49]/10 rounded-3xl shadow-sm"
          >
            <div>
              <p className="text-base text-slate-700 font-medium mb-4">
                At Ayurelix, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or purchase our products.
              </p>
            </div>

            <hr className="border-[#1A2B49]/5" />

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                1. INFORMATION WE COLLECT
              </h2>
              <p>We may collect the following types of information:</p>
              
              <h3 className="text-base font-bold text-[#1A2B49] mt-2">a. Personal Information</h3>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Name</li>
                <li>Phone number</li>
                <li>Email address</li>
                <li>Shipping and billing address</li>
              </ul>

              <h3 className="text-base font-bold text-[#1A2B49] mt-4">b. Payment Information</h3>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Payment details are processed securely through third-party payment gateways.</li>
                <li>We do not store your card or banking information.</li>
              </ul>

              <h3 className="text-base font-bold text-[#1A2B49] mt-4">c. Technical Data</h3>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>IP address</li>
                <li>Browser type</li>
                <li>Device information</li>
                <li>Website usage data (via cookies)</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                2. HOW WE USE YOUR INFORMATION
              </h2>
              <p>We use your information to:</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Process and deliver your orders</li>
                <li>Communicate order updates and customer support</li>
                <li>Improve our website and services</li>
                <li>Send promotional offers (only if you opt-in)</li>
                <li>Prevent fraud and ensure security</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                3. SHARING OF INFORMATION
              </h2>
              <p>We do not sell your personal data. However, we may share your information with:</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Trusted delivery partners for order fulfillment</li>
                <li>Payment gateway providers for secure transactions</li>
                <li>Legal authorities if required by law</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                4. COOKIES
              </h2>
              <p>Our website uses cookies to enhance your browsing experience. Cookies help us:</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Understand user behavior</li>
                <li>Improve website performance</li>
                <li>Remember your preferences</li>
              </ul>
              <p>You can disable cookies in your browser settings if you prefer.</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                5. DATA SECURITY
              </h2>
              <p>
                We take appropriate security measures to protect your personal information. However, no online platform can guarantee 100% security.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                6. YOUR RIGHTS
              </h2>
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Access your personal data</li>
                <li>Request correction of incorrect information</li>
                <li>Request deletion of your data (subject to legal requirements)</li>
              </ul>
              <p>To exercise your rights, contact us using the details below.</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                7. THIRD-PARTY LINKS
              </h2>
              <p>
                Our website may contain links to third-party websites. We are not responsible for their privacy practices.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                8. CHILDREN’S PRIVACY
              </h2>
              <p>
                Our website is not intended for individuals under the age of 18. We do not knowingly collect data from minors.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                9. CHANGES TO THIS POLICY
              </h2>
              <p>
                We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                10. CONTACT US
              </h2>
              <p>If you have any questions about this Privacy Policy, please contact:</p>
              <ul className="space-y-2 pl-4">
                <li>📧 <strong>Email:</strong> ayurelix512@gmail.com</li>
                <li>📞 <strong>Phone:</strong> <a href="tel:+919726299878" className="hover:underline">+91 9726299878</a></li>
                <li>📍 <strong>Location:</strong> Gujarat, India</li>
              </ul>
            </div>

            <div className="pt-4 border-t border-[#1A2B49]/5 text-xs italic text-slate-400">
              By using our website, you consent to this Privacy Policy.
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

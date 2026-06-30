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
                At Ayurelix, we respect your privacy and are deeply committed to protecting the personal data you share with us. This Privacy Policy describes how we collect, use, and share your personal information when you visit, create an account, or make a purchase from Ayurelix.
              </p>
            </div>

            <hr className="border-[#1A2B49]/5" />

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                1. Information We Collect
              </h2>
              <p>
                We gather information to process your orders, customize your Ayurvedic experiences, and secure our systems:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>
                  <strong>Personal Profile & Account Data:</strong> When you register an account, purchase products, or fill contact forms, we collect your name, email, billing address, shipping address, telephone number, and account passwords.
                </li>
                <li>
                  <strong>Device & Connection Data:</strong> We automatically record IP addresses, browser types, referral URLs, operating systems, and page navigation patterns using standard logging tools and cookies.
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                2. How We Use Your Information
              </h2>
              <p>
                We process your personal information based on business requirements and consent:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>To fulfill and ship orders, process payments, and send invoices.</li>
                <li>To send tracking updates, newsletters, and promotional offers (only if opted-in).</li>
                <li>To optimize website speed, detect fraudulent activities, and maintain site security.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                3. Third-Party Sharing Disclosures
              </h2>
              <p>
                We do not sell, rent, or trade your personal data with third parties for marketing purposes. We only share necessary customer data with trusted service providers to run our operations:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>
                  <strong>Database & Auth (Supabase):</strong> We store account and order data in secure cloud servers provided by Supabase under industry-grade encryption.
                </li>
                <li>
                  <strong>Payment Gateways (Razorpay / Stripe):</strong> Payment details are sent directly to PCI-compliant gateways. We do not touch or store credit card details.
                </li>
                <li>
                  <strong>Logistics & Delivery Partners:</strong> Shipping addresses are shared with courier agents(shiprocket) to process delivery labels.
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                4. Cookies & Analytics
              </h2>
              <p>
                Ayurelix uses cookies and tracking technologies to enhance user experiences:
              </p>
              <p>
                Cookies help keep track of items added to your shopping cart, speed up form entries, and track website traffic trends. You can instruct your browser to refuse all cookies, though some features (such as the cart checkout drawer) may not operate correctly as a result.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                5. Security of Your Personal Data
              </h2>
              <p>
                The security of your personal data is critical to us. We employ SSL (Secure Socket Layer) encryption to protect all credit transactions, login credentials, and user data entered on the website. While no transmission method over the internet is 100% secure, we apply rigorous administrative and technological safeguards to minimize vulnerability risks.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                6. Your Data Rights (GDPR & CCPA Compliant)
              </h2>
              <p>
                Regardless of where you reside, you have full control over your personal data:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li><strong>Access:</strong> You can request a copy of the personal information we hold about you.</li>
                <li><strong>Correction:</strong> You can correct incomplete or inaccurate data.</li>
                <li><strong>Deletion (Right to be Forgotten):</strong> You can request that we delete your personal and order history from our databases.</li>
              </ul>
              <p>
                To exercise these rights, please contact us by writing to <a href="mailto:ayurelix512@gmail.com" className="text-[#B89355] font-bold underline">ayurelix512@gmail.com</a>. We will process your requests within 30 days.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

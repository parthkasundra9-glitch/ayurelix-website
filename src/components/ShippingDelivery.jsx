import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PolicySidebar from "./PolicySidebar";
import { motion } from "framer-motion";

export default function ShippingDelivery() {
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
            SHIPPING & DELIVERY
          </h1>
          <p className="text-slate-500 text-sm mt-2 font-semibold">
            Last Updated: June 2026
          </p>
        </motion.div>

        {/* Content & Sidebar Grid */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Sidebar */}
          <PolicySidebar active="shipping" />

          {/* Policy Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex-grow space-y-8 text-slate-600 leading-relaxed text-sm bg-white p-8 lg:p-12 border border-[#1A2B49]/10 rounded-3xl shadow-sm"
          >
            <div>
              <p className="text-base text-slate-700 font-medium mb-4">
                All domestic orders are shipped from our Ahmedabad facility and will take <strong>3 to 14 days</strong>, depending on your location. Ayurelix is not to be held responsible for any damage or leakage to a product after delivery.
              </p>
            </div>

            <hr className="border-[#1A2B49]/5" />

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                1. Domestic Orders - Dispatch & Tracking
              </h2>
              <p>
                The dispatch time for domestic orders is <strong>3 to 7 days</strong>. You will receive notifications via SMS or email about the status of your orders. You can track your packages directly using the tracking feature on our website.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                2. Customs & Other Fees
              </h2>
              <p>
                Ayurelix is not to be held responsible for any customs duties, VAT fees, or additional charges levied on the shipment. These must be paid in full by the customer. We do not control and are not liable for any additional taxes or charges levied by your country on imports (as a buyer, you are considered an importer).
              </p>
              <p>
                We have attempted to list every item transparently to prevent any external or extra charges. However, in the rare case this does occur, the product(s) cannot be returned or exchanged and the order(s) cannot be canceled for this reason.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                3. Order Queries
              </h2>
              <p>
                If you have any queries related to your order, you can contact us at <a href="mailto:ayurelix512@gmail.com" className="text-[#B89355] font-bold underline">ayurelix512@gmail.com</a> for assistance.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PolicySidebar from "./PolicySidebar";
import { motion } from "framer-motion";

export default function RefundPolicy() {
  return (
    <div className="bg-white min-h-screen text-[#3C5A44] relative overflow-hidden">
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
            className="text-4xl md:text-5xl font-black text-[#3C5A44] font-serif"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            REFUND & RETURN POLICY
          </h1>
          <p className="text-slate-500 text-sm mt-2 font-semibold">
            Last Updated: June 2026
          </p>
        </motion.div>

        {/* Content & Sidebar Grid */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Sidebar */}
          <PolicySidebar active="refund" />

          {/* Policy Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex-grow space-y-8 text-slate-600 leading-relaxed text-sm bg-white p-8 lg:p-12 border border-[#3C5A44]/10 rounded-3xl shadow-sm"
          >
            <div>
              <p className="text-base text-slate-700 font-medium mb-4">
                At Ayurelix, we take absolute pride in the purity, authenticity, and standard of our Ayurvedic formulations. Because customer safety and hygiene are our utmost priorities, we maintain transparent return and refund policies for our products.
              </p>
            </div>

            <hr className="border-[#3C5A44]/5" />

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#3C5A44] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                1. Return Eligibility Window
              </h2>
              <p>
                We accept returns on eligible products within <strong>15 days</strong> of the delivery date. If 15 days have gone by since your package was delivered, we unfortunately cannot offer you a refund or exchange.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#3C5A44] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                2. Non-Returnable & Hygiene Restrictions
              </h2>
              <p>
                Due to the natural and biological nature of Ayurvedic oils, supplements, and skin elixirs, we enforce strict guidelines on return eligibility:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>
                  <strong>Unopened & Sealed:</strong> A product is only eligible for return if it is completely unopened, unused, and in the same pristine condition that you received it, with the outer protective seal fully intact.
                </li>
                <li>
                  <strong>Consumables:</strong> Dietary supplements, churnas, and herbal teas are non-returnable once dispatched to protect customer safety.
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#3C5A44] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                3. Herbal Allergies & Compatibility
              </h2>
              <p>
                Ayurelix remedies contain raw, potent botanical ingredients. We strongly advise performing a patch test on your forearm before applying new products.
              </p>
              <p className="bg-[#fbf9f4] border border-[#3C5A44]/5 rounded-2xl p-4 italic text-slate-500">
                Please Note: We do not issue refunds for used products due to personal skin or body incompatibility, or because the product did not yield the desired results within a specific time. Natural Ayurvedic healing relies on individual body constitutions (Prakriti/Vikriti) and consistency.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#3C5A44] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                4. Damaged or Defective Items
              </h2>
              <p>
                We immediately replace items if they are received damaged, broken, or defective. Please contact us at <a href="mailto:support@ayurelix.com" className="text-[#B89355] font-bold underline">support@ayurelix.com</a> within <strong>48 hours</strong> of delivery with:
              </p>
              <ol className="list-decimal list-inside space-y-2 pl-4">
                <li>Your Order Number.</li>
                <li>Clear photographs/videos of the damaged packaging and product labels.</li>
              </ol>
              <p>
                Once verified, we will arrange a free reverse pickup and ship a fresh replacement bottle immediately. If a replacement is unavailable, we will process a full refund.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#3C5A44] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                5. How to Initiate a Return
              </h2>
              <p>
                To return an eligible unopened product, please follow these steps:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Send an email to <a href="mailto:support@ayurelix.com" className="text-[#3C5A44] underline">support@ayurelix.com</a> with your order details and reason for return.</li>
                <li>Our fulfillment team will review the request and issue a Return Authorization (RA) number.</li>
                <li>We will coordinate a courier pickup from your delivery address. Reverse pickup charges of ₹100 will be deducted from your final refund amount, except in cases of damaged/defective items.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#3C5A44] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                6. Refund Processing Times
              </h2>
              <p>
                Once your returned item is received at our Bangalore facility and inspected by our quality control team, we will send you an email notifying you of the approval or rejection of your refund.
              </p>
              <p>
                If approved, your refund will be processed and automatically applied to your original credit card, bank account, or UPI payment method within <strong>5 to 7 business days</strong>.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#3C5A44] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                7. Order Cancellation
              </h2>
              <p>
                You can cancel your order within <strong>2 hours</strong> of placing it, or before it is dispatched (whichever is earlier) for a full refund. Once the order leaves our warehouse, it cannot be cancelled, and our standard Return Policy applies.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

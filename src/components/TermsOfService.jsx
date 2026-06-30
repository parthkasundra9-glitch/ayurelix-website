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
                Welcome to Ayurelix. This website is owned and operated by Ayurelix. Throughout the site, the terms "we", "us" and "our" refer to Ayurelix. By visiting our site and/or purchasing products from us, you engage in our "Service" and agree to be bound by the following Terms of Service.
              </p>
            </div>

            <hr className="border-[#1A2B49]/5" />

            <div className="bg-[#B89355]/5 border-l-4 border-[#B89355] rounded-r-2xl p-6 space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#1A2B49]">
                ⚠️ MEDICAL & HEALTH DISCLAIMER (CRITICAL)
              </h3>
              <p className="text-xs leading-relaxed text-slate-700 font-medium">
                The content provided on this website, including product descriptions, blog posts, and ingredient guides, is for informational and educational purposes only. It is not intended as a substitute for professional medical advice, diagnosis, or treatment. 
              </p>
              <p className="text-xs leading-relaxed text-slate-700 font-medium">
                Never disregard professional medical advice or delay seeking it because of something you have read on this website. Our formulations are wellness supplements and natural cosmetics; they are not drugs intended to cure, treat, or mitigate specific physiological diseases. Individual responses to herbal remedies vary according to unique constitution types (Prakriti).
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                1. Account Registration & Store Use
              </h2>
              <p>
                By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence. You agree not to use our products for any illegal or unauthorized purpose nor violate any laws in your jurisdiction.
              </p>
              <p>
                You are responsible for maintaining the confidentiality of your account credentials (if created) and accept full responsibility for all activities that occur under your account.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                2. Accuracy of Products & Natural Variance
              </h2>
              <p>
                We attempt to be as accurate as possible in describing our products. However, because our formulations utilize raw, natural, and wildcrafted botanical extracts:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>
                  <strong>Visual & Olfactory Variance:</strong> Scent, color, and texture may vary slightly from batch to batch depending on crop harvest cycles and seasonal changes. This is a normal hallmark of genuine, organic herbal preparations.
                </li>
                <li>
                  <strong>Packaging:</strong> Packaging shapes, labels, and designs may undergo minor aesthetic modifications and might differ slightly from the product images shown online.
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                3. Modification of Services & Prices
              </h2>
              <p>
                Prices for our Ayurvedic products are subject to change without notice. We reserve the right at any time to modify or discontinue any product or formula without prior notice. We shall not be liable to you or to any third party for any modification, price change, suspension, or discontinuance of the Service.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                4. Billing & Payment Security
              </h2>
              <p>
                We reserve the right to refuse or cancel any order you place with us. In the event that we make a change to or cancel an order, we will attempt to notify you by contacting the email, billing address, or phone number provided at the time the order was made.
              </p>
              <p>
                All transactions on Ayurelix are processed through secure, encrypted payment gateways (Razorpay, Stripe). We do not store your raw credit/debit card credentials on our servers.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                5. Intellectual Property
              </h2>
              <p>
                The Ayurelix logo, typography, website structure, product images, brand philosophy, and custom formulation recipes are the exclusive intellectual property of Ayurelix. Any reproduction, distribution, or unauthorized commercial use of these materials is strictly prohibited unless explicitly authorized by us in writing.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                6. Limitation of Liability
              </h2>
              <p>
                In no event shall Ayurelix, our directors, employees, or suppliers be liable for any indirect, incidental, punitive, or consequential damages arising from your use of any product or service. Our maximum combined liability for any claim shall not exceed the actual purchase price paid by you for the specific item that caused the claim.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                7. Governing Law & Jurisdiction
              </h2>
              <p>
                These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of India. Any disputes arising out of these terms shall be subject to the exclusive jurisdiction of the competent courts in <strong>Bangalore, Karnataka, India</strong>.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

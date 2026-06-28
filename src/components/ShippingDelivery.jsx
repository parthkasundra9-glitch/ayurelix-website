import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PolicySidebar from "./PolicySidebar";
import { motion } from "framer-motion";

export default function ShippingDelivery() {
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
            className="flex-grow space-y-8 text-slate-600 leading-relaxed text-sm bg-white p-8 lg:p-12 border border-[#3C5A44]/10 rounded-3xl shadow-sm"
          >
            <div>
              <p className="text-base text-slate-700 font-medium mb-4">
                Thank you for choosing Ayurelix. We are committed to delivering our fresh, small-batch Ayurvedic formulations directly from our wellness gardens to your doorstep. Below are the terms and conditions that constitute our Shipping & Delivery Policy.
              </p>
            </div>

            <hr className="border-[#3C5A44]/5" />

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#3C5A44] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                1. Shipment Processing Times
              </h2>
              <p>
                All orders are processed and packed within <strong>24 to 48 business hours</strong>. Orders placed on Sundays, major public holidays, or after 2:00 PM IST on Saturdays will be processed on the next business day.
              </p>
              <p className="bg-[#fbf9f4] border border-[#3C5A44]/5 rounded-2xl p-4 italic text-slate-500">
                Please note: Our Ayurvedic oils and herbal extracts are prepared in temperature-controlled environments. During extreme summer seasons, some orders might be briefly held back for 24 hours to coordinate climate-controlled dispatch, ensuring peak biological potency is maintained.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#3C5A44] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                2. Shipping Rates & Delivery Estimates
              </h2>
              <p>
                Shipping charges for your order will be calculated and displayed at checkout. Below are standard shipping guidelines:
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-[#3C5A44]/10 rounded-2xl overflow-hidden text-xs md:text-sm">
                  <thead>
                    <tr className="bg-[#fbf9f4] text-[#3C5A44] font-bold border-b border-[#3C5A44]/10">
                      <th className="p-4">Shipping Destination</th>
                      <th className="p-4">Estimated Delivery Time</th>
                      <th className="p-4">Shipping Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#3C5A44]/5">
                      <td className="p-4 font-semibold text-[#3C5A44]">Domestic (India) - Standard</td>
                      <td className="p-4">3 to 5 Business Days</td>
                      <td className="p-4">₹60 (Free on orders above ₹999)</td>
                    </tr>
                    <tr className="border-b border-[#3C5A44]/5">
                      <td className="p-4 font-semibold text-[#3C5A44]">Domestic (India) - Express</td>
                      <td className="p-4">1 to 2 Business Days</td>
                      <td className="p-4">₹150 (Flat Rate)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-[#3C5A44]">International (Outside India)</td>
                      <td className="p-4">7 to 14 Business Days</td>
                      <td className="p-4">Calculated by weight at checkout</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#3C5A44] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                3. Shipment Confirmation & Tracking
              </h2>
              <p>
                Once your order has been packed and handed over to our shipping carriers (Delhivery, BlueDart, or DHL), you will receive a Shipment Confirmation email and SMS containing your <strong>Awb (Air Waybill) tracking number</strong>. You can monitor your shipment's journey using the provided link or directly on our shipping dashboard.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#3C5A44] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                4. Customs, Duties, and Taxes
              </h2>
              <p>
                Ayurelix is not responsible for any customs clearance fees, import duties, or taxes applied to your package upon entering international borders. All fees collected during or after shipping are the responsibility of the customer.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#3C5A44] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                5. Damages and Missing Deliveries
              </h2>
              <p>
                Our glass bottles and herbal jars are wrapped in bio-degradable honeycomb protective packaging. However, if you receive a product that was damaged or broken in transit:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Please take clear photographs/video of the damaged packaging and product.</li>
                <li>Email us at <a href="mailto:ayurelix512@gmail.com" className="text-[#B89355] font-bold underline">ayurelix512@gmail.com</a> within <strong>48 hours</strong> of delivery.</li>
                <li>We will dispatch a fresh replacement bottle immediately at no extra cost.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#3C5A44] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                6. Shipping Address Correction
              </h2>
              <p>
                If you have entered an incorrect shipping address, please contact us at <a href="tel:+919876543210" className="text-[#3C5A44] underline">+91 98765 43210</a> or email us before 4:00 PM IST on the day of order placement. Once orders are dispatched, we are unable to redirect packages.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

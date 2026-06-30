import Navbar from "./Navbar";
import Footer from "./Footer";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Consult Our Experts & Support | Ayurelix";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white min-h-screen text-[#1A2B49] relative overflow-hidden">
      <Navbar />

      {/* Decorative background glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-[#B89355]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full bg-[#f4efe2]/60 blur-[120px] pointer-events-none" />

      <section className="max-w-7xl mx-auto py-32 px-8 z-10 relative">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="text-[#B89355] uppercase tracking-[0.25em] text-xs font-bold block">
              Consult with us
            </span>
            <h1
              className="text-5xl md:text-6xl font-black text-[#1A2B49] font-serif"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              GET IN TOUCH
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed">
              Have questions about our formulations, your order, or just want to chat about wellness? Drop us a message, and our Ayurvedic consultants will reach out to you.
            </p>

            <div className="space-y-6 text-slate-500 font-semibold pt-4">
              <div className="flex items-center gap-4">
                <span className="text-[#B89355] text-base font-bold uppercase tracking-wider w-24">Legal Name:</span>
                <span className="text-[#1A2B49]">Ayurelix Private Limited</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[#B89355] text-base font-bold uppercase tracking-wider w-24">Email:</span>
                <span className="text-[#1A2B49]">ayurelix512@gmail.com</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[#B89355] text-base font-bold uppercase tracking-wider w-24">Phone:</span>
                <span className="text-[#1A2B49]">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[#B89355] text-base font-bold uppercase tracking-wider w-24">Address:</span>
                <span className="text-[#1A2B49]">A-12, Wellness Park, Bangalore, India</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-[#fbf9f4]/80 border border-[#1A2B49]/10 rounded-3xl p-8 backdrop-blur-xl shadow-xl hover:shadow-2xl transition duration-300"
          >
            {submitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-12 space-y-6"
              >
                <h3 className="text-3xl font-bold text-[#B89355] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>Thank You!</h3>
                <p className="text-slate-600 text-sm max-w-xs mx-auto leading-relaxed">
                  Your message has been received successfully. One of our Ayurvedic consultants will contact you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-8 py-3 bg-[#1A2B49] text-white font-black rounded-xl hover:bg-[#B89355] transition duration-200"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-slate-500 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-white border border-[#1A2B49]/10 rounded-xl px-4 py-3 text-[#1A2B49] placeholder-slate-400 focus:outline-none focus:border-[#B89355] focus:ring-1 focus:ring-[#B89355] transition"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-slate-500 mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    className="w-full bg-white border border-[#1A2B49]/10 rounded-xl px-4 py-3 text-[#1A2B49] placeholder-slate-400 focus:outline-none focus:border-[#B89355] focus:ring-1 focus:ring-[#B89355] transition"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-slate-500 mb-2">Message</label>
                  <textarea
                    required
                    rows="4"
                    className="w-full bg-white border border-[#1A2B49]/10 rounded-xl px-4 py-3 text-[#1A2B49] placeholder-slate-400 focus:outline-none focus:border-[#B89355] focus:ring-1 focus:ring-[#B89355] transition"
                    placeholder="Your inquiry details..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#1A2B49] text-white font-black rounded-xl hover:bg-[#B89355] active:scale-[0.98] transition duration-200"
                >
                  Send Message
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </section>

      <Footer />
    </div>
  );
}


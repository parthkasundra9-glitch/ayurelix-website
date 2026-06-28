import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { supabase } from "../supabaseClient";
import { FiCheckCircle, FiArrowLeft, FiMail } from "react-icons/fi";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleResetRequest = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + "/reset-password",
      });

      if (resetError) {
        setError(resetError.message);
      } else {
        setSubmitted(true);
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen text-[#1A2B49] flex flex-col relative overflow-hidden">
      <Navbar />

      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#B89355]/5 blur-[130px] pointer-events-none" />

      <div className="flex-grow flex items-center justify-center px-8 py-32 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md bg-[#fbf9f4] border border-[#1A2B49]/5 rounded-3xl p-8 backdrop-blur-xl shadow-xl"
        >
          <div className="text-center mb-8 flex flex-col items-center">
            <Logo size="md" variant="gold" showText={true} layout="vertical" />
          </div>

          {submitted ? (
            <div className="text-center space-y-6">
              <div className="flex justify-center text-[#B89355]">
                <FiCheckCircle size={56} />
              </div>
              <h3 className="text-2xl font-bold font-serif text-[#1A2B49]" style={{ fontFamily: "'Cinzel', serif" }}>
                Check Your Email
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">
                We have sent a secure password reset link to <strong className="text-[#1A2B49]">{email}</strong>. Please click the link inside the email to choose a new password.
              </p>
              <div className="pt-4">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 text-[#1A2B49] hover:text-[#B89355] font-bold text-sm transition"
                >
                  <FiArrowLeft size={16} />
                  <span>Back to Sign In</span>
                </Link>
              </div>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleResetRequest}>
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold font-serif text-[#1A2B49]" style={{ fontFamily: "'Cinzel', serif" }}>
                  FORGOT PASSWORD
                </h2>
                <p className="text-gray-600 text-xs font-semibold mt-2">
                  Enter your email address below, and we will send you a secure link to reset your password.
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl p-3 text-center font-semibold">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-gray-600 mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-[#1A2B49]/10 rounded-xl px-4 py-3 text-[#1A2B49] focus:outline-none focus:border-[#B89355] transition"
                  placeholder="name@domain.com"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#1A2B49] text-white font-black rounded-xl hover:bg-[#B89355] active:scale-[0.98] transition duration-200 disabled:opacity-50 shadow-md flex items-center justify-center gap-2"
              >
                <FiMail size={16} />
                <span>{loading ? "Sending link..." : "Send Reset Link"}</span>
              </button>

              <div className="text-center pt-2">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-[#1A2B49] font-semibold text-sm transition"
                >
                  <FiArrowLeft size={16} />
                  <span>Back to Sign In</span>
                </Link>
              </div>
            </form>
          )}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}

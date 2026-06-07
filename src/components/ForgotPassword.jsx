import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { supabase } from "../supabaseClient";
import { FiCheckCircle, FiArrowLeft, FiLock, FiMail } from "react-icons/fi";

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // 1: Send OTP, 2: Enter OTP & New Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Step 1: Request OTP / Reset Email Link
  const handleRequestOTP = async (e) => {
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
        // Go to Step 2 to enter OTP
        setStep(2);
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP and Update Password
  const handleVerifyAndReset = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (!otp || otp.trim().length < 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    setLoading(true);

    try {
      // 1. Verify OTP with Supabase
      const { data: verifyData, error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token: otp.trim(),
        type: "recovery",
      });

      if (verifyError) {
        setError(verifyError.message);
        setLoading(false);
        return;
      }

      // 2. Session is now active. Update the user password.
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateError) {
        setError(updateError.message);
      } else {
        setSuccess(true);
      }
    } catch {
      setError("An unexpected error occurred during password reset.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen text-[#0e1a30] flex flex-col relative overflow-hidden">
      <Navbar />

      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#c5a059]/5 blur-[130px] pointer-events-none" />

      <div className="flex-grow flex items-center justify-center px-8 py-32 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md bg-[#fbf9f4] border border-[#0e1a30]/5 rounded-3xl p-8 backdrop-blur-xl shadow-xl"
        >
          <div className="text-center mb-8 flex flex-col items-center">
            <Logo size="md" variant="gold" showText={true} layout="vertical" />
          </div>

          {success ? (
            <div className="text-center space-y-6">
              <div className="flex justify-center text-[#c5a059]">
                <FiCheckCircle size={56} />
              </div>
              <h3 className="text-2xl font-bold font-serif text-[#0e1a30]" style={{ fontFamily: "'Cinzel', serif" }}>
                Password Updated!
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">
                Your password has been successfully updated. You can now use your new credentials to sign in.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => navigate("/login")}
                  className="w-full py-3.5 bg-[#0e1a30] hover:bg-[#c5a059] text-white font-black rounded-xl transition shadow-md"
                >
                  Sign In
                </button>
              </div>
            </div>
          ) : (
            <>
              {step === 1 ? (
                // Step 1 Form: Request OTP
                <form className="space-y-6" onSubmit={handleRequestOTP}>
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-bold font-serif text-[#0e1a30]" style={{ fontFamily: "'Cinzel', serif" }}>
                      RESET PASSWORD
                    </h2>
                    <p className="text-gray-600 text-xs font-semibold mt-2">
                      Enter your email address to receive a 6-digit OTP code to verify your identity.
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl p-3 text-center font-semibold">
                      {error}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-bold text-gray-600 mb-2">Email Address</label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white border border-[#0e1a30]/10 rounded-xl px-4 py-3 text-[#0e1a30] focus:outline-none focus:border-[#c5a059] transition"
                        placeholder="name@domain.com"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-[#0e1a30] text-white font-black rounded-xl hover:bg-[#c5a059] active:scale-[0.98] transition duration-200 disabled:opacity-50 shadow-md flex items-center justify-center gap-2"
                  >
                    <FiMail size={16} />
                    <span>{loading ? "Sending OTP..." : "Get OTP Code"}</span>
                  </button>

                  <div className="text-center pt-2">
                    <Link
                      to="/login"
                      className="inline-flex items-center gap-2 text-gray-600 hover:text-[#0e1a30] font-semibold text-sm transition"
                    >
                      <FiArrowLeft size={16} />
                      <span>Back to Sign In</span>
                    </Link>
                  </div>
                </form>
              ) : (
                // Step 2 Form: Verify OTP & Input New Password
                <form className="space-y-6" onSubmit={handleVerifyAndReset}>
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-bold font-serif text-[#0e1a30]" style={{ fontFamily: "'Cinzel', serif" }}>
                      VERIFY OTP
                    </h2>
                    <p className="text-gray-600 text-xs font-semibold mt-2">
                      An OTP has been sent to <strong className="text-[#0e1a30]">{email}</strong>. Enter the 6-digit code and your new password.
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl p-3 text-center font-semibold">
                      {error}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-bold text-gray-600 mb-2">6-Digit OTP Code</label>
                    <input
                      type="text"
                      required
                      maxLength="6"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                      className="w-full bg-white border border-[#0e1a30]/10 rounded-xl px-4 py-3 text-[#0e1a30] focus:outline-none focus:border-[#c5a059] font-mono text-center text-lg tracking-[0.5em] transition"
                      placeholder="000000"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-bold text-gray-600 mb-2">New Password</label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white border border-[#0e1a30]/10 rounded-xl px-4 py-3 text-[#0e1a30] focus:outline-none focus:border-[#c5a059] transition"
                      placeholder="••••••••"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-bold text-gray-600 mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-white border border-[#0e1a30]/10 rounded-xl px-4 py-3 text-[#0e1a30] focus:outline-none focus:border-[#c5a059] transition"
                      placeholder="••••••••"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-[#0e1a30] text-white font-black rounded-xl hover:bg-[#c5a059] active:scale-[0.98] transition duration-200 disabled:opacity-50 shadow-md flex items-center justify-center gap-2"
                  >
                    <FiLock size={16} />
                    <span>{loading ? "Resetting Password..." : "Reset Password"}</span>
                  </button>

                  <div className="flex justify-between items-center pt-2 text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-gray-600 hover:text-[#0e1a30] transition flex items-center gap-1"
                    >
                      <FiArrowLeft />
                      <span>Change Email</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleRequestOTP}
                      className="text-[#c5a059] hover:underline"
                    >
                      Resend OTP
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}

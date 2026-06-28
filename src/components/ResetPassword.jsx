import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { supabase } from "../supabaseClient";
import { FiCheckCircle, FiLock, FiAlertCircle } from "react-icons/fi";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    const checkSession = async () => {
      // 1. Check if session is already parsed and set in memory
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session && active) {
        setSessionLoading(false);
        return;
      }

      // 2. If session isn't loaded yet, listen to auth state changes.
      // When Supabase parses the URL hash fragment or exchanges the PKCE code,
      // it triggers a SIGNED_IN or PASSWORD_RECOVERY event.
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (session && active) {
          setSessionLoading(false);
          subscription.unsubscribe();
        }
      });

      // 3. Fallback timeout: If no session is established after 4 seconds, show an error.
      setTimeout(async () => {
        if (active) {
          const { data: { session: currentSession } } = await supabase.auth.getSession();
          if (!currentSession) {
            setError("Your password recovery session could not be established. The link may have expired or is invalid.");
          }
          setSessionLoading(false);
        }
      }, 4000);

      return () => {
        active = false;
        subscription.unsubscribe();
      };
    };

    checkSession();
  }, []);

  const handlePasswordReset = async (e) => {
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

    setLoading(true);

    try {
      const { error: resetError } = await supabase.auth.updateUser({
        password: password,
      });

      if (resetError) {
        setError(resetError.message);
      } else {
        setSuccess(true);
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

          {sessionLoading ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-12 h-12 border-4 border-[#B89355] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-sm text-gray-600 font-semibold">
                Verifying recovery session...
              </p>
            </div>
          ) : success ? (
            <div className="text-center space-y-6">
              <div className="flex justify-center text-[#B89355]">
                <FiCheckCircle size={56} />
              </div>
              <h3 className="text-2xl font-bold font-serif text-[#1A2B49]" style={{ fontFamily: "'Cinzel', serif" }}>
                Password Updated!
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">
                Your password has been successfully updated. You can now use your new credentials to sign in.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => navigate("/login")}
                  className="w-full py-3.5 bg-[#1A2B49] hover:bg-[#B89355] text-white font-black rounded-xl transition shadow-md"
                >
                  Sign In
                </button>
              </div>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handlePasswordReset}>
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold font-serif text-[#1A2B49]" style={{ fontFamily: "'Cinzel', serif" }}>
                  RESET PASSWORD
                </h2>
                <p className="text-gray-600 text-xs font-semibold mt-2">
                  Please enter and confirm your new secure account password below.
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl p-3 text-center font-semibold flex items-center justify-center gap-2">
                  <FiAlertCircle className="shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Show password fields only if no initial error (like expired link) */}
              {!error.includes("recovery session") && (
                <>
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-bold text-gray-600 mb-2">New Password</label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white border border-[#1A2B49]/10 rounded-xl px-4 py-3 text-[#1A2B49] focus:outline-none focus:border-[#B89355] transition"
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
                      className="w-full bg-white border border-[#1A2B49]/10 rounded-xl px-4 py-3 text-[#1A2B49] focus:outline-none focus:border-[#B89355] transition"
                      placeholder="••••••••"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-[#1A2B49] text-white font-black rounded-xl hover:bg-[#B89355] active:scale-[0.98] transition duration-200 disabled:opacity-50 shadow-md flex items-center justify-center gap-2"
                  >
                    <FiLock size={16} />
                    <span>{loading ? "Updating password..." : "Reset Password"}</span>
                  </button>
                </>
              )}

              {error.includes("recovery session") && (
                <div className="text-center pt-4">
                  <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="px-6 py-2.5 bg-[#1A2B49] hover:bg-[#B89355] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition"
                  >
                    Request New Link
                  </button>
                </div>
              )}
            </form>
          )}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}

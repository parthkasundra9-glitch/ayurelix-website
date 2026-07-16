import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { supabase } from "../supabaseClient";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Register an Account | Ayurelix";
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      });

      if (authError) {
        setError(authError.message);
      } else {
        setSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError("");
    try {
      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin
        }
      });
      if (authError) setError(authError.message);
    } catch (err) {
      setError("Failed to initialize Google signup.");
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
            <Logo size="md" variant="gold" showText={false} layout="vertical" />
            <p className="text-gray-600 text-xs font-semibold mt-4">
              Create your account to start your wellness journey.
            </p>
          </div>

          {success ? (
            <div className="bg-[#B89355]/10 border border-[#B89355]/40 rounded-2xl p-6 text-center space-y-3">
              <h3 className="text-xl font-bold text-[#B89355]">Registration Successful!</h3>
              <p className="text-sm text-gray-600">
                Please check your email to confirm your registration. Redirecting to login...
              </p>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSignup}>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl p-3 text-center font-semibold">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-gray-600 mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white border border-[#1A2B49]/10 rounded-xl px-4 py-3 text-[#1A2B49] focus:outline-none focus:border-[#B89355] transition"
                  placeholder="John Doe"
                />
              </div>

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

              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-gray-600 mb-2">Password</label>
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
                <label className="block text-xs uppercase tracking-wider font-bold text-gray-600 mb-2">Confirm Password</label>
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
                className="w-full py-4 bg-[#1A2B49] text-white font-black rounded-xl hover:bg-[#B89355] active:scale-[0.98] transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md cursor-pointer"
              >
                {loading ? "Registering..." : "Sign Up"}
              </button>

              {/* Divider */}
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-4 text-gray-400 text-xs font-bold uppercase">Or</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              {/* Google Button */}
              <button
                type="button"
                onClick={handleGoogleSignup}
                className="w-full py-3.5 bg-white border border-[#1A2B49]/10 hover:border-[#1A2B49]/30 text-[#1A2B49] font-bold rounded-xl flex items-center justify-center gap-3 transition active:scale-[0.98] cursor-pointer shadow-sm"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span className="text-xs uppercase tracking-wider">Continue with Google</span>
              </button>

              <p className="text-[10px] text-gray-500 text-center leading-relaxed mt-4">
                By registering, you agree to our{" "}
                <Link to="/terms" className="text-[#B89355] underline hover:text-[#1A2B49] transition">Terms of Service</Link>
                {" "}and{" "}
                <Link to="/privacy" className="text-[#B89355] underline hover:text-[#1A2B49] transition">Privacy Policy</Link>.
              </p>
            </form>
          )}

          <div className="mt-8 text-center text-sm text-gray-600 font-semibold font-sans">
            Already have an account?{" "}
            <Link to="/login" className="text-[#B89355] hover:underline">
              Login
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}


import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { supabase } from "../supabaseClient";
import { FiEye, FiEyeOff, FiLock, FiMail, FiArrowRight } from "react-icons/fi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Sign In | Ayurelix Skincare Sanctuary";
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data: { session }, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
      } else if (session) {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("is_active")
          .eq("id", session.user.id)
          .maybeSingle();

        if (profileData && profileData.is_active === false) {
          setError("Your account is deactivated. Please contact customer support.");
          await supabase.auth.signOut();
        } else {
          if (email?.toLowerCase().trim() === "kruti6405@gmail.com") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        }
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin
        }
      });
      if (authError) setError(authError.message);
    } catch {
      setError("Failed to initialize Google Login.");
    }
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#1A2B49] flex flex-col justify-between overflow-x-hidden font-sans">
      <Navbar />

      <div className="flex-grow pt-32 lg:pt-40 pb-20 flex items-center justify-center px-4 sm:px-8 relative z-10">
        
        {/* Ambient glow decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#B89355]/5 blur-[140px] pointer-events-none" />

        {/* CLEAN CENTERED CARD CONTAINER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-white border border-[#1A2B49]/8 rounded-3xl p-8 sm:p-10 shadow-[0_15px_50px_rgba(26,43,73,0.06)] relative z-10"
        >
          {/* Brand Logo & Header */}
          <div className="text-center mb-8 flex flex-col items-center">
            <Link to="/" className="mb-4 inline-block">
              <Logo size="md" variant="gold" showText={false} layout="vertical" />
            </Link>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-[#1A2B49]" style={{ fontFamily: "'Cinzel', serif" }}>
              Welcome Back
            </h2>
            <p className="text-xs text-gray-500 font-semibold mt-1">
              Enter your credentials to access your account.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl p-3 text-center font-semibold">
                {error}
              </div>
            )}

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-1.5">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#1A2B49]/10 rounded-xl px-4 py-3 pl-11 text-sm text-[#1A2B49] focus:outline-none focus:border-[#B89355] focus:bg-white transition"
                  placeholder="name@domain.com"
                />
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[10px] uppercase tracking-wider font-bold text-gray-500">Password</label>
                <Link to="/forgot-password" className="text-xs text-[#B89355] hover:underline font-semibold">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#1A2B49]/10 rounded-xl px-4 py-3 pl-11 pr-11 text-sm text-[#1A2B49] focus:outline-none focus:border-[#B89355] focus:bg-white transition"
                  placeholder="••••••••"
                />
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1A2B49] transition cursor-pointer"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#1A2B49] hover:bg-[#B89355] text-white font-black rounded-xl active:scale-[0.98] transition duration-300 disabled:opacity-50 shadow-md cursor-pointer flex items-center justify-center gap-2 uppercase text-xs tracking-wider"
            >
              <span>{loading ? "Signing In..." : "Sign In to Account"}</span>
              {!loading && <FiArrowRight />}
            </button>

            {/* Divider */}
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink mx-4 text-gray-400 text-[10px] font-bold uppercase tracking-wider">Or</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            {/* Google Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-3 bg-white border border-[#1A2B49]/15 hover:border-[#B89355] text-[#1A2B49] font-bold rounded-xl flex items-center justify-center gap-3 transition active:scale-[0.98] cursor-pointer shadow-sm text-xs uppercase tracking-wider"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google</span>
            </button>
          </form>

          <div className="mt-8 text-center text-xs text-gray-500 font-semibold space-y-2">
            <div>
              Don't have an account yet?{" "}
              <Link to="/signup" className="text-[#B89355] font-bold hover:underline">
                Create Account
              </Link>
            </div>
            <div className="text-[11px] text-gray-400 font-normal pt-1 border-t border-gray-100 mt-3">
              By logging in, you agree to our{" "}
              <Link to="/terms" className="text-[#B89355] font-semibold hover:underline">Terms of Service</Link>
              {" "}and{" "}
              <Link to="/privacy" className="text-[#B89355] font-semibold hover:underline">Privacy Policy</Link>.
            </div>
          </div>
        </motion.div>

      </div>

      <Footer />
    </div>
  );
}

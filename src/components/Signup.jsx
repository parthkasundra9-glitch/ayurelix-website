import { useState } from "react";
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
                className="w-full py-4 bg-[#1A2B49] text-white font-black rounded-xl hover:bg-[#B89355] active:scale-[0.98] transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                {loading ? "Registering..." : "Sign Up"}
              </button>
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


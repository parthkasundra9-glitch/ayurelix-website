import { useState } from "react";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { supabase } from "../supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
      } else {
        // Direct admin user to Admin Dashboard, others to home page
        if (email === "admin@ayurelix.com") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen text-[#3C5A44] flex flex-col relative overflow-hidden">
      <Navbar />

      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#B89355]/5 blur-[130px] pointer-events-none" />

      <div className="flex-grow flex items-center justify-center px-8 py-32 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md bg-[#fbf9f4] border border-[#3C5A44]/5 rounded-3xl p-8 backdrop-blur-xl shadow-xl"
        >
          <div className="text-center mb-8 flex flex-col items-center">
            <Logo size="md" variant="gold" showText={true} layout="vertical" />
            <p className="text-gray-600 text-xs font-semibold mt-4">
              Enter your credentials to access your account.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
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
                className="w-full bg-white border border-[#3C5A44]/10 rounded-xl px-4 py-3 text-[#3C5A44] focus:outline-none focus:border-[#B89355] transition"
                placeholder="name@domain.com"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs uppercase tracking-wider font-bold text-gray-600">Password</label>
                <Link to="/forgot-password" className="text-xs text-[#B89355] hover:underline font-semibold">Forgot password?</Link>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-[#3C5A44]/10 rounded-xl px-4 py-3 text-[#3C5A44] focus:outline-none focus:border-[#B89355] transition"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#3C5A44] text-white font-black rounded-xl hover:bg-[#B89355] active:scale-[0.98] transition duration-200 disabled:opacity-50 shadow-md"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-600 font-semibold">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#B89355] hover:underline">Sign up</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}


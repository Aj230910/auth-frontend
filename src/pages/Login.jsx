import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const toggleTheme = () => {
    const html = document.documentElement;
    const isDark = html.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  const login = async () => {
    setError("");
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("accessToken", res.data.accessToken);
      navigate("/dashboard");
    } catch {
      setError("Invalid email or password");
    }
  };

  const googleLogin = () => {
    window.location.href = "https://login-auth-ci52.onrender.com/api/auth/google";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#030712] px-4 relative overflow-hidden transition-colors duration-700">

      {/* Background Animated Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/30 dark:bg-indigo-600/20 rounded-full mix-blend-multiply filter blur-[100px] animate-blob pointer-events-none"></div>
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/30 dark:bg-purple-600/20 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-2000 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-emerald-600/30 dark:bg-emerald-600/20 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-4000 pointer-events-none"></div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] pointer-events-none"></div>

      <div className="w-full max-w-md glass-card p-8 sm:p-10 rounded-3xl z-10 animate-fade-in-up">

        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
              Welcome <span className="gradient-text">Back</span>
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              Enter your details to access your account.
            </p>
          </div>

          <button
            onClick={toggleTheme}
            className="p-3 rounded-2xl bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-sm"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/12180/12180682.png"
              className="w-5 h-5 opacity-80 dark:invert transition-transform hover:rotate-12"
              alt="Toggle Theme"
            />
          </button>
        </div>

        {error && (
          <div className="p-4 mb-6 text-sm text-red-600 dark:text-red-400 bg-red-50/50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-2xl flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}

        <div className="space-y-5 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1 block">Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="glass-input"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Password</label>
              <a href="#" className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">Forgot password?</a>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="glass-input"
            />
          </div>
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <button
            onClick={login}
            className="btn-primary mt-8"
          >
            <span>Sign In to Dashboard</span>
          </button>
        </div>

        <div className="relative my-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-700/50"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 text-gray-500 bg-gray-50 dark:bg-[#030712] font-medium rounded-full">
              Or continue with
            </span>
          </div>
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <button
            onClick={googleLogin}
            className="w-full py-3.5 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 flex items-center justify-center gap-3 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-50/80 dark:hover:bg-gray-700 transition-all transform hover:-translate-y-0.5 shadow-sm hover:shadow-md"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/300/300221.png"
              alt="Google"
              className="w-5 h-5 pointer-events-none"
            />
            <span>Sign In with Google</span>
          </button>
        </div>

        <p className="text-center text-sm mt-8 text-gray-600 dark:text-gray-400 font-medium animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors font-bold hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

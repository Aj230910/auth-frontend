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
    <div className="min-h-screen flex bg-gray-50 dark:bg-[#030712] transition-colors duration-700">
      
      {/* Left Panel - Branding/Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-indigo-600 items-center justify-center p-12">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/90 via-indigo-900/40 to-transparent"></div>
        
        {/* Animated Orbs for Left Panel */}
        <div className="absolute top-[20%] left-[20%] w-72 h-72 bg-purple-500/40 rounded-full mix-blend-screen filter blur-[80px] animate-blob"></div>
        <div className="absolute bottom-[20%] right-[20%] w-72 h-72 bg-blue-500/40 rounded-full mix-blend-screen filter blur-[80px] animate-blob animation-delay-2000"></div>

        <div className="relative z-10 glass-card p-10 max-w-lg animate-fade-in-up border-white/10 text-white rounded-[2rem] bg-black/20 backdrop-blur-3xl shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-md shadow-inner">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-2xl font-bold tracking-tight">NexAuth Platform</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
            Accelerate your workflow with <span className="text-indigo-300">intelligence</span>
          </h1>
          <p className="text-lg text-indigo-100 font-medium mb-8 leading-relaxed">
            Join thousands of developers using our platform to scale their applications with unmatched speed and security.
          </p>
          
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              <img className="w-10 h-10 rounded-full border-2 border-indigo-500 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="User" />
              <img className="w-10 h-10 rounded-full border-2 border-indigo-500 object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" alt="User" />
              <img className="w-10 h-10 rounded-full border-2 border-indigo-500 object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="User" />
              <div className="w-10 h-10 rounded-full border-2 border-indigo-500 bg-indigo-800 flex items-center justify-center text-xs font-bold">+2k</div>
            </div>
            <p className="text-sm text-indigo-200 font-medium tracking-wide">Loved by developers worldwide</p>
          </div>
        </div>
      </div>

      {/* Right Panel - Form container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
        
        {/* Background Animated Elements for Form Panel */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 dark:bg-indigo-600/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 dark:bg-purple-600/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000 pointer-events-none"></div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

        <div className="w-full max-w-md z-10 animate-fade-in-up">
          
          {/* Header */}
          <div className="flex items-start justify-between mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
                Welcome <span className="gradient-text">Back</span>
              </h2>
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                Enter your details to access your account.
              </p>
            </div>

            <button
              onClick={toggleTheme}
              className="p-3 rounded-2xl bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              title="Toggle Theme"
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

          <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
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
              className="w-full py-3.5 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 flex items-center justify-center gap-3 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-50/80 dark:hover:bg-gray-700 transition-all transform hover:-translate-y-0.5 shadow-sm hover:shadow-md group"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/300/300221.png"
                alt="Google"
                className="w-5 h-5 pointer-events-none group-hover:scale-110 transition-transform"
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
    </div>
  );
}

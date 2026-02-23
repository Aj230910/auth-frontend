import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 🌗 Theme toggle
  const toggleTheme = () => {
    const html = document.documentElement;
    const isDark = html.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token");
    if (tokenFromUrl) {
      localStorage.setItem("accessToken", tokenFromUrl);
      window.history.replaceState({}, "", "/dashboard");
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/", { replace: true });
      return;
    }

    api
      .get("/auth/profile")
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("accessToken");
        navigate("/", { replace: true });
      });
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#030712]">
        <div className="relative flex flex-col justify-center items-center">
          <div className="absolute animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
          <div className="absolute animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 animation-delay-2000" style={{ animationDirection: 'reverse' }}></div>
          <p className="text-gray-500 dark:text-gray-400 mt-24 font-medium animate-pulse">Loading workspace…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#030712] px-4 relative overflow-hidden transition-colors duration-700 w-full">

      {/* Background Animated Elements */}
      <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/30 dark:bg-indigo-600/20 rounded-full mix-blend-multiply filter blur-[120px] animate-blob pointer-events-none"></div>
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-purple-600/30 dark:bg-purple-600/20 rounded-full mix-blend-multiply filter blur-[120px] animate-blob animation-delay-2000 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[30%] w-[700px] h-[700px] bg-emerald-600/30 dark:bg-emerald-600/20 rounded-full mix-blend-multiply filter blur-[120px] animate-blob animation-delay-4000 pointer-events-none"></div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] pointer-events-none"></div>

      {/* ===== MAIN PAGE CONTAINER ===== */}
      <div className="w-full max-w-2xl glass-card p-8 sm:p-12 rounded-3xl z-10 animate-fade-in-up">

        {/* ===== Header ===== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
              Dashboard
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">
              Welcome back to your secure dashboard.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              title="Toggle theme"
              className="p-3 rounded-2xl bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all shadow-sm group"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/12180/12180682.png"
                alt="Theme toggle"
                className="w-5 h-5 opacity-80 dark:invert group-hover:rotate-12 transition-transform"
              />
            </button>

            <button
              onClick={() => {
                localStorage.removeItem("accessToken");
                navigate("/");
              }}
              className="px-5 py-3 rounded-2xl bg-red-50/80 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-200/50 dark:border-red-500/30 font-semibold transition-colors shadow-sm"
            >
              Log Out
            </button>
          </div>
        </div>

        {/* ===== Profile Display Section ===== */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div
            onClick={() => navigate("/edit-profile")}
            className="group relative flex items-center gap-6 p-6 mb-10 rounded-3xl bg-white/60 dark:bg-gray-800/40 border border-gray-200/80 dark:border-gray-700/50 cursor-pointer overflow-hidden backdrop-blur-md transition-all duration-300 hover:border-indigo-400/50 hover:bg-white/80 dark:hover:bg-gray-800/60 hover:shadow-xl hover:shadow-indigo-500/10"
          >
            {/* Soft decorative gradient under profile card */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <div className="relative animate-float">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur opacity-40 group-hover:opacity-60 transition duration-500"></div>
              <img
                src="https://cdn-icons-png.flaticon.com/128/9131/9131529.png"
                alt="Profile"
                className="relative w-16 h-16 object-cover rounded-full border-2 border-white dark:border-gray-800 z-10"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white dark:border-gray-800 z-20"></div>
            </div>

            <div className="flex-1 z-10">
              <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 group-hover:from-indigo-600 group-hover:to-purple-500 dark:group-hover:from-indigo-400 dark:group-hover:to-purple-400 transition-all duration-300">
                {user.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">
                Tap to manage profile
              </p>
            </div>

            <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-4 transition-all duration-300 z-10">
              <span className="text-xl">→</span>
            </div>
          </div>
        </div>

        {/* ===== Info Fields Section ===== */}
        <div className="space-y-5 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>

          <div className="p-6 rounded-2xl bg-white/40 dark:bg-gray-800/30 border border-gray-100/50 dark:border-gray-700/30 backdrop-blur-sm transition-colors hover:bg-white/60 dark:hover:bg-gray-800/50 group">
            <div className="flex items-center gap-3 mb-2">
              <svg className="w-5 h-5 text-indigo-500 dark:text-indigo-400 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <p className="text-xs uppercase tracking-widest font-bold text-gray-500 dark:text-gray-400">
                Full Name
              </p>
            </div>
            <p className="text-lg text-gray-900 dark:text-white font-semibold pl-8">
              {user.name}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/40 dark:bg-gray-800/30 border border-gray-100/50 dark:border-gray-700/30 backdrop-blur-sm transition-colors hover:bg-white/60 dark:hover:bg-gray-800/50 group">
            <div className="flex items-center gap-3 mb-2">
              <svg className="w-5 h-5 text-purple-500 dark:text-purple-400 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <p className="text-xs uppercase tracking-widest font-bold text-gray-500 dark:text-gray-400">
                Email Address
              </p>
            </div>
            <p className="text-lg text-gray-900 dark:text-white font-semibold pl-8 break-all">
              {user.email}
            </p>
          </div>

        </div>

        {/* ===== Action Section ===== */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <button
            onClick={() => navigate("/edit-profile")}
            className="btn-primary mt-10"
          >
            <span>Edit Profile Settings</span>
          </button>
        </div>

      </div>
    </div>
  );
}

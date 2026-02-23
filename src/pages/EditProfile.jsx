import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function EditProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/auth/profile")
      .then((res) => {
        setName(res.data.name);
        setEmail(res.data.email);
      })
      .catch(() => navigate("/"));
  }, []);

  const updateProfile = async () => {
    setError("");
    setSuccess("");

    if (!name.trim()) {
      setError("Name cannot be empty");
      return;
    }

    try {
      await api.patch("/auth/profile", { name });
      setSuccess("Profile updated successfully");
    } catch {
      setError("Update failed");
    }
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

        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
          Edit <span className="gradient-text">Profile</span>
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-8">
          Update your personal details below.
        </p>

        {error && (
          <div className="p-4 mb-6 text-sm text-red-600 dark:text-red-400 bg-red-50/50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-2xl flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}

        {success && (
          <div className="p-4 mb-6 text-sm text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-2xl flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {success}
          </div>
        )}

        <div className="space-y-5 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {/* Name */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1 block">
              Full Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="glass-input"
            />
          </div>

          {/* Email (read-only) */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1 block flex justify-between">
              Email Address <span className="text-xs text-gray-400 font-normal self-end">Cannot be changed</span>
            </label>
            <input
              value={email}
              disabled
              className="w-full p-4 rounded-xl bg-gray-100 dark:bg-gray-800/30 text-gray-500 dark:text-gray-500 border border-gray-200 dark:border-gray-700/50 cursor-not-allowed transition-all"
            />
          </div>
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <button
            onClick={updateProfile}
            className="btn-primary mt-8 mb-4"
          >
            <span>Save Changes</span>
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="w-full py-4 rounded-xl bg-transparent border border-gray-300 dark:border-gray-600/80 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-100 dark:hover:bg-gray-800/80 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

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
    <div className="min-h-screen bg-gray-50 dark:bg-[#030712] transition-colors duration-700 font-sans">
      
      {/* Top Navbar */}
      <nav className="fixed w-full z-50 glass-card rounded-none border-t-0 border-x-0 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate("/dashboard")}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">NexAuth</span>
        </div>
        
        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2.5 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-700 transition border border-gray-200 dark:border-gray-700 shadow-sm">
            <img src="https://cdn-icons-png.flaticon.com/128/12180/12180682.png" alt="Toggle Theme" className="w-5 h-5 dark:invert opacity-80 hover:opacity-100" />
          </button>
          
          <div className="h-8 w-px bg-gray-300 dark:bg-gray-700"></div>
          
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
               <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">{name || "User"}</p>
               <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Settings</p>
            </div>
            <img 
               src="https://cdn-icons-png.flaticon.com/128/9131/9131529.png" 
               alt="Profile" 
               className="w-10 h-10 rounded-full border-2 border-indigo-500 object-cover shadow-sm" 
            />
          </div>
        </div>
      </nav>

      {/* Main Layout */}
      <main className="pt-32 pb-12 px-4 sm:px-6 lg:px-12 max-w-5xl mx-auto relative z-10 min-h-screen flex flex-col justify-center">
         {/* Background Blobs */}
         <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/15 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob pointer-events-none z-0"></div>
         <div className="fixed bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-purple-600/15 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000 pointer-events-none z-0"></div>

         <div className="w-full relative z-10 glass-card p-8 sm:p-12 rounded-[2.5rem] shadow-2xl animate-fade-in-up border-gray-200 dark:border-white/5">
           <div className="flex flex-col md:flex-row gap-12">
             
             {/* Left side info (Sidebar aesthetics inside the card) */}
             <div className="w-full md:w-1/3 flex flex-col items-start border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800 pb-8 md:pb-0 md:pr-12">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="mb-8 flex items-center gap-2 text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Dashboard
                </button>

                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
                  Account <span className="gradient-text">Settings</span>
                </h2>
                <p className="text-gray-500 dark:text-gray-400 font-medium mb-10 leading-relaxed">
                  Update your personal details, email, and manage your account security settings.
                </p>

                {error && (
                  <div className="w-full p-4 mb-4 text-sm text-red-600 dark:text-red-400 bg-red-50/50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-2xl flex items-start gap-3 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {error}
                  </div>
                )}

                {success && (
                  <div className="w-full p-4 mb-4 text-sm text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-2xl flex items-start gap-3 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {success}
                  </div>
                )}
             </div>

             {/* Right side form */}
             <div className="w-full md:w-2/3 flex flex-col justify-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="mb-10 flex items-center gap-6">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur opacity-20 group-hover:opacity-100 transition duration-500"></div>
                    <img src="https://cdn-icons-png.flaticon.com/128/9131/9131529.png" className="relative w-24 h-24 rounded-full border-4 border-white dark:border-[#0b1120] object-cover z-10" alt="Avatar" />
                    <button className="absolute bottom-0 right-0 p-2 rounded-full bg-indigo-600 text-white z-20 border-2 border-white dark:border-[#0b1120] hover:scale-110 transition-transform shadow-lg" title="Change Avatar">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                  </div>
                  <div>
                     <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Profile Photo</h3>
                     <p className="text-sm text-gray-500 dark:text-gray-400">Upload a new photo (SVG, PNG, JPG)</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1 block uppercase tracking-wider">
                      Full Name
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="glass-input focus:bg-white dark:focus:bg-gray-800"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1 flex justify-between uppercase tracking-wider">
                      Email Address <span className="text-xs text-indigo-500 font-bold self-end lowercase tracking-normal bg-indigo-50 dark:bg-indigo-500/10 px-2 py-0.5 rounded">Primary</span>
                    </label>
                    <input
                      value={email}
                      disabled
                      className="w-full p-4 rounded-xl bg-gray-100/50 dark:bg-gray-800/30 text-gray-500 dark:text-gray-500 border border-gray-200 dark:border-gray-700/50 cursor-not-allowed transition-all shadow-inner"
                    />
                    <p className="text-xs text-gray-400 ml-1 mt-1 font-medium">To change your email address, contact support.</p>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-800 flex justify-end gap-4 items-center">
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="px-6 py-4 rounded-xl text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-100 dark:hover:bg-gray-800/80 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={updateProfile}
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold shadow-lg shadow-indigo-500/25 transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    Save Changes
                  </button>
                </div>

             </div>
           </div>
         </div>
      </main>
    </div>
  );
}

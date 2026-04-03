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
    <div className="min-h-screen bg-gray-50 dark:bg-[#030712] transition-colors duration-700 font-sans">
      
      {/* Top Navbar */}
      <nav className="fixed w-full z-50 glass-card rounded-none border-t-0 border-x-0 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">NexAuth</span>
        </div>
        
        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2.5 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-700 transition border border-gray-200 dark:border-gray-700 shadow-sm">
            <img src="https://cdn-icons-png.flaticon.com/128/12180/12180682.png" alt="Toggle Theme" className="w-5 h-5 dark:invert opacity-80 hover:opacity-100" />
          </button>
          
          <div className="h-8 w-px bg-gray-300 dark:bg-gray-700"></div>
          
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
               <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">{user.name}</p>
               <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Pro Plan</p>
            </div>
            <img 
               src="https://cdn-icons-png.flaticon.com/128/9131/9131529.png" 
               alt="Profile" 
               className="w-10 h-10 rounded-full border-2 border-indigo-500 cursor-pointer object-cover hover:shadow-lg hover:shadow-indigo-500/30 transition shadow-sm" 
               onClick={() => navigate("/edit-profile")} 
            />
          </div>
        </div>
      </nav>

      {/* Main Layout */}
      <main className="pt-28 pb-12 px-6 lg:px-12 max-w-7xl mx-auto relative z-10">
         {/* Background Blobs for Dashboard */}
         <div className="fixed top-[20%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob pointer-events-none z-0"></div>
         <div className="fixed bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-purple-600/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000 pointer-events-none z-0"></div>

         <div className="relative z-10">
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 animate-fade-in-up">
             <div>
               <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-3">
                 Welcome back, <span className="gradient-text">{user.name.split(' ')[0]}</span>
               </h1>
               <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
                 Here is what's happening with your workspace today.
               </p>
             </div>
             <button 
                onClick={() => { localStorage.removeItem("accessToken"); navigate("/"); }} 
                className="px-6 py-3 rounded-xl bg-red-50/80 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 font-semibold border border-red-200 dark:border-red-500/30 transition-all shadow-sm flex items-center gap-2 w-fit"
             >
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
               </svg>
               Sign Out
             </button>
           </div>

           {/* Grid Layout */}
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             
             {/* Left Column (Profile Info) */}
             <div className="lg:col-span-1 space-y-8 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                <div className="glass-card p-8 rounded-3xl group">
                   <div className="flex justify-between items-center mb-6">
                     <h3 className="font-bold text-xl text-gray-900 dark:text-white">Profile Details</h3>
                     <button onClick={() => navigate("/edit-profile")} className="p-2 rounded-xl bg-indigo-50/80 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition border border-indigo-100 dark:border-indigo-500/20 shadow-sm" title="Edit Profile">
                       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                       </svg>
                     </button>
                   </div>
                   
                   <div className="flex flex-col items-center mb-8">
                      <div className="relative mb-4">
                        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-500"></div>
                        <img src="https://cdn-icons-png.flaticon.com/128/9131/9131529.png" className="relative w-28 h-28 rounded-full border-4 border-white dark:border-[#0b1120] object-cover z-10 shadow-xl" alt="Profile" />
                      </div>
                      <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">{user.name}</h2>
                      <span className="mt-3 px-4 py-1.5 bg-emerald-100/80 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider rounded-full border border-emerald-200 dark:border-emerald-500/20 shadow-sm flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Active
                      </span>
                   </div>

                   <div className="space-y-4">
                     <div className="p-5 bg-gray-50/70 dark:bg-gray-800/40 rounded-2xl border border-gray-100 dark:border-gray-700/50 hover:bg-gray-100/50 dark:hover:bg-gray-800/60 transition-colors">
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest mb-1.5">Email Address</p>
                        <p className="font-semibold text-gray-900 dark:text-gray-200 break-all">{user.email}</p>
                     </div>
                   </div>
                </div>

                <div className="glass-card p-8 rounded-3xl">
                  <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-6">Security Option</h3>
                  <button className="w-full py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 flex items-center justify-between px-6 hover:bg-white dark:hover:bg-gray-700 hover:shadow-md transition-all group mb-2" onClick={() => navigate("/edit-profile")}>
                     <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                        <span className="font-semibold text-gray-700 dark:text-gray-300">Change Password</span>
                     </div>
                     <span className="text-gray-400 group-hover:translate-x-1 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-all font-bold">→</span>
                  </button>
                </div>
             </div>

             {/* Right/Main Column (Dashboard Widgets mockup) */}
             <div className="lg:col-span-2 space-y-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                {/* KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   <div className="glass-card p-7 rounded-3xl relative overflow-hidden group hover:-translate-y-1 transition-transform">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-bl-full -z-10 group-hover:scale-125 transition-transform duration-700"></div>
                     <p className="text-gray-500 dark:text-gray-400 font-semibold mb-3 tracking-wide">Total API Requests</p>
                     <div className="flex items-end gap-4">
                       <h4 className="text-4xl font-bold text-gray-900 dark:text-white">24.5K</h4>
                       <span className="text-emerald-500 text-sm font-bold pb-1 flex items-center bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-lg"><svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg> 12%</span>
                     </div>
                   </div>
                   
                   <div className="glass-card p-7 rounded-3xl relative overflow-hidden group hover:-translate-y-1 transition-transform">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-bl-full -z-10 group-hover:scale-125 transition-transform duration-700"></div>
                     <p className="text-gray-500 dark:text-gray-400 font-semibold mb-3 tracking-wide">Active Sessions</p>
                     <div className="flex items-end gap-4">
                       <h4 className="text-4xl font-bold text-gray-900 dark:text-white">1,245</h4>
                       <span className="text-emerald-500 text-sm font-bold pb-1 flex items-center bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-lg"><svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg> 5%</span>
                     </div>
                   </div>
                </div>

                {/* Main graph/activity area placeholder */}
                <div className="glass-card p-8 rounded-3xl h-[420px] flex flex-col relative overflow-hidden">
                  <div className="flex justify-between items-center mb-8 relative z-10">
                     <h3 className="font-bold text-xl text-gray-900 dark:text-white">Activity Overview</h3>
                     <select className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 outline-none shadow-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                        <option>This Year</option>
                     </select>
                  </div>

                  {/* Aesthetic Chart Placeholder */}
                  <div className="flex-1 flex items-end gap-3 sm:gap-6 justify-between pt-10 relative z-10 border-b border-gray-100 dark:border-gray-800 pb-2">
                     {/* Horizontal grid lines */}
                     <div className="absolute inset-0 flex flex-col justify-between pt-20 pb-2 -z-10 px-0 opacity-40">
                       <div className="w-full h-px bg-gray-200 dark:bg-gray-700"></div>
                       <div className="w-full h-px bg-gray-200 dark:bg-gray-700"></div>
                       <div className="w-full h-px bg-gray-200 dark:bg-gray-700"></div>
                     </div>

                     {[40, 70, 45, 90, 65, 85, 100].map((h, i) => {
                       const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                       return (
                         <div key={i} className="w-full flex justify-center group relative h-full items-end pb-8">
                            {/* Tooltip */}
                            <div className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs py-1.5 px-3 rounded-lg font-bold shadow-lg transition-all duration-300 z-50 pointer-events-none transform translate-y-2 group-hover:translate-y-0">{h * 12}</div>
                            
                            {/* Bar */}
                            <div className="w-full max-w-[48px] bg-indigo-100 dark:bg-indigo-500/20 rounded-t-xl group-hover:bg-indigo-500/80 transition-colors relative overflow-hidden cursor-pointer" style={{height: `${h}%`}}>
                               <div className="absolute bottom-0 w-full bg-gradient-to-t from-indigo-600 to-indigo-400 opacity-90 transition-transform duration-700" style={{height: `100%`}}></div>
                            </div>

                            {/* Label */}
                            <div className="absolute -bottom-1 text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{days[i]}</div>
                         </div>
                       )
                     })}
                  </div>
                </div>
             </div>

           </div>
         </div>
      </main>
    </div>
  );
}

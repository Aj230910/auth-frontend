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
      <div className="min-h-screen flex items-center justify-center
        bg-gray-100 dark:bg-gray-900">
        <p className="text-gray-500 dark:text-gray-400">
          Loading dashboard…
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center
      bg-gray-100 dark:bg-gray-900 px-3 sm:px-4">

      {/* ===== MAIN CARD (SAME AS LOGIN / REGISTER) ===== */}
      <div className="w-full max-w-md sm:max-w-lg
        bg-white dark:bg-gray-800
        p-6 sm:p-8 rounded-2xl shadow-xl
        border border-gray-200 dark:border-gray-700">

        {/* ===== Header ===== */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold
            text-gray-900 dark:text-white">
            Dashboard
          </h1>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              title="Toggle theme"
              className="p-2 rounded-lg
                bg-white dark:bg-gray-700
                border border-gray-200 dark:border-gray-600"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/12180/12180682.png"
                alt="Theme toggle"
                className="w-5 h-5"
              />
            </button>

            <button
              onClick={() => {
                localStorage.removeItem("accessToken");
                navigate("/");
              }}
              className="px-4 py-2 rounded-lg
                bg-red-600 hover:bg-red-700
                text-white font-semibold"
            >
              Logout
            </button>
          </div>
        </div>

        {/* ===== Profile Section ===== */}
        <div
          onClick={() => navigate("/edit-profile")}
          className="flex items-center gap-4 mb-6
            p-4 rounded-xl
            bg-gray-50 dark:bg-gray-700
            border border-gray-200 dark:border-gray-600
            cursor-pointer hover:ring-2 hover:ring-blue-500 transition"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/9131/9131529.png"
            alt="Profile"
            className="w-12 h-12"
          />

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              View profile
            </p>
            <p className="text-lg font-semibold
              text-gray-900 dark:text-white">
              {user.name}
            </p>
          </div>
        </div>

        {/* ===== Info Fields (LIKE REGISTER PAGE INPUTS) ===== */}
        <div className="space-y-4">
          <div className="p-4 rounded-lg
            bg-gray-50 dark:bg-gray-700
            border border-gray-200 dark:border-gray-600">
            <p className="text-xs uppercase tracking-wide
              text-gray-500 dark:text-gray-400 mb-1">
              Name
            </p>
            <p className="text-gray-900 dark:text-white font-medium">
              {user.name}
            </p>
          </div>

          <div className="p-4 rounded-lg
            bg-gray-50 dark:bg-gray-700
            border border-gray-200 dark:border-gray-600">
            <p className="text-xs uppercase tracking-wide
              text-gray-500 dark:text-gray-400 mb-1">
              Email
            </p>
            <p className="text-gray-900 dark:text-white font-medium break-all">
              {user.email}
            </p>
          </div>
        </div>

        {/* ===== Action ===== */}
        <button
          onClick={() => navigate("/edit-profile")}
          className="w-full mt-6 py-3 rounded-lg
            bg-blue-600 hover:bg-blue-700
            text-white font-semibold transition"
        >
          Edit Profile
        </button>

      </div>
    </div>
  );
}

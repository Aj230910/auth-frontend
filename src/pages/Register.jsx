import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const toggleTheme = () => {
    const html = document.documentElement;
    const isDark = html.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  const register = async () => {
    setError("");
    try {
      await api.post("/auth/register", { name, email, password });
      navigate("/");
    } catch {
      setError("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center
      bg-gray-100 dark:bg-gray-900 px-3 sm:px-4">

      <div className="w-full max-w-md sm:max-w-lg
        bg-white dark:bg-gray-800
        p-6 sm:p-8 rounded-2xl shadow-xl
        border border-gray-200 dark:border-gray-700">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold
            text-gray-900 dark:text-white">
            Create Account
          </h2>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg
              bg-white dark:bg-gray-700
              border border-gray-200 dark:border-gray-600"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/12180/12180682.png"
              className="w-5 h-5"
            />
          </button>
        </div>

        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Sign up to get started
        </p>

        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg
            bg-gray-50 dark:bg-gray-700
            border border-gray-300 dark:border-gray-600
            text-gray-900 dark:text-white"
        />

        <input
          placeholder="Email"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg
            bg-gray-50 dark:bg-gray-700
            border border-gray-300 dark:border-gray-600
            text-gray-900 dark:text-white"
        />

        <input
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 rounded-lg
            bg-gray-50 dark:bg-gray-700
            border border-gray-300 dark:border-gray-600
            text-gray-900 dark:text-white"
        />

        <button
          onClick={register}
          className="w-full py-3 rounded-lg
            bg-blue-600 hover:bg-blue-700
            text-white font-semibold transition"
        >
          Register
        </button>

        <p className="text-center text-sm mt-6
          text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

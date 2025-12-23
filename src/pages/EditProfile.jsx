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
    <div className="min-h-screen flex items-center justify-center
      bg-gray-100 dark:bg-gray-900 px-4">

      <div className="w-full max-w-md bg-white dark:bg-gray-800
        p-8 rounded-2xl shadow-xl border
        border-gray-200 dark:border-gray-700">

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Edit Profile
        </h2>

        {error && (
          <p className="text-sm text-red-500 mb-3">{error}</p>
        )}

        {success && (
          <p className="text-sm text-green-600 mb-3">{success}</p>
        )}

        {/* Name */}
        <label className="block text-sm mb-1 text-gray-600 dark:text-gray-400">
          Name
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 p-3 rounded-lg
          bg-white dark:bg-gray-700
          text-gray-900 dark:text-white
          border border-gray-300 dark:border-gray-600
          focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* Email (read-only) */}
        <label className="block text-sm mb-1 text-gray-600 dark:text-gray-400">
          Email
        </label>
        <input
          value={email}
          disabled
          className="w-full mb-6 p-3 rounded-lg
          bg-gray-100 dark:bg-gray-700
          text-gray-500 dark:text-gray-400
          border border-gray-300 dark:border-gray-600 cursor-not-allowed"
        />

        <button
          onClick={updateProfile}
          className="w-full py-3 rounded-lg
          bg-blue-600 hover:bg-blue-700
          text-white font-semibold"
        >
          Save Changes
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          className="w-full mt-3 py-2 rounded-lg
          border border-gray-300 dark:border-gray-600
          text-gray-700 dark:text-gray-300"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

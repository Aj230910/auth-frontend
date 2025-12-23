import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GoogleSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("accessToken", token);

      // 🔥 small delay to ensure storage
      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 300);
    } else {
      navigate("/", { replace: true });
    }
  }, []);

  return <div>Logging in with Google...</div>;
}

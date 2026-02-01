import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LogoLoading from "../components/LogoLoading";
import rom from "../assets/rom.png";

export default function ForgotPassword() {
  const [showLoader, setShowLoader] = useState(true);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/forgot-password",
        {
          email,
        },
      );

      setMessage(response.data.message);
      setEmail("");

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  if (showLoader)
    return <LogoLoading onComplete={() => setShowLoader(false)} />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">

        <img src={rom} 
        alt="Romance Logo" 
        className="w-24 h-24 mx-auto mb-4" 
        />
        
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Reset Password
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}

        {message && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
              disabled={loading || !!message}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !!message}
            className={`w-full py-2 rounded-lg font-semibold transition ${
              loading || !!message
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-pink-500 hover:bg-pink-600 text-white"
            }`}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Remember your password?{" "}
          <a
            href="/login"
            className="text-pink-500 hover:underline font-semibold"
          >
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}

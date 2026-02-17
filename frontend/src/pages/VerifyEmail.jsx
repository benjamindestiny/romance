import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying...");
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const verify = async () => {
      try {
        const token = searchParams.get("token");
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/verify-email?token=${token}`
        );
        setMessage(res.data.message);
        setSuccess(true);
      } catch (error) {
        setMessage("Verification failed or token expired.");
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    };
    verify();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          backgroundColor: success ? "#E6F0FF" : "#FFE6E6",
          color: success ? "#0B3D91" : "#B00020",
          maxWidth: "400px",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>
          {success ? "✅ Verified!" : "❌ Failed!"}
        </h2>
        <p style={{ marginBottom: "30px" }}>{message}</p>
        {!loading && (
          <button
            onClick={() => navigate("/")}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#6C63FF",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Go to Login
          </button>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;

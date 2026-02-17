import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      try {
        const token = searchParams.get("token");

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/verify-email?token=${token}`
        );

        setMessage(res.data.message);
      } catch (error) {
        setMessage("Verification failed or token expired.");
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>{message}</h2>

      {!loading && (
        <button onClick={() => navigate("/")}>
          Go to Login
        </button>
      )}
    </div>
  );
};

export default VerifyEmail;

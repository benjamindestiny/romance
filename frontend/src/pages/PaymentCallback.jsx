import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import LogoLoading from "../components/LogoLoading.jsx";

export default function PaymentCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("processing");

  useEffect(() => {
    const txRef = searchParams.get("tx_ref");
    const flwStatus = searchParams.get("status");

    if (flwStatus === "successful" && txRef) {
      verifyPayment(txRef);
    } else {
      toast.error("Payment failed or cancelled");
      setStatus("failed");
      setLoading(false);
      setTimeout(() => navigate("/billing"), 2000);
    }
  }, [searchParams]);

  const verifyPayment = async (txRef) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/payments/flutterwave/verify`,
        { txRef },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      if (res.data.success) {
        toast.success("Payment successful! You are now Pro 🎉");
        setStatus("success");
        // Force refresh user data everywhere
        localStorage.removeItem("user"); // will be re-fetched on next page
        setTimeout(() => navigate("/collaborate"), 1800);
      } else {
        throw new Error("Verification failed");
      }
    } catch (err) {
      toast.error("Payment verification failed. Contact support.");
      setStatus("failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LogoLoading onComplete={() => {}} />;

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center text-center">
      {status === "success" && (
        <div className="text-green-400 text-4xl font-bold">✅ Payment Received!</div>
      )}
      {status === "failed" && (
        <div className="text-red-400 text-4xl font-bold">Payment failed</div>
      )}
    </div>
  );
}
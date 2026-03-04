import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const Billing = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState("basic");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("info");

  // Plan configurations
  const plans = {
    basic: {
      name: "Basic Plan",
      price: 9.99,
      currency: "USD",
      features: [
        "Access to daily prompts",
        "Basic quiz features",
        "Email support",
      ],
    },
    premium: {
      name: "Premium Plan",
      price: 19.99,
      currency: "USD",
      features: [
        "All Basic features",
        "Advanced analytics",
        "Priority support",
        "Unlimited quizzes",
      ],
    },
    pro: {
      name: "Pro Plan",
      price: 39.99,
      currency: "USD",
      features: [
        "All Premium features",
        "Custom reports",
        "Dedicated support",
        "API access",
      ],
    },
  };

  // Check payment status on mount
  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const res = await axios.get("/api/payments/status");
        if (res.data.success) {
          setPaymentStatus(res.data.data);
        }
      } catch (error) {
        console.error("Error checking payment status:", error);
      }
    };

    checkPaymentStatus();
  }, []);

  // Initialize Flutterwave payment
  const handlePayment = async () => {
    // determine an identifier property – backend returns _id
    const userId = user?._id || user?.id;
    if (!user || !userId) {
      setMessage("Please log in to make a payment");
      setMessageType("error");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const planData = plans[selectedPlan];

      // Initialize payment with backend
      const response = await axios.post(
        "/api/payments/flutterwave/initialize",
        {
          amount: planData.price,
          currency: planData.currency,
          email: user.email || "", // backend can lookup if missing
          userId: user._id || user.id,
          planId: selectedPlan,
        },
      );

      if (response.data.success && response.data.data.link) {
        // Redirect to Flutterwave checkout
        window.location.href = response.data.data.link;
      } else {
        setMessage("Failed to initialize payment. Please try again.");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Payment initialization error:", error);
      setMessage(
        error.response?.data?.message || "Payment initialization failed",
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
        padding: "2rem",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            marginBottom: "3rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          <ArrowLeftIcon
            onClick={() => navigate(-1)}
            style={{
              width: "24px",
              height: "24px",
              cursor: "pointer",
              marginRight: "1rem",
              color: "#333",
            }}
          />
          <div style={{ flexGrow: 1, textAlign: "center" }}>
            <h1
              style={{
                fontSize: "2.5rem",
                color: "#333",
                marginBottom: "1rem",
              }}
            >
              Choose Your Plan
            </h1>
            <p style={{ fontSize: "1.1rem", color: "#666" }}>
              Upgrade to unlock premium features and enhance your romance
              journey
            </p>
          </div>
        </div>

        {/* Current Status */}
        {paymentStatus && (
          <div
            style={{
              backgroundColor: "#e8f5e9",
              border: "1px solid #4caf50",
              borderRadius: "8px",
              padding: "1rem",
              marginBottom: "2rem",
              textAlign: "center",
            }}
          >
            <p style={{ color: "#2e7d32", fontWeight: "bold" }}>
              Current Plan:{" "}
              <span style={{ textTransform: "capitalize" }}>
                {paymentStatus.premiumPlan}
              </span>
              {paymentStatus.isPremium && paymentStatus.premiumExpiryDate && (
                <>
                  <br />
                  Expires:{" "}
                  {new Date(
                    paymentStatus.premiumExpiryDate,
                  ).toLocaleDateString()}
                </>
              )}
            </p>
          </div>
        )}

        {/* Message / notification area */}
        {message && (
          <div
            style={{
              backgroundColor: messageType === "error" ? "#ffebee" : "#e3f2fd",
              border:
                messageType === "error"
                  ? "1px solid #f44336"
                  : "1px solid #2196f3",
              borderRadius: "8px",
              padding: "1rem",
              marginBottom: "2rem",
              color: messageType === "error" ? "#b71c1c" : "#0d47a1",
              textAlign: "center",
            }}
          >
            {message}
          </div>
        )}

        {/* Plans Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem",
            marginBottom: "3rem",
          }}
        >
          {Object.entries(plans).map(([planId, planData]) => (
            <div
              key={planId}
              style={{
                backgroundColor: selectedPlan === planId ? "#fff3e0" : "#fff",
                border:
                  selectedPlan === planId
                    ? "2px solid #ff6b9d"
                    : "1px solid #ddd",
                borderRadius: "12px",
                padding: "2rem",
                boxShadow:
                  selectedPlan === planId
                    ? "0 4px 12px rgba(255, 107, 157, 0.2)"
                    : "0 2px 8px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
                cursor: "pointer",
                position: "relative",
              }}
              onClick={() => setSelectedPlan(planId)}
            >
              {selectedPlan === planId && (
                <div
                  style={{
                    position: "absolute",
                    top: "-12px",
                    right: "20px",
                    backgroundColor: "#ff6b9d",
                    color: "white",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontSize: "0.85rem",
                    fontWeight: "bold",
                  }}
                >
                  Selected
                </div>
              )}

              <h3
                style={{
                  fontSize: "1.5rem",
                  color: "#333",
                  marginBottom: "0.5rem",
                }}
              >
                {planData.name}
              </h3>

              <div style={{ marginBottom: "1.5rem" }}>
                <span
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                    color: "#ff6b9d",
                  }}
                >
                  ${planData.price}
                </span>
                <span style={{ color: "#666", marginLeft: "0.5rem" }}>
                  /month
                </span>
              </div>

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  marginBottom: "2rem",
                }}
              >
                {planData.features.map((feature, idx) => (
                  <li
                    key={idx}
                    style={{
                      padding: "0.5rem 0",
                      color: "#555",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <span style={{ marginRight: "0.5rem", color: "#4caf50" }}>
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => {
                  setSelectedPlan(planId);
                  handlePayment();
                }}
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "12px",
                  backgroundColor:
                    selectedPlan === planId ? "#ff6b9d" : "#f0f0f0",
                  color: selectedPlan === planId ? "white" : "#333",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.6 : 1,
                  transition: "all 0.3s ease",
                }}
              >
                {loading ? "Processing..." : "Upgrade Now"}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "12px",
            padding: "2rem",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              color: "#333",
              marginBottom: "1.5rem",
            }}
          >
            Frequently Asked Questions
          </h2>

          <div style={{ display: "grid", gap: "1rem" }}>
            {[
              {
                q: "Can I change my plan later?",
                a: "Yes! You can upgrade or downgrade your plan at any time.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, debit cards, and mobile money through Flutterwave.",
              },
              {
                q: "Is there a free trial?",
                a: "Currently, all plans require payment. However, the Free plan includes basic features.",
              },
              {
                q: "Do you offer refunds?",
                a: "Yes, we offer a 7-day money-back guarantee if you're not satisfied.",
              },
            ].map((item, idx) => (
              <div key={idx}>
                <h4 style={{ color: "#333", marginBottom: "0.5rem" }}>
                  {item.q}
                </h4>
                <p style={{ color: "#666", marginLeft: "1rem" }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;

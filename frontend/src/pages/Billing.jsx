import React, { useState, useEffect } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const Billing = () => {
  // Stripe checkout form component
  const StripeCheckoutForm = ({
    amount,
    planId,
    cardholderName,
    setCardholderName,
    setLoading,
  }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!stripe || !elements) return;
      setLoading(true);

      try {
        // create payment intent on backend
        const intentRes = await axios.post(
          "/api/payments/stripe/create-intent",
          {
            amount,
            planId,
            currency: "USD",
          },
        );

        const clientSecret = intentRes.data.clientSecret;
        if (!clientSecret) throw new Error("No client secret returned");

        const cardElement = elements.getElement(CardElement);

        const confirmRes = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: { name: cardholderName || "Customer" },
          },
        });

        if (confirmRes.error) {
          throw confirmRes.error;
        }

        if (
          confirmRes.paymentIntent &&
          confirmRes.paymentIntent.status === "succeeded"
        ) {
          // inform backend to confirm and create records
          await axios.post("/api/payments/stripe/confirm", {
            paymentIntentId: confirmRes.paymentIntent.id,
            planId,
          });

          alert("Payment successful!");
        } else {
          alert("Payment not completed");
        }
      } catch (err) {
        console.error("Stripe payment error", err);
        alert(err.message || "Payment failed");
      } finally {
        setLoading(false);
      }
    };

    return (
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Cardholder Name
          </label>
          <input
            type="text"
            placeholder="John Doe"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ddd",
              fontSize: "1em",
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Card Details
          </label>
          <div
            style={{
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              background: "#fff",
            }}
          >
            <CardElement />
          </div>
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#FF6B9D",
            color: "#fff",
            border: "none",
            padding: "12px",
            borderRadius: "5px",
            fontSize: "1em",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Pay ${amount}
        </button>
      </form>
    );
  };
};

export default Billing;

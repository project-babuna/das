"use client";

import { useEffect, useState } from "react";

const genericMessage =
  "We could not verify this payment confirmation link. If your payment was successful, your registration will be verified and session details will be shared on WhatsApp/email.";

export default function PaymentSuccessContent({ orderId }) {
  const [status, setStatus] = useState(orderId ? "loading" : "unverified");

  useEffect(() => {
    if (!orderId) {
      setStatus("unverified");
      return;
    }

    let isMounted = true;

    async function verifyStatus() {
      try {
        const response = await fetch(`/api/payment-status?order_id=${encodeURIComponent(orderId)}`);
        const data = await response.json();

        if (!isMounted) {
          return;
        }

        setStatus(response.ok && data.success && data.paid ? "paid" : "unverified");
      } catch {
        if (isMounted) {
          setStatus("unverified");
        }
      }
    }

    verifyStatus();

    return () => {
      isMounted = false;
    };
  }, [orderId]);

  const isPaid = status === "paid";
  const isLoading = status === "loading";

  return (
    <div className="container status-card">
      <span className="status-mark status-mark-success" aria-hidden="true">
        ✓
      </span>
      <p className="eyebrow">{isLoading ? "Verifying payment" : "Payment status"}</p>
      <h1>{isPaid ? "Your Registration Is Confirmed" : "Payment Confirmation"}</h1>
      {isLoading ? (
        <p>Verifying your payment confirmation. This should only take a moment.</p>
      ) : isPaid ? (
        <>
          <p>
            Your payment is successful and your seat for the DreamAndScale Clarity Session is
            confirmed.
          </p>
          <p>Session details will be shared on WhatsApp/email.</p>
        </>
      ) : (
        <p>{genericMessage}</p>
      )}
      <div className="hero-actions">
        <a className="btn btn-primary" href="/full-program">
          Explore Full Program
        </a>
        <a className="btn btn-secondary" href="/">
          Back To Home
        </a>
      </div>
      {isPaid ? (
        <p className="status-note">Please keep your WhatsApp number active for session updates.</p>
      ) : null}
    </div>
  );
}

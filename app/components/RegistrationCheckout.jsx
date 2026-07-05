"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const programOptions = [
  {
    key: "clarity_session",
    title: "Clarity Session",
    subtitle: "Explore DreamAndScale Before You Enrol",
    originalPrice: "₹2,999",
    price: "₹199",
    amount: 199,
    meta: "3 Hours • Live",
  },
  {
    key: "full_program",
    title: "DreamAndScale Full Program",
    subtitle: "Build Business Clarity Independently",
    originalPrice: "₹39,990",
    price: "₹9,999",
    amount: 9999,
    meta: "Self-paced",
  },
  {
    key: "mentorship",
    title: "DreamAndScale Plus",
    subtitle: "Learn With Mentorship",
    originalPrice: "₹1,59,999",
    price: "₹49,990",
    amount: 49990,
    meta: "Self-paced + Live Mentor Support",
  },
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  role: "",
  message: "",
};

const trustItems = [
  "Secure Razorpay checkout",
  "Server-side payment verification",
  "Registration saved before payment",
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[6-9]\d{9}$/;

const getProgramOption = (programKey) =>
  programOptions.find((program) => program.key === programKey) || programOptions[0];

export function RegistrationCheckout({ initialProgramKey = "clarity_session" }) {
  const [form, setForm] = useState(initialForm);
  const [selectedProgramKey, setSelectedProgramKey] = useState(initialProgramKey);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notice, setNotice] = useState(null);

  const selectedProgram = getProgramOption(selectedProgramKey);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const program = params.get("program");

    if (programOptions.some((option) => option.key === program)) {
      setSelectedProgramKey(program);
    } else {
      setSelectedProgramKey(initialProgramKey);
    }
  }, [initialProgramKey]);

  const updateField = (event) => {
    const { name, value } = event.target;
    const nextValue = name === "phone" ? value.replace(/\D/g, "").slice(0, 10) : value;

    setForm((current) => ({ ...current, [name]: nextValue }));
  };

  const validateForm = () => {
    const cleanPhone = form.phone.trim();
    const cleanEmail = form.email.trim();

    if (!phonePattern.test(cleanPhone)) {
      return "Please enter a valid 10-digit Indian mobile number.";
    }

    if (!cleanEmail) {
      return "Please enter your email address.";
    }

    if (!emailPattern.test(cleanEmail)) {
      return "Please enter a valid email address.";
    }

    return null;
  };

  const getUtmFields = () => {
    if (typeof window === "undefined") {
      return {};
    }

    const params = new URLSearchParams(window.location.search);

    return {
      source_page: window.location.pathname,
      utm_source: params.get("utm_source") || undefined,
      utm_medium: params.get("utm_medium") || undefined,
      utm_campaign: params.get("utm_campaign") || undefined,
    };
  };

  const postJson = async (url, payload) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Request failed.");
    }

    return data;
  };

  const openRazorpay = ({ lead, order }) =>
    new Promise((resolve, reject) => {
      if (!window.Razorpay) {
        reject(new Error("Payment script is still loading. Please try again."));
        return;
      }

      const verifyPayment = async (response) =>
        postJson("/api/verify-payment", {
          ...response,
          lead_id: lead.id,
          program: selectedProgram.key,
        });

      const checkout = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "DreamAndScale",
        description: selectedProgram.title,
        order_id: order.id,
        image: "/ds-favicon-on-light-180.png",
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        notes: {
          lead_id: lead.id,
          program: selectedProgram.title,
        },
        theme: {
          color: "#2563eb",
        },
        retry: {
          enabled: true,
          max_count: 2,
        },
        remember_customer: true,
        handler: async (response) => {
          try {
            await verifyPayment(response);
            resolve();
          } catch (error) {
            reject(error);
          }
        },
        modal: {
          ondismiss: () => {
            reject(new Error("Payment window closed before completion."));
          },
        },
      });

      checkout.on("payment.failed", (response) => {
        reject(new Error(response.error?.description || "Payment failed."));
      });

      checkout.open();
    });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setNotice(null);

    const validationMessage = validateForm();

    if (validationMessage) {
      setNotice({
        type: "error",
        message: validationMessage,
      });
      return;
    }

    setIsSubmitting(true);
    let paymentStarted = false;

    try {
      const registration = await postJson("/api/register", {
        ...form,
        interest: selectedProgram.key,
        ...getUtmFields(),
      });

      const { order } = await postJson("/api/create-order", {
        lead_id: registration.lead.id,
        program: selectedProgram.key,
      });

      paymentStarted = true;
      await openRazorpay({ lead: registration.lead, order });

      setForm(initialForm);
      window.location.assign(`/payment-success?program=${selectedProgram.key}`);
    } catch (error) {
      if (paymentStarted && error.message !== "Payment window closed before completion.") {
        window.location.assign(`/payment-failed?program=${selectedProgram.key}`);
        return;
      }

      setNotice({
        type: "error",
        message: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />

      <section className="section registration-section registration-section-compact">
        <div className="container registration-layout">
          <div className="section-kicker">
            <p className="eyebrow dark">Razorpay secure checkout</p>
            <h2>Continue with your selected program.</h2>
            <p>
              Complete a few details and continue to Razorpay. Your payment is authenticated by
              Razorpay and verified on DreamAndScale before your registration is marked as paid.
            </p>
            <div className="registration-assurance" aria-label="Checkout assurances">
              {trustItems.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>

          <form className="registration-form" onSubmit={handleSubmit}>
            <div className="registration-form-header registration-form-full">
              <span>Selected program</span>
              <strong>Confirm your details</strong>
            </div>

            <div className="registration-selected-card registration-form-full">
              <span>{selectedProgram.meta}</span>
              <div>
                <strong>{selectedProgram.title}</strong>
                <p>{selectedProgram.subtitle}</p>
              </div>
              <em>
                <s>{selectedProgram.originalPrice}</s>
                {selectedProgram.price}
              </em>
            </div>

            <label>
              <span>Name *</span>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={updateField}
                autoComplete="name"
                required
              />
            </label>

            <label>
              <span>Phone *</span>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={updateField}
                autoComplete="tel"
                inputMode="numeric"
                minLength="10"
                maxLength="10"
                pattern="[6-9][0-9]{9}"
                placeholder="10-digit mobile number"
                required
              />
            </label>

            <label>
              <span>Email *</span>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={updateField}
                autoComplete="email"
                inputMode="email"
                placeholder="you@example.com"
                required
              />
            </label>

            <label>
              <span>You are</span>
              <select
                className={form.role ? "" : "select-placeholder"}
                name="role"
                value={form.role}
                onChange={updateField}
              >
                <option value="" disabled>
                  Select one
                </option>
                <option value="professional">Professional</option>
                <option value="student">Student</option>
                <option value="freelancer">Freelancer</option>
                <option value="builder">Builder</option>
                <option value="business_owner">Business owner</option>
              </select>
            </label>

            <label className="registration-form-full">
              <span>Question or context</span>
              <textarea
                name="message"
                value={form.message}
                onChange={updateField}
                rows="4"
                placeholder="Anything you want the mentor to know before the session?"
              ></textarea>
            </label>

            {notice ? (
              <p className={`form-notice form-notice-${notice.type}`}>{notice.message}</p>
            ) : null}

            <button
              className="btn registration-submit registration-submit-blue"
              type="submit"
              disabled={isSubmitting}
              data-meta-event="InitiateCheckout"
              data-meta-content-name={selectedProgram.title}
              data-meta-content-category="Registration"
              data-meta-value={selectedProgram.amount}
              data-meta-currency="INR"
            >
              {isSubmitting ? "Authenticating..." : `Continue to Razorpay • ${selectedProgram.price}`}
            </button>

            <p className="registration-payment-note registration-form-full">
              Razorpay may ask for OTP, UPI approval, card authentication, or bank confirmation
              depending on your selected payment method.
            </p>
          </form>
        </div>
      </section>
    </>
  );
}

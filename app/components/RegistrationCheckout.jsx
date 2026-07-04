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
    setForm((current) => ({ ...current, [name]: value }));
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

      const checkout = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "DreamAndScale",
        description: selectedProgram.title,
        order_id: order.id,
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
          color: "#0b2f2c",
        },
        handler: async (response) => {
          try {
            await postJson("/api/verify-payment", response);
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
    setIsSubmitting(true);
    setNotice(null);
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

      <section className="content-hero registration-hero">
        <div className="container content-hero-grid">
          <div>
            <p className="eyebrow">DreamAndScale registration</p>
            <h1>Complete Registration For {selectedProgram.title}</h1>
            <p>
              Share your details and complete payment securely through Razorpay. Your payment is
              linked to the program you selected before reaching this page.
            </p>
          </div>
          <aside
            className="content-price-card"
            aria-label={`${selectedProgram.title} payment summary`}
          >
            <span>{selectedProgram.meta}</span>
            <div className="price-display">
              <s>{selectedProgram.originalPrice}</s>
              <strong>{selectedProgram.price}</strong>
            </div>
            <p>{selectedProgram.subtitle}</p>
          </aside>
        </div>
      </section>

      <section className="section registration-section">
        <div className="container registration-layout">
          <div className="section-kicker">
            <p className="eyebrow dark">Secure registration</p>
            <h2>Continue with your selected program.</h2>
            <p>
              Your registration is saved first, then Razorpay opens for payment. After payment,
              your selected program is marked as paid automatically.
            </p>
          </div>

          <form className="registration-form" onSubmit={handleSubmit}>
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
                required
              />
            </label>

            <label>
              <span>Email</span>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={updateField}
                autoComplete="email"
              />
            </label>

            <label>
              <span>You are</span>
              <select name="role" value={form.role} onChange={updateField}>
                <option value="">Select one</option>
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
              className="btn btn-primary registration-submit"
              type="submit"
              disabled={isSubmitting}
              data-meta-event="InitiateCheckout"
              data-meta-content-name={selectedProgram.title}
              data-meta-content-category="Registration"
              data-meta-value={selectedProgram.amount}
              data-meta-currency="INR"
            >
              {isSubmitting ? "Processing..." : `Pay Securely ${selectedProgram.price}`}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

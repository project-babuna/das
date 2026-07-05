"use client";

import { useState } from "react";
import SiteFrame from "./SiteFrame";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  question: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[6-9]\d{9}$/;

const contactSignals = [
  "General enquiries",
  "Program and mentorship support",
  "Payment and registration help",
];

export default function ContactQueryPage() {
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notice, setNotice] = useState(null);

  const updateField = (event) => {
    const { name, value } = event.target;
    const nextValue = name === "phone" ? value.replace(/\D/g, "").slice(0, 10) : value;

    setForm((current) => ({ ...current, [name]: nextValue }));
  };

  const validateForm = () => {
    const cleanName = form.name.trim();
    const cleanEmail = form.email.trim();
    const cleanPhone = form.phone.trim();
    const cleanQuestion = form.question.trim();

    if (!cleanName) {
      return "Please enter your name.";
    }

    if (!cleanQuestion) {
      return "Please enter your message.";
    }

    if (!cleanEmail && !cleanPhone) {
      return "Please enter either your phone number or email address.";
    }

    if (cleanEmail && !emailPattern.test(cleanEmail)) {
      return "Please enter a valid email address.";
    }

    if (cleanPhone && !phonePattern.test(cleanPhone)) {
      return "Please enter a valid 10-digit Indian mobile number.";
    }

    return null;
  };

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

    try {
      const response = await fetch("/api/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          question: form.question,
          source_page: window.location.pathname,
        }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Could not submit your message.");
      }

      setForm(initialForm);
      setNotice({
        type: "success",
        message: "Your message has been received. The DreamAndScale team will get back to you.",
      });
    } catch (error) {
      setNotice({
        type: "error",
        message: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SiteFrame>
      <main>
        <section className="section registration-section registration-section-compact">
          <div className="container registration-layout contact-layout">
            <div className="section-kicker">
              <p className="eyebrow dark">Contact DreamAndScale</p>
              <h2>Get in touch with DreamAndScale</h2>
              <p>
                Have a question, request, collaboration idea, payment issue, or need help choosing
                the right DreamAndScale program?
              </p>
              <p>
                Send your message and we&apos;ll respond with the next step.
              </p>
              <p>
                Please include your phone or email so we can contact you.
              </p>
              <div className="registration-assurance" aria-label="Contact assurances">
                {contactSignals.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>

            <form className="registration-form contact-query-form" onSubmit={handleSubmit}>
              <div className="registration-form-header registration-form-full">
                <span>CONTACT DREAMANDSCALE</span>
                <strong>Send your message</strong>
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
                <span>Phone</span>
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
                />
              </label>

              <label className="registration-form-full">
                <span>Email</span>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={updateField}
                  autoComplete="email"
                  inputMode="email"
                  placeholder="you@example.com"
                />
              </label>

              <label className="registration-form-full">
                <span>Your message *</span>
                <textarea
                  name="question"
                  value={form.question}
                  onChange={updateField}
                  rows="5"
                  placeholder="Write your message here"
                  required
                ></textarea>
              </label>

              {notice ? (
                <p className={`form-notice form-notice-${notice.type}`}>{notice.message}</p>
              ) : null}

              <button
                className="btn registration-submit registration-submit-blue"
                type="submit"
                disabled={isSubmitting}
                data-meta-event="Contact"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              <p className="registration-payment-note registration-form-full">
                For payment or registration-related help, include your registered phone number.
              </p>
            </form>
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}

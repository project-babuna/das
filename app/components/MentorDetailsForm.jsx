"use client";

import { useState } from "react";
import SiteFrame from "./SiteFrame";

const superpowerOptions = [
  "Idea Validation",
  "GTM/Sales",
  "MVP/Product",
  "Marketing",
  "Paid Ads",
  "Operations",
  "Fundraising",
];

const mentorshipOptions = [
  "Pro-Bono (Free volunteer)",
  "Paid 1:1 Sessions",
  "Paid Cohort Workshops",
];

const consentOptions = ["Yes", "No", "Only on the website"];

const initialForm = {
  full_name_role: "",
  email: "",
  linkedin_profile: "",
  superpowers: [],
  other_superpower: "",
  founder_thoughts: "",
  mentorship_model: "",
  session_fee: "",
  time_commitment: "",
  consent: "",
  other_questions: "",
};

export default function MentorDetailsForm() {
  const [form, setForm] = useState(initialForm);
  const [headshot, setHeadshot] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notice, setNotice] = useState(null);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const toggleSuperpower = (option) => {
    setForm((current) => ({
      ...current,
      superpowers: current.superpowers.includes(option)
        ? current.superpowers.filter((item) => item !== option)
        : [...current.superpowers, option],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    setNotice(null);

    if (!headshot) {
      setNotice({ type: "error", message: "Please upload a headshot photo." });
      return;
    }

    if (!form.superpowers.length && !form.other_superpower.trim()) {
      setNotice({ type: "error", message: "Please select at least one primary superpower." });
      return;
    }

    if (headshot.size > 10 * 1024 * 1024) {
      setNotice({ type: "error", message: "Please choose an image smaller than 10 MB." });
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        payload.append(key, Array.isArray(value) ? JSON.stringify(value) : value);
      });
      payload.append("headshot", headshot);

      const response = await fetch("/api/mentor-application", {
        method: "POST",
        body: payload,
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Could not submit your mentor profile.");
      }

      setForm(initialForm);
      setHeadshot(null);
      formElement.reset();
      setNotice({
        type: "success",
        message: "Thank you. Your mentor profile has been received for review.",
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
        <section className="section mentor-details-section">
          <div className="container mentor-details-layout">
            <div className="mentor-details-intro">
              <p className="contact-label">DreamAndScale Mentor Ecosystem</p>
              <h1>
                Help founders move from <span>uncertainty to clarity.</span>
              </h1>
              <p>
                Help us showcase your expertise accurately and match you with early-stage founders
                who will benefit most from your experience.
              </p>
              <p>This short profile takes approximately two minutes to complete.</p>
              <div className="mentor-intro-points" aria-label="Mentor ecosystem benefits">
                <div>
                  <strong>01</strong>
                  <span>Showcase your real-world expertise</span>
                </div>
                <div>
                  <strong>02</strong>
                  <span>Guide relevant early-stage founders</span>
                </div>
                <div>
                  <strong>03</strong>
                  <span>Choose how and when you contribute</span>
                </div>
              </div>
              <div className="mentor-review-note">
                <span aria-hidden="true">✓</span>
                <p>
                  <strong>Thoughtful matching</strong>
                  Every profile is personally reviewed before it is added to the ecosystem.
                </p>
              </div>
            </div>

            <form className="contact-form mentor-details-form" onSubmit={handleSubmit}>
              <div className="contact-form-header">
                <div className="mentor-form-kicker">
                  <span>MENTOR DETAILS</span>
                  <small>2-minute profile</small>
                </div>
                <strong>Tell us about your expertise</strong>
                <p>Fields marked with * are required.</p>
              </div>

              <div className="mentor-form-section-title">
                <span>01</span>
                <div>
                  <strong>Your profile</strong>
                  <small>The essentials founders will see.</small>
                </div>
              </div>

              <label>
                <span>Full Name &amp; Current Role *</span>
                <input
                  name="full_name_role"
                  type="text"
                  value={form.full_name_role}
                  onChange={updateField}
                  placeholder="e.g., Head of Growth at Acme / 2x Founder"
                  autoComplete="name"
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
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </label>

              <label>
                <span>LinkedIn Profile URL</span>
                <input
                  name="linkedin_profile"
                  type="url"
                  value={form.linkedin_profile}
                  onChange={updateField}
                  placeholder="https://www.linkedin.com/in/your-profile"
                  autoComplete="url"
                />
                <small className="contact-field-hint">For public verification on our site.</small>
              </label>

              <label>
                <span>Headshot Photo Upload *</span>
                <input
                  className="mentor-file-input"
                  name="headshot"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(event) => setHeadshot(event.target.files?.[0] || null)}
                  required
                />
                <small className="contact-field-hint">
                  Profile image for your website card. JPG, PNG, or WebP; maximum 10 MB.
                </small>
              </label>

              <div className="mentor-form-section-title">
                <span>02</span>
                <div>
                  <strong>Expertise &amp; engagement</strong>
                  <small>Help us create the right founder–mentor match.</small>
                </div>
              </div>

              <fieldset className="mentor-fieldset">
                <legend>Primary Superpowers *</legend>
                <div className="mentor-choice-grid">
                  {superpowerOptions.map((option) => (
                    <label className="mentor-choice" key={option}>
                      <input
                        type="checkbox"
                        checked={form.superpowers.includes(option)}
                        onChange={() => toggleSuperpower(option)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
                <input
                  name="other_superpower"
                  type="text"
                  value={form.other_superpower}
                  onChange={updateField}
                  placeholder="Other expertise"
                />
              </fieldset>

              <label>
                <span>Your Thoughts on DreamAndScale for Early-Stage Founders *</span>
                <textarea
                  name="founder_thoughts"
                  value={form.founder_thoughts}
                  onChange={updateField}
                  rows="4"
                  placeholder="Share a short statement we may feature with your profile."
                  required
                />
              </label>

              <fieldset className="mentor-fieldset">
                <legend>Mentorship Model *</legend>
                <div className="mentor-choice-list">
                  {mentorshipOptions.map((option) => (
                    <label className="mentor-choice" key={option}>
                      <input
                        name="mentorship_model"
                        type="radio"
                        value={option}
                        checked={form.mentorship_model === option}
                        onChange={updateField}
                        required
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <label>
                <span>Hourly / Session Fee *</span>
                <input
                  name="session_fee"
                  type="text"
                  value={form.session_fee}
                  onChange={updateField}
                  placeholder="₹0 / Free, or specify your rate per call or cohort"
                  required
                />
              </label>

              <label>
                <span>Time Commitment *</span>
                <input
                  name="time_commitment"
                  type="text"
                  value={form.time_commitment}
                  onChange={updateField}
                  placeholder="e.g., 1–2 hours/week, preferred timing, or ad hoc only"
                  required
                />
                <small className="contact-field-hint">
                  Your time is precious to us. Please share your availability and preferred timing.
                </small>
              </label>

              <fieldset className="mentor-fieldset">
                <legend>Your Consent *</legend>
                <p className="mentor-field-description">
                  By submitting your information, photo, and details, you grant DreamAndScale a
                  worldwide, royalty-free, perpetual, non-exclusive licence to publish and display
                  your name, likeness, and photograph according to the option selected below.
                </p>
                <div className="mentor-choice-list">
                  {consentOptions.map((option) => (
                    <label className="mentor-choice" key={option}>
                      <input
                        name="consent"
                        type="radio"
                        value={option}
                        checked={form.consent === option}
                        onChange={updateField}
                        required
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="mentor-form-section-title">
                <span>03</span>
                <div>
                  <strong>One last thing</strong>
                  <small>Anything else you would like us to know?</small>
                </div>
              </div>

              <label>
                <span>Any Other Questions</span>
                <textarea
                  name="other_questions"
                  value={form.other_questions}
                  onChange={updateField}
                  rows="4"
                  placeholder="Ask a question or tell us about your background and notable achievements."
                />
              </label>

              {notice ? (
                <p className={`form-notice form-notice-${notice.type}`}>{notice.message}</p>
              ) : null}

              <button className="btn contact-submit" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Mentor Profile"}
              </button>
              <p className="mentor-submit-note">Your details are reviewed privately by DreamAndScale.</p>
            </form>
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}

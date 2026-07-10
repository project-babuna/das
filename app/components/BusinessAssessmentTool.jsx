"use client";

import { useEffect, useMemo, useState } from "react";
import {
  assessmentCategories,
  assessmentRoles,
  createAssessmentSession,
  scoreAssessment,
} from "../assessmentContent";
import BrandLogo from "./BrandLogo";

const initialLead = {
  name: "",
  phone: "",
  email: "",
  role: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[6-9]\d{9}$/;

export default function BusinessAssessmentTool({ mode = "section" }) {
  const isPageMode = mode === "page";
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [sessionQuestions, setSessionQuestions] = useState(() => createAssessmentSession());
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [lead, setLead] = useState(initialLead);
  const [result, setResult] = useState(null);
  const [notice, setNotice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalQuestions = sessionQuestions.length;
  const currentQuestion = sessionQuestions[step];
  const isQuestionStep = step < totalQuestions;
  const isLeadStep = step === totalQuestions && !result;
  const answeredCount = useMemo(
    () => sessionQuestions.filter((question) => answers[question.id] !== undefined).length,
    [answers, sessionQuestions]
  );
  const progress = result ? 100 : Math.round((Math.min(step, totalQuestions) / totalQuestions) * 100);
  const previewScore = useMemo(() => scoreAssessment(answers), [answers]);
  const leadFirstName = lead.name.trim().split(/\s+/)[0] || "";
  const formatCategoryList = (categories = []) => {
    const labels = categories.map((category) => category.title);

    if (labels.length <= 1) {
      return labels[0] || "business clarity";
    }

    return `${labels.slice(0, -1).join(", ")} and ${labels[labels.length - 1]}`;
  };
  const resultOwnerName = lead.name.trim() || "DreamAndScale Learner";
  const resultFocusText = result?.focusCategories?.length
    ? formatCategoryList(result.focusCategories)
    : "No major clarity gap surfaced in this diagnostic";

  const wrapCanvasText = (context, text, x, y, maxWidth, lineHeight) => {
    const words = text.split(" ");
    let line = "";
    let nextY = y;

    words.forEach((word) => {
      const testLine = line ? `${line} ${word}` : word;

      if (context.measureText(testLine).width > maxWidth && line) {
        context.fillText(line, x, nextY);
        line = word;
        nextY += lineHeight;
      } else {
        line = testLine;
      }
    });

    if (line) {
      context.fillText(line, x, nextY);
    }

    return nextY + lineHeight;
  };

  const createCertificateBlob = () =>
    new Promise((resolve, reject) => {
      if (!result) {
        reject(new Error("No assessment result available."));
        return;
      }

      const canvas = document.createElement("canvas");
      const scale = 2;
      const width = 1400;
      const height = 900;
      canvas.width = width * scale;
      canvas.height = height * scale;

      const context = canvas.getContext("2d");
      context.scale(scale, scale);

      context.fillStyle = "#fffaf0";
      context.fillRect(0, 0, width, height);
      context.strokeStyle = "#d7c39c";
      context.lineWidth = 4;
      context.strokeRect(34, 34, width - 68, height - 68);
      context.strokeStyle = "#0b302d";
      context.lineWidth = 1.5;
      context.strokeRect(58, 58, width - 116, height - 116);

      context.fillStyle = "#0b302d";
      context.font = "700 34px Georgia, serif";
      context.fillText("DreamAndScale", 86, 120);
      context.fillStyle = "#c99a2e";
      context.fillRect(87, 138, 160, 5);

      context.fillStyle = "#5f6a67";
      context.font = "700 22px Arial, sans-serif";
      context.letterSpacing = "4px";
      context.fillText("BUSINESS READINESS CERTIFICATE", 86, 205);

      context.fillStyle = "#10191b";
      context.font = "700 58px Arial, sans-serif";
      wrapCanvasText(context, resultOwnerName, 86, 285, 760, 68);

      context.fillStyle = "#5f6a67";
      context.font = "400 28px Arial, sans-serif";
      wrapCanvasText(
        context,
        "has completed the DreamAndScale Business Readiness Assessment.",
        86,
        370,
        760,
        42
      );

      context.fillStyle = "#0b302d";
      context.font = "700 26px Arial, sans-serif";
      context.fillText("Readiness Level", 86, 495);
      context.fillStyle = "#c99a2e";
      context.font = "800 58px Arial, sans-serif";
      context.fillText(result.level, 86, 565);

      context.fillStyle = "#0b302d";
      context.font = "700 24px Arial, sans-serif";
      context.fillText("Diagnostic Result", 870, 260);
      context.fillStyle = "#c99a2e";
      context.font = "800 54px Arial, sans-serif";
      context.fillText(result.scoreLabel || result.level, 870, 330);

      context.fillStyle = "#5f6a67";
      context.font = "400 22px Arial, sans-serif";
      wrapCanvasText(
        context,
        `Focus areas: ${resultFocusText}.`,
        870,
        405,
        390,
        34
      );

      context.fillStyle = "#10191b";
      context.font = "700 24px Arial, sans-serif";
      context.fillText("Category Snapshot", 86, 675);
      context.font = "600 20px Arial, sans-serif";
      result.categoryScores?.forEach((category, index) => {
        const x = index % 2 === 0 ? 86 : 560;
        const y = 725 + Math.floor(index / 2) * 42;
        context.fillStyle = "#10191b";
        context.fillText(category.title, x, y);
        context.fillStyle = "#0b302d";
        context.fillText(category.rating, x + 300, y);
      });

      context.fillStyle = "#5f6a67";
      context.font = "400 18px Arial, sans-serif";
      context.fillText("dreamandscale.com/business-readiness-assessment", 86, 838);

      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Could not create certificate."));
        }
      }, "image/png");
    });

  const downloadCertificate = async () => {
    try {
      const blob = await createCertificateBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "dreamandscale-business-readiness-certificate.png";
      link.click();
      URL.revokeObjectURL(url);
      setNotice({ type: "success", message: "Certificate downloaded." });
    } catch (error) {
      setNotice({ type: "error", message: error.message || "Could not download certificate." });
    }
  };

  const shareCertificate = async () => {
    const shareText = `${resultOwnerName} completed the DreamAndScale Business Readiness Assessment with readiness level: ${result?.level}.`;

    try {
      const blob = await createCertificateBlob();
      const file = new File([blob], "dreamandscale-business-readiness-certificate.png", {
        type: "image/png",
      });

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: "DreamAndScale Business Readiness Certificate",
          text: shareText,
          files: [file],
        });
      } else if (navigator.share) {
        await navigator.share({
          title: "DreamAndScale Business Readiness Certificate",
          text: shareText,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
        setNotice({ type: "success", message: "Share text copied to clipboard." });
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        setNotice({ type: "error", message: "Sharing is not available in this browser." });
      }
    }
  };

  useEffect(() => {
    if (!isPageMode) {
      return undefined;
    }

    document.body.classList.toggle("assessment-open", isPopupOpen);

    return () => {
      document.body.classList.remove("assessment-open");
    };
  }, [isPageMode, isPopupOpen]);

  useEffect(() => {
    if (!isPageMode || !isPopupOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsPopupOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPageMode, isPopupOpen]);

  const startAssessment = () => {
    if (result) {
      setStep(0);
      setAnswers({});
      setLead(initialLead);
      setResult(null);
      setNotice(null);
      setSessionQuestions(createAssessmentSession());
    }

    setIsPopupOpen(true);
  };
  const closeAssessment = () => setIsPopupOpen(false);

  const selectAnswer = (questionId, value) => {
    setAnswers((current) => ({
      ...current,
      [questionId]: value,
    }));
    setNotice(null);
  };

  const goNext = () => {
    if (isQuestionStep && answers[currentQuestion.id] === undefined) {
      setNotice({
        type: "error",
        message: "Please select an answer to continue.",
      });
      return;
    }

    setNotice(null);
    setStep((current) => Math.min(current + 1, totalQuestions));
  };

  const goPrevious = () => {
    setNotice(null);
    setStep((current) => Math.max(current - 1, 0));
  };

  const updateLead = (event) => {
    const { name, value } = event.target;
    const nextValue = name === "phone" ? value.replace(/\D/g, "").slice(0, 10) : value;

    setLead((current) => ({
      ...current,
      [name]: nextValue,
    }));
  };

  const validateLead = () => {
    const cleanName = lead.name.trim();
    const cleanPhone = lead.phone.trim();
    const cleanEmail = lead.email.trim();
    const cleanRole = lead.role.trim();

    if (answeredCount !== totalQuestions) {
      return "Please answer all assessment questions first.";
    }

    if (!cleanName) {
      return "Please enter your name.";
    }

    if (!phonePattern.test(cleanPhone)) {
      return "Please enter a valid 10-digit WhatsApp number.";
    }

    if (!emailPattern.test(cleanEmail)) {
      return "Please enter a valid email address.";
    }

    if (!cleanRole) {
      return "Please select what best describes you.";
    }

    return null;
  };

  const submitLead = async (event) => {
    event?.preventDefault();
    setNotice(null);

    const validationMessage = validateLead();

    if (validationMessage) {
      setNotice({
        type: "error",
        message: validationMessage,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/assessment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: lead.name,
          phone: lead.phone,
          email: lead.email,
          role: lead.role,
          answers,
          source_page: `${window.location.pathname}${window.location.search}`,
        }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Could not save your assessment.");
      }

      setResult(data.report || previewScore);
      setNotice(null);
    } catch (error) {
      setNotice({
        type: "error",
        message: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const assessmentFlow = (
    <>
      <div className="assessment-dialog-header">
        <div className="assessment-modal-brand">
          <BrandLogo tone="dark" compact />
          <h2 id="assessment-title">
            {result ? "Your Business Readiness Report" : "Business Readiness Assessment"}
          </h2>
        </div>
        {isPageMode ? (
          <button type="button" onClick={closeAssessment} aria-label="Close assessment">
            Close
          </button>
        ) : null}
      </div>

      {!result ? (
        <div className="assessment-progress" aria-label="Assessment progress">
          <span>
            {isLeadStep
              ? "Details"
              : `Question ${Math.min(step + 1, totalQuestions)} of ${totalQuestions}`}
          </span>
          <strong>{isLeadStep ? "100" : progress}%</strong>
          <div>
            <i style={{ width: `${isLeadStep ? 100 : progress}%` }}></i>
          </div>
        </div>
      ) : null}

      {isQuestionStep ? (
        <div className="assessment-question-panel">
          <h3>{currentQuestion.question}</h3>
          <div className="assessment-options" role="radiogroup" aria-label={currentQuestion.question}>
            {currentQuestion.options.map((option) => (
              <button
                className={answers[currentQuestion.id] === option.value ? "selected" : ""}
                type="button"
                key={option.label}
                role="radio"
                aria-checked={answers[currentQuestion.id] === option.value}
                onClick={() => selectAnswer(currentQuestion.id, option.value)}
              >
                <strong>{option.letter}</strong>
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {isLeadStep ? (
        <form className="assessment-lead-form" onSubmit={submitLead}>
          <div>
            <h3>Where should we send your assessment record?</h3>
            <p>
              Enter your details to see your score and short report. Your responses help us
              recommend the right next step.
            </p>
          </div>

          <div className="assessment-form-grid">
            <label>
              <span>Name *</span>
              <input
                name="name"
                value={lead.name}
                onChange={updateLead}
                type="text"
                autoComplete="name"
                required
              />
            </label>
            <label>
              <span>WhatsApp *</span>
              <input
                name="phone"
                value={lead.phone}
                onChange={updateLead}
                type="tel"
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
                value={lead.email}
                onChange={updateLead}
                type="email"
                autoComplete="email"
                inputMode="email"
                required
              />
            </label>
            <label>
              <span>You are *</span>
              <select name="role" value={lead.role} onChange={updateLead} required>
                <option value="">Select one</option>
                {assessmentRoles.map((role) => (
                  <option value={role} key={role}>
                    {role}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </form>
      ) : null}

      {result ? (
        <div className="assessment-result">
          <div className="assessment-certificate-brand">
            <BrandLogo tone="dark" compact />
            <span>Business Readiness Certificate</span>
          </div>
          <div className="assessment-score-card">
            <span>Readiness level</span>
            <strong>{result.scoreLabel || result.level}</strong>
            <p>{result.level}</p>
            <small>{result.earned} readiness points</small>
          </div>
          <div className="assessment-report-copy">
            <h3>
              {leadFirstName ? `${leadFirstName}, your readiness level is ${result.level}` : result.level}
            </h3>
            <p>{result.summary}</p>
            {result.focusCategories?.length ? (
              <p>
                The areas that may need more clarity right now are{" "}
                <strong>{formatCategoryList(result.focusCategories)}</strong>.
              </p>
            ) : (
              <p>
                No major clarity gap surfaced in this diagnostic. Your next step is to validate
                assumptions with real customer evidence.
              </p>
            )}
            {result.note ? <p>{result.note}</p> : null}
          </div>
          <div className="assessment-category-report" aria-label="Category report">
            {result.categoryScores?.map((category) => (
              <article key={category.id}>
                <span>{category.title}</span>
                <strong>{category.rating}</strong>
              </article>
            ))}
          </div>
          <div className="assessment-certificate-actions" aria-label="Certificate actions">
            <button type="button" onClick={downloadCertificate}>
              Download Certificate
            </button>
            <button type="button" onClick={shareCertificate}>
              Share Result
            </button>
          </div>
          <div className="assessment-recommendation">
            <p>
              Recommended next step: book the ₹199 Business Clarity Session to review your
              assumptions, identify hidden gaps, and decide what to validate before taking bigger
              business risks.
            </p>
            <a
              className="btn btn-primary"
              href="/register?program=clarity_session"
              data-meta-event="InitiateCheckout"
              data-meta-content-name="Business Assessment Result"
              data-meta-content-category="Assessment"
              data-meta-value="199"
              data-meta-currency="INR"
            >
              Book ₹199 Session
            </a>
          </div>
        </div>
      ) : null}

      {notice ? (
        <p className={`form-notice form-notice-${notice.type}`}>{notice.message}</p>
      ) : null}

      {!result ? (
        <div className="assessment-controls">
          <button type="button" onClick={goPrevious} disabled={step === 0 || isSubmitting}>
            Previous
          </button>
          {isLeadStep ? (
            <button className="btn btn-primary" type="button" disabled={isSubmitting} onClick={submitLead}>
              {isSubmitting ? "Preparing report..." : "See My Score"}
            </button>
          ) : (
            <button className="btn btn-primary" type="button" onClick={goNext}>
              {step + 1 === totalQuestions ? "Continue To Report" : "Next"}
            </button>
          )}
        </div>
      ) : null}
    </>
  );

  return (
    <>
      <section
        className={`section assessment-section ${isPageMode ? "assessment-page-section" : "assessment-home-section"}`}
        id="business-assessment"
      >
        <div className="container assessment-shell">
          <div className="assessment-copy">
            <p className="assessment-label">Free diagnostic tool</p>
            <h2>Business Readiness Assessment</h2>
            <p>
              Before you invest time, money, or career energy into a business idea, check how clear
              you are about the fundamentals.
            </p>
            {isPageMode ? (
              <p className="assessment-page-support">
                Answer 18 focused questions and see how ready you are across idea, customer,
                market, business model, execution, structure, finance, and growth.
              </p>
            ) : null}
            <div className="assessment-actions">
              {isPageMode ? (
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={startAssessment}
                  data-meta-event="Lead"
                  data-meta-content-name="Business Readiness Assessment"
                >
                  Start Free Business Readiness Assessment
                </button>
              ) : (
                <a
                  className="btn btn-primary"
                  href="/business-readiness-assessment"
                  data-meta-event="Lead"
                  data-meta-content-name="Business Readiness Assessment"
                >
                  Start Free Business Readiness Assessment
                </a>
              )}
              <span>18 focused questions. Instant score and suggested next step.</span>
            </div>
          </div>

          {isPageMode ? (
            <div className="assessment-page-visual" aria-label="Assessment overview">
              <div className="assessment-page-score">
                <span>Free diagnostic</span>
                <strong>18</strong>
                <p>questions across the full business journey</p>
              </div>
              <div className="assessment-page-path" aria-label="Assessment flow">
                <span>Idea</span>
                <span>Customer</span>
                <span>Market</span>
                <span>Business Model</span>
                <span>Execution</span>
                <span>Structure</span>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {isPageMode ? (
        <section className="section assessment-detail-section">
          <div className="container">
            <div className="assessment-detail-heading">
              <p className="assessment-label">What the Assessment Checks</p>
              <h2>It measures business clarity, not just confidence.</h2>
              <p>
                The assessment is designed to reveal where your thinking is clear, where you may be
                assuming too much, and what you should understand before taking bigger business
                risks.
              </p>
              <div className="assessment-how-it-works">
                <h3>How it works</h3>
                <ol>
                  <li>Answer 18 focused questions</li>
                  <li>Enter your name and WhatsApp number</li>
                  <li>Get your Business Readiness Score</li>
                  <li>See your recommended next step</li>
                </ol>
              </div>
            </div>

            <div className="assessment-detail-grid">
              {assessmentCategories.map((category, index) => (
                <article key={category.id}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{category.title}</h3>
                    <p>{category.description}</p>
                  </div>
                </article>
              ))}
            </div>

          </div>
        </section>
      ) : null}

      {isPageMode ? (
        <section className="section assessment-cta-section">
          <div className="container">
            <div className="assessment-final-cta">
              <div>
                <h2>Check Your Business Readiness</h2>
                <p>
                  Answer 18 focused questions and get a clear score across the major decisions every
                  aspiring founder should understand.
                </p>
              </div>
              <button
                className="btn btn-primary"
                type="button"
                onClick={startAssessment}
                data-meta-event="Lead"
                data-meta-content-name="Business Readiness Assessment"
              >
                Start Free Business Readiness Assessment
              </button>
            </div>
          </div>
        </section>
      ) : null}

      {isPageMode && isPopupOpen ? (
        <div className="assessment-modal" role="dialog" aria-modal="true" aria-labelledby="assessment-title">
          <button className="assessment-modal-backdrop" type="button" onClick={closeAssessment}>
            <span className="sr-only">Close assessment</span>
          </button>

          <div className="assessment-dialog assessment-dialog-popup">{assessmentFlow}</div>
        </div>
      ) : null}
    </>
  );
}

"use client";

import { useRef, useState } from "react";
import { applicationCategory, applicationPrograms, applicationStages, validateProgramApplication } from "@/lib/programApplication.mjs";
import styles from "./Application.module.css";

export default function ProgramApplicationForm({ initialProgram }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", program: initialProgram, stage: "", business: "", problem: "", progress: "", support: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const submitLock = useRef(false);
  const errorRef = useRef(null);

  function update(event) {
    const { name, value } = event.target;
    setForm(current => ({ ...current, [name]: name === "phone" ? value.replace(/\D/g, "").slice(0, 10) : value }));
  }
  async function submit(event) {
    event.preventDefault();
    if (submitLock.current) return;
    setError("");
    const result = validateProgramApplication(form);
    if (result.error) { setError(result.error); return; }
    submitLock.current = true;
    setStatus("sending");
    try {
      const response = await fetch("/api/query", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, category: applicationCategory, application: result.data, source_page: `${window.location.pathname}${window.location.search}` }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || "Your application could not be saved. Please try again.");
      setStatus("success");
    } catch (failure) {
      setStatus("idle");
      setError(failure.message || "We couldn’t send your application. Your answers are still here. Please try again.");
      requestAnimationFrame(() => errorRef.current?.focus());
    } finally { submitLock.current = false; }
  }

  if (status === "success") return <section className={styles.success} role="status" aria-live="polite"><span>APPLICATION RECEIVED</span><h2>Thank you, {form.name.trim().split(" ")[0]}.</h2><p>Your {applicationPrograms[form.program]} application has been saved for assessment. The team can contact you at <strong>{form.email}</strong> if more information is needed.</p><p>This is an application, not confirmation of selection.</p><a href="/programs">Back to programs</a></section>;

  return <form className={styles.form} onSubmit={submit} aria-labelledby="application-heading" aria-busy={status === "sending"}>
    <h2 id="application-heading">Apply to Build &amp; Grow</h2>
    <p className={styles.required}>Fields marked * are required.</p>
    <fieldset disabled={status === "sending"}><legend>About you</legend>
      <div className={styles.row}>
        <label>Name *<input name="name" value={form.name} onChange={update} autoComplete="name" maxLength={80} required /></label>
        <label>Email *<input name="email" type="email" value={form.email} onChange={update} autoComplete="email" maxLength={120} required /></label>
      </div>
      <label>Phone (optional)<input name="phone" type="tel" inputMode="numeric" autoComplete="tel-national" value={form.phone} onChange={update} pattern="[6-9][0-9]{9}" maxLength={10} placeholder="10-digit Indian mobile number" /></label>
    </fieldset>
    <fieldset disabled={status === "sending"}><legend>About your business</legend>
      <div className={styles.row}>
        <label>Program *<select name="program" value={form.program} onChange={update} required><option value="">Choose a program</option>{Object.entries(applicationPrograms).map(([key, title]) => <option key={key} value={key}>{title}</option>)}</select></label>
        <label>Current stage *<select name="stage" value={form.stage} onChange={update} required><option value="">Choose your stage</option>{applicationStages.map(stage => <option key={stage}>{stage}</option>)}</select></label>
      </div>
      <label>Business or idea name (optional)<input name="business" value={form.business} onChange={update} maxLength={80} /></label>
      {[
        { name: "problem", label: "What problem are you solving?", hint: "Describe the problem and who experiences it.", limit: 200 },
        { name: "progress", label: "What have you tested or built so far?", hint: "Share your progress or evidence. It’s okay to be at an early stage.", limit: 350 },
        { name: "support", label: "Where do you need support?", hint: "Tell us what is holding you back or what you want to work on next.", limit: 250 },
      ].map(field => <label key={field.name}>{field.label} *<textarea name={field.name} value={form[field.name]} onChange={update} rows={3} maxLength={field.limit} placeholder={field.hint} aria-describedby={`${field.name}-limit`} required /><small id={`${field.name}-limit`}>{form[field.name].length} / {field.limit} characters</small></label>)}
    </fieldset>
    {error && <p className={styles.error} role="alert" tabIndex={-1} ref={errorRef}>{error}</p>}
    <div className={styles.submit}><p>Your details will be used to assess your application and contact you. <a href="/privacy-policy">Privacy policy</a></p><button type="submit" disabled={status === "sending"}>{status === "sending" ? "Submitting…" : "Submit application"}</button></div>
  </form>;
}

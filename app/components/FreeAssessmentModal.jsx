"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import BrandLogo from "./BrandLogo";
import styles from "./FreeAssessmentModal.module.css";

const invitationDelay = 22_000;
// Keep program and form journeys focused on their own next step.
const generalPages = new Set(["/", "/about", "/programs", "/become-a-partner"]);

export default function FreeAssessmentModal() {
  const pathname = usePathname();
  const dialogRef = useRef(null);
  const eligible = generalPages.has(pathname) || pathname === "/blog" || pathname?.startsWith("/blog/");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!eligible || !dialog) return;

    let shown = false;
    let readyAt = Date.now() + invitationDelay;
    const showInvitation = () => {
      if (shown || Date.now() < readyAt || document.hidden) return;
      // Don't cover an active form or another modal.
      if (document.querySelector('dialog[open], [role="dialog"][aria-modal="true"]') ||
        document.activeElement?.matches('input, textarea, select, [contenteditable="true"]')) return;
      dialog.showModal();
      shown = true;
    };
    let timer = setTimeout(showInvitation, invitationDelay);
    const onPageShow = event => {
      // Back navigation can restore a document without mounting it again.
      if (!event.persisted) return;
      clearTimeout(timer);
      dialog.close();
      shown = false;
      readyAt = Date.now() + invitationDelay;
      timer = setTimeout(showInvitation, invitationDelay);
    };

    document.addEventListener("visibilitychange", showInvitation);
    window.addEventListener("pageshow", onPageShow);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", showInvitation);
      window.removeEventListener("pageshow", onPageShow);
      dialog.close();
    };
  }, [pathname, eligible]);

  if (!eligible) return null;

  const close = () => dialogRef.current?.close();
  return (
    <dialog ref={dialogRef} className={styles.dialog} aria-labelledby="assessment-invite-title" aria-describedby="assessment-invite-description"
      onClick={event => { if (event.target === event.currentTarget) close(); }}>
      <div className={styles.content}>
        <button type="button" className={styles.close} aria-label="Close free assessment invitation" onClick={close} autoFocus>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
        </button>
        <aside className={styles.overview} aria-label="About the assessment">
          <div className={styles.brand}><BrandLogo tone="light" /></div>
          <p className={styles.statement}>A clearer<br />starting<br />point.</p>
          <dl className={styles.facts}>
            <div><dt>18</dt><dd>practical questions</dd></div>
            <div><dt>06</dt><dd>areas of business</dd></div>
          </dl>
          <p className={styles.signoff}>Understand. Then move forward.</p>
        </aside>
        <div className={styles.details}>
          <div className={`${styles.brand} ${styles.mobileBrand}`}><BrandLogo tone="dark" /></div>
          <p className={styles.eyebrow}>Free Business Readiness Assessment</p>
          <h2 id="assessment-invite-title">How ready are you<br className={styles.desktopBreak} /> to build a business?</h2>
          <p className={styles.description} id="assessment-invite-description">Find the gaps in your business understanding—and a clearer next step.</p>
          <p className={styles.mobileFacts}>18 practical questions <span aria-hidden="true">·</span> 6 areas of business</p>
          <ul className={styles.benefits}>
            {["See where your understanding stands.", "Spot the areas to learn more about.", "Get a recommended next step."].map(text => <li key={text}>
              <svg width="21" height="21" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="currentColor" /><path d="m7 12 3.2 3.2L17 8.5" fill="none" stroke="#fffdf8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              {text}
            </li>)}
          </ul>
          <a className={styles.primary} href="/business-readiness-assessment" onClick={close}>
            Take the free assessment
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" /></svg>
          </a>
          <p className={styles.note}>Name, email, WhatsApp number, and role required to view your score.</p>
          <button type="button" className={styles.later} onClick={close}>Maybe later</button>
        </div>
      </div>
    </dialog>
  );
}

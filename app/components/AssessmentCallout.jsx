import styles from "../BrandHome.module.css";

function Arrow() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" /></svg>;
}

export default function AssessmentCallout() {
  return (
    <section id="business-assessment" className={`${styles.section} ${styles.assessment}`} aria-labelledby="assessment-heading">
      <div className={`container ${styles.assessmentInner}`}>
        <div>
          <h2 id="assessment-heading">Where do you stand today?</h2>
          <p>Use the free Business Readiness Assessment to spot gaps in your understanding.</p>
          <a className={styles.primary} href="/business-readiness-assessment" data-meta-event="ViewContent" data-meta-content-name="Business Readiness Assessment">Take the free assessment <Arrow /></a>
        </div>
        <div className={styles.assessmentNote}><strong>18 questions</strong><p>Name, email, and WhatsApp number required to view your score.</p></div>
      </div>
    </section>
  );
}

import styles from './HomeHero.module.css';

export default function HomeHero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <img className={styles.background} src="/assets/business-city-hero.jpg" alt="" width="1672" height="941" fetchPriority="high" />
      <div className={styles.shade} aria-hidden="true" />
      <div className={styles.art} aria-hidden="true"><div className={styles.orbit} /><div className={styles.orbitInner} /><span className={styles.spark} /><span className={styles.square} /></div>
      <div className={`container ${styles.layout}`}>
        <div className={styles.copy}>
          <h1 id="hero-title">Thinking of starting a business?<em>Know what to do first.</em></h1>
          <p className={styles.description}>Join the DreamAndScale Clarity Session to challenge common myths, understand the business journey, and find your next step.</p>
          <div className={styles.actions}>
            <a className={styles.primary} href="/register?program=clarity_session" data-meta-event="InitiateCheckout" data-meta-content-name="Clarity Session" data-meta-content-category="Program Offer" data-meta-value="199" data-meta-currency="INR">Book the ₹199 Clarity Session <span aria-hidden="true">↗</span></a>
            <a className={styles.secondary} href="#session-details" data-meta-event="ViewContent" data-meta-content-name="Clarity Session Agenda" data-meta-content-category="Program Offer">See what you’ll learn <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" /></svg></a>
          </div>
          <p className={styles.meta}>3-hour session <span>·</span> Live online <span>·</span> Hinglish</p>
        </div>
        <div className={styles.journey} aria-label="Your business learning journey">
          <div className={`${styles.label} ${styles.labelOne}`}><span>01</span> Is the idea worth testing?</div>
          <div className={`${styles.label} ${styles.labelTwo}`}><span>02</span> Who would pay for it?</div>
          <div className={`${styles.label} ${styles.labelThree}`}><span>03</span> How could it make money?</div>
        </div>
      </div>
      <div className={`container ${styles.bottom}`}>
        <p>Explore alongside your career. No business idea needed.</p>
        <time className={styles.sessionDate} dateTime="2026-10-04T10:30:00+05:30"><span aria-hidden="true" />4 October 2026 · 10:30 AM IST</time>
      </div>
    </section>
  );
}

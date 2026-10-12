import Image from "next/image";
import ClaritySessionDate from "./ClaritySessionDate";
import styles from "./ClarityLiveClass.module.css";

export default function ClarityLiveClass() {
  return (
    <section className={styles.section} id="live-session" aria-labelledby="live-session-heading">
      <div className={`container ${styles.layout}`}>
        <header className={styles.heading} data-clarity-reveal>
          <p className={styles.eyebrow}>The live Clarity Session</p>
          <h2 id="live-session-heading">Learn together.<br /><em>Leave with clarity.</em></h2>
        </header>
        <div className={styles.details} data-clarity-reveal>
          <p className={styles.description}>
            Join aspiring founders and working professionals for three hours of learning.
            Challenge common business myths, understand how businesses are actually built,
            and find your next step—before committing serious time, money, or your career.
          </p>
          <ul className={styles.features} aria-label="Session format">
            <li>Live online</li>
            <li>3 hours · Hinglish</li>
            <li>Recording included</li>
          </ul>
          <a
            className={styles.cta}
            href="/register?program=clarity_session"
            data-meta-event="InitiateCheckout"
            data-meta-content-name="Clarity Session"
            data-meta-content-category="Live Class Section"
            data-meta-value="199"
            data-meta-currency="INR"
          >
            Book the ₹199 Clarity Session
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6" /></svg>
          </a>
          <p className={styles.date}>Next session <span aria-hidden="true">·</span> <ClaritySessionDate /></p>
        </div>
        <figure className={styles.visual} data-clarity-reveal>
          <Image
            src="/assets/clarity/live-class.jpeg"
            alt="Participants and a speaker attending a live online class in gallery view"
            width={1586}
            height={992}
            sizes="(max-width: 900px) 100vw, (max-width: 1900px) 50vw, 950px"
          />
        </figure>
      </div>
    </section>
  );
}

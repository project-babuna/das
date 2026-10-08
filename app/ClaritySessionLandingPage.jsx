"use client";

import { useEffect, useRef } from "react";
import BrandLogo from "./components/BrandLogo";
import BusinessAssessmentTool from "./components/BusinessAssessmentTool";
import SiteFooter from "./components/SiteFooter";
import HomeHero from "./components/HomeHero";
import FounderTrapStory from "./FounderTrapStory";
import ClarityAgenda from "./components/ClarityAgenda";
import AudienceSection from "./components/AudienceSection";
import pageStyles from "./ClaritySession.module.css";
import cardStyles from "./HomeCards.module.css";
import readingStyles from "./HomeReading.module.css";
import motionStyles from "./HomeMotion.module.css";

const homeFaqItems = [
  { question: "Do I need a business idea or experience?", answer: "No. The session is for beginners, including people exploring entrepreneurship alongside a job. You can join with an idea, a question, or simply an interest in business." },
  { question: "When and how does the session take place?", answer: "The next session is on 4 October 2026 at 10:30 AM IST. It is a 3-hour live online session conducted in Hinglish." },
  { question: "Is this the complete DreamAndScale program?", answer: "No. This session introduces the business framework. The self-paced Full Program covers it in more depth, and DreamAndScale Plus adds live mentor support." },
  { question: "Will I get a recording?", answer: "Yes. You get the session recording after the live session." },
  { question: "What does the ₹199 fee cover?", answer: "₹199 is the full price for the 3-hour live Clarity Session. The Full Program and mentorship are separate options." },
  { question: "What is the refund policy?", answer: "Refunds may not be available for missed sessions or late cancellations. If DreamAndScale cancels or reschedules a session, a refund or alternate session may be offered. Please review the Refund Policy before booking." },
];

export default function ClaritySessionLandingPage() {
  const mainRef = useRef(null);

  useEffect(() => {
    if (!mainRef.current || !window.IntersectionObserver || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        target.setAttribute('data-revealed', 'true');
        observer.unobserve(target);
      });
    }, { threshold: 0.08 });
    mainRef.current.querySelectorAll('.section-kicker, .section-heading, .journey-card, .audience-card, .assessment-copy, [data-clarity-reveal]').forEach((element, index) => {
      element.style.setProperty('--reveal-delay', `${(index % 3) * 70}ms`);
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className={`site-header ${pageStyles.header}`}>
        <a className="brand" href="/" aria-label="DreamAndScale home">
          <BrandLogo tone="light" />
        </a>

        <nav className="site-nav" id="site-nav" aria-label="Main navigation">
          <a href="/">
            Home
          </a>
        </nav>

        <a
          className="header-cta"
          href="/register?program=clarity_session"
          data-meta-event="InitiateCheckout"
          data-meta-content-name="Clarity Session"
          data-meta-content-category="Program Offer"
          data-meta-value="199"
          data-meta-currency="INR"
        >
          <span className={pageStyles.headerFull}>Book ₹199 Session</span>
          <span className={pageStyles.headerShort}>Book ₹199</span>
        </a>
        <span className={pageStyles.readingProgress} aria-hidden="true" />
      </header>

      <main id="top" ref={mainRef} className={`${readingStyles.home} ${motionStyles.motion} ${pageStyles.page}`}>
        <HomeHero />

        <section className={`section problem-section ${readingStyles.founderSection}`} id="problem" aria-labelledby="founder-heading">
          <div className="container">
            <FounderTrapStory>
              <div className={`section-heading ${readingStyles.pitchHeading}`}>
                <p className="eyebrow dark">Start smaller. Learn sooner.</p>
                <h2 id="founder-heading">Big businesses don’t start big.<br /><em>They are built step by step.</em></h2>
                <p>A big vision needs a small first move. Find a real problem, talk to the people who face it, and test what you learn before you commit serious time or money.</p>
              </div>
              <h3 className={readingStyles.trapPrompt}>Does any of this sound familiar?</h3>
            </FounderTrapStory>

            <div className={readingStyles.solutionLayout}>
              <div className={readingStyles.solutionCopy} data-clarity-reveal>
                <p className="eyebrow dark">Why preparation matters</p>
                <h3>Learn before<br />you build.</h3>
                <p>You wouldn’t enter most serious professions without first understanding how they work. Building a business deserves the same preparation.</p>
                <p>You don’t need to know everything before starting. But understanding what to test, what to measure, and which decisions matter first can help you avoid expensive assumptions.</p>
                <p className={readingStyles.solutionClose}>Learn enough to start intelligently. Then learn from the market as you build.</p>
              </div>
              <div className={readingStyles.stepsPanel} data-clarity-reveal>
                <h4>A practical path forward</h4>
                <ol className={readingStyles.pitchSteps} aria-label="From opportunity to a business that works">
                  <li><strong>Find a real problem</strong><span>Who has it, and how do they solve it today?</span></li>
                  <li><strong>Test demand</strong><span>Talk to potential customers before spending heavily.</span></li>
                  <li><strong>Build a small first version</strong><span>Make only what you need to learn from real use.</span></li>
                  <li><strong>Check the numbers</strong><span>Understand your costs, price, and potential margin.</span></li>
                  <li><strong>Improve, then scale</strong><span>Use customer feedback and results to grow what works.</span></li>
                </ol>
              </div>
            </div>

            <div className={readingStyles.pitchInvite} id="clarity" data-clarity-reveal>
              <div>
                <span className={readingStyles.inviteLabel}>Your first step with DreamAndScale</span>
                <h3>Before you build a business,<br />build some clarity.</h3>
                <p>You don’t need to commit to a business today. Start with three hours of learning for just ₹199.</p>
                <ul className={readingStyles.inviteBenefits}>
                  <li>Understand how ideas, customers, and money connect.</li>
                  <li>Learn what to check before you invest more.</li>
                  <li>See what your next step could be.</li>
                </ul>
              </div>
              <div className={readingStyles.inviteAction}>
                <div className={readingStyles.sessionPrice}><strong>₹199</strong><span>3-hour live introduction<br />Online · Hinglish</span></div>
                <span className={readingStyles.nextSession}>Next session: 4 October 2026 · 10:30 AM IST</span>
                <a className="btn btn-primary" href="/register?program=clarity_session"
                  data-meta-event="InitiateCheckout" data-meta-content-name="Clarity Session"
                  data-meta-content-category="Program Offer" data-meta-value="199" data-meta-currency="INR">
                  Start with the ₹199 Session <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </a>
                <span className={readingStyles.inviteNudge}>A small first step toward a bigger ambition.</span>
                <span>No business idea or prior experience needed.</span>
                <a className={readingStyles.sessionDetails} href="#session-details">See what the session covers</a>
              </div>
            </div>
          </div>
        </section>

        <ClarityAgenda />

        <section className="section start-section" id="programs">
          <div className="container">
            <div className="section-heading progression-heading">
              <p className="eyebrow dark">Continue your learning</p>
              <h2>Go Deeper When You&apos;re Ready</h2>
              <p>Choose the self-paced program, or add mentor support while applying it to your own decisions.</p>
            </div>

            <div className={`entry-grid journey-grid ${cardStyles.cards}`}>
              <article className="entry-card journey-card journey-card-core" id="program">
                <span className="journey-badge">Learn · Self-paced</span>
                <div className="journey-card-head">
                  <div>
                    <h3>DreamAndScale</h3>
                    <p>Learn the complete framework on your schedule.</p>
                  </div>
                </div>
                <p className="journey-price">
                  <s>₹39,990</s>
                  <strong>₹9,999</strong>
                </p>
                <p className="journey-meta">Self-paced</p>
                <p className="journey-purpose">
                  Study opportunities, customers, business design, finance, structure, and growth.
                </p>
                <a
                  className="journey-cta"
                  href="/full-program"
                  data-meta-event="ViewContent"
                  data-meta-content-name="DreamAndScale Full Program"
                  data-meta-content-category="Program Offer"
                >
                  Explore the Full Program
                </a>
              </article>

              <article className="entry-card journey-card journey-card-premium">
                <span className="journey-badge">Apply · Mentor support</span>
                <div className="journey-card-head">
                  <div>
                    <h3>DreamAndScale Plus</h3>
                    <p>Work through your own decisions with support.</p>
                  </div>
                </div>
                <p className="journey-price">
                  <s>₹1,59,999</s>
                  <strong>₹49,990</strong>
                </p>
                <p className="journey-meta">Self-paced + Live Mentor Support</p>
                <p className="journey-purpose">
                  Includes the Full Program, plus live mentor guidance as you apply what you learn.
                </p>
                <a
                  className="journey-cta"
                  href="/learn-with-mentorship"
                  data-meta-event="ViewContent"
                  data-meta-content-name="DreamAndScale Plus"
                  data-meta-content-category="Mentorship Offer"
                >
                  Explore Mentorship
                </a>
              </article>
            </div>
          </div>
        </section>

        <AudienceSection dark />

        <BusinessAssessmentTool />

        <section className="section faq-section" id="faq">
          <div className="container faq-layout">
            <div className="section-kicker">
              <p className="eyebrow dark">FAQ</p>
              <h2>Frequently Asked Questions</h2>
            </div>
            <div className="faq-list">
              {homeFaqItems.map((item) => (
                <details className="faq-item" key={item.question}>
                  <summary>
                    <span>{item.question}</span>
                    <svg className={pageStyles.faqIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

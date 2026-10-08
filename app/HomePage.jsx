import SiteFrame from "./components/SiteFrame";
import { platformExamples, learningPaths, brandFaqItems } from "./homeContent";
import styles from "./BrandHome.module.css";
import StartupInsights from "./components/StartupInsights";
import FounderLifecycle from "./components/FounderLifecycle";
import ConnectedBusinessSystem from "./components/ConnectedBusinessSystem";
import AudienceSection from "./components/AudienceSection";
import { buildPrograms } from "./programs/catalog";

function Arrow() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" /></svg>;
}

function Checkpoints({ points }) {
  return <ul>{points.map((point) => <li key={point}><svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="10" fill="currentColor" opacity=".15"/><path d="m5.5 10 3 3 6-6" stroke="currentColor" strokeWidth="1.5" /></svg>{point}</li>)}</ul>;
}

export default function HomePage() {
  return (
    <SiteFrame>
      <main id="top" className={styles.page}>
        <section className={styles.hero} aria-labelledby="home-heading">
          <div className={styles.heroMedia}>
            <img src="/assets/business-city-hero.jpg" width="1672" height="941" alt="" fetchPriority="high" />
          </div>
          <div className={`container ${styles.heroInner}`}>
            <div className={styles.heroCopy}>
              <h1 id="home-heading">Turn a business dream into a scalable company.<em>One stage at a time.</em></h1>
              <p>DreamAndScale helps aspiring founders understand how businesses work, turn opportunities into real businesses, prove what works, and build toward scale—with the right learning, guidance, and support at each stage.</p>
              <div className={styles.heroActions}>
                <a className={styles.primary} href="/programs">Explore the programs <Arrow /></a>
                <a className={styles.secondary} href="#approach">Explore the founder journey <Arrow /></a>
              </div>
              <p className={styles.heroNote}>Dream big. Understand first. Build what works.</p>
            </div>
          </div>
        </section>

        <FounderLifecycle />

        <section id="platforms" className={`${styles.section} ${styles.platforms}`} aria-labelledby="platforms-heading">
          <div className="container">
            <div className={styles.platformHeading}>
              <span className={styles.eyebrow}>Partners &amp; platforms</span>
              <h2 id="platforms-heading">Platforms in the founder ecosystem</h2>
              <p>Explore the tools and communities founders may use to turn learning into focused action.</p>
            </div>
            <ul className={styles.platformGrid} aria-label="Platforms in the DreamAndScale founder ecosystem">
              {platformExamples.map((platform) => (
                <li className={styles.platformCard} key={platform.name}>
                  <span className={`${styles.platformMark} ${styles[platform.tone]}`} aria-hidden="true">{platform.mark}</span>
                  <span>{platform.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <ConnectedBusinessSystem />

        <section id="insights" className={`${styles.section} ${styles.insights}`} aria-labelledby="insights-heading">
          <div className="container">
            <div className={styles.insightsGrid}>
              <div className={styles.insightsIntro}>
                <span className={styles.insightsEyebrow}>Founder insights</span>
                <h2 id="insights-heading">Better questions.<br /><em>Better business decisions.</em></h2>
                <p>Practical guides to testing ideas, understanding customers, and deciding your next move.</p>
                <a className={styles.insightsLink} href="/blog">Explore all insights <Arrow /></a>
              </div>
              <StartupInsights />
            </div>
          </div>
        </section>

        <section id="programs" className={`${styles.section} ${styles.programs}`} aria-labelledby="programs-heading">
          <div className="container">
            <div className={styles.sectionHeading}>
              <h2 id="programs-heading">Choose the support you need.</h2>
              <p>Learn the foundations, apply them with guidance, or get support to build and grow. Start where you are.</p>
            </div>
            <div className={styles.programGroupHeading}>
              <p>Learn &amp; Prepare</p>
              <span><strong>Open enrollment</strong> · Anyone can join</span>
            </div>
            <div className={styles.programGrid}>
              {learningPaths.map((program) => (
                <article className={`${styles.programCard} ${program.featured ? styles.featured : ""}`} key={program.title}>
                  <span className={styles.programLabel}>{program.label}</span>
                  <h3>{program.title}</h3>
                  <p className={styles.format}>{program.format}</p>
                  <p className={styles.programDescription}>{program.description}</p>
                  <Checkpoints points={program.points} />
                  <a href={program.href} className={styles.programLink} data-meta-event="ViewContent" data-meta-content-name={program.title} data-meta-content-category="Program Offer">{program.action} <Arrow /></a>
                </article>
              ))}
            </div>
            <div className={`${styles.programGroupHeading} ${styles.buildGroupHeading}`}>
              <p>Build &amp; Grow</p>
              <span><strong>Selective entry</strong> · Apply → Assessment → Selection</span>
            </div>
            <div className={styles.programGrid}>
              {buildPrograms.map((program) => (
                <article className={`${styles.programCard} ${styles.buildCard}`} key={program.slug}>
                  <span className={styles.programLabel}>{program.number} · {program.verb}</span>
                  <h3>{program.title}</h3>
                  <p className={styles.format}>Selective entry · Application required</p>
                  <p className={styles.programDescription}>{program.description}</p>
                  <Checkpoints points={program.focus.map((item) => item.title)} />
                  <a href={`/programs/${program.slug}`} className={styles.programLink}>Explore {program.slug === "scale-up" ? "Scale-Up" : program.title} <Arrow /></a>
                </article>
              ))}
            </div>
            <p className={styles.programNote}>Not sure where to begin? <a href="/clarity-session">Explore the ₹199 Clarity Session <Arrow /></a></p>
          </div>
        </section>

        <AudienceSection />

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

        <section id="faq" className={styles.section} aria-labelledby="faq-heading">
          <div className={`container ${styles.split}`}>
            <div className={styles.sectionHeading}>
              <h2 id="faq-heading">A few things<br />to know.</h2>
              <p>Understand your options before choosing your next step.</p>
              <a className={styles.textLink} href="/contact">Have another question? Get in touch <Arrow /></a>
            </div>
            <div className={styles.faqList}>
              {brandFaqItems.map((item) => (
                // Native disclosure state can change before React hydrates.
                <details key={item.question} suppressHydrationWarning>
                  <summary>{item.question}<svg width="18" height="18" viewBox="0 0 18 18" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M2 9h14"/><path className={styles.plusVertical} d="M9 2v14"/></svg></summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}

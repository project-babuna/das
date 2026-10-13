import SiteFrame from "./components/SiteFrame";
import { platformExamples, learningPaths, brandFaqItems } from "./homeContent";
import styles from "./BrandHome.module.css";
import StartupInsights from "./components/StartupInsights";
import FounderLifecycle from "./components/FounderLifecycle";
import ConnectedBusinessSystem from "./components/ConnectedBusinessSystem";
import AudienceSection from "./components/AudienceSection";
import AssessmentCallout from "./components/AssessmentCallout";
import { buildPrograms } from "./programs/catalog";

function Arrow() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" /></svg>;
}

function Checkpoints({ points }) {
  return <ul>{points.map((point) => <li key={point}><svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="10" fill="currentColor" opacity=".15"/><path d="m5.5 10 3 3 6-6" stroke="currentColor" strokeWidth="1.5" /></svg>{point}</li>)}</ul>;
}

const proofMetrics = [
  { value: "500+", label: "Startups Studied", icon: "M4 19h16M6 16V9m4 7V5m4 11v-4m4 4V7" },
  { value: "70%", label: "Practical-based Learning", icon: "M4 5.5A2.5 2.5 0 0 1 6.5 3H12v16H6.5A2.5 2.5 0 0 0 4 21.5zm16 0A2.5 2.5 0 0 0 17.5 3H12v16h5.5a2.5 2.5 0 0 1 2.5 2.5z" },
  { value: "750+", label: "Hours of Learning", icon: "M12 8v4l2.5 2.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" },
  { value: "150+", label: "Founder Experiences", icon: "M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v9a2.5 2.5 0 0 1-2.5 2.5H9l-5 4z" },
];

const ecosystemGroups = [
  ["Founders", "M14 4 20 3l-1 6-8 8-5-5zm-5 10-3 1-2 5 5-2 1-3M14 7h.01"],
  ["Professionals", "M3 8h18v12H3zM8 8V5h8v3m-13 5h18m-11 0v2h4v-2"],
  ["Freelancers", "M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2m6-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm7-7a4 4 0 0 1 0 7m5 10v-2a4 4 0 0 0-3-3.87"],
  ["Students", "M2 9l10-5 10 5-10 5zm4 3v5c3.5 3 8.5 3 12 0v-5m4-3v6"],
  ["Business owners", "M3 21V8l9-5 9 5v13M8 21v-5h8v5M7 10h2m6 0h2m-10 4h2m6 0h2"],
  ["Mentors", "M16 11l2-2a2 2 0 0 1 3 3l-5 5a4 4 0 0 1-5 0l-3-2m2-7 2-2a3 3 0 0 1 4 0l2 2M2 10l4-4 9 9-4 4zm0 0v10h5"],
  ["Innovators", "M9 18h6m-5 3h4m-2-19a7 7 0 0 0-4 12.75c.6.4 1 1 1 2.25h6c0-1.25.4-1.85 1-2.25A7 7 0 0 0 12 2Z"],
  ["Builders", "M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3Zm7 12 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z"],
];

function ProofBridge() {
  return (
    <section className={styles.proofBridge} aria-label="DreamAndScale by the numbers and who we serve">
      <div className={`container ${styles.proofShell}`}>
        <div className={styles.proofCard}>
          <ul className={styles.metricGrid} aria-label="DreamAndScale learning metrics">
            {proofMetrics.map((metric) => (
              <li className={styles.metric} key={metric.label}>
                <span className={styles.metricIcon} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={metric.icon} /></svg></span>
                <span className={styles.metricCopy}><strong>{metric.value}</strong><span>{metric.label}</span></span>
              </li>
            ))}
          </ul>
          <div className={styles.ecosystemRow}>
            <div className={styles.ecosystemIntro}>
              <h2>India&apos;s upcoming ecosystem</h2>
              <p>For working professionals to build the businesses.</p>
            </div>
            <ul className={styles.ecosystemGroups} aria-label="People in the DreamAndScale ecosystem">
              {ecosystemGroups.map(([label, icon]) => (
                <li key={label}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={icon} /></svg>
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <SiteFrame>
      <main id="top" className={styles.page}>
        <section className={styles.hero} aria-labelledby="home-heading">
          <div className={styles.heroMedia}>
            <img src="/assets/business-city-hero.jpg" width="1672" height="941" alt="" fetchPriority="high" />
            <span className={`${styles.towerLight} ${styles.towerBeacon}`} aria-hidden="true" />
            <span className={`${styles.towerLight} ${styles.towerWindowOne}`} aria-hidden="true" />
            <span className={`${styles.towerLight} ${styles.towerWindowTwo}`} aria-hidden="true" />
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

        <ProofBridge />

        <FounderLifecycle />

        <section id="platforms" className={`${styles.section} ${styles.platforms}`} aria-labelledby="platforms-heading">
          <div className="container">
            <div className={styles.platformHeading}>
              <h2 id="platforms-heading">Platforms in the founder ecosystem</h2>
              <p>Explore the tools and communities founders may use to turn learning into focused action.</p>
            </div>
            <div className={styles.platformTicker}>
              <ul className={styles.platformGrid} aria-label="Platforms in the DreamAndScale founder ecosystem">
                {[...platformExamples, ...platformExamples].map((platform, index) => (
                  <li className={styles.platformCard} key={`${platform.name}-${index}`} aria-hidden={index >= platformExamples.length}>
                    {platform.logo && <img className={styles.platformLogo} src={platform.logo} alt="" loading="lazy" />}
                    <span>{platform.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <ConnectedBusinessSystem />

        <section id="insights" className={`${styles.section} ${styles.insights}`} aria-labelledby="insights-heading">
          <div className="container">
            <div className={styles.insightsGrid}>
              <div className={styles.insightsIntro}>
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
              {learningPaths.map((program, index) => (
                <article className={`${styles.programCard} ${index === 0 ? styles.featured : ""}`} data-tone={index} key={program.title}>
                  <header className={styles.programHeader}>
                  <h3>{program.title}</h3>
                  <p className={styles.format}>{program.format}</p>
                  </header>
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
              {buildPrograms.map((program, index) => (
                <article className={`${styles.programCard} ${styles.buildCard}`} data-tone={index + 3} key={program.slug}>
                  <header className={styles.programHeader}>
                  <h3>{program.title}</h3>
                  <p className={styles.format}>Selective entry · Application required</p>
                  </header>
                  <p className={styles.programDescription}>{program.description}</p>
                  <Checkpoints points={program.focus.map((item) => item.title)} />
                  <a href={`/programs/${program.slug}`} className={styles.programLink}>Explore {program.slug === "scale-up" ? "Scale-Up" : program.title} <Arrow /></a>
                </article>
              ))}
            </div>
            <p className={styles.programNote}>Not sure where to begin? <a href="/clarity-session">Explore the ₹199 Clarity Session <Arrow /></a></p>
          </div>
        </section>

        <AudienceSection spacious />

        <AssessmentCallout />

        <section id="faq" className={`${styles.section} faq-showcase`} aria-labelledby="faq-heading">
          <div className={`container ${styles.split} faq-showcase-card faq-showcase-layout`}>
            <div className={`${styles.sectionHeading} faq-showcase-heading`}>
              <h2 id="faq-heading">Frequently Asked <em>Questions</em></h2>
              <p>Understand your options before choosing your next step.</p>
              <a className={styles.textLink} href="/contact">Have another question? Get in touch <Arrow /></a>
            </div>
            <div className={`${styles.faqList} faq-list`}>
              {brandFaqItems.map((item) => (
                // Native disclosure state can change before React hydrates.
                <details className="faq-item" key={item.question} suppressHydrationWarning>
                  <summary><span>{item.question}</span></summary>
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

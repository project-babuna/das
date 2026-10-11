import Image from "next/image";
import SiteFrame from "./SiteFrame";
import { learnPrograms } from "../programs/catalog";
import styles from "./ProgramOfferPage.module.css";

function Arrow() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" /></svg>;
}

const curriculum = [
  ["Opportunity & market", "Find a problem worth exploring and understand the market around it."],
  ["Customers & demand", "Understand customer needs, alternatives, and what people value."],
  ["Product & business model", "Connect the solution you build with how the business creates and earns value."],
  ["Finance & economics", "Understand how pricing, costs, margins, and cash flow affect your decisions."],
  ["Structure & ownership", "See how roles, company structure, and ownership fit into the wider business."],
  ["Growth & scale", "Connect customer acquisition, delivery, and systems as a business grows."],
];

export default function ProgramOfferPage({ page }) {
  const mentored = page.heroTheme === "mentorship";
  const program = learnPrograms[mentored ? 2 : 1];
  const name = mentored ? "Mentorship" : "Full Program";
  const cta = `Join ${name}`;
  const priceValue = Number(program.price.replace(/[^\d]/g, ""));
  const steps = mentored ? [
    ["Learn the framework", "Use the Full Program to build a connected understanding of business."],
    ["Bring your questions", "Connect the learning to your own idea, business, or next decision through live mentorship and events."],
    ["Apply and reflect", "Use the guidance to question assumptions and choose what to learn, test, or build next."],
  ] : [
    ["Build your foundation", "Start with the fundamentals of opportunities, markets, and customers."],
    ["Connect the decisions", "Work through 120 hours of learning at your own pace, alongside your other commitments."],
    ["Apply your learning", "Use the framework to examine an opportunity and decide what to test next."],
  ];
  return <SiteFrame ctaHref={program.join} ctaLabel={cta}>
    <main className={styles.page}>
      <div className="container">
        <nav className={styles.breadcrumb} aria-label="Breadcrumb"><a href="/programs">Programs</a><span>/</span><a href="/programs#learn-prepare">Learn &amp; Prepare</a><span>/</span><span aria-current="page">{name}</span></nav>
        <section className={styles.hero} aria-labelledby="program-title">
          <div>
            <span className={styles.eyebrow}>{program.number} · {name} · Open enrollment</span>
            <h1 id="program-title">{mentored ? <>Turn your learning into<br /><em>your next move.</em></> : <>Learn how the whole<br /><em>business works.</em></>}</h1>
            <p className={styles.intro}>{mentored ? "The complete DreamAndScale Full Program, with live mentorship and events to help you apply the learning to your own ideas and business decisions." : "Understand how opportunity, customers, products, money, and growth connect. Learn the complete business framework on your schedule, before committing to bigger decisions."}</p>
            <div className={styles.facts}><strong>{program.price}</strong><span>{program.format}</span></div>
            <div className={styles.actions}><a className={styles.primary} href={program.join} data-meta-event="InitiateCheckout" data-meta-content-name={name} data-meta-content-category="Program Conversion" data-meta-value={priceValue} data-meta-currency="INR">{cta}<Arrow /></a><a className={styles.textLink} href="#learning">{mentored ? "See what’s included" : "Explore what you’ll learn"}<Arrow /></a></div>
            <p className={styles.note}>Open enrollment · Anyone can join</p>
          </div>
          <div className={styles.visual}><Image src={`/assets/lifecycle/${mentored ? "guide" : "learn"}.jpg`} alt={mentored ? "Founder discussing a business plan with a mentor" : "Professional studying business concepts with a laptop and notebook"} width={1448} height={1086} priority sizes="(max-width: 760px) 100vw, 45vw" /><div className={styles.caption}><span>{mentored ? "03 · Apply" : "02 · Learn"}</span><p>{mentored ? "Your questions. A clearer way forward." : "One connected framework. Your own pace."}</p></div></div>
        </section>
        <section id="fit" className={styles.fit} aria-labelledby="fit-title"><div><span className={styles.eyebrow}>Is this your next step?</span><h2 id="fit-title">{mentored ? "Learning is a start.\nGuidance helps you apply it." : "For people ready to\nunderstand the whole picture."}</h2><p>{mentored ? page.sections[1].body : "For aspiring founders, working professionals, students, and business owners who want a structured understanding of how businesses work."}</p></div><ul className={styles.checks}>{page.highlights.map(item => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul></section>
      </div>
      <section id="learning" className={styles.learning} aria-labelledby="learning-title"><div className="container"><div className={styles.sectionHeading}><span className={styles.eyebrow}>{mentored ? "The framework + guided application" : "What you’ll learn"}</span><h2 id="learning-title">{mentored ? "A complete foundation.\nSupport making it yours." : "See the connections.\nMake more informed decisions."}</h2><p>{mentored ? "Mentorship includes the Full Program and adds live guidance as you connect these concepts to your own situation." : "Study each part of a business—and understand how a decision in one area affects the others."}</p></div><ol className={styles.curriculum}>{curriculum.map(([title, text], i) => <li key={title}><span className={styles.number}>{String(i + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></li>)}</ol></div></section>
      <section className={`container ${styles.how}`} aria-labelledby="how-title"><div className={styles.sectionHeading}><span className={styles.eyebrow}>How it works</span><h2 id="how-title">{mentored ? "12 weeks to learn, question, and apply." : "A learning journey that fits your schedule."}</h2></div><ol className={styles.steps}>{steps.map(([title,text],i)=><li key={title}><span className={styles.number}>0{i+1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol></section>
      <section className={`container ${styles.compare}`} aria-labelledby="compare-title"><div><span className={styles.eyebrow}>Choose your level of support</span><h2 id="compare-title">{mentored ? "Prefer to learn independently?" : "Want support applying the learning?"}</h2><p>{mentored ? "The Full Program offers the complete framework through 120 hours of self-paced learning for ₹9,999." : "Mentorship includes the Full Program, with a 12-week program of live mentorship and events for ₹49,999."}</p></div><a className={styles.textLink} href={program === learnPrograms[1] ? "/learn-with-mentorship" : "/full-program"}>Explore {mentored ? "Full Program" : "Mentorship"}<Arrow /></a></section>
      <section className={`container ${styles.enroll}`} aria-labelledby="enroll-title"><div><span className={styles.eyebrow}>Your next step</span><h2 id="enroll-title">{mentored ? "Build understanding. Apply it with guidance." : "Start with understanding. Build from there."}</h2><p>{program.price} · {program.format}</p></div><a className={styles.primary} href={program.join} data-meta-event="InitiateCheckout" data-meta-content-name={name} data-meta-value={priceValue} data-meta-currency="INR">{cta}<Arrow /></a></section>
      <div className={`container ${styles.clarityNote}`}>Still exploring? <a href="/clarity-session">Start with the ₹199 Clarity Session <Arrow /></a></div>
    </main>
  </SiteFrame>;
}

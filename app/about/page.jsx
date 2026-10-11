import Image from "next/image";
import SiteFrame from "../components/SiteFrame";
import { learnPrograms, buildPrograms } from "../programs/catalog";
import styles from "./page.module.css";

export const metadata = {
  title: "About DreamAndScale | From Dream to Business",
  description: "Understand the DreamAndScale vision: help founders learn, build, prove, accelerate, and scale a business, one stage at a time.",
  alternates: { canonical: "https://www.dreamandscale.com/about" },
};

function Arrow() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6" /></svg>;
}

const businessParts = [
  { label: "Customers", x: 50, y: 12, icon: <><circle cx="12" cy="7" r="3"/><path d="M6 21v-3a6 6 0 0 1 12 0v3M4 9a3 3 0 0 0 0 6m-2 6v-2a4 4 0 0 1 3-4"/></> },
  { label: "Product", x: 83, y: 31, icon: <><path d="m12 2 9 5v10l-9 5-9-5V7l9-5Zm0 10v10M3 7l9 5 9-5M7.5 4.5l9 5v4"/></> },
  { label: "Marketing", x: 83, y: 69, icon: <><path d="m4 10 15-6v16L4 14v-4Zm3 5 2 6h3l-2-5M19 10h3v4h-3"/></> },
  { label: "Money", x: 50, y: 88, icon: <><ellipse cx="9" cy="7" rx="6" ry="3"/><path d="M3 7v10c0 1.7 2.7 3 6 3 1.1 0 2.1-.1 3-.4M3 12c0 1.7 2.7 3 6 3M15 7v4"/><ellipse cx="17" cy="14" rx="4" ry="2"/><path d="M13 14v6c0 1.1 1.8 2 4 2s4-.9 4-2v-6M13 17c0 1.1 1.8 2 4 2s4-.9 4-2"/></> },
  { label: "People", x: 17, y: 69, icon: <><circle cx="9" cy="7" r="3"/><path d="M2 21v-3a7 7 0 0 1 14 0v3M16 4a3 3 0 0 1 0 6M19 14a5 5 0 0 1 3 5v2"/></> },
  { label: "Operations", x: 17, y: 31, icon: <><path d="m10 2-.7 3-2 .9-2.6-1.4-2 3.5 2.3 2v2L2.7 14l2 3.5 2.6-.9 2 .9.7 3h4l.7-3 2-.9 2.6.9 2-3.5-2.3-2v-2l2.3-2-2-3.5-2.6 1.4-2-.9-.7-3Z"/><circle cx="12" cy="11.7" r="3"/></> },
];

function BusinessSystem() {
  return <div className={styles.system} role="img" aria-label="One connected business: customers, product, marketing, money, people, and operations all affect one another.">
    <svg className={styles.connections} viewBox="0 0 500 500" fill="none" aria-hidden="true">
      <circle cx="250" cy="250" r="190" stroke="currentColor" opacity=".55" />
      <circle className={styles.orbit} cx="250" cy="250" r="98" stroke="currentColor" strokeDasharray="3 9" opacity=".45" />
      {businessParts.map(part => <line key={part.label} x1="250" y1="250" x2={part.x * 5} y2={part.y * 5} stroke="currentColor" opacity=".7" />)}
    </svg>
    <div className={styles.systemCenter} aria-hidden="true">One<br />connected<br />business</div>
    {businessParts.map(part => <div className={styles.systemNode} style={{ left: `${part.x}%`, top: `${part.y}%` }} key={part.label} aria-hidden="true"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{part.icon}</svg><span>{part.label}</span></div>)}
  </div>;
}

function Pathway({ title, selective, programs, children }) {
  return <section className={styles.path} aria-label={title}>
    <span className={styles.eyebrow}>{selective ? "Selective entry" : "Open enrollment"}</span>
    <h3>{title}</h3><p>{children}</p>
    <ol className={styles.programs} start={selective ? 4 : 1}>{programs.map(program => <li key={program.title}>
      <a href={selective ? `/programs/${program.slug}` : program.href}><span className={styles.programNumber} aria-hidden="true">{program.number}</span><strong>{program.title}</strong><span className={styles.programVerb}>{program.verb}</span></a>
    </li>)}</ol>
    <p className={styles.entry}>{selective ? "Apply → Assessment → Selection." : "Anyone can join."}</p>
    <a className={styles.outline} href={selective ? "/programs#build-grow" : "/programs#learn-prepare"}>Explore {title}<Arrow /></a>
  </section>;
}

export default function AboutPage() {
  return <SiteFrame><main className={styles.page}>
    <div className="container">
      <header className={styles.intro}>
        <div className={styles.introCopy}><h1>A big dream.<br /><em>A clear path to building it.</em></h1><p>DreamAndScale helps aspiring founders and business owners understand how a business works—and move forward, one stage at a time.</p><a className={styles.primary} href="/programs">Explore our programs<Arrow /></a></div>
        <div className={styles.heroArt}><Image src="/assets/about/founder-progress.png" alt="Six ascending green stone blocks connected by a fine brass line, representing progress one stage at a time." width={1440} height={1080} sizes="(max-width: 760px) 100vw, 50vw" priority /></div>
      </header>
      <section className={styles.belief} aria-labelledby="belief-heading"><div><span className={styles.eyebrow}>Our belief</span><h2 id="belief-heading">Ambition matters.<br />Understanding turns it into progress.</h2></div><p>A big vision can make the first step feel overwhelming. Learning helps you ask better questions, test assumptions, and decide what deserves your time and money.</p></section>
      <section className={styles.vision} aria-labelledby="vision-heading"><div><h2 id="vision-heading">See the whole business.<br /><em>Not just the separate parts.</em></h2><p>Customers, product, marketing, money, people, and operations affect one another.</p><p>DreamAndScale connects these decisions so you can understand what comes first, what to test, and what to work on next.</p></div><BusinessSystem /></section>
    </div>
    <section className={styles.pathways} aria-labelledby="pathways-heading"><div className="container">
      <header className={styles.pathwaysIntro}><h2 id="pathways-heading">Different stages.<br />The same long-term vision.</h2><p>From your first questions to a business that can grow beyond you.</p></header>
      <div className={styles.paths}><Pathway title="Learn & Prepare" programs={learnPrograms}>Build your understanding, learn the framework, and apply it to your situation.</Pathway><Pathway title="Build & Grow" programs={buildPrograms} selective>Build and prove a business, make it repeatable, and develop a larger organisation.</Pathway></div>
    </div></section>
    <section className={`container ${styles.destination}`} aria-label="The bigger picture"><span className={styles.eyebrow}>The bigger picture</span><ol className={styles.journey}>{["Founder", "Business", "Company", "Institution"].map(step => <li key={step}>{step}</li>)}</ol><p>Start with understanding. Build with evidence. Grow with purpose.</p><a className={styles.primary} href="/clarity-session">Start with Clarity<Arrow /></a></section>
  </main></SiteFrame>;
}

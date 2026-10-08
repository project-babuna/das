import Image from "next/image";
import SiteFrame from "../components/SiteFrame";
import { learnPrograms, buildPrograms } from "./catalog";
import { learningPaths } from "../homeContent";
import styles from "./ProgramsHub.module.css";

export const metadata = {
  title: "Programs | Learn, Build & Grow with DreamAndScale",
  description: "Explore six founder programs across Learn & Prepare and Build & Grow. Compare open enrollment with selective entry and find your next step.",
  alternates: { canonical: "https://www.dreamandscale.com/programs" },
};

function Arrow() {
  return <svg className={styles.arrow} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6" /></svg>;
}

function ProgramList({ programs, selective = false }) {
  const images = { "01": "clarity", "02": "learn", "03": "guide", "04": "build", "05": "accelerate", "06": "scale" };
  return <div className={styles.list}>{programs.map((program, index) => (
    <article className={styles.program} key={program.title}>
      <div className={styles.programImage}>
        <Image src={`/assets/lifecycle/${images[program.number]}.jpg`} alt="" width={320} height={240} sizes="(max-width: 700px) 90px, (max-width: 1100px) 130px, 176px" />
        <span className={styles.number} aria-hidden="true">{program.number}</span>
      </div>
      <div className={styles.programCopy}>
        <h3>{program.title}</h3><p className={styles.verb}>{program.verb}</p>
        <p className={styles.description}>{selective ? program.intro : learningPaths[index].description}</p>
        {!selective && <div className={styles.programFacts}><strong className={styles.price}>{program.price}</strong><p className={styles.format}>{program.format}</p></div>}
        <ul className={styles.checkpoints}>{(selective ? program.focus.map(item => item.title) : learningPaths[index].points).map(point => <li key={point}><svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="10" fill="currentColor" opacity=".1"/><path d="m5 10 3 3 7-7" stroke="currentColor" strokeWidth="1.5"/></svg>{point}</li>)}</ul>
      </div>
      <div className={styles.actions}>
        <a className={styles.outline} href={selective ? `/programs/${program.slug}` : program.href} >{selective ? `Explore ${program.slug === "scale-up" ? "Scale-Up" : program.title}` : learningPaths[index].action} <Arrow /></a>
        <a className={styles.textLink} href={selective ? `/programs/apply?program=${program.slug}` : program.join} aria-label={`${selective ? "Apply for" : "Join"} ${program.title}`}>{selective ? `Apply for ${program.slug === "scale-up" ? "Scale-Up" : program.title}` : `Join ${program.title === "Clarity" ? "the session" : program.title}`}<Arrow /></a>
      </div>
    </article>
  ))}</div>;
}

export default function ProgramsPage() {
  return <SiteFrame><main className={styles.page}>
    <header className={styles.hero}>
      <div className={styles.heroArtwork}><Image src="/assets/programs/business-education-hero.png" alt="" fill sizes="100vw" priority /></div>
      <div className={`container ${styles.heroInner}`}>
        <div className={styles.heroIntro}><h1>The right support.<br /><em>At every stage.</em></h1>
        <p>From understanding business to building a company. Choose the support that fits where you are today.</p></div>
      </div>
    </header>
    <section id="learn-prepare" className={styles.group} aria-labelledby="learn-heading"><div className={`container ${styles.groupLayout}`}>
      <div className={styles.groupIntro}><span className={styles.badge}>Open enrollment</span><h2 id="learn-heading">Learn &amp; <br />Prepare</h2><p>Build your understanding before committing serious time, money, or your career.</p><p className={styles.entryNote}>Anyone can join.</p></div>
      <ProgramList programs={learnPrograms} />
    </div></section>
    <section className={styles.transition} aria-labelledby="transition-heading">
      <div className="container">
        <div className={styles.transitionIntro}>
          <span className={styles.badge}>Understand your next stage</span>
          <h2 id="transition-heading">From learning how business works<br />to building what works.</h2>
          <p>Choose by what you need today. You don’t have to join every program in order.</p>
        </div>
        <div className={styles.pathComparison}>
          <div className={styles.pathPanel}>
            <span className={styles.badge}>01–03 · Learn &amp; Prepare</span>
            <h3>Build your understanding.</h3>
            <p>Start here if you’re exploring entrepreneurship, learning the fundamentals, or need guidance to apply them.</p>
            <ol className={styles.stagePath} aria-label="Learn and Prepare stages"><li><a href="/clarity-session"><small>01</small>Clarity<span>Understand</span></a></li><li><a href="/full-program"><small>02</small>Full Program<span>Learn</span></a></li><li><a href="/learn-with-mentorship"><small>03</small>Mentorship<span>Apply</span></a></li></ol>
            <p className={styles.pathEntry}>Open enrollment <span>· Anyone can join</span></p>
          </div>
          <div className={styles.pathPanel}>
            <span className={styles.badge}>04–06 · Build &amp; Grow</span>
            <h3>Move your business forward.</h3>
            <p>Explore this path when you’re ready to test an opportunity, make early traction repeatable, or grow an established business.</p>
            <ol className={styles.stagePath} aria-label="Build and Grow stages"><li><a href="/programs/incubation"><small>04</small>Incubation<span>Build &amp; Prove</span></a></li><li><a href="/programs/accelerator"><small>05</small>Accelerator<span>Accelerate</span></a></li><li><a href="/programs/scale-up"><small>06</small>Scale-Up<span>Scale</span></a></li></ol>
            <p className={styles.pathEntry}>Selective entry <span>· Apply → Assessment → Selection</span></p>
          </div>
        </div>
        <p className={styles.transitionNote}>Still finding your starting point? <a href="/clarity-session">Explore the Clarity Session <Arrow /></a></p>
      </div>
    </section>
    <section id="build-grow" className={styles.group} aria-labelledby="build-heading"><div className={`container ${styles.groupLayout}`}>
      <div className={styles.groupIntro}><span className={styles.badge}>Selective entry</span><h2 id="build-heading">Build &amp; <br />Grow</h2><p>For founders ready to build, prove, and grow a business.</p>
        <ol className={styles.entrySteps}>{[
          ["Apply", "Share your business and the support you need."],
          ["Assessment", "Your application is reviewed for readiness and program fit."],
          ["Selection", "If selected, discuss the scope and next steps before joining."],
        ].map(([title, text], index) => <li key={title}><span aria-hidden="true">{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol>
      </div>
      <ProgramList programs={buildPrograms} selective />
    </div></section>
    <aside className={`container ${styles.help}`}><div><h2>Your next step can start with clarity.</h2><p>Understand the journey before choosing a program.</p></div><a className={styles.primary} href="/clarity-session">Start with Clarity <Arrow /></a></aside>
  </main></SiteFrame>;
}

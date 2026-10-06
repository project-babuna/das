import SiteFrame from "../components/SiteFrame";
import { learnPrograms, buildPrograms } from "./catalog";
import styles from "./Programs.module.css";

export const metadata = {
  title: "Programs | Learn, Build & Grow with DreamAndScale",
  description: "Explore six founder programs across Learn & Prepare and Build & Grow. Compare open enrollment with selective entry and find your next step.",
  alternates: { canonical: "https://www.dreamandscale.com/programs" },
};

function Cards({ programs, selective = false }) {
  return <div className={styles.cards}>{programs.map(program => (
    <article className={styles.card} key={program.title}>
      <span className={styles.number}>{program.number}</span>
      <div className={styles.cardBody}>
        <h3>{program.title}</h3><p className={styles.verb}>{program.verb}</p>
        <p className={styles.description}>{program.description}</p>
        <div className={styles.cardActions}>
          <a className={styles.outline} href={selective ? `/programs/${program.slug}` : program.href} aria-label={`View ${program.title} details`}>View details</a>
          <a className={styles.textLink} href={selective ? `/programs/apply?program=${program.slug}` : program.join} aria-label={`${selective ? "Apply for" : "Join"} ${program.title}`}>{selective ? "Apply" : "Join program"}<span aria-hidden="true">→</span></a>
        </div>
      </div>
    </article>
  ))}</div>;
}

export default function ProgramsPage() {
  return <SiteFrame><main className={styles.page}>
    <header className={`container ${styles.hero}`}>
      <h1>Find the right support for your next step.</h1>
      <p>Learn the fundamentals, apply them to your situation, or build and grow through selective programs.</p>
      <nav className={styles.pathNav} aria-label="Choose a program path">
        <a href="#learn-prepare"><strong>Learn &amp; Prepare</strong><span>Anyone can join</span></a>
        <a href="#build-grow"><strong>Build &amp; Grow</strong><span>Apply → Assessment → Selection</span></a>
      </nav>
    </header>
    <section id="learn-prepare" className={styles.group} aria-labelledby="learn-heading"><div className="container">
      <div className={styles.groupTitle}><h2 id="learn-heading">Learn &amp; Prepare</h2><span className={styles.badge}>Open enrollment</span></div>
      <p className={styles.groupIntro}>Build your understanding before committing serious time, money, or your career.</p>
      <Cards programs={learnPrograms} />
    </div></section>
    <section id="build-grow" className={`${styles.group} ${styles.dark}`} aria-labelledby="build-heading"><div className="container">
      <div className={styles.groupTitle}><h2 id="build-heading">Build &amp; Grow</h2><span className={styles.badge}>Selective entry</span></div>
      <p className={styles.groupIntro}>For founders ready to build, prove, and grow a business. Apply → Assessment → Selection.</p>
      <Cards programs={buildPrograms} selective />
    </div></section>
    <aside className={`container ${styles.help}`}><div><h2>Not sure where to begin?</h2><p>Start with the big picture before choosing your next step.</p></div><a className={styles.primary} href="/clarity-session">Start with Clarity <span aria-hidden="true">→</span></a></aside>
  </main></SiteFrame>;
}

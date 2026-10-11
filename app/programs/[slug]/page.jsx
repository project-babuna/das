import { notFound } from "next/navigation";
import SiteFrame from "../../components/SiteFrame";
import { buildPrograms, entrySteps } from "../catalog";
import styles from "../Programs.module.css";

export const dynamicParams = false;
export function generateStaticParams() { return buildPrograms.map(program => ({ slug: program.slug })); }
export function generateMetadata({ params }) {
  const program = buildPrograms.find(item => item.slug === params.slug);
  if (!program) return {};
  return { title: `${program.title} | DreamAndScale Build & Grow`, description: program.intro, alternates: { canonical: `https://www.dreamandscale.com/programs/${program.slug}` } };
}
export default function BuildProgramPage({ params }) {
  const program = buildPrograms.find(item => item.slug === params.slug);
  if (!program) notFound();
  const applyHref = `/programs/apply?program=${program.slug}`;
  return <SiteFrame><main className={`${styles.page} ${styles.detail}`}>
    <div className="container">
      <nav className={styles.breadcrumb} aria-label="Breadcrumb"><a href="/programs">Programs</a><span>/</span><a href="/programs#build-grow">Build &amp; Grow</a><span>/</span><span aria-current="page">{program.title}</span></nav>
      <section className={styles.detailHero} aria-labelledby="program-heading">
        <div><span className={styles.badge}>Selective entry</span><h1 id="program-heading">{program.headline}</h1><p>{program.intro}</p>
          <div className={styles.cardActions}><a className={styles.primary} href={applyHref}>Apply for {program.title}</a><a className={styles.textLink} href="/programs">Compare all programs</a></div>
        </div>
        <img src={`/assets/lifecycle/${program.image}.jpg`} width="1448" height="1086" alt={`${program.title}: founders working on their next stage of business`} fetchPriority="high" />
      </section>
      <div className={styles.detailColumns}>
        <section aria-labelledby="fit-heading"><h2 id="fit-heading">Is this your next step?</h2><ul className={styles.fit}>{program.fit.map(item => <li key={item}>{item}</li>)}</ul></section>
        <section aria-labelledby="focus-heading"><h2 id="focus-heading">What you work on</h2><ol className={styles.focus}>{program.focus.map((item, index) => <li key={item.title}><span className={styles.number}>{String(index + 1).padStart(2, "0")}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></li>)}</ol></section>
      </div>
    </div>
    <section className={styles.process} aria-labelledby="entry-heading"><div className="container"><h2 id="entry-heading">Entry is based on fit.</h2><ol className={styles.steps}>{entrySteps.map((step, index) => <li key={step.title}><span className={styles.number}>{String(index + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol></div></section>
    <div className={`container ${styles.detailEnd}`}><a className={styles.primary} href={applyHref}>Apply for {program.title}</a><p>Applying does not guarantee a place. Ask about current format, fees, and availability during assessment.</p></div>
  </main></SiteFrame>;
}

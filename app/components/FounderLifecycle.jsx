import { founderLifecycle } from "../homeContent";
import styles from "./FounderLifecycle.module.css";

function Arrow() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" /></svg>;
}

export default function FounderLifecycle() {
  return (
    <section id="approach" className={styles.lifecycle} aria-labelledby="approach-heading">
      <div className="container">
        <header className={styles.intro}>
          <p className={styles.eyebrow}>The DreamAndScale Founder Lifecycle</p>
          <h2 id="approach-heading">A big dream.<br /><em>A clear path forward.</em></h2>
          <p>From understanding business to building, proving, and scaling it. Find your stage, then focus on the next step.</p>
          <nav className={styles.stageNav} aria-label="Explore the six founder stages">
            {founderLifecycle.map((stage, index) => <a key={stage.label} href={`#founder-stage-${index + 1}`}><span>{String(index + 1).padStart(2, "0")}</span>{stage.label}</a>)}
          </nav>
        </header>
        <div id="dream" className={styles.dream} aria-labelledby="dream-heading">
          <h3 id="dream-heading">DREAM</h3>
          <p>“I want to build something.”</p>
        </div>
        <ol className={styles.path}>
          {founderLifecycle.map((stage, index) => (
            <li className={styles.stage} key={stage.label} id={`founder-stage-${index + 1}`}>
              <div className={styles.stageInner}>
                <div className={styles.photo}>
                  <img src={`/assets/lifecycle/${stage.image}.jpg`} width="1448" height="1086" alt={stage.alt} loading="lazy" sizes="(max-width: 760px) 100vw, 45vw" />
                  <span className={styles.imageNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className={styles.copy}>
                  <p className={styles.eyebrow}>{String(index + 1).padStart(2, "0")} / 06 <span>·</span> {stage.label}</p>
                  <h3>{stage.verb}<span>.</span></h3>
                  <p className={styles.question}>{stage.question}</p>
                  <p className={styles.description}>{stage.description}</p>
                  <ul className={styles.focus}>{stage.points.map(point => <li key={point}><span aria-hidden="true">✓</span>{point}</li>)}</ul>
                  {stage.href ? <a className={styles.action} href={stage.href}>{stage.action}<Arrow /></a> : <p className={styles.outcome}><span>The focus</span>{stage.outcome}</p>}
                </div>
              </div>
              {index < founderLifecycle.length - 1 && <svg className={styles.connector} viewBox="0 0 1000 140" preserveAspectRatio="none" fill="none" aria-hidden="true"><path d="M250 0 C250 90 750 50 750 140" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke"/><circle cx="500" cy="70" r="5" fill="currentColor"/></svg>}
            </li>
          ))}
        </ol>
        <footer className={styles.destination}>
          <p>Dream → Understand → Learn → Build → Prove → Accelerate → Scale</p>
          <h3>Founder <span>→</span> Business <span>→</span> Company <span>→</span> Institution</h3>
          <a className={styles.action} href="/clarity-session">Start your journey with clarity<Arrow /></a>
        </footer>
      </div>
    </section>
  );
}

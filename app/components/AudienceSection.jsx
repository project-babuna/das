import styles from "./AudienceSection.module.css";

const audiences = [
  { title: "Working Professionals", description: "Explore entrepreneurship alongside your career, before deciding whether to make a change." },
  { title: "First-Time Founders", description: "Studying or exploring a career in entrepreneurship? Understand how businesses work and where to begin." },
  { title: "Existing Business Owners", description: "Stuck with growth? Revisit your customers, pricing, and operations to understand what may be holding your business back." },
];

export default function AudienceSection({ dark = false }) {
  return (
    <section id="for-you" className={`${styles.section} ${dark ? styles.dark : ""}`} aria-labelledby="audience-heading">
      <div className={`container ${styles.layout}`}>
        <div className={styles.heading}>
          {dark && <p className={styles.eyebrow}>Who it&apos;s for</p>}
          <h2 id="audience-heading">Who DreamAndScale Is For</h2>
          {!dark && <p>Exploring your first idea or rethinking an existing business? Find a clearer way forward.</p>}
          <span className={styles.signature} aria-hidden="true" />
        </div>
        <div className={styles.cards}>
          {audiences.map((audience, index) => (
            <article className={styles.card} key={audience.title}>
              <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{audience.title}</h3><p>{audience.description}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

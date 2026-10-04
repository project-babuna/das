import styles from "./ClarityAgenda.module.css";

const topics = [
  {
    title: "Business Myths That Keep Aspiring Founders Stuck",
    description: "Rethink common beliefs about needing a completely unique idea, big investment, perfect product, office, team, or quitting your job before you can begin. Understand how these assumptions can stop you from starting—or push you into expensive decisions too early.",
    breakAt: "Understand how these assumptions",
    emphasis: "Understand how these assumptions",
  },
  {
    title: "Why Learning Should Come Before Building",
    description: "A good idea, professional experience, technical skills, confidence, or capital alone do not make a successful business. Understand what to learn, question, and test before committing serious time, money, or your career—and why business building deserves the same preparation as any serious profession.",
    breakAt: "Understand what to learn",
    emphasis: "Understand what to learn, question, and test",
  },
  {
    title: "The Roadmap From Idea to Big Business",
    description: "See the journey from identifying an opportunity and understanding the customer to validating demand, building the right solution, developing a business model, and eventually growing and scaling. Understand where to start, what comes next, and what can wait.",
    breakAt: "Understand where to start",
    emphasis: "Understand where to start, what comes next, and what can wait.",
  },
  {
    title: "Turn Clarity Into Your Next Step",
    description: "Understand where you are in your founder journey, what you need to learn or validate next, and how to move forward without trying to do everything at once. See how DreamAndScale can support you through learning, mentorship, hands-on building, acceleration, and scale.",
    breakAt: "See how DreamAndScale",
    emphasis: "See how DreamAndScale can support you",
  },
];

export default function ClarityAgenda() {
  return (
    <section id="session-details" className={styles.section} aria-labelledby="agenda-heading">
      <div className={`container ${styles.layout}`}>
        <div className={styles.intro}>
          <h2 id="agenda-heading">What We Cover in <em>3 Hours</em></h2>
          <p className={styles.lead}>The DreamAndScale Clarity Session gives you the big picture of how businesses are actually built—before you start making expensive decisions.</p>
        </div>
        <div className={styles.chapters}>
          {topics.map((topic, index) => {
            const split = topic.description.indexOf(topic.breakAt);
            const secondParagraph = topic.description.slice(split);
            return (
              <article className={styles.chapter} key={topic.title} id={`clarity-topic-${index + 1}`} aria-labelledby={`clarity-topic-heading-${index + 1}`}>
                <div className={styles.chapterProgress} aria-hidden="true"><span style={{ width: `${(index + 1) * 25}%` }} /></div>
                <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h3 id={`clarity-topic-heading-${index + 1}`}>{topic.title}</h3>
                <p>{topic.description.slice(0, split).trim()}</p>
                <p><strong>{topic.emphasis}</strong>{secondParagraph.slice(topic.emphasis.length)}</p>
              </article>
            );
          })}
        </div>
        <p className={styles.takeaway}><strong>3 hours</strong> to understand the journey before you spend years building it.</p>
      </div>
    </section>
  );
}

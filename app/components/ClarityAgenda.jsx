import styles from "./ClarityAgenda.module.css";

const topics = [
  {
    title: "Break the myths",
    prompt: "Unique idea? Big investment? Perfect product? Office? Team? Quit your job?",
    description: "Learn which assumptions keep aspiring founders stuck—or make them spend too early.",
  },
  {
    title: "Learn before you build",
    description: "Understand what you actually need to know, question and test before committing serious time or money.",
  },
  {
    title: "See the complete journey",
    journey: ["Opportunity", "Customer", "Validation", "Product", "Business Model", "Growth", "Scale"],
    description: "See where to start, what comes next, and what can wait.",
  },
  {
    title: "Find your next step",
    description: "Understand where you are today and what you should learn, test or build next.",
  },
];

export default function ClarityAgenda() {
  return (
    <section id="session-details" className={styles.section} aria-labelledby="agenda-heading">
      <div className={`container ${styles.layout}`}>
        <div className={styles.intro}>
          <h2 id="agenda-heading">What you’ll understand in <em>3 hours</em></h2>
        </div>
        <div className={styles.chapters}>
          {topics.map((topic, index) => (
            <article className={styles.chapter} key={topic.title} id={`clarity-topic-${index + 1}`} aria-labelledby={`clarity-topic-heading-${index + 1}`}>
              <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <div className={styles.chapterBody}>
                <h3 id={`clarity-topic-heading-${index + 1}`}>{topic.title}</h3>
                {topic.prompt && <p className={styles.prompt}>{topic.prompt}</p>}
                {topic.journey && (
                  <p className={styles.journey} aria-label={topic.journey.join(" to ")}>
                    {topic.journey.map((step, stepIndex) => (
                      <span className={styles.journeyStep} key={step} aria-hidden="true">
                        {step}{stepIndex < topic.journey.length - 1 && <span className={styles.journeyArrow}>→</span>}
                      </span>
                    ))}
                  </p>
                )}
                <p>{topic.description}</p>
              </div>
            </article>
          ))}
        </div>
        <div className={styles.takeaway}>
          <p><strong>3 hours</strong> to understand the journey <span>before you spend years building it.</span></p>
        </div>
      </div>
    </section>
  );
}

import styles from "./HomeReading.module.css";

const traps = [
  { label: "The perfect idea trap", title: "“Someone must have done this already.”", body: "You keep waiting for something completely unique instead of testing real problems." },
  { label: "The day-one company trap", title: "“I need funding, an app, and a team.”", body: "You imagine the finished company before taking the first small step." },
  { label: "The build-first trap", title: "“Let me build it. Customers will come.”", body: "You invest before finding out whether customers actually care." },
  { label: "The first-step trap", title: "“What should I do first?”", body: "Product? Customers? Company registration? Funding? Everything feels urgent." },
  { label: "The quit-your-job trap", title: "“Do I have to resign to start?”", body: "You treat entrepreneurship as an all-or-nothing career decision." },
  { label: "The co-founder trap", title: "“I can’t start alone.”", body: "You wait for a co-founder before discovering what the business actually needs." },
];

export default function FounderTrapStory({ children }) {
  return (
    <div className={styles.trapGrid} aria-label="Common founder traps">
      <div className={styles.trapIntro}>{children}</div>
      <div className={styles.trapStage}>
        {traps.map((trap, index) => {
          const number = String(index + 1).padStart(2, "0");
          return (
            <article className={styles.trapCard} key={trap.label} data-clarity-reveal>
              <div className={styles.trapCardHead}>
                <span className={styles.trapNumber}>{number}</span>
                <span className={styles.trapLabel}>{trap.label}</span>
              </div>
              <div className={styles.trapCardBody}>
                <h4 className={styles.trapTitle}>{trap.title}</h4>
                <p>{trap.body}</p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

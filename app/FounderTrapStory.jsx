import styles from "./HomeReading.module.css";

const traps = [
  { label: "The perfect idea trap", title: "“Someone must have done this already.”", body: "You dismiss everyday problems and wait for a revolutionary idea. Years pass without testing anything." },
  { label: "The day-one company trap", title: "“I need funding, an app, and a team.”", body: "You picture the finished company. The cost and complexity make even starting feel impossible." },
  { label: "The build-first trap", title: "“Let me finish it. Customers will come.”", body: "You invest in features and hiring before finding out whether people need your solution enough to pay." },
  { label: "The first-step trap", title: "“What should I do first?”", body: "Register the company? Build a product? Find customers? When every task feels urgent, you struggle to choose a starting point." },
  { label: "The quit-your-job trap", title: "“Do I have to resign to start?”", body: "You assume starting requires leaving your job, so you put the idea aside before exploring whether it has potential." },
  { label: "The co-founder trap", title: "“I can’t start alone.”", body: "You wait for the right co-founder before finding out what the business needs—or whether the idea is worth pursuing." },
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
                <span className={styles.trapMark} aria-hidden="true">✦</span>
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

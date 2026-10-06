import styles from "./ConnectedBusinessSystem.module.css";

const subjects = ["Marketing", "Sales", "Finance", "Company setup", "Fundraising"];
const decisions = [
  { title: "Know your customer", detail: "Who needs your help, and what problem matters to them?" },
  { title: "Create the right offer", detail: "What will you offer, and why would someone choose it?" },
  { title: "Make the numbers work", detail: "Will your price cover your costs and leave a profit?" },
  { title: "Grow what works", detail: "Can you reach more customers and deliver consistently?" },
];

export default function ConnectedBusinessSystem() {
  return (
    <section id="connected-system" className={styles.section} aria-labelledby="system-heading">
      <div className="container">
        <header className={styles.intro}>
          <h2 id="system-heading">Learn how the parts<br /><em>become a business.</em></h2>
          <p>Marketing, sales, and finance are useful skills. Building a business means knowing how they work together—and what to do next.</p>
        </header>
        <div className={styles.comparison}>
          <div className={styles.fragmented}>
            <h3>Individual skills</h3>
            <p>Each subject answers one part of the question.</p>
            <ul className={styles.subjects} aria-label="Individual business skills">
              {subjects.map(subject => <li key={subject}>{subject}</li>)}
            </ul>
            <div className={styles.example}>
              <p className={styles.eyebrow}>For example</p>
              <h4>A lower price may bring more customers.</h4>
              <p>But will each sale still cover your costs? And can you deliver more orders?</p>
              <strong>One decision affects the whole business.</strong>
            </div>
          </div>
          <div className={styles.connected}>
            <p className={styles.eyebrow}>The DreamAndScale approach</p>
            <h3>Connect your decisions.</h3>
            <p className={styles.support}>Learn what to ask, how the answers connect, and which step comes next.</p>
            <ol className={styles.decisions}>
              {decisions.map((decision, index) => (
                <li key={decision.title}>
                  <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <div><h4>{decision.title}</h4><p>{decision.detail}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className={styles.close}>
          <p>Learn the skills. Connect the decisions. Build step by step.</p>
          <a href="/full-program">Explore the Full Program <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" /></svg></a>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef, useState } from "react";
import styles from "./ConnectedBusinessSystem.module.css";

const examples = [
  { label: "Customer", title: "Your customer shapes the whole business.", body: "Who you serve changes the problem you solve, the offer you create, the price you charge, and where you sell." },
  { label: "Pricing", title: "A price is more than a number.", body: "It changes who buys, what you promise, your margin, and how you grow." },
  { label: "Growth", title: "More sales change more than revenue.", body: "Growing demand affects delivery, cash flow, team capacity, and the experience you promise every customer." },
];
const subjects = ["Marketing", "Sales", "Finance", "Company setup", "Fundraising"];

export default function ConnectedBusinessSystem() {
  const [selected, setSelected] = useState(1);
  const tabs = useRef([]);
  const example = examples[selected];

  function navigate(event, index) {
    let next;
    if (event.key === "ArrowRight") next = (index + 1) % examples.length;
    else if (event.key === "ArrowLeft") next = (index + examples.length - 1) % examples.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = examples.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  }

  return (
    <section id="connected-system" className={styles.section} aria-labelledby="system-heading">
      <div className="container">
        <div className={styles.comparison}>
          <div className={styles.fragmented}>
            <header className={styles.intro}>
              <h2 id="system-heading">Knowing the parts isn’t the same as <em>building the business.</em></h2>
              <p>Individual courses can build useful skills. Founders also need to understand how those skills work together—and which decision comes next.</p>
            </header>
            <h3>Separate subjects</h3>
            <ul className={styles.subjects} aria-label="Business topics often studied separately">
              {subjects.map(subject => <li key={subject}>{subject}</li>)}
            </ul>
            <p className={styles.disconnect}>You’re left to connect the dots.</p>
          </div>

          <div className={styles.connected}>
            <p className={styles.eyebrow}>The DreamAndScale approach</p>
            <h3>One connected<br />business system.</h3>
            <ol className={styles.connections} aria-label="Connected business decisions">
              {["Customer", "Offer", "Economics", "Growth"].map(label => <li key={label}><span aria-hidden="true" />{label}</li>)}
            </ol>
            <div className={styles.tabs} role="tablist" aria-label="Explore how business decisions connect">
              {examples.map((item, index) => (
                <button key={item.label} type="button" role="tab" id={`system-tab-${index}`} aria-controls="system-example" aria-selected={selected === index} tabIndex={selected === index ? 0 : -1} ref={element => { tabs.current[index] = element; }} onClick={() => setSelected(index)} onKeyDown={event => navigate(event, index)}>{item.label}</button>
              ))}
            </div>
            <div className={styles.example} id="system-example" role="tabpanel" aria-labelledby={`system-tab-${selected}`} tabIndex={0}>
              <div key={selected} className={styles.exampleContent}>
                <p className={styles.eyebrow}>One decision. Multiple connections.</p>
                <h4>{example.title}</h4>
                <p>{example.body}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.close}>
          <p>Learn the relationships.<br className={styles.mobileBreak} /> Make the next decision.</p>
          <a href="/full-program">Explore the Full Program <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" /></svg></a>
        </div>
      </div>
    </section>
  );
}

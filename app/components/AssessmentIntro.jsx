import { assessmentCategories } from "../assessmentContent";
import styles from "./Assessment.module.css";

export default function AssessmentIntro({ onStart }) {
  return <div className={styles.page}>
    <section className={`container ${styles.hero}`} aria-labelledby="assessment-page-title">
      <div><span className={styles.eyebrow}>Free Business Readiness Assessment</span><h1 id="assessment-page-title">Before your next move,<br /><em>know where you stand.</em></h1><p className={styles.intro}>Explore how clearly you understand the decisions behind a business. Spot gaps, question assumptions, and find a more informed next step.</p>
        <ul className={styles.facts}><li>18 practical questions</li><li>6 areas of business</li><li>One clear report</li></ul>
        <button className={styles.primary} type="button" onClick={onStart}>Start free assessment<span aria-hidden="true">↗</span></button>
        <p className={styles.note}>Name, email, WhatsApp number, and your role are required to view your score. Your report is in English.</p>
      </div>
      <aside className={styles.overview} aria-label="What you receive"><span className={styles.eyebrow}>A clearer starting point</span><h2>Clarity across the<br />whole business.</h2><p>Look beyond a good idea. Understand the decisions that connect it to a working business.</p><ol>{["A snapshot of your current understanding", "Areas that need more attention", "A recommended next step"].map((text,i)=><li key={text}><span>0{i+1}</span>{text}</li>)}</ol><div className={styles.overviewFoot}>A reflection of your answers.<br /><strong>Not a prediction of business success.</strong></div></aside>
    </section>
    <section className={styles.coverage} aria-labelledby="coverage-title"><div className="container"><div className={styles.heading}><span className={styles.eyebrow}>What you’ll explore</span><h2 id="coverage-title">Six perspectives.<br />One connected business.</h2><p>Real-world situations help you examine how you would think through the decisions founders face.</p></div><div className={styles.categories}>{assessmentCategories.map((category,i)=><article key={category.id}><span className={styles.number}>0{i+1}</span><h3>{category.title}</h3><p>{category.description}</p></article>)}</div></div></section>
    <section className={`container ${styles.how}`} aria-labelledby="how-title"><div className={styles.heading}><span className={styles.eyebrow}>How it works</span><h2 id="how-title">Reflect. Respond. Find your next step.</h2></div><ol className={styles.steps}>{[["Answer practical questions", "Read 18 business situations and choose the answer that best matches how you think today."],["Review your choices", "Move one question at a time. You can go back and change an answer before submitting."],["See your report", "Enter your details to view your score, category breakdown, and recommended next step."]].map(([title,text],i)=><li key={title}><span className={styles.number}>0{i+1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol></section>
    <section className={`container ${styles.final}`}><div><h2>Start with an honest snapshot.</h2><p>You don’t need a business idea to begin. Choose the answer that best reflects your thinking today.</p></div><button type="button" className={styles.primary} onClick={onStart}>Start free assessment<span aria-hidden="true">↗</span></button></section>
  </div>;
}

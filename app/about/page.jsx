import SiteFrame from "../components/SiteFrame";
import styles from "./page.module.css";

export const metadata = {
  title: "About DreamAndScale | From Dream to Business",
  description: "Understand the DreamAndScale vision: help founders learn, build, prove, accelerate, and scale a business, one stage at a time.",
  alternates: { canonical: "https://www.dreamandscale.com/about" },
};

export default function AboutPage() {
  return (
    <SiteFrame>
      <main className={styles.page}>
        <div className="container">
          <header className={styles.intro}>
            <h1>A big dream.<br /><em>A clear path to building it.</em></h1>
            <p>DreamAndScale supports founders at different stages—from understanding business fundamentals to building, accelerating, and scaling a real company.</p>
          </header>
          <section className={styles.vision} aria-labelledby="vision-heading">
            <h2 id="vision-heading">Learn how the whole business works.</h2>
            <p>A business brings together customers, products, marketing, money, people, and operations. Our approach connects those parts so you can understand what comes first, what to test, and what to work on next.</p>
          </section>
          <div className={styles.paths}>
            <section aria-labelledby="learn-heading">
              <span>OPEN ENROLLMENT · Anyone can join.</span>
              <h2 id="learn-heading">Learn &amp; Prepare</h2>
              <p>Start with Clarity, learn the framework through the Full Program, and apply it to your situation with Mentorship.</p>
              <a href="/clarity-session">Start with Clarity</a>
            </section>
            <section aria-labelledby="build-heading">
              <span>SELECTIVE ENTRY · Apply → Assessment → Selection.</span>
              <h2 id="build-heading">Build &amp; Grow</h2>
              <p>Incubation, Accelerator, and Scale-up focus on building and proving a business, making it repeatable, and developing a larger organisation.</p>
              <a href="/programs#build-grow">Explore Build &amp; Grow programs</a>
            </section>
          </div>
          <p className={styles.destination}>Founder → Business → Company → Institution</p>
        </div>
      </main>
    </SiteFrame>
  );
}

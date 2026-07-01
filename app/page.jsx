"use client";

import { useEffect, useState } from "react";
import BrandLogo from "./components/BrandLogo";

const ribbonItems = [
  {
    id: "idea",
    label: "Idea",
    detail: "Spot and judge opportunities before you attach your future to one.",
  },
  {
    id: "market",
    label: "Market",
    detail: "Understand whether the problem exists in a market large enough to matter.",
  },
  {
    id: "customer",
    label: "Customer",
    detail: "Learn who actually feels the pain, why they buy, and what they will pay for.",
  },
  {
    id: "product",
    label: "Product",
    detail: "Turn a validated problem into a sellable offer and a real business model.",
  },
  {
    id: "structure",
    label: "Structure",
    detail:
      "Shape the company, ownership, roles, legal setup, and operating system behind the business.",
  },
  {
    id: "finance",
    label: "Finance",
    detail: "Read unit economics, runway, ownership, and the money logic behind decisions.",
  },
  {
    id: "growth",
    label: "Growth",
    detail:
      "See how sales, systems, hiring, and leverage turn a business into something scalable.",
  },
  {
    id: "exit",
    label: "Exit",
    detail: "Think several moves ahead about valuation, optionality, and realizing built value.",
  },
];

const faqItems = [
  {
    question: "Do I need a business idea before joining?",
    answer:
      "No. DreamAndScale is built to help you think clearly before you commit to an idea. If you already have one, you will evaluate it. If you do not, you will learn how opportunities are spotted and judged.",
  },
  {
    question: "How is DreamAndScale different from other entrepreneurship courses?",
    answer:
      "Most entrepreneurship courses focus on starting, pitching, or scaling a business. DreamAndScale focuses on business clarity first: how idea, market, customer, product, structure, finance, growth, and ownership connect before you take a major risk.",
  },
  {
    question: "What is the ₹199 Clarity Session for?",
    answer:
      "It is a focused 3-hour live introduction to business-level thinking. You get a practical taste of opportunity evaluation, risk reading, and how to size up your current situation honestly before choosing a deeper path.",
  },
  {
    question: "What is the difference between the two full program options?",
    answer:
      "The ₹9,999 option gives you the full self-paced program. The ₹49,990 option adds live mentor access for people who want guided application, feedback, and sharper decision support while they work through the program.",
  },
  {
    question: "Is this only for people who want to launch immediately?",
    answer:
      "No. It is for professionals, freelancers, builders, and students who want to understand how businesses actually work before taking a major risk. You can use it to build now or to make a more informed decision later.",
  },
  {
    question: "Is DreamAndScale theory-heavy?",
    answer:
      "The program explains useful frameworks, but the goal is judgment. You connect idea, market, customer, product, structure, finance, growth, and exit into one working business lens.",
  },
  {
    question: "What will I have by the end?",
    answer:
      "You leave with business clarity about how a business works end to end, plus a working plan if your idea is worth pursuing and the ability to evaluate future opportunities with more confidence.",
  },
];

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("nav-open", navOpen);

    return () => {
      document.body.classList.remove("nav-open");
    };
  }, [navOpen]);

  const closeNav = () => setNavOpen(false);

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="DreamAndScale home" onClick={closeNav}>
          <BrandLogo tone="light" />
        </a>

        <button
          className="nav-toggle"
          type="button"
          aria-expanded={navOpen}
          aria-controls="site-nav"
          onClick={() => setNavOpen((isOpen) => !isOpen)}
        >
          <span className="sr-only">Toggle navigation</span>
          <span></span>
          <span></span>
        </button>

        <nav className="site-nav" id="site-nav" aria-label="Main navigation">
          <a href="#clarity" onClick={closeNav}>
            Clarity Session
          </a>
          <a href="/course" onClick={closeNav}>
            Full Program
          </a>
          <a href="#pillars" onClick={closeNav}>
            Pillars
          </a>
          <a href="#outcomes" onClick={closeNav}>
            Outcomes
          </a>
          <a href="#faq" onClick={closeNav}>
            FAQ
          </a>
        </nav>

        <a className="header-cta" href="#clarity">
          Book ₹199 Session
        </a>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-media" aria-hidden="true">
            <img src="/assets/business-system-hero.png" alt="" />
          </div>
          <div className="hero-shade" aria-hidden="true"></div>

          <div className="container hero-content">
            <p className="eyebrow">Business clarity program</p>
            <h1 id="hero-title">
              Understand How Businesses Actually Work — Before You Bet Everything On One
            </h1>
            <p className="hero-lede">
              Most people want to build a business, but very few understand how businesses
              actually work. DreamAndScale helps you understand how opportunities, customers,
              products, company structure, finance, partnerships, growth, and ownership connect—so
              you can make confident business decisions before risking your time, money, or career.
            </p>
            <div className="hero-actions" aria-label="Primary actions">
              <a className="btn btn-primary" href="#clarity">
                Book the ₹199 Clarity Session
              </a>
              <a className="btn btn-secondary" href="/course">
                Explore the Full Program
              </a>
            </div>
          </div>

          <div className="hero-dock container" aria-label="Program scope">
            <p className="ribbon-context">
              Every successful business, regardless of industry, moves through the same connected
              journey. DreamAndScale helps you understand how each stage influences the next so you
              can see the complete system—not isolated topics.
            </p>
            <div className="ribbon-grid">
              {ribbonItems.map((item) => (
                <button
                  className="ribbon-item"
                  type="button"
                  aria-describedby={`tip-${item.id}`}
                  key={item.id}
                >
                  <span className="ribbon-label">{item.label}</span>
                  <span className="ribbon-tooltip" id={`tip-${item.id}`} role="tooltip">
                    <strong>{item.label}</strong>
                    <span>{item.detail}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="section problem-section" id="problem">
          <div className="container problem-layout">
            <div className="section-kicker">
              <p className="eyebrow dark">The problem</p>
              <h2>Why Starting a Business Feels Confusing</h2>
            </div>
            <div className="problem-panel">
              <p className="problem-lead">
                Most aspiring founders don&apos;t lack ambition. They lack business clarity.
              </p>
              <div className="problem-decision-grid" aria-label="Common founder decisions">
                <span>Validate the idea</span>
                <span>Build the product</span>
                <span>Register a company</span>
                <span>Find customers</span>
                <span>Raise capital</span>
                <span>Choose a co-founder</span>
                <span>Quit their job</span>
              </div>
              <p>
                Every decision depends on another decision—but no one teaches how those decisions
                connect. DreamAndScale helps you see the complete system, so you can make important
                business decisions with clarity instead of guesswork.
              </p>
            </div>
          </div>
        </section>

        <section className="section start-section" id="clarity">
          <div className="container">
            <div className="section-heading progression-heading">
              <p className="eyebrow dark">Three ways in</p>
              <h2>Learn At Your Own Pace—or With Guidance</h2>
              <p>
                Everyone starts from a different place. Some want to explore before a deep dive.
                Others want the complete system. Some want mentorship while applying it to their own
                ideas.
              </p>
            </div>

            <div className="entry-grid">
              <article className="entry-card">
                <div className="card-topline">
                  <span>Start here</span>
                  <strong>Clarity Session</strong>
                </div>
                <h3>Explore Before You Commit</h3>
                <p className="card-price">
                  <span>3 hours. Live.</span>
                  <s>₹999</s>
                  <strong>₹199</strong>
                </p>
                <p>
                  A focused, real introduction to business-level thinking — opportunity evaluation,
                  risk reading, and how to size up your own situation honestly. Built for anyone who
                  wants a real taste before going deeper.
                </p>
                <a className="text-link" href="#contact">
                  Book the Session
                </a>
              </article>

              <article className="entry-card" id="program">
                <div className="card-topline">
                  <span>Learn independently</span>
                  <strong>The Full Program</strong>
                </div>
                <h3>Build The Complete System</h3>
                <p>
                  The complete DreamAndScale curriculum from idea to exit, designed for people who
                  want to study deeply at their own pace and build business clarity without live
                  mentor access.
                </p>
                <a className="text-link" href="/course">
                  Explore the Program
                </a>
              </article>

              <article className="entry-card accent">
                <div className="card-topline">
                  <span>Learn with mentorship</span>
                  <strong>Full Program + Mentor Access</strong>
                </div>
                <h3>Apply It With Live Guidance</h3>
                <p>
                  The complete journey from idea to exit, applied to your own situation as you go.
                  For people ready to build real business clarity with live guidance and review.
                </p>
                <a className="text-link" href="/course">
                  Explore the Program
                </a>
              </article>
            </div>
          </div>
        </section>

        <section className="section pillars-section" id="pillars">
          <div className="container">
            <div className="section-heading narrow">
              <p className="eyebrow dark">The 5 pillars</p>
              <h2>One Connected System, Five Pillars</h2>
              <p>
                Businesses don&apos;t work in isolated topics — they work as systems. DreamAndScale
                connects the entire arc into one clear journey.
              </p>
            </div>

            <div className="pillar-list">
              <article>
                <span>01</span>
                <div>
                  <h3>Opportunity Thinking</h3>
                  <p>
                    How strong business builders spot, test, and judge opportunities — the thinking
                    pattern itself, whether or not you have an idea yet.
                  </p>
                </div>
              </article>
              <article>
                <span>02</span>
                <div>
                  <h3>Market & Customer</h3>
                  <p>
                    Who actually has this problem, how big that group really is, and whether
                    they&apos;ll pay — validated before you build anything.
                  </p>
                </div>
              </article>
              <article>
                <span>03</span>
                <div>
                  <h3>Business Design</h3>
                  <p>
                    Turning a validated problem into something sellable, and the model that makes it
                    a real business, not just a project.
                  </p>
                </div>
              </article>
              <article>
                <span>04</span>
                <div>
                  <h3>Business Foundation</h3>
                  <p>
                    The infrastructure of running a real company — legal structure, ownership,
                    equity, unit economics, runway — usually the least explained, most feared part.
                  </p>
                </div>
              </article>
              <article>
                <span>05</span>
                <div>
                  <h3>Growth & Ownership</h3>
                  <p>
                    How businesses scale, and how owners eventually realize the value they built —
                    thinking several moves ahead, not just to launch.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section audience-section" id="for-you">
          <div className="container split-layout">
            <div className="section-kicker">
              <p className="eyebrow">Who it&apos;s for</p>
              <h2>Built For People Ready To Think Beyond Their Current Limits</h2>
            </div>
            <div className="audience-panel">
              <p>
                Professionals exploring entrepreneurship. Freelancers building beyond client work.
                Students who want business clarity before making career decisions. Builders with
                ideas they want to evaluate. Small business owners who want to think more
                strategically. You don&apos;t need a finished idea — you need the willingness to think
                clearly about one.
              </p>
            </div>
          </div>
        </section>

        <section className="section outcome-section" id="outcomes">
          <div className="container outcome-grid">
            <div className="outcome-copy">
              <p className="eyebrow dark">Outcome</p>
              <h2>What You&apos;ll Walk Away With</h2>
              <h3 className="outcome-subhead">Business Clarity That Stays With You</h3>
              <p>
                DreamAndScale isn&apos;t about giving you ready-made answers. It&apos;s about helping
                you understand how businesses actually work, so you can make better decisions long
                after the program ends.
              </p>
            </div>
            <div className="outcome-map" aria-label="DreamAndScale outcome map">
              <span>Validate Before You Build</span>
              <span>Understand Customers</span>
              <span>Design Better Businesses</span>
              <span>Build Smarter, Not Harder</span>
              <span>Build Beyond Self-Employment</span>
              <span>Reduce Unnecessary Risk</span>
              <strong>Think With Business Clarity</strong>
            </div>
            <div className="outcome-detail">
              <div>
                <p className="outcome-detail-title">
                  After completing DreamAndScale, you&apos;ll be able to:
                </p>
                <ul className="outcome-list">
                  <li>Evaluate whether an opportunity is worth pursuing.</li>
                  <li>Decide what to do first—and what can wait.</li>
                  <li>Understand customers, business models, and how businesses create value.</li>
                  <li>
                    Make informed decisions about company structure, partnerships, ownership, and
                    finance.
                  </li>
                  <li>Distinguish between self-employment and building a scalable business.</li>
                  <li>
                    Reduce unnecessary risk by making decisions with clarity instead of guesswork.
                  </li>
                </ul>
              </div>
              <div className="outcome-note">
                <p>
                  You won&apos;t just leave with knowledge—you&apos;ll leave with the confidence to make
                  better business decisions.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section system-section" id="business-system">
          <div className="container system-layout">
            <div className="section-kicker">
              <p className="eyebrow dark">The difference</p>
              <h2>Business Isn&apos;t Learned One Topic At A Time</h2>
            </div>
            <div className="system-panel">
              <div className="system-contrast" aria-label="Business education comparison">
                <div className="system-contrast-card">
                  <span>Most business education</span>
                  <ul>
                    <li>Marketing</li>
                    <li>Sales</li>
                    <li>Finance</li>
                    <li>Company registration</li>
                    <li>Fundraising</li>
                  </ul>
                </div>
                <div className="system-contrast-arrow" aria-hidden="true">
                  ↓
                </div>
                <div className="system-contrast-card system-contrast-card-accent">
                  <span>DreamAndScale</span>
                  <strong>One Connected Business System</strong>
                </div>
              </div>
              <p>
                Most business education teaches these topics separately. DreamAndScale connects them
                into one business system. Because businesses aren&apos;t built by mastering isolated
                subjects. They&apos;re built by making the right decision at the right time.
              </p>
            </div>
          </div>
        </section>

        <section className="section trust-section" id="why-built">
          <div className="container trust-layout">
            <div className="section-kicker">
              <p className="eyebrow dark">Why it exists</p>
              <h2>Why We Built DreamAndScale</h2>
            </div>
            <div className="trust-panel">
              <p>
                Most people never get the chance to learn how businesses actually work. Schools teach
                subjects. Colleges teach professions. Companies teach job roles. But almost nobody
                teaches how all the pieces of a business connect.
              </p>
              <p>
                DreamAndScale was created to bridge that gap by bringing opportunity, customers,
                products, finance, company structure, growth, and ownership into one connected
                system.
              </p>
              <strong>Because better businesses begin with better business decisions.</strong>
            </div>
          </div>
        </section>

        <section className="section proof-section" id="trust">
          <div className="container proof-layout">
            <div className="section-kicker">
              <p className="eyebrow dark">Trust</p>
              <h2>Why People Trust DreamAndScale</h2>
            </div>
            <div className="proof-list">
              <article>
                <span>01</span>
                <p>
                  Designed specifically for first-generation founders and professionals exploring
                  entrepreneurship.
                </p>
              </article>
              <article>
                <span>02</span>
                <p>
                  Built around practical business decision-making rather than isolated business
                  subjects.
                </p>
              </article>
              <article>
                <span>03</span>
                <p>
                  Structured as one connected business system instead of disconnected lessons.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="section faq-section" id="faq">
          <div className="container faq-layout">
            <div className="section-kicker">
              <p className="eyebrow dark">FAQ</p>
              <h2>Questions Before You Step In</h2>
            </div>
            <div className="faq-list">
              {faqItems.map((item, index) => (
                <details className="faq-item" key={item.question} open={index === 0}>
                  <summary>
                    <span>{item.question}</span>
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer-strip" id="contact">
        <div className="footer-grid-cap" aria-hidden="true"></div>
        <div className="container footer-grid">
          <p className="footer-brand-line">
            <BrandLogo tone="light" compact />
            <span className="footer-brand-copy">Build Business Clarity Before You Build A Business.</span>
          </p>
          <nav aria-label="Footer navigation">
            <a href="#clarity">Clarity Session</a>
            <a href="/course">Full Program</a>
            <a href="#for-you">About</a>
            <a href="mailto:hello@dreamandscale.com">Contact</a>
          </nav>
        </div>
      </footer>
    </>
  );
}

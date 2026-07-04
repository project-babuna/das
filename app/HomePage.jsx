"use client";

import { useEffect, useState } from "react";
import BrandLogo from "./components/BrandLogo";
import SiteFooter from "./components/SiteFooter";
import { faqItems } from "./faqContent";

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
          <a href="/clarity-session" onClick={closeNav}>
            Clarity Session
          </a>
          <a href="/full-program" onClick={closeNav}>
            Full Program
          </a>
          <a href="/learn-with-mentorship" onClick={closeNav}>
            Mentorship
          </a>
          <a href="/blog" onClick={closeNav}>
            Insights
          </a>
          <a href="#faq" onClick={closeNav}>
            FAQ
          </a>
        </nav>

        <a
          className="header-cta"
          href="/clarity-session"
          data-meta-event="ViewContent"
          data-meta-content-name="Clarity Session"
          data-meta-content-category="Program Offer"
        >
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
              Understand How Businesses Actually Work — Before You Bet Your Time, Money, or Career
              on One
            </h1>
            <p className="hero-lede">
              Most people want to build a business, but very few understand how businesses
              actually work. DreamAndScale helps aspiring founders, students, freelancers, and
              professionals understand how opportunities, customers, products, company structure,
              finance, growth, and ownership connect—so they can make better business decisions
              before risking their time, money, or career.
            </p>
            <div className="hero-actions" aria-label="Primary actions">
              <a
                className="btn btn-primary"
                href="/clarity-session"
                data-meta-event="ViewContent"
                data-meta-content-name="Clarity Session"
                data-meta-content-category="Program Offer"
              >
                Book the ₹199 Clarity Session
              </a>
              <a
                className="btn btn-secondary"
                href="/full-program"
                data-meta-event="ViewContent"
                data-meta-content-name="DreamAndScale Full Program"
                data-meta-content-category="Program Offer"
              >
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
                <span>Is the idea worth pursuing?</span>
                <span>Build the product or register a company first?</span>
                <span>Proprietorship or Private Limited?</span>
                <span>Do I need a co-founder?</span>
                <span>How should ownership and shares be divided between co-founders?</span>
                <span>When do I need a CA, and what do they actually do?</span>
                <span>Do I need funding?</span>
                <span>When and how should I approach investors?</span>
                <span>How do I find customers?</span>
                <span>Should I quit my job to start?</span>
              </div>
              <p>
                Most people don&apos;t stop because they lack ambition. They stop because they don&apos;t
                know which decision comes first. They spend months—or even years—waiting for
                clarity, or move ahead with guesswork that leads to costly mistakes.
              </p>
            </div>
          </div>
        </section>

        <section className="section start-section" id="clarity">
          <div className="container">
            <div className="section-heading progression-heading">
              <p className="eyebrow dark">Three ways in</p>
              <h2>Choose Your Starting Point</h2>
              <p>
                Whether you&apos;re exploring DreamAndScale for the first time, ready to build
                business clarity independently, or looking for mentor guidance while applying it to
                your own ideas, choose the path that fits your stage.
              </p>
            </div>

            <div className="journey-track" aria-label="DreamAndScale customer journey">
              <span>Explore</span>
              <span>Learn</span>
              <span>Apply</span>
            </div>

            <div className="entry-grid journey-grid">
              <article className="entry-card journey-card journey-card-discovery">
                <span className="journey-badge">Best for first-time visitors</span>
                <div className="journey-card-head">
                  <span className="step-label step-label-explore">Explore</span>
                  <div>
                    <h3>Clarity Session</h3>
                    <p>Explore DreamAndScale Before You Enrol</p>
                  </div>
                </div>
                <p className="journey-price">
                  <s>₹2,999</s>
                  <strong>₹199</strong>
                </p>
                <p className="journey-meta">3 Hours • Live</p>
                <p className="journey-purpose">
                  Understand what DreamAndScale is, how it works, who it&apos;s for, and whether
                  it&apos;s the right next step for you. Meet the mentor, explore the curriculum, ask
                  your questions, and make an informed decision before enrolling.
                </p>
                <a
                  className="journey-cta"
                  href="/clarity-session"
                  data-meta-event="ViewContent"
                  data-meta-content-name="Clarity Session"
                  data-meta-content-category="Program Offer"
                >
                  Book Your Seat
                </a>
              </article>

              <article className="entry-card journey-card journey-card-core" id="program">
                <span className="journey-badge">Most Popular / Core Program</span>
                <div className="journey-card-head">
                  <span className="step-label step-label-learn">Learn</span>
                  <div>
                    <h3>DreamAndScale</h3>
                    <p>Build Business Clarity</p>
                  </div>
                </div>
                <p className="journey-price">
                  <s>₹39,990</s>
                  <strong>₹9,999</strong>
                </p>
                <p className="journey-meta">Self-paced</p>
                <p className="journey-purpose">
                  Learn the complete DreamAndScale framework—from opportunity and customers to
                  finance, company structure, growth, and ownership—through structured lessons that
                  help you understand how businesses actually work.
                </p>
                <a
                  className="journey-cta"
                  href="/full-program"
                  data-meta-event="ViewContent"
                  data-meta-content-name="DreamAndScale Full Program"
                  data-meta-content-category="Program Offer"
                >
                  Explore Program
                </a>
              </article>

              <article className="entry-card journey-card journey-card-premium">
                <span className="journey-badge">Premium</span>
                <div className="journey-card-head">
                  <span className="step-label step-label-apply">Apply</span>
                  <div>
                    <h3>DreamAndScale Plus</h3>
                    <p>Learn With Mentorship</p>
                  </div>
                </div>
                <p className="journey-price">
                  <s>₹1,59,999</s>
                  <strong>₹49,990</strong>
                </p>
                <p className="journey-meta">Self-paced + Live Mentor Support</p>
                <p className="journey-purpose">
                  Everything in the Full Program, plus live mentor guidance to help you apply the
                  concepts to your own ideas, decisions, and business journey.
                </p>
                <a
                  className="journey-cta"
                  href="/learn-with-mentorship"
                  data-meta-event="ViewContent"
                  data-meta-content-name="DreamAndScale Plus"
                  data-meta-content-category="Mentorship Offer"
                >
                  Apply With Mentorship
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
              <h2>Who DreamAndScale Is Built For</h2>
            </div>
            <div className="audience-panel">
              <div className="audience-card-grid">
                <article className="audience-card">
                  <h3>Professionals</h3>
                  <p>Explore entrepreneurship with clarity before risking your career stability.</p>
                </article>
                <article className="audience-card">
                  <h3>Freelancers</h3>
                  <p>Build beyond client work by learning how to think in systems, not hours.</p>
                </article>
                <article className="audience-card">
                  <h3>Students</h3>
                  <p>Understand business decisions before choosing a career direction or idea.</p>
                </article>
                <article className="audience-card">
                  <h3>Builders</h3>
                  <p>Evaluate ideas, products, and opportunities before committing serious effort.</p>
                </article>
                <article className="audience-card">
                  <h3>Business Owners</h3>
                  <p>Think more strategically about structure, finance, growth, and ownership.</p>
                </article>
              </div>
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
              <h2>Frequently Asked Questions</h2>
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

      <SiteFooter />
    </>
  );
}

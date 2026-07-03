"use client";

import { useEffect, useState } from "react";
import BrandLogo from "../components/BrandLogo";
import SiteFooter from "../components/SiteFooter";

const modules = [
  {
    number: "01",
    title: "Opportunity Thinking",
    scope: "Idea",
    body: "Learn how strong business builders recognize opportunities, separate excitement from evidence, and judge whether an idea deserves more time, money, and attention.",
  },
  {
    number: "02",
    title: "Market & Customer",
    scope: "Market + Customer",
    body: "Map who has the problem, how often it hurts, how people solve it today, and whether the buying behavior is strong enough before you build.",
  },
  {
    number: "03",
    title: "Business Design",
    scope: "Product",
    body: "Turn a validated problem into a sellable offer, then understand pricing, revenue logic, positioning, and the model that makes it a business.",
  },
  {
    number: "04",
    title: "Business Foundation",
    scope: "Structure + Finance",
    body: "Understand legal structure, ownership, roles, equity, unit economics, runway, and the operating system that supports real execution.",
  },
  {
    number: "05",
    title: "Growth & Ownership",
    scope: "Growth + Exit",
    body: "Study how businesses scale, where growth breaks, how value compounds, and how owners think about optionality, valuation, and exits.",
  },
];

const plans = [
  {
    name: "Clarity Session",
    originalPrice: "₹2,999",
    price: "₹199",
    label: "3 hours. Live.",
    body: "A focused introduction to opportunity evaluation, risk reading, and business-level thinking before you decide how deep you want to go.",
  },
  {
    name: "Full Program",
    originalPrice: "₹39,990",
    price: "₹9,999",
    label: "Learn independently.",
    body: "The full DreamAndScale curriculum for people who want the complete idea-to-exit system and prefer to learn independently.",
  },
  {
    name: "Full Program + Mentor Access",
    originalPrice: "₹1,59,999",
    price: "₹49,990",
    label: "Learn with mentorship.",
    body: "The complete curriculum with live mentor access so you can apply the system to your situation, questions, and decisions as you go.",
    featured: true,
  },
];

export default function CoursePage() {
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
      <header className="site-header course-header">
        <a className="brand" href="/" aria-label="DreamAndScale home" onClick={closeNav}>
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

        <nav className="site-nav" id="site-nav" aria-label="Course navigation">
          <a href="/clarity-session" onClick={closeNav}>
            Clarity Session
          </a>
          <a href="#curriculum" onClick={closeNav}>
            Curriculum
          </a>
          <a href="#pricing" onClick={closeNav}>
            Pricing
          </a>
          <a href="#outcomes" onClick={closeNav}>
            Outcomes
          </a>
        </nav>

        <a className="header-cta" href="#pricing">
          See Plans
        </a>
      </header>

      <main>
        <section className="course-hero">
          <div className="container course-hero-grid">
            <div>
              <p className="eyebrow">DreamAndScale full program</p>
              <h1>Business Clarity, From Idea To Exit</h1>
              <p>
                The full DreamAndScale program explains the connected system behind how businesses
                are evaluated, built, structured, financed, grown, and eventually made valuable.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#pricing">
                  Choose Your Path
                </a>
                <a className="btn btn-secondary" href="#curriculum">
                  View Curriculum
                </a>
              </div>
            </div>

            <div className="course-summary-panel" aria-label="Program summary">
              <span>Complete Arc</span>
              <strong>Idea → Market → Customer → Product → Structure → Finance → Growth → Exit</strong>
              <p>
                Built for professionals, freelancers, builders, and students who want clearer
                judgment before making serious career, time, or capital decisions.
              </p>
            </div>
          </div>
        </section>

        <section className="section course-overview">
          <div className="container split-layout">
            <div className="section-kicker">
              <p className="eyebrow dark">What this program is</p>
              <h2>Not startup content. A business operating lens.</h2>
            </div>
            <div className="large-copy">
              <p>
                DreamAndScale helps you understand how opportunities are evaluated, how customers
                behave, how products become business models, how company structure affects decisions,
                and how growth connects to long-term value.
              </p>
            </div>
          </div>
        </section>

        <section className="section course-curriculum" id="curriculum">
          <div className="container">
            <div className="section-heading narrow">
              <p className="eyebrow dark">Curriculum</p>
              <h2>The 5 connected pillars</h2>
              <p>
                Each pillar builds on the last, so you leave with one connected business system
                instead of scattered concepts.
              </p>
            </div>

            <div className="course-module-grid">
              {modules.map((module) => (
                <article key={module.number}>
                  <span>{module.number}</span>
                  <div>
                    <strong>{module.scope}</strong>
                    <h3>{module.title}</h3>
                    <p>{module.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section course-pricing" id="pricing">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow dark">Pricing</p>
              <h2>Choose the depth you need now.</h2>
            </div>

            <div className="course-plan-grid">
              {plans.map((plan) => (
                <article className={plan.featured ? "course-plan featured" : "course-plan"} key={plan.name}>
                  <span>{plan.name}</span>
                  <div className="course-plan-price">
                    <s>{plan.originalPrice}</s>
                    <strong>{plan.price}</strong>
                  </div>
                  <h3>{plan.label}</h3>
                  <p>{plan.body}</p>
                  <a className="text-link" href="mailto:hello@dreamandscale.com">
                    Start Here
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section course-outcomes" id="outcomes">
          <div className="container outcome-grid">
            <div className="outcome-copy">
              <p className="eyebrow dark">Outcomes</p>
              <h2>What the full program helps you build</h2>
              <p>
                You leave with a sharper lens for judging ideas, reading market reality, shaping
                products, understanding money, and making decisions like someone responsible for the
                whole business.
              </p>
            </div>
            <div className="course-checklist">
              <span>Opportunity evaluation</span>
              <span>Customer and market clarity</span>
              <span>Business model thinking</span>
              <span>Structure and finance confidence</span>
              <span>Growth and exit perspective</span>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

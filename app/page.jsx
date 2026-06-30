"use client";

import { useEffect, useState } from "react";

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
          <span className="wordmark small" aria-hidden="true">
            <span className="wordmark-dream">Dream</span>
            <span className="wordmark-and">And</span>
            <span className="wordmark-scale">Scale</span>
          </span>
          <span className="brand-byline">By Entremento</span>
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
          <a href="#program" onClick={closeNav}>
            Full Program
          </a>
          <a href="#pillars" onClick={closeNav}>
            Pillars
          </a>
          <a href="#outcomes" onClick={closeNav}>
            Outcomes
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
            <p className="eyebrow">EntreMento flagship program</p>
            <h1 id="hero-title">
              Understand How Businesses Actually Work — Before You Bet Everything On One
            </h1>
            <p className="hero-lede">
              DreamAndScale is EntreMento&apos;s flagship program. It teaches you to think like a
              founder — across idea, market, customer, product, structure, finance, growth, and exit
              — so you can evaluate opportunities, build with clarity, and make decisions like
              someone who&apos;s actually done this before. No idea required to start.
            </p>
            <div className="hero-actions" aria-label="Primary actions">
              <a className="btn btn-primary" href="#clarity">
                Book the ₹199 Clarity Session
              </a>
              <a className="btn btn-secondary" href="#program">
                Explore the Full Program
              </a>
            </div>
          </div>

          <div className="hero-dock container" aria-label="Program scope">
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
        </section>

        <section className="section problem-section" id="problem">
          <div className="container split-layout">
            <div className="section-kicker">
              <p className="eyebrow dark">The problem</p>
              <h2>Most People Risk Everything On Instinct</h2>
            </div>
            <div className="large-copy">
              <p>
                They quit a stable job, sink savings into a product, or chase an idea for years —
                without ever learning how opportunities are actually evaluated, how businesses make
                money, or how risk is managed. Not because they lack ambition. Because no one taught
                them the system. DreamAndScale exists to close that gap before it costs you something
                real.
              </p>
            </div>
          </div>
        </section>

        <section className="section start-section" id="clarity">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow dark">Two ways in</p>
              <h2>Start Where You Are</h2>
            </div>

            <div className="entry-grid">
              <article className="entry-card">
                <div className="card-topline">
                  <span>Card 1</span>
                  <strong>Clarity Session</strong>
                </div>
                <h3>3 hours. Live. ₹199.</h3>
                <p>
                  A focused, real introduction to founder-level thinking — opportunity evaluation,
                  risk reading, and how to size up your own situation honestly. Built for anyone who
                  wants a real taste before going deeper.
                </p>
                <a className="text-link" href="#contact">
                  Book the Session
                </a>
              </article>

              <article className="entry-card accent" id="program">
                <div className="card-topline">
                  <span>Card 2</span>
                  <strong>The Full Program</strong>
                </div>
                <h3>Self-paced lessons + live mentor access.</h3>
                <p>
                  The complete journey from idea to exit, applied to your own situation as you go.
                  For people ready to build real founder-level clarity, not just sample it.
                </p>
                <a className="text-link" href="#pillars">
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
                Founders don&apos;t think in isolated topics — they think in systems. DreamAndScale
                teaches the entire arc as one connected journey.
              </p>
            </div>

            <div className="pillar-list">
              <article>
                <span>01</span>
                <div>
                  <h3>
                    Founder Lens <small>(Idea)</small>
                  </h3>
                  <p>
                    How founders actually spot, test, and judge opportunities — the thinking pattern
                    itself, whether or not you have an idea yet.
                  </p>
                </div>
              </article>
              <article>
                <span>02</span>
                <div>
                  <h3>
                    Market & Customer Reality <small>(Market + Customer)</small>
                  </h3>
                  <p>
                    Who actually has this problem, how big that group really is, and whether
                    they&apos;ll pay — validated before you build anything.
                  </p>
                </div>
              </article>
              <article>
                <span>03</span>
                <div>
                  <h3>
                    Product & Business Model <small>(Product)</small>
                  </h3>
                  <p>
                    Turning a validated problem into something sellable, and the model that makes it
                    a real business, not just a project.
                  </p>
                </div>
              </article>
              <article>
                <span>04</span>
                <div>
                  <h3>
                    Company Systems & Finance <small>(Structure + Finance)</small>
                  </h3>
                  <p>
                    The infrastructure of running a real company — legal structure, ownership,
                    equity, unit economics, runway — usually the least taught, most feared part.
                  </p>
                </div>
              </article>
              <article>
                <span>05</span>
                <div>
                  <h3>
                    Growth & Exit <small>(Growth + Exit)</small>
                  </h3>
                  <p>
                    How businesses scale, and how founders eventually realize the value they built —
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
              <h2>Built For People Thinking Beyond Employment</h2>
            </div>
            <div className="audience-panel">
              <p>
                Professionals exploring the founder path. Freelancers ready to build systems instead
                of selling time. Builders who want to turn skills into products. Students who want
                real-world clarity before they commit to a direction. You don&apos;t need a finished
                idea — you need the willingness to think clearly about one.
              </p>
            </div>
          </div>
        </section>

        <section className="section outcome-section" id="outcomes">
          <div className="container outcome-grid">
            <div className="outcome-copy">
              <p className="eyebrow dark">Outcome</p>
              <h2>What You Leave With</h2>
              <p>
                Not just frameworks. Not just theory. You leave understanding how a business actually
                works end to end, with a working plan if you have an idea worth pursuing — and the
                founder-level judgment to evaluate the next opportunity that comes your way, on your
                own.
              </p>
            </div>
            <div className="outcome-map" aria-label="DreamAndScale outcome map">
              <span>Judge Risk</span>
              <span>Read Markets</span>
              <span>Shape Products</span>
              <span>Model Money</span>
              <span>Plan Growth</span>
              <strong>Founder-Level Clarity</strong>
            </div>
          </div>
        </section>

        <section className="section bridge-section" id="entremento">
          <div className="container bridge-content">
            <p className="eyebrow">EntreMento ecosystem</p>
            <h2>DreamAndScale Is Where The Ecosystem Starts</h2>
            <p>
              DreamAndScale is EntreMento&apos;s flagship program — but it&apos;s not the only one.
              As EntreMento grows, more programs will extend this same thinking into new domains like
              AI and technology for founders.
            </p>
            <a className="btn btn-primary" href="#contact">
              Explore EntreMento
            </a>
          </div>
        </section>
      </main>

      <footer className="footer-strip" id="contact">
        <div className="footer-grid-cap" aria-hidden="true"></div>
        <div className="container footer-grid">
          <p>
            <span className="footer-wordmark" aria-label="DreamAndScale">
              <span>Dream</span>
              <span>And</span>
              <span>Scale</span>
            </span>
            is EntreMento&apos;s flagship program
          </p>
          <nav aria-label="Footer navigation">
            <a href="#clarity">Clarity Session</a>
            <a href="#program">Full Program</a>
            <a href="#entremento">About</a>
            <a href="mailto:hello@entremento.com">Contact</a>
          </nav>
        </div>
      </footer>
    </>
  );
}

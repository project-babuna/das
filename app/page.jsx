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

const masterclasses = [
  {
    title: "Business Clarity Masterclass",
    date: "5 July 2026",
    day: "Sunday",
    time: "02:00 pm IST",
    duration: "3 Hrs",
    seats: "138 seats left",
    price: "199",
    compareAt: "1,299",
    cta: "Register Now",
    featured: true,
    imageClass: "clarity",
  },
  {
    title: "12-Week Business Masterclass",
    date: "12 July 2026",
    day: "Sunday",
    time: "02:00 pm IST",
    duration: "2 Hrs",
    seats: "200 seats left",
    price: "2,499",
    cta: "Register Now",
    imageClass: "business",
  },
  {
    title: "1:1- Mentoring 18-week Business Masterclass",
    date: "19 July 2026",
    day: "Sunday",
    time: "02:00 pm IST",
    duration: "3 Hrs",
    seats: "286 seats left",
    price: "5,499",
    compareAt: "3,999",
    cta: "Register Now",
    featured: true,
    imageClass: "mentoring",
  },
];

const faqItems = [
  {
    question: "Do I need a business idea before joining?",
    answer:
      "No. DreamAndScale is built to help you think clearly before you commit to an idea. If you already have one, you will evaluate it. If you do not, you will learn how founders spot and judge opportunities.",
  },
  {
    question: "What is the ₹199 Clarity Session for?",
    answer:
      "It is a focused 3-hour live introduction to founder-level thinking. You get a practical taste of opportunity evaluation, risk reading, and how to size up your current situation honestly before choosing a deeper path.",
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
      "The program teaches frameworks, but the goal is judgment. You connect idea, market, customer, product, structure, finance, growth, and exit into one working business lens.",
  },
  {
    question: "What will I have by the end?",
    answer:
      "You leave with founder-level clarity about how a business works end to end, plus a working plan if your idea is worth pursuing and the ability to evaluate future opportunities with more confidence.",
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
              <a className="btn btn-secondary" href="/course">
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

        <section className="trusted-section" aria-label="Trusted by learners worldwide">
          <div className="container trusted-grid">
            <p>Empowering <strong>10M+</strong> Learners</p>
            <p>Across <strong>32+</strong> Countries</p>
            <p>Rated <strong>4.6/5</strong> Stars</p>
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
              <p className="eyebrow dark">#1 Flagship program</p>
              <h2>Our Masterclass</h2>
            </div>

            <div className="entry-grid">
              {masterclasses.map((masterclass) => (
                <article
                  className={masterclass.featured ? "entry-card featured" : "entry-card"}
                  id={masterclass.title.includes("12-Week") ? "program" : undefined}
                  key={masterclass.title}
                >
                  <div className={`entry-card-image ${masterclass.imageClass}`} aria-hidden="true"></div>
                  <div className="entry-card-body">
                    <h3>{masterclass.title}</h3>
                    <div className="entry-meta">
                      <span className="detail-icon detail-icon-calendar" aria-hidden="true"></span>
                      <span>{masterclass.date}</span>
                      <span className="meta-dot" aria-hidden="true"></span>
                      <span>{masterclass.day}</span>
                    </div>
                    <div className="entry-meta">
                      <span className="detail-icon detail-icon-clock" aria-hidden="true"></span>
                      <span>{masterclass.time}</span>
                      <span className="meta-dot" aria-hidden="true"></span>
                      <span>{masterclass.duration}</span>
                    </div>
                    <div className="entry-seat-row">
                      <div className="entry-seat-copy">
                        <span className="detail-icon detail-icon-seat" aria-hidden="true"></span>
                        <span>{masterclass.seats}</span>
                      </div>
                      <span className="seat-meter" aria-hidden="true"></span>
                    </div>
                    <div className="entry-price-row">
                      <div>
                        <strong className="entry-price">&#8377;{masterclass.price}</strong>
                        {masterclass.compareAt ? (
                          <span className="entry-compare">&#8377;{masterclass.compareAt}</span>
                        ) : null}
                      </div>
                      {masterclass.compareAt ? <span className="entry-badge">Early Bird</span> : null}
                    </div>
                    <a className="entry-register" href="/course">
                      {masterclass.cta} &rarr;
                    </a>
                  </div>
                </article>
              ))}
              <div hidden>
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

              <article className="entry-card">
                <div className="card-topline">
                  <span>Card 2</span>
                  <strong>The Full Program</strong>
                </div>
                <h3>Self-paced lessons. ₹9,999.</h3>
                <p>
                  The complete DreamAndScale curriculum from idea to exit, designed for people who
                  want to study deeply at their own pace and build founder-level clarity without live
                  mentor access.
                </p>
                <a className="text-link" href="/course">
                  Explore the Program
                </a>
              </article>

              <article className="entry-card accent">
                <div className="card-topline">
                  <span>Card 3</span>
                  <strong>Full Program + Mentor Access</strong>
                </div>
                <h3>Self-paced lessons + live mentor access. ₹49,990.</h3>
                <p>
                  The complete journey from idea to exit, applied to your own situation as you go.
                  For people ready to build real founder-level clarity with live guidance and review.
                </p>
                <a className="text-link" href="/course">
                  Explore the Program
                </a>
              </article>
            </div>
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

        <section className="section stages-section" id="stages">
          <div className="container stages-content">
            <div className="section-heading">
              <p className="eyebrow">Business for all stages</p>
              <h2>This MasterClass is for you if...</h2>
            </div>

            <div className="stages-timeline">
              <svg className="brush-stroke" viewBox="0 0 1000 400" preserveAspectRatio="none" aria-hidden="true">
                <path d="M 0 350 Q 250 320 500 200 T 1000 50" fill="none" stroke="url(#brushGradient)" strokeWidth="8" strokeLinecap="round" opacity="0.8" />
                <defs>
                  <linearGradient id="brushGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(179, 154, 50, 0.3)" />
                    <stop offset="50%" stopColor="rgba(179, 154, 50, 0.7)" />
                    <stop offset="100%" stopColor="rgba(179, 154, 50, 0.3)" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="stage-item">
                <div className="stage-marker">
                  <span className="stage-years">1-3yrs</span>
                  <span className="stage-label">In Graduation</span>
                </div>
                <p className="stage-description">
                  You're beginning your professional journey and want to build your own venture while exploring your potential.
                </p>
              </div>

              <div className="stage-item">
                <div className="stage-marker">
                  <span className="stage-years">3–5 Yrs</span>
                  <span className="stage-label">In Professional Role</span>
                </div>
                <p className="stage-description">
                  You're excelling at your job and considering the transition into the startup and business world.
                </p>
              </div>

              <div className="stage-item">
                <div className="stage-marker">
                  <span className="stage-years">10+ Yrs</span>
                  <span className="stage-label">Of Experience</span>
                </div>
                <p className="stage-description">
                  You've built substantial expertise and are ready to pivot into entrepreneurship and create your own legacy.
                </p>
              </div>
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
              <span>Judging Risk</span>
              <span>Read Markets</span>
              <span>Shape Products</span>
              <span>Model Money</span>
              <span>Plan Growth</span>
              <strong>Founder-Level Clarity</strong>
            </div>
          </div>
        </section>

        <section className="section entrepreneurship-section" aria-label="Entrepreneurship global impact">
          <div className="section-heading">
            <h2>Future of Entrepreneurship</h2>
          </div>

          <div className="container entrepreneurship-panel">
            <div className="impact-card-grid">
              <article className="impact-card">
                <strong>$330 Billion</strong>
                <p>raised by startups globally in 2023, marking a record high for venture funding.</p>
                <cite>Source: PitchBook</cite>
              </article>

              <article className="impact-card">
                <strong>600 Million</strong>
                <p>
                  entrepreneurs worldwide, representing nearly 8% of the global adult population.
                </p>
                <cite>Source: Global Entrepreneurship Monitor</cite>
              </article>
            </div>

            <figure className="impact-quote-card">
              <span className="quote-mark" aria-hidden="true">
                “
              </span>
              <blockquote>
                "The biggest risk is not taking any risk.In a world that is changing really quickly, the only strategy that is guaranteed to fail is not taking risks."
              </blockquote>
              <figcaption>
                <span className="quote-avatar" aria-hidden="true">MZ</span>
                <span>
                  <strong>Mark Zukerberg </strong>, Co-Founder and CEO of Meta Platforms.
                </span>
              </figcaption>
            </figure>
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
            <BrandLogo tone="dark" compact />
            <span className="footer-brand-copy">is EntreMento&apos;s flagship program</span>
          </p>
          <nav aria-label="Footer navigation">
            <a href="#clarity">Clarity Session</a>
            <a href="/course">Full Program</a>
            <a href="#entremento">About</a>
            <a href="mailto:hello@entremento.com">Contact</a>
          </nav>
        </div>
      </footer>
    </>
  );
}

import SiteFrame from "./SiteFrame";

const registerHref = "/register";
const minimalNavItems = [{ href: "/", label: "Home" }];

const journeyStages = [
  {
    title: "Idea",
    body: "Test an opportunity before committing money or emotion.",
  },
  {
    title: "Market",
    body: "Check whether the problem is large and reachable enough.",
  },
  {
    title: "Customer",
    body: "Know who feels the pain most and why they would pay.",
  },
  {
    title: "Product",
    body: "Turn a validated pain into an offer people want.",
  },
  {
    title: "Structure",
    body: "Decide when registration, roles, and equity matter.",
  },
  {
    title: "Finance",
    body: "See revenue, costs, profit, and cash flow clearly.",
  },
  {
    title: "Growth",
    body: "Know what must repeat before marketing or hiring scales.",
  },
  {
    title: "Ownership",
    body: "Understand control, partners, investors, and reversibility.",
  },
];

const leaveWithItems = [
  "Know what to do first, and what can wait",
  "Test your idea honestly instead of guessing",
  "Connect customer, product, structure, finance, and growth",
  "Avoid premature expenses and decisions",
  "Ask sharper questions to co-founders, CAs, investors, or mentors",
  "Know what to learn or build next",
];

const problemQuestions = [
  "Validate customers or build the product first?",
  "Register the company now or later?",
  "Take on a co-founder — and if so, how do you split equity?",
  "Bring in a CA, and when?",
  "Raise funding, or bootstrap?",
  "Quit your job, or wait?",
];

const sessionParts = [
  {
    title: "Part 1: Opportunity, Market, Customer",
    body: "How to examine an idea, read the market, and understand the people who may pay.",
  },
  {
    title: "Part 2: Product, Model, Foundation",
    body: "How an opportunity becomes an offer, earns money, and needs structure or support.",
  },
  {
    title: "Part 3: Growth, Funding, Ownership",
    body: "What makes growth possible, when funding matters, and how control changes over time.",
  },
];

const audienceItems = [
  "Have an idea but no starting point",
  "Are unsure whether the idea is worth pursuing",
  "Are employed and weighing the leap",
  "Are a freelancer building beyond client work",
  "Are a student who wants practical exposure",
  "Are already building but missing the bigger picture",
];

const notSuitableItems = [
  "A guaranteed idea",
  "A get-rich-quick formula",
  "Guaranteed funding or customers",
  "Personalised legal, tax, or investment advice",
  "A ready-made business plan",
];

const frameworkItems = [
  "Opportunity Thinking",
  "Market and Customer Understanding",
  "Business Design",
  "Business Foundation",
  "Growth and Ownership",
];

const sessionDetails = [
  ["Format", "3 Hours · Live · Hinglish · Beginner Friendly"],
  ["Next batch", "26 July 2026 · 10:30 AM IST"],
];

const heroBridgeItems = [
  ["For", "First-time founders and early builders"],
  ["You get", "A clear sequence for your next move"],
  ["No need for", "A registered company or finished idea"],
];

const clarityFaqItems = [
  {
    question: "I don't have a business idea yet. Can I still join?",
    answer:
      "Yes. Understanding the map often comes before the idea. Many participants find their direction gets clearer once they see the full picture.",
  },
  {
    question: "I already have an idea. Will this still help me?",
    answer:
      "Especially then. You'll place your idea inside the map and see what needs validating, what needs building, and what can wait.",
  },
  {
    question: "Will all my doubts be cleared in 3 hours?",
    answer:
      "You will get a clear map and the right sequence to think in, not a complete answer to every personal question. Most participants leave knowing what to tackle next.",
  },
  {
    question: "Is this a full course?",
    answer:
      "No. It's a focused 3-hour live session for quick direction. It is a starting point, not a replacement for deeper learning.",
  },
  {
    question: "I'm not comfortable with English. Will I follow the session?",
    answer:
      "Yes. The session is conducted in Hinglish, and is designed to be beginner-friendly — no prior business background needed.",
  },
  {
    question: "Will I get a recording if I miss the live session?",
    answer: "Yes. You get the session recording after the live session.",
  },
  {
    question: "What if I want a refund?",
    answer:
      "No refunds are offered for this session because it is a low-priced live session. Please register only if you are comfortable with the date, time, and format.",
  },
  {
    question: "Do I need a registered company or business background to join?",
    answer:
      "No. This session is built for people at the very beginning — whether you have an idea, a half-formed idea, or no idea yet.",
  },
  {
    question: "What happens after the session?",
    answer:
      "You'll leave with a clear next step. If you want deeper work on validation, structure, funding, or growth, the full programs continue from there.",
  },
  {
    question: "Is ₹199 the final price, or are there hidden costs?",
    answer: "₹199 is the full price for the 3-hour live session. No hidden costs.",
  },
];

export default function ClaritySessionAdPage() {
  return (
    <SiteFrame ctaHref={registerHref} ctaLabel="Book ₹199 Session" navItems={minimalNavItems}>
      <main className="clarity-ad-page">
        <section className="content-hero program-hero program-hero-clarity">
          <div className="container content-hero-grid">
            <div>
              <p className="eyebrow">DreamAndScale Business Clarity Session</p>
              <p className="offer-badge-eyebrow">3 Hours · Live Online · Hinglish · Beginner Friendly</p>
              <h1>Before You Build a Business, Understand How Business Actually Works</h1>
              <p>
                In one live session, see how idea, market, customer, product, structure, finance,
                growth, and ownership fit together — so your next move is based on clarity, not
                guesswork.
              </p>
            </div>

            <aside className="content-price-card clarity-hero-price-card" aria-label="Clarity Session summary">
              <span>Business Clarity Session</span>
              <div className="price-display">
                <strong>₹199</strong>
              </div>
              <p>3 Hours • Live Online • Hinglish • Beginner Friendly</p>
              <div className="clarity-hero-session-meta">
                <div>
                  <span>Date</span>
                  <strong>26 July 2026</strong>
                </div>
                <div>
                  <span>Time</span>
                  <strong>10:30 AM IST</strong>
                </div>
              </div>
              <a
                className="btn btn-primary"
                href={registerHref}
                data-meta-event="InitiateCheckout"
                data-meta-content-name="Clarity Session"
                data-meta-content-category="Program Conversion"
                data-meta-value="199"
                data-meta-currency="INR"
              >
                Reserve Your Seat — ₹199
              </a>
            </aside>
          </div>
        </section>

        <section className="clarity-ad-bridge" aria-label="Clarity session highlights">
          <div className="container clarity-ad-bridge-card">
            <p>One focused session to see the full business-building map before you make expensive decisions.</p>
            <div className="clarity-ad-bridge-grid">
              {heroBridgeItems.map(([label, value]) => (
                <div key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section clarity-ad-confusion">
          <div className="container clarity-ad-problem-panel">
            <div className="clarity-ad-problem-head">
              <h2>The Confusion Isn&apos;t Random. It&apos;s Structural.</h2>
              <p>
                Ambition is rarely the gap. Sequence is. Product before customer proof, company
                before model, co-founder before roles — each isolated decision creates risk.
              </p>
            </div>

            <div className="clarity-ad-problem-body">
              <div className="clarity-ad-problem-question-card">
                <span>Questions founders carry</span>
                <ul className="clarity-ad-problem-points">
                  {problemQuestions.map((question) => (
                    <li key={question}>{question}</li>
                  ))}
                </ul>
              </div>

              <div className="clarity-ad-problem-story">
                <article>
                  <p>
                    Most people learn these questions one blog, webinar, or opinion at a time. But
                    they don&apos;t stand alone.
                  </p>
                </article>
                <article>
                  <p>
                    Customer shapes product. Product shapes model. Model shapes structure, money,
                    funding, and ownership. Wrong sequence makes later fixes expensive.
                  </p>
                </article>
                <article>
                  <p>
                    This session helps you see the sequence before you spend.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="section clarity-ad-system">
          <div className="container clarity-ad-system-card">
            <div>
              <h2>A clear business-building map, from idea to ownership</h2>
              <div className="clarity-ad-journey-flow" aria-label="Idea to ownership business journey">
                {journeyStages.map((stage) => (
                  <div className="clarity-ad-flow-step" key={stage.title}>
                    <strong>{stage.title}</strong>
                  </div>
                ))}
              </div>
            </div>
            <div className="clarity-ad-map-table" id="session-map">
              <div className="clarity-ad-map-header">
                <span>Stage</span>
                <span>You&apos;ll Understand</span>
              </div>
              <div className="clarity-ad-map-rows">
                {journeyStages.map((stage) => (
                  <article key={stage.title}>
                    <div>
                      <h3>{stage.title}</h3>
                    </div>
                    <p>{stage.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section clarity-ad-leave">
          <div className="container clarity-ad-leave-panel">
            <div className="clarity-ad-leave-copy">
              <h2>WHAT CHANGES FOR YOU AFTER THIS SESSION</h2>
              <p>
                You won&apos;t get ready-made answers. You&apos;ll know which decisions matter, and in what
                order.
              </p>
              <div className="clarity-ad-leave-shift" aria-label="Session outcome">
                <span>Before</span>
                <strong>Questions feel scattered</strong>
                <span>After</span>
                <strong>Decisions follow a clear sequence</strong>
              </div>
            </div>
            <div className="clarity-ad-leave-actions">
              <ul className="clarity-ad-check-list">
                {leaveWithItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a
                className="btn btn-primary"
                href={registerHref}
                data-meta-event="InitiateCheckout"
                data-meta-content-name="Clarity Session"
                data-meta-content-category="Program Conversion"
                data-meta-value="199"
                data-meta-currency="INR"
              >
                Reserve Your Seat — ₹199
              </a>
              <p className="clarity-ad-leave-note">
                Best before spending serious time, money, or career energy on an idea.
              </p>
            </div>
          </div>
        </section>

        <section className="section clarity-ad-structure">
          <div className="container">
            <div className="clarity-ad-centered-heading">
              <h2>How the 3-Hour Session Is Structured</h2>
              <p>
                Practical examples show how each stage affects the next.
              </p>
            </div>
            <div className="clarity-ad-session-grid">
              {sessionParts.map((part) => (
                <article key={part.title}>
                  <h3>{part.title}</h3>
                  <p>{part.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section clarity-ad-audience">
          <div className="container clarity-ad-audience-panel">
            <div className="clarity-ad-audience-head">
              <h2>IS THIS SESSION FOR YOU?</h2>
              <p>No registered company, business degree, or finished idea required.</p>
            </div>
            <div className="clarity-ad-audience-grid">
              <div className="clarity-ad-fit-card clarity-ad-fit-yes">
                <p><strong>Yes, if you:</strong></p>
                <div className="clarity-ad-tag-list">
                  {audienceItems.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
              <div className="clarity-ad-fit-card clarity-ad-fit-no">
                <p><strong>Not for you if you&apos;re looking for:</strong></p>
                <ul className="clarity-ad-compact-list">
                  {notSuitableItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section clarity-ad-why">
          <div className="container clarity-ad-why-card clarity-ad-why-split">
            <div>
              <h2>THIS ISN&apos;T ANOTHER MOTIVATIONAL WEBINAR</h2>
              <p>
                Plenty of sessions teach one slice — marketing, funding, registration, leadership.
              </p>
            </div>
            <div className="clarity-ad-contrast-list">
              <p>
                A founder can know marketing and still choose the wrong market. Build a strong
                product and still miss the customer problem. Register early and still have no model.
                Raise money and lose control through a careless ownership decision.
              </p>
              <strong>
                This session shows the whole picture first, so every skill you learn later has a
                place.
              </strong>
            </div>
          </div>
        </section>

        <section className="section clarity-ad-about">
          <div className="container clarity-ad-about-card">
            <div>
              <h2>ABOUT DREAMANDSCALE</h2>
              <p>
                DreamAndScale is a business clarity and founder-readiness platform. The goal is not
                to push you into entrepreneurship. It is to help you make sharper career, money, and
                ownership decisions before taking unnecessary risk.
              </p>
            </div>
            <div className="clarity-ad-framework-list" aria-label="DreamAndScale learning framework">
              {frameworkItems.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="section faq-section clarity-ad-faq" id="faq">
          <div className="container faq-layout">
            <div className="section-kicker">
              <h2>Frequently Asked Questions</h2>
              <p>
                Quick answers about fit, format, recording, refund, and next steps.
              </p>
            </div>
            <div className="faq-list">
              {clarityFaqItems.map((item) => (
                <details className="faq-item" key={item.question}>
                  <summary>
                    <span>{item.question}</span>
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section clarity-ad-final">
          <div className="container clarity-ad-final-card clarity-ad-final-offer">
            <div>
              <p className="clarity-section-label">FINAL CTA</p>
              <h2>Start With Clarity. Build With Confidence.</h2>
              <p>Business Clarity Session — ₹199</p>
              <p className="clarity-ad-next-step-copy">
                This is the starting point. After the session, you&apos;ll know what to clarify next and
                how deeply you want to build from there.
              </p>
              <div className="clarity-ad-summary-grid">
                {sessionDetails.map(([label, value]) => (
                  <div key={label}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
            </div>
            <div className="clarity-ad-price-box">
              <span>Price</span>
              <strong>₹199</strong>
              <a
                className="btn btn-primary"
                href={registerHref}
                data-meta-event="InitiateCheckout"
                data-meta-content-name="Clarity Session"
                data-meta-content-category="Program Conversion"
                data-meta-value="199"
                data-meta-currency="INR"
              >
                Book My Seat for ₹199
              </a>
              <p>Your registration is confirmed after successful payment.</p>
            </div>
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}

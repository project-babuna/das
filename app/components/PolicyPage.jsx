import BrandLogo from "./BrandLogo";

export default function PolicyPage({ page }) {
  return (
    <>
      <header className="site-header course-header">
        <a className="brand" href="/" aria-label="DreamAndScale home">
          <BrandLogo tone="light" />
        </a>

        <nav className="site-nav policy-nav" aria-label="Policy navigation">
          <a href="/clarity-session">Clarity Session</a>
          <a href="/full-program">Full Program</a>
          <a href="/blog">Insights</a>
          <a href="/#faq">FAQ</a>
        </nav>

        <a className="header-cta" href="/clarity-session">
          Book ₹199 Session
        </a>
      </header>

      <main className="policy-page">
        <section className="policy-hero">
          <div className="container policy-hero-inner">
            <p className="policy-updated">{page.updated}</p>
            <h1>{page.title}</h1>
            <p>{page.intro}</p>
          </div>
        </section>

        <section className="section policy-section">
          <div className="container policy-card">
            {page.sections.map((section) => (
              <article className="policy-block" key={section.heading}>
                <h2>{section.heading}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </article>
            ))}
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
            <a href="/clarity-session">Clarity Session</a>
            <a href="/full-program">Full Program</a>
            <a href="/blog">Insights</a>
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-and-conditions">Terms &amp; Conditions</a>
            <a href="/refund-policy">Refund Policy</a>
            <a href="mailto:hello@dreamandscale.com">Contact</a>
          </nav>
        </div>
      </footer>
    </>
  );
}

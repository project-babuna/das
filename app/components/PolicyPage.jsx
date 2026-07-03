import BrandLogo from "./BrandLogo";
import SiteFooter from "./SiteFooter";

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

        <a
          className="header-cta"
          href="/clarity-session"
          data-meta-event="ViewContent"
          data-meta-content-name="Clarity Session"
          data-meta-content-category="Header CTA"
        >
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

      <SiteFooter />
    </>
  );
}

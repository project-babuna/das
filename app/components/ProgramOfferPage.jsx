import SiteFrame from "./SiteFrame";

export default function ProgramOfferPage({ page }) {
  const priceValue = Number(page.price.replace(/[^\d]/g, ""));
  const primaryMetaEvent = "InitiateCheckout";

  return (
    <SiteFrame ctaHref={page.primaryHref} ctaLabel={page.primaryCta}>
      <main>
        <section className="content-hero">
          <div className="container content-hero-grid">
            <div>
              <p className="eyebrow">{page.eyebrow}</p>
              {page.badge ? <p className="offer-badge-eyebrow">{page.badge}</p> : null}
              <h1>{page.title}</h1>
              <h2>{page.subtitle}</h2>
              <p>{page.description}</p>
              <div className="hero-actions">
                <a
                  className="btn btn-primary"
                  href={page.primaryHref}
                  data-meta-event={primaryMetaEvent}
                  data-meta-content-name={page.title}
                  data-meta-content-category="Program Conversion"
                  data-meta-value={priceValue}
                  data-meta-currency="INR"
                >
                  {page.primaryCta}
                </a>
                <a
                  className="btn btn-secondary"
                  href={page.secondaryHref}
                  data-meta-event="ViewContent"
                  data-meta-content-name={page.secondaryCta}
                  data-meta-content-category="Program Offer"
                >
                  {page.secondaryCta}
                </a>
              </div>
            </div>

            <aside className="content-price-card" aria-label={`${page.title} summary`}>
              <span>{page.meta}</span>
              <div className="price-display">
                {page.originalPrice ? <s>{page.originalPrice}</s> : null}
                <strong>{page.price}</strong>
              </div>
              <p>{page.subtitle}</p>
            </aside>
          </div>
        </section>

        <section className="section content-section">
          <div className="container content-two-column">
            <div className="section-kicker">
              <p className="eyebrow dark">What you get</p>
              <h2>A clearer way to decide your next step.</h2>
            </div>
            <div className="content-card-grid">
              {page.highlights.map((highlight) => (
                <article className="content-mini-card" key={highlight}>
                  <p>{highlight}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section content-section alt">
          <div className="container content-stack">
            {page.sections.map((section) => (
              <article className="content-feature" key={section.title}>
                <h2>{section.title}</h2>
                <p>{section.body}</p>
              </article>
            ))}
            {page.clarityCta ? (
              <article className="content-feature clarity-session-callout">
                <div>
                  <span className="clarity-session-price">
                    {page.clarityOriginalPrice ? <s>{page.clarityOriginalPrice}</s> : null}
                    <strong>₹199 Clarity Session</strong>
                  </span>
                  <h2>{page.clarityTitle}</h2>
                </div>
                <div>
                  <p>{page.clarityText}</p>
                  <a
                    className="btn btn-primary"
                    href={page.clarityHref}
                    data-meta-event="InitiateCheckout"
                    data-meta-content-name={page.clarityCta}
                    data-meta-content-category="Clarity Session"
                    data-meta-value="199"
                    data-meta-currency="INR"
                  >
                    {page.clarityCta}
                  </a>
                </div>
              </article>
            ) : null}
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}

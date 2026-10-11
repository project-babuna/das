import SiteFrame from "./SiteFrame";

export default function PolicyPage({ page }) {
  return (
    <SiteFrame>
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

    </SiteFrame>
  );
}

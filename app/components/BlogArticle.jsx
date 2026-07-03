import SiteFrame from "./SiteFrame";

export default function BlogArticle({ post }) {
  return (
    <SiteFrame>
      <main>
        <article>
          <section className="content-hero article-hero">
            <div className="container article-hero-inner">
              <p className="eyebrow">Business clarity insight</p>
              <h1>{post.title}</h1>
              <p>{post.intro}</p>
            </div>
          </section>

          <section className="section article-section">
            <div className="container article-body">
              {post.sections.map((section) => (
                <section key={section.heading}>
                  <h2>{section.heading}</h2>
                  <p>{section.body}</p>
                </section>
              ))}

              <div className="article-cta">
                <h2>Build business clarity before you build a business.</h2>
                <p>
                  DreamAndScale helps you connect ideas, customers, markets, products, finance,
                  growth, and ownership into one practical decision system.
                </p>
                <a className="btn btn-primary" href="/full-program">
                  Explore DreamAndScale
                </a>
              </div>
            </div>
          </section>
        </article>
      </main>
    </SiteFrame>
  );
}

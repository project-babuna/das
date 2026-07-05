import SiteFrame from "./SiteFrame";
import BrandLogo from "./BrandLogo";

export default function BlogIndex({ posts }) {
  return (
    <SiteFrame>
      <main>
        <section className="content-hero blog-hero">
          <div className="container content-hero-grid">
            <div>
              <p className="eyebrow">Insights</p>
              <h1>Business Clarity Insights</h1>
              <p>
                Practical essays for aspiring founders, students, freelancers, and professionals who
                want to understand business decisions before taking bigger risks.
              </p>
            </div>
            <aside className="insights-hero-card" aria-label="DreamAndScale insights">
              <BrandLogo tone="light" compact />
              <div>
                <span>DreamAndScale Insights</span>
                <strong>Think Clearly Before You Build</strong>
                <p>Essays on ideas, customers, markets, risk, and business systems.</p>
              </div>
              <small>Business clarity for better decisions</small>
            </aside>
          </div>
        </section>

        <section className="section content-section">
          <div className="container blog-grid">
            {posts.map((post) => (
              <article className="blog-card" key={post.slug}>
                <span>Business clarity</span>
                <h2>{post.title}</h2>
                <p>{post.description}</p>
                <a className="text-link" href={`/blog/${post.slug}`}>
                  Read Insight
                </a>
              </article>
            ))}
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}

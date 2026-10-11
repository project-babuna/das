import SiteFrame from "./SiteFrame";
import Link from "next/link";
import { blogPosts } from "../blogContent";
import styles from "./BlogArticle.module.css";

const images = {
  "how-to-validate-a-business-idea": "build",
  "business-vs-self-employment": "guide",
  "how-to-know-if-a-market-is-big-enough": "scale",
  "how-to-understand-customers-before-building-a-product": "learn",
  "should-you-start-a-business-or-keep-your-job": "clarity",
};

export default function BlogArticle({ post }) {
  const readingMinutes = Math.max(1, Math.ceil([post.intro, ...post.sections.map(section => `${section.heading} ${section.body}`)].join(" ").split(/\s+/).length / 200));
  const related = blogPosts.filter(item => item.slug !== post.slug).slice(0, 2);
  return (
    <SiteFrame>
      <main className={styles.page}>
        <article>
          <header className={`container ${styles.hero}`}>
              <Link className={styles.back} href="/blog">← All insights</Link>
              <div className={styles.meta}><span>Business clarity</span><span>{readingMinutes} min read</span></div>
              <h1>{post.title}</h1>
              <p className={styles.intro}>{post.intro}</p>
          </header>
          <div className={`container ${styles.cover}`}><img src={`/assets/lifecycle/${images[post.slug] || "learn"}.jpg`} alt="" width="1200" height="460" /></div>
          <div className={`container ${styles.readingLayout}`}>
            <aside className={styles.sidebar}>
              <nav aria-label="On this page"><p className={styles.label}>On this page</p><ol>{post.sections.map((section, index) => <li key={section.heading}><a href={`#section-${index + 1}`}><span>0{index + 1}</span>{section.heading}</a></li>)}</ol></nav>
            </aside>
            <div className={styles.body}>
              {post.sections.map((section, index) => (
                <section id={`section-${index + 1}`} key={section.heading} className={styles.articleSection}>
                  <span className={styles.sectionNumber}>0{index + 1}</span>
                  <h2>{section.heading}</h2>
                  <p>{section.body}</p>
                </section>
              ))}
              <div className={styles.cta}>
                <p className={styles.label}>Connect the whole business</p>
                <h2>Turn understanding<br /><em>into your next step.</em></h2>
                <p>
                  DreamAndScale helps you connect ideas, customers, markets, products, finance,
                  growth, and ownership into one practical decision system.
                </p>
                <a
                  className={styles.button}
                  href="/full-program"
                  data-meta-event="ViewContent"
                  data-meta-content-name="DreamAndScale Full Program"
                  data-meta-content-category="Blog CTA"
                >
                  Explore Full Program <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>
        </article>
        <section className={`container ${styles.related}`} aria-labelledby="related-title"><div className={styles.relatedHeading}><h2 id="related-title">Keep exploring.</h2><Link href="/blog">View all insights <span aria-hidden="true">↗</span></Link></div><div className={styles.relatedGrid}>{related.map(item => <Link className={styles.relatedCard} href={`/blog/${item.slug}`} key={item.slug}><img src={`/assets/lifecycle/${images[item.slug] || "learn"}.jpg`} alt="" width="240" height="240" loading="lazy" /><div><span className={styles.label}>DreamAndScale Insights</span><h3>{item.title}</h3><span className={styles.readLink}>Read insight <span aria-hidden="true">↗</span></span></div></Link>)}</div></section>
      </main>
    </SiteFrame>
  );
}

import Link from "next/link";
import SiteFrame from "./SiteFrame";
import styles from "./BlogIndex.module.css";

const previews = {
  "business-vs-self-employment": { category: "Business foundations", title: "Business vs self-employment", description: "Understand the difference between earning from your time and building a business that can grow beyond it.", image: "guide" },
  "how-to-know-if-a-market-is-big-enough": { category: "Markets", title: "Is your market big enough?", description: "Look beyond a large market number. Find out who you can reach, what they need, and whether there’s room to grow.", image: "scale" },
  "how-to-understand-customers-before-building-a-product": { category: "Customers", title: "Understand customers before building", description: "Discover what customers actually need before spending time and money on a solution.", image: "learn" },
  "should-you-start-a-business-or-keep-your-job": { category: "Founder decisions", title: "Start a business or keep your job?", description: "Think through your time, savings, and evidence before making a major career decision.", image: "clarity" },
};

function Arrow() {
  return <svg aria-hidden="true" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h15m-6-6 6 6-6 6" /></svg>;
}

export default function BlogIndex({ posts }) {
  const featured = posts.find((post) => post.slug === "how-to-validate-a-business-idea") || posts[0];
  return (
    <SiteFrame>
      <main className={styles.page}>
        <section className={`container ${styles.hero}`} aria-labelledby="insights-title">
          <p className={styles.eyebrow}>DreamAndScale Insights</p>
          <h1 id="insights-title">Better questions.<br /><em>Clearer business decisions.</em></h1>
          <p className={styles.intro}>Practical reads on ideas, customers, markets, and the decisions that turn an opportunity into a business.</p>
        </section>
        {featured && <section className={`container ${styles.featuredSection}`} aria-labelledby="featured-title">
          <article className={styles.featured}>
            <div className={styles.featuredImage}><img src="/assets/lifecycle/build.jpg" alt="Founders working together on a business project" width="900" height="650" /></div>
            <div className={styles.featuredCopy}>
              <p className={styles.eyebrow}>Start here · Idea validation</p>
              <h2 id="featured-title">How to validate a business idea before you build</h2>
              <p>Test the problem, customer, and willingness to pay before investing in a product.</p>
              <Link className={styles.readLink} href={`/blog/${featured.slug}`} aria-label="Read how to validate a business idea before you build">Read insight <Arrow /></Link>
            </div>
          </article>
        </section>}
        <section className={`container ${styles.library}`} aria-labelledby="library-title">
          <div className={styles.sectionHeading}><h2 id="library-title">Explore the insights</h2><p>Find a useful perspective for<br />your next business decision.</p></div>
          <div className={styles.grid}>
            {posts.filter((post) => post !== featured).map((post) => {
              const preview = previews[post.slug] || { category: "Business clarity", title: post.title, description: post.description, image: "learn" };
              return <article className={styles.card} key={post.slug}>
                <div className={styles.cardImage}><img src={`/assets/lifecycle/${preview.image}.jpg`} alt="" width="500" height="600" loading="lazy" /></div>
                <div className={styles.cardCopy}><p className={styles.eyebrow}>{preview.category}</p><h3><Link href={`/blog/${post.slug}`}>{preview.title}</Link></h3><p className={styles.description}>{preview.description}</p><Link className={styles.readLink} href={`/blog/${post.slug}`} aria-label={`Read ${preview.title}`}>Read insight <Arrow /></Link></div>
              </article>;
            })}
          </div>
        </section>
        <section className={`container ${styles.nextStep}`} aria-labelledby="next-step-title"><div className={styles.cta}><div><h2 id="next-step-title">Put your learning<br /><em>into perspective.</em></h2><p>Connect the ideas. Understand the business-building journey and find your next step in the Clarity Session.</p></div><Link href="/clarity-session" className={styles.button}>Explore the Clarity Session <Arrow /></Link></div></section>
      </main>
    </SiteFrame>
  );
}

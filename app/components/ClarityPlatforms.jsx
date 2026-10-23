import styles from "./ClarityPlatforms.module.css";

const platforms = ["Notion", "Shopify", "HubSpot", "EntreMento", "Squarespace"];

export default function ClarityPlatforms() {
  return (
    <section className={styles.section} aria-labelledby="clarity-platforms-heading">
      <div className={`container ${styles.panel}`}>
        <h2 id="clarity-platforms-heading">Firms that will help you build your dreams.</h2>
        <p className={styles.label}>Platforms</p>
        <div className={styles.ticker} aria-label="Platforms: Notion, Shopify, HubSpot, EntreMento, Squarespace">
          <div className={styles.track}>
            {[0, 1].map((copy) => (
              <ul className={styles.platforms} key={copy} aria-hidden={copy === 1}>
                {platforms.map((platform) => <li key={platform}>{platform}</li>)}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

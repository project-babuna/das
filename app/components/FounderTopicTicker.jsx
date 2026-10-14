import styles from "./FounderTopicTicker.module.css";

const founderTopics = [
  "Founder mindset", "Product testing", "Revenue strategy", "Go-to-market",
  "Sales conversations", "Growth experiments", "Informed decisions", "Customer discovery",
  "Problem solving", "Business models", "Pricing strategy", "Financial planning",
  "Market validation", "Building what works",
];

export default function FounderTopicTicker() {
  return <div className={styles.ticker}>
    <ul className={styles.track} aria-label="Founder skills and program topics">
      {[...founderTopics, ...founderTopics].map((topic, index) => <li key={`${topic}-${index}`} aria-hidden={index >= founderTopics.length}>{topic}</li>)}
    </ul>
  </div>;
}

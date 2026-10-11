"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { startupInsights } from "../homeContent";
import styles from "../BrandHome.module.css";

function CarouselArrow({ direction }) {
  const isPrevious = direction === "previous";
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d={isPrevious ? "M19 12H5m6-6-6 6 6 6" : "M5 12h14m-6-6 6 6-6 6"} />
    </svg>
  );
}

export default function StartupInsights() {
  const scrollerRef = useRef(null);
  const [canPrevious, setCanPrevious] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [range, setRange] = useState({ start: 1, end: 3 });

  const updateControls = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const maxScroll = scroller.scrollWidth - scroller.clientWidth;
    setCanPrevious(scroller.scrollLeft > 4);
    setCanNext(scroller.scrollLeft < maxScroll - 4);
    const firstCard = scroller.firstElementChild;
    if (firstCard) {
      const gap = parseFloat(getComputedStyle(scroller).columnGap);
      const step = firstCard.getBoundingClientRect().width + gap;
      const start = Math.round(scroller.scrollLeft / step) + 1;
      const visible = Math.max(1, Math.floor((scroller.clientWidth + gap) / step));
      const end = Math.min(startupInsights.length, start + visible - 1);
      setRange(previous => previous.start === start && previous.end === end ? previous : { start, end });
    }
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;
    updateControls();
    scroller.addEventListener("scroll", updateControls, { passive: true });
    window.addEventListener("resize", updateControls);
    return () => {
      scroller.removeEventListener("scroll", updateControls);
      window.removeEventListener("resize", updateControls);
    };
  }, [updateControls]);

  const move = (direction) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const firstCard = scroller.firstElementChild;
    const step = firstCard.getBoundingClientRect().width + parseFloat(getComputedStyle(scroller).columnGap);
    scroller.scrollBy({ left: direction * step, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };

  return (
    <div className={styles.insightsRight}>
      <div className={styles.insightCards} ref={scrollerRef} id="home-insight-cards" role="region" aria-label="Founder insight articles" tabIndex={0}>
        {startupInsights.map((insight) => (
          <article className={styles.insightCard} key={insight.title}>
            <img src={insight.image} width="1448" height="1086" alt="" loading="lazy" />
            <div className={styles.insightBody}>
              <div className={styles.insightMeta}><span>{insight.eyebrow}</span></div>
              <h3>{insight.title}</h3>
              <p>{insight.description}</p>
              <a href={insight.href} aria-label={`Read: ${insight.title}`}>Read the insight <CarouselArrow direction="next" /></a>
            </div>
          </article>
        ))}
      </div>
      <div className={styles.insightsControls} aria-label="Browse insights">
        <span className={styles.insightsCount}>{range.start === range.end ? range.start : `${range.start}–${range.end}`} of {startupInsights.length} insights</span>
        <button type="button" onClick={() => move(-1)} disabled={!canPrevious} aria-label="Show previous insights" aria-controls="home-insight-cards">
          <CarouselArrow direction="previous" />
        </button>
        <button type="button" onClick={() => move(1)} disabled={!canNext} aria-label="Show more insights" aria-controls="home-insight-cards">
          <CarouselArrow direction="next" />
        </button>
      </div>
    </div>
  );
}

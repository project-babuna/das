"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./TestimonialsSection.module.css";

const testimonials = [
  {
    name: "Aarav Sharma",
    image: "/assets/testimonials/aarav-representative.png",
    role: "Performance Marketer, Delhi",
    quote: "I had several business ideas but struggled to choose one. The session helped me compare them and decide which one to pursue first. I have now started my solo online store.",
  },
  {
    name: "Priya Mehta",
    image: "/assets/testimonials/priya-representative.png",
    role: "HR Professional, Mumbai",
    quote: "I wanted to explore a business alongside my job. The session helped me approach my time and budget more realistically. I am now running my side business alongside my job and looking at the next steps.",
  },
  {
    name: "Rohit Verma",
    image: "/assets/testimonials/rohit-representative.png",
    role: "Early-stage Founder, Noida",
    quote: "I was focused on building features before understanding the customer. The session helped me identify the real problem and shape a solution for the market. I crossed ₹1 lakh in gross profit within two months.",
  },
  {
    name: "Sneha Iyer",
    image: "/assets/testimonials/sneha-representative.png",
    role: "Freelance Designer, Bengaluru",
    quote: "I found it difficult to start my business service. The session helped me narrow my audience and describe my offer more clearly. I now have a direction and have started my rental jewellery e-store in Bengaluru.",
  },
  {
    name: "Aditya Singh",
    image: "/assets/testimonials/aditya-representative.png",
    role: "Engineering Graduate, Pune",
    quote: "Starting a business felt overwhelming because I was trying to solve a massive problem at once. Breaking the idea into smaller decisions helped me take the first steps and start my banana chips brand.",
  },
  {
    name: "Neha Gupta",
    image: "/assets/testimonials/neha-representative.png",
    role: "Small Business Owner, Jaipur",
    quote: "I was considering several ways to grow with a limited budget. The session helped me prioritise one experiment and decide what I would measure before investing in business expansion.",
  },
  {
    name: "Karan Patel",
    image: "/assets/testimonials/karan-representative.png",
    role: "Working Professional, Ahmedabad",
    quote: "I wanted reassurance that my idea would succeed. What I found more useful was understanding its unanswered questions. I left knowing what evidence to gather before a bigger investment. I now own an organic e-commerce site earning more than my IT salary.",
  },
];

export default function TestimonialsSection() {
  const trackRef = useRef(null);
  const manualUntilRef = useRef(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(media.matches);
    updatePreference();
    media.addEventListener("change", updatePreference);
    return () => media.removeEventListener("change", updatePreference);
  }, []);

  const move = useCallback((direction) => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll("[data-testimonial-card]");
    if (cards.length < 2) return;
    const loopWidth = cards[testimonials.length].offsetLeft - cards[0].offsetLeft;
    const step = cards[1].offsetLeft - cards[0].offsetLeft;
    if (direction < 0 && track.scrollLeft < step) track.scrollLeft += loopWidth;
    manualUntilRef.current = performance.now() + 1400;
    track.scrollBy({ left: direction * step, behavior: reducedMotion ? "auto" : "smooth" });
  }, [reducedMotion]);

  useEffect(() => {
    if (paused || hovered || dragging || focusWithin || reducedMotion) return;
    let frame;
    let previous;
    const animate = (now) => {
      const track = trackRef.current;
      if (track && !document.hidden && now >= manualUntilRef.current) {
        const cards = track.querySelectorAll("[data-testimonial-card]");
        const loopWidth = cards.length > testimonials.length
          ? cards[testimonials.length].offsetLeft - cards[0].offsetLeft
          : 0;
        if (loopWidth > 0) {
          track.scrollLeft += Math.min(now - (previous ?? now), 50) * 0.035;
          if (track.scrollLeft >= loopWidth) track.scrollLeft -= loopWidth;
        }
      }
      previous = now;
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [paused, hovered, dragging, focusWithin, reducedMotion]);

  return (
    <section id="testimonials" className={styles.section} aria-labelledby="testimonials-heading">
      <div className={`container ${styles.panel}`}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>Reviews from the aspiring founders</p>
          <h2 id="testimonials-heading">Testimonials<span className={styles.headingDot}>.</span></h2>
          <p className={styles.subheading}>What participants took away from their clarity sessions.</p>
        </div>

        <div
          ref={trackRef}
          className={styles.track}
          role="region"
          aria-roledescription="carousel"
          aria-label="Participant testimonials"
          tabIndex={0}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocusCapture={() => setFocusWithin(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setFocusWithin(false);
          }}
          onPointerDown={() => setDragging(true)}
          onPointerUp={() => setDragging(false)}
          onPointerCancel={() => setDragging(false)}
          onScroll={(event) => {
            const track = event.currentTarget;
            const cards = track.querySelectorAll("[data-testimonial-card]");
            if (cards.length <= testimonials.length) return;
            const loopWidth = cards[testimonials.length].offsetLeft - cards[0].offsetLeft;
            if (loopWidth > 0 && track.scrollLeft >= loopWidth) track.scrollLeft -= loopWidth;
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
              event.preventDefault();
              move(event.key === "ArrowRight" ? 1 : -1);
            }
          }}
        >
          {[...testimonials, ...testimonials].map((item, index) => (
            <article className={styles.card} data-testimonial-card key={`${item.name}-${index}`} aria-hidden={index >= testimonials.length}>
              <div className={styles.cardTop}>
                <span className={styles.quoteMark} aria-hidden="true">“</span>
              </div>
              <blockquote>{item.quote}</blockquote>
              <div className={styles.person}>
                <Image className={styles.avatar} src={item.image} alt="Representative portrait" width={52} height={52} sizes="52px" />
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.controls}>
          <span className={styles.counter}>Swipe or use the arrows <span aria-hidden="true">·</span> Representative portraits</span>
          <div className={styles.buttons}>
            <button type="button" onClick={() => move(-1)} aria-label="Previous testimonial">←</button>
            <button type="button" onClick={() => move(1)} aria-label="Next testimonial">→</button>
            {!reducedMotion && <button type="button" className={styles.pause} onClick={() => setPaused((value) => !value)} aria-label={paused ? "Resume automatic movement" : "Pause automatic movement"}>{paused ? "Play" : "Pause"}</button>}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import BrandLogo from "./BrandLogo";

const navItems = [
  { href: "/clarity-session", label: "Clarity Session" },
  { href: "/full-program", label: "Full Program" },
  { href: "/learn-with-mentorship", label: "Mentorship" },
  { href: "/blog", label: "Insights" },
  { href: "/#faq", label: "FAQ" },
];

export default function SiteFrame({
  children,
  ctaHref = "/clarity-session",
  ctaLabel = "Book ₹199 Session",
}) {
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("nav-open", navOpen);

    return () => {
      document.body.classList.remove("nav-open");
    };
  }, [navOpen]);

  const closeNav = () => setNavOpen(false);

  return (
    <>
      <header className="site-header course-header">
        <a className="brand" href="/" aria-label="DreamAndScale home" onClick={closeNav}>
          <BrandLogo tone="light" />
        </a>

        <button
          className="nav-toggle"
          type="button"
          aria-expanded={navOpen}
          aria-controls="site-nav"
          onClick={() => setNavOpen((isOpen) => !isOpen)}
        >
          <span className="sr-only">Toggle navigation</span>
          <span></span>
          <span></span>
        </button>

        <nav className="site-nav" id="site-nav" aria-label="Site navigation">
          {navItems.map((item) => (
            <a href={item.href} key={item.href} onClick={closeNav}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="header-cta" href={ctaHref}>
          {ctaLabel}
        </a>
      </header>

      {children}

      <footer className="footer-strip" id="contact">
        <div className="footer-grid-cap" aria-hidden="true"></div>
        <div className="container footer-grid">
          <p className="footer-brand-line">
            <BrandLogo tone="light" compact />
            <span className="footer-brand-copy">Build Business Clarity Before You Build A Business.</span>
          </p>
          <nav aria-label="Footer navigation">
            <a href="/clarity-session">Clarity Session</a>
            <a href="/full-program">Full Program</a>
            <a href="/learn-with-mentorship">Mentorship</a>
            <a href="/blog">Insights</a>
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-and-conditions">Terms &amp; Conditions</a>
            <a href="/refund-policy">Refund Policy</a>
            <a href="mailto:hello@dreamandscale.com">Contact</a>
          </nav>
        </div>
      </footer>
    </>
  );
}

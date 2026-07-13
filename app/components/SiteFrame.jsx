"use client";

import { useEffect, useState } from "react";
import BrandLogo from "./BrandLogo";
import SiteFooter from "./SiteFooter";

const defaultNavItems = [
  { href: "/", label: "Home" },
  { href: "/clarity-session", label: "Clarity Session" },
  { href: "/full-program", label: "Full Program" },
  { href: "/learn-with-mentorship", label: "Mentorship" },
  { href: "/business-readiness-assessment", label: "Assessment" },
  { href: "/blog", label: "Insights" },
  { href: "/#faq", label: "FAQ" },
];

export default function SiteFrame({
  children,
  ctaHref = "/register?program=clarity_session",
  ctaLabel = "Book ₹199 Session",
  hideCta = false,
  navItems = defaultNavItems,
}) {
  const [navOpen, setNavOpen] = useState(false);
  const headerMetaEvent = ctaHref.startsWith("mailto:") ? "Lead" : "ViewContent";

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

        {!hideCta ? (
          <a
            className="header-cta"
            href={ctaHref}
            data-meta-event={headerMetaEvent}
            data-meta-content-name={ctaLabel}
            data-meta-content-category="Header CTA"
          >
            {ctaLabel}
          </a>
        ) : null}
      </header>

      {children}

      <SiteFooter />
    </>
  );
}

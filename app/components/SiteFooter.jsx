import BrandLogo from "./BrandLogo";
import SocialLinks from "./SocialLinks";

const footerColumns = [
  {
    title: "Programs",
    links: [
      { href: "/clarity-session", label: "Clarity Session" },
      { href: "/full-program", label: "Full Program" },
      { href: "/learn-with-mentorship", label: "Mentorship" },
    ],
  },
  {
    title: "Explore",
    links: [
      { href: "/blog", label: "Insights" },
      { href: "/#for-you", label: "About" },
      { href: "/#faq", label: "FAQ" },
      { href: "mailto:hello@dreamandscale.com", label: "Contact", metaEvent: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms-and-conditions", label: "Terms & Conditions" },
      { href: "/refund-policy", label: "Refund Policy" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="footer-strip" id="contact">
      <div className="footer-grid-cap" aria-hidden="true"></div>
      <div className="container footer-grid">
        <div className="footer-brand-line">
          <BrandLogo tone="light" compact />
          <p className="footer-brand-copy">
            Build Business Clarity Before You Build A Business.
            <br />
            Helping aspiring founders understand how businesses actually work.
          </p>
        </div>
        <div className="footer-columns">
          {footerColumns.map((column) => (
            <section className="footer-column" key={column.title}>
              <h3>{column.title}</h3>
              <nav aria-label={`${column.title} footer links`}>
                {column.links.map((link) => (
                  <a
                    href={link.href}
                    key={link.href}
                    {...(link.metaEvent ? { "data-meta-event": link.metaEvent } : {})}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </section>
          ))}
        </div>
        <div className="footer-social-row">
          <SocialLinks />
          <p className="footer-copyright">© 2026 DreamAndScale. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

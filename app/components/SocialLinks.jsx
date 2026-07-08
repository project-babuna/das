const socialLinks = [
  {
    label: "Instagram",
    text: "DreamAndScale on Instagram",
    href: "https://www.instagram.com/dreamandscale/",
    path: "M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm4.2 3.2a4.8 4.8 0 1 1 0 9.6 4.8 4.8 0 0 1 0-9.6Zm0 2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Zm5.05-2.35a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z",
  },
  {
    label: "LinkedIn",
    text: "DreamAndScale on LinkedIn",
    href: "https://www.linkedin.com/company/dreamandscale/",
    path: "M6.94 8.98H3V22h3.94V8.98ZM4.96 7.2A2.29 2.29 0 1 0 4.94 2.62 2.29 2.29 0 0 0 4.96 7.2ZM22 22h-3.94v-6.34c0-1.51-.03-3.46-2.11-3.46-2.11 0-2.43 1.65-2.43 3.35V22H9.58V8.98h3.78v1.78h.05a4.14 4.14 0 0 1 3.73-2.05c3.99 0 4.86 2.63 4.86 6.05V22Z",
  },
  {
    label: "Facebook",
    text: "DreamAndScale on Facebook",
    href: "https://www.facebook.com/dreamandscale",
    path: "M14 8.4V6.9c0-.72.48-.9.82-.9H17V2.2L13.86 2C10.38 2 9.6 4.6 9.6 6.26V8.4H7v4h2.6V22H14v-9.6h2.98l.42-4H14Z",
  },
  {
    label: "WhatsApp",
    text: "Join DreamAndScale on WhatsApp",
    href: "https://whatsapp.com/channel/0029Vb8GawwJf05k2XThc91n",
    path: "M12.04 2a9.86 9.86 0 0 0-8.43 14.95L2.42 22l5.19-1.14A9.86 9.86 0 1 0 12.04 2Zm0 1.98a7.88 7.88 0 0 1 0 15.76 7.79 7.79 0 0 1-3.86-1.02l-.37-.21-3.04.67.7-2.95-.24-.39a7.88 7.88 0 0 1 6.81-11.86Zm-3.35 3.9c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.44 1.03 2.61c.13.17 1.74 2.78 4.29 3.78 2.12.83 2.55.66 3.01.62.46-.04 1.48-.6 1.69-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29-.25-.13-1.48-.73-1.71-.81-.23-.08-.4-.13-.56.13-.17.25-.65.81-.8.98-.15.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.25-1.49-1.4-1.74-.15-.25-.02-.39.11-.52.12-.12.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.43h-.5Z",
  },
];

export default function SocialLinks() {
  return (
    <div className="social-links" aria-label="DreamAndScale social links">
      <p>Follow DreamAndScale</p>
      <div className="social-link-list">
        {socialLinks.map((link) => (
          <a
            href={link.href}
            key={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.text}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d={link.path} />
            </svg>
            <span>{link.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

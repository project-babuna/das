import Script from "next/script";
import MetaPixel from "./components/MetaPixel";
import "./globals.css";

const faviconSwitcherScript = `
(() => {
  const icons = {
    darkChrome: "/ds-favicon-on-dark.png?v=11",
    lightChrome: "/ds-favicon-on-light.png?v=11",
  };

  const media = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  function syncFavicon() {
    const href = media && media.matches ? icons.darkChrome : icons.lightChrome;
    document
      .querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]')
      .forEach((link) => link.remove());

    const icon = document.createElement("link");
    icon.rel = "icon";
    icon.type = "image/png";
    icon.sizes = "32x32";
    icon.href = href;
    document.head.appendChild(icon);
  }

  syncFavicon();

  if (media) {
    if (media.addEventListener) {
      media.addEventListener("change", syncFavicon);
    } else if (media.addListener) {
      media.addListener(syncFavicon);
    }
  }

  document.addEventListener("visibilitychange", syncFavicon);
})();
`;

export const metadata = {
  metadataBase: new URL("https://dreamandscale.com"),
  title: "DreamAndScale | Business Clarity Program for Aspiring Founders, Students & Professionals",
  description:
    "DreamAndScale is a business clarity program for aspiring founders, students, freelancers, and professionals who want to understand how businesses actually work before starting a business, choosing an idea, or making major career and money decisions.",
  icons: {
    icon: [
      { url: "/ds-favicon-on-dark.png?v=11", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/ds-favicon-on-light-180.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="facebook-domain-verification" content="v8fm3olc3n9wajgyrr1bk4jb1xsr12" />
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: faviconSwitcherScript }} />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2RDW6CEW10"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2RDW6CEW10');
          `}
        </Script>
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}

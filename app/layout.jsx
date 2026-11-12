import Script from "next/script";
import MetaPixel from "./components/MetaPixel";
import FreeAssessmentModal from "./components/FreeAssessmentModal";
import ViewerActivity from "./components/ViewerActivity";
import "./globals.css";

const GTM_ID = "GTM-P6S5DB7K";
const enableLiveTracking = process.env.VERCEL_ENV === "production";
const enableViewerActivity = enableLiveTracking || process.env.NODE_ENV === "development";

export const metadata = {
  metadataBase: new URL("https://www.dreamandscale.com"),
  applicationName: "DreamAndScale",
  openGraph: { siteName: "DreamAndScale", locale: "en_IN", type: "website", images: [{ url: "/og/home.jpg", width: 1200, height: 630, alt: "DreamAndScale — from business dream to scalable company" }] },
  twitter: { card: "summary_large_image", images: ["/og/home.jpg"] },
  title: "DreamAndScale | From Business Dream to Scalable Company",
  description:
    "DreamAndScale helps aspiring founders, working professionals, and business owners understand, learn, build, prove, and grow businesses—with learning, mentorship, and support at each stage.",
  icons: {
    icon: [
      { url: "/ds-favicon-on-dark.png?v=11", sizes: "32x32", type: "image/png", media: "(prefers-color-scheme: dark)" },
      { url: "/ds-favicon-on-light.png?v=11", sizes: "32x32", type: "image/png", media: "(prefers-color-scheme: light)" },
    ],
    apple: [{ url: "/ds-favicon-on-light-180.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="facebook-domain-verification" content="v8fm3olc3n9wajgyrr1bk4jb1xsr12" />
        {enableLiveTracking && <Script id="google-tag-manager" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>}
      </head>
      <body>
        {enableLiveTracking && <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>}
        {enableLiveTracking && <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2RDW6CEW10"
          strategy="afterInteractive"
        />}
        {enableLiveTracking && <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2RDW6CEW10');
          `}
        </Script>}
        {enableLiveTracking && <MetaPixel />}
        {children}
        <ViewerActivity enabled={enableViewerActivity} />
        <FreeAssessmentModal />
      </body>
    </html>
  );
}

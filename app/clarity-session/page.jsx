import ClaritySessionAdPage from "../components/ClaritySessionAdPage";

export const metadata = {
  title: "DreamAndScale Business Clarity Session | Understand How Business Works",
  description:
    "Join the ₹199 DreamAndScale Business Clarity Session, a 3-hour live online Hinglish session that helps aspiring founders understand idea, market, customer, product, finance, growth, funding, and ownership as one connected business system.",
  alternates: {
    canonical: "https://dreamandscale.com/clarity-session",
  },
  openGraph: {
    title: "DreamAndScale Business Clarity Session | Understand How Business Works",
    description:
      "A practical 3-hour live online session that connects idea, market, customer, product, structure, finance, growth, funding, and ownership into one business-building map.",
    url: "https://dreamandscale.com/clarity-session",
    siteName: "DreamAndScale",
    type: "website",
    images: [{ url: "/og/home.jpg", width: 1200, height: 630, alt: "DreamAndScale Clarity Session" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DreamAndScale Business Clarity Session | Understand How Business Works",
    description:
      "Understand how a business actually works before risking your time, money, or career on an idea.",
    images: ["/og/home.jpg"],
  },
};

export default function ClaritySessionPage() {
  return <ClaritySessionAdPage />;
}

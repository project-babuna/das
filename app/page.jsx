import HomePage from "./HomePage";
import { brandFaqItems } from "./homeContent";

export const metadata = {
  metadataBase: new URL("https://www.dreamandscale.com"),
  title: "DreamAndScale | Learn to Build a Business, Step by Step",
  description:
    "Move from dream to institution with a clear founder lifecycle—from understanding business fundamentals to learning, building, accelerating, and scaling.",
  alternates: {
    canonical: "https://www.dreamandscale.com",
  },
  openGraph: {
    title:
      "DreamAndScale | Learn to Build a Business, Step by Step",
    description:
      "DreamAndScale supports founders from first clarity to building, accelerating, and scaling a real company.",
    url: "https://www.dreamandscale.com",
    siteName: "DreamAndScale",
    type: "website",
    images: [
      {
        url: "/og/home.jpg",
        width: 1200,
        height: 630,
        alt: "DreamAndScale business clarity program",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "DreamAndScale | Learn to Build a Business, Step by Step",
    description:
      "Business learning for professionals, aspiring founders, freelancers, and owners. Choose an introduction, the complete framework, or learning with mentor support.",
    images: ["/og/home.jpg"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DreamAndScale",
  url: "https://www.dreamandscale.com",
  logo: "https://www.dreamandscale.com/brand/logo-dark.png",
  sameAs: [],
  description:
    "DreamAndScale provides business education through a live Clarity Session, a self-paced Full Program, and learning with mentor support.",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "DreamAndScale",
  url: "https://www.dreamandscale.com",
  description:
    "A founder lifecycle for working professionals and aspiring founders—from dream to business, company, and institution.",
  potentialAction: {
    "@type": "ReadAction",
    target: "https://www.dreamandscale.com",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: brandFaqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const jsonLdSchemas = [organizationSchema, websiteSchema, faqSchema];

export default function Page() {
  return (
    <>
      {jsonLdSchemas.map((schema) => (
        <script
          key={schema["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <HomePage />
    </>
  );
}

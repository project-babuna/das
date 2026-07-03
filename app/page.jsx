import HomePage from "./HomePage";
import { faqItems } from "./faqContent";

export const metadata = {
  metadataBase: new URL("https://dreamandscale.com"),
  title: "DreamAndScale | Business Clarity Program for Aspiring Founders, Students & Professionals",
  description:
    "DreamAndScale is a business clarity program for aspiring founders, students, freelancers, and professionals who want to understand how businesses actually work before starting a business, choosing an idea, or making major career and money decisions.",
  alternates: {
    canonical: "https://dreamandscale.com",
  },
  openGraph: {
    title:
      "DreamAndScale | Business Clarity Program for Aspiring Founders, Students & Professionals",
    description:
      "DreamAndScale helps aspiring founders, students, freelancers, and professionals understand how businesses actually work before starting a business, choosing an idea, or making major career and money decisions.",
    url: "https://dreamandscale.com",
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
      "DreamAndScale | Business Clarity Program for Aspiring Founders, Students & Professionals",
    description:
      "DreamAndScale helps aspiring founders, students, freelancers, and professionals understand how businesses actually work before starting a business, choosing an idea, or making major career and money decisions.",
    images: ["/og/home.jpg"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DreamAndScale",
  url: "https://dreamandscale.com",
  logo: "https://dreamandscale.com/brand/logo-dark.png",
  sameAs: [],
  description:
    "DreamAndScale is a business clarity program that helps aspiring founders, students, freelancers, and professionals understand how businesses actually work before making major business, career, and money decisions.",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "DreamAndScale",
  url: "https://dreamandscale.com",
  description:
    "DreamAndScale is a business clarity program for aspiring founders, students, freelancers, and professionals.",
  potentialAction: {
    "@type": "ReadAction",
    target: "https://dreamandscale.com",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
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

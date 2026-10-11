import { pageMetadata } from "../lib/seo";
import HomePage from "./HomePage";
import { brandFaqItems } from "./homeContent";
import JsonLd from "./components/JsonLd";

export const metadata = pageMetadata({
  "title": "DreamAndScale | From Business Dream to Scalable Company",
  "description": "Learn, build, prove, and grow your business with DreamAndScale. Explore founder education, mentorship, incubation, acceleration, and scale-up support.",
  "path": "/"
});

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DreamAndScale",
  url: "https://www.dreamandscale.com",
  logo: "https://www.dreamandscale.com/brand/logo-dark.png",
  sameAs: ["https://www.instagram.com/dreamandscale/", "https://www.linkedin.com/company/dreamandscale/", "https://www.facebook.com/dreamandscale"],
  description:
    "DreamAndScale supports the founder journey through Clarity, Full Program, Mentorship, Incubation, Accelerator, and Scale-Up. Learn & Prepare offers open enrollment; Build & Grow has selective entry.",
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
        <JsonLd key={schema["@type"]} data={schema} />
      ))}
      <HomePage />
    </>
  );
}

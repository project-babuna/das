import ProgramOfferPage from "../components/ProgramOfferPage";
import { programPages } from "../programContent";

const page = programPages["learn-with-mentorship"];

export const metadata = {
  title: "DreamAndScale Plus | Learn With Mentorship",
  description:
    "DreamAndScale Plus includes the full self-paced business clarity program with live mentor support for applying the concepts to your own decisions.",
  alternates: {
    canonical: "https://dreamandscale.com/learn-with-mentorship",
  },
  openGraph: {
    title: "DreamAndScale Plus | Learn With Mentorship",
    description:
      "Get the complete DreamAndScale program with live mentor support for applying business clarity to your own decisions.",
    url: "https://dreamandscale.com/learn-with-mentorship",
    siteName: "DreamAndScale",
    type: "website",
    images: [{ url: "/og/home.jpg", width: 1200, height: 630, alt: "DreamAndScale Plus mentorship" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DreamAndScale Plus | Learn With Mentorship",
    description:
      "Learn the DreamAndScale system with live mentor support.",
    images: ["/og/home.jpg"],
  },
};

export default function LearnWithMentorshipPage() {
  return <ProgramOfferPage page={page} />;
}

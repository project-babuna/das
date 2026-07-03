import ProgramOfferPage from "../components/ProgramOfferPage";
import { programPages } from "../programContent";

const page = programPages["clarity-session"];

export const metadata = {
  title: "₹199 Clarity Session | DreamAndScale",
  description:
    "Book the ₹199 DreamAndScale Clarity Session to understand the program, meet the mentor, explore the curriculum, and decide whether it is the right next step.",
  alternates: {
    canonical: "https://dreamandscale.com/clarity-session",
  },
  openGraph: {
    title: "₹199 Clarity Session | DreamAndScale",
    description:
      "Understand DreamAndScale, meet the mentor, explore the curriculum, and decide whether the full program is the right next step.",
    url: "https://dreamandscale.com/clarity-session",
    siteName: "DreamAndScale",
    type: "website",
    images: [{ url: "/og/home.jpg", width: 1200, height: 630, alt: "DreamAndScale Clarity Session" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "₹199 Clarity Session | DreamAndScale",
    description:
      "Explore DreamAndScale before enrolling in the full business clarity program.",
    images: ["/og/home.jpg"],
  },
};

export default function ClaritySessionPage() {
  return <ProgramOfferPage page={page} />;
}

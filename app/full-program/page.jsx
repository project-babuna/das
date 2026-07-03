import ProgramOfferPage from "../components/ProgramOfferPage";
import { programPages } from "../programContent";

const page = programPages["full-program"];

export const metadata = {
  title: "DreamAndScale Full Program | Self-Paced Business Clarity Program",
  description:
    "Explore the DreamAndScale Full Program, a self-paced business clarity program for aspiring founders, students, freelancers, and professionals.",
  alternates: {
    canonical: "https://dreamandscale.com/full-program",
  },
  openGraph: {
    title: "DreamAndScale Full Program | Self-Paced Business Clarity Program",
    description:
      "Learn the complete DreamAndScale system from opportunity and customers to finance, growth, and ownership.",
    url: "https://dreamandscale.com/full-program",
    siteName: "DreamAndScale",
    type: "website",
    images: [{ url: "/og/home.jpg", width: 1200, height: 630, alt: "DreamAndScale Full Program" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DreamAndScale Full Program | Self-Paced Business Clarity Program",
    description:
      "Build business clarity independently through the complete DreamAndScale system.",
    images: ["/og/home.jpg"],
  },
};

export default function FullProgramPage() {
  return <ProgramOfferPage page={page} />;
}

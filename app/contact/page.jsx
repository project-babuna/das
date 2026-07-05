import ContactQueryPage from "../components/ContactQueryPage";

export const metadata = {
  title: "Contact DreamAndScale | General Enquiries and Program Support",
  description:
    "Contact DreamAndScale for general enquiries, collaboration ideas, payment help, registration support, or guidance choosing the right program.",
  alternates: {
    canonical: "https://dreamandscale.com/contact",
  },
  openGraph: {
    title: "Contact DreamAndScale | General Enquiries and Program Support",
    description:
      "Send DreamAndScale a message about general enquiries, program support, registration, payment help, or collaboration ideas.",
    url: "https://dreamandscale.com/contact",
    siteName: "DreamAndScale",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact DreamAndScale | General Enquiries and Program Support",
    description:
      "Send DreamAndScale a message about enquiries, program support, registration, payment help, or collaboration ideas.",
  },
};

export default function ContactPage() {
  return <ContactQueryPage />;
}

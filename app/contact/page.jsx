import { pageMetadata } from "../../lib/seo";
import ContactQueryPage from "../components/ContactQueryPage";

export const metadata = pageMetadata({
  "title": "Contact DreamAndScale | Programs & Founder Support",
  "description": "Contact DreamAndScale for questions about programs, mentorship, registration, payments, and knowledge partnerships. Find the right support for your next step.",
  "path": "/contact"
});

export default function ContactPage() {
  return <ContactQueryPage />;
}

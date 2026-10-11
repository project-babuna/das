import JsonLd from "../components/JsonLd";
import { PROGRAMS } from "../../lib/programs";
import { pageMetadata, courseSchema, breadcrumbs } from "../../lib/seo";
import ProgramOfferPage from "../components/ProgramOfferPage";
import { programPages } from "../programContent";

const page = programPages["learn-with-mentorship"];

export const metadata = pageMetadata({
  "title": "12-Week Business Mentorship Program | DreamAndScale",
  "description": "Apply your business learning with live mentorship and events over 12 weeks. Includes the Full Program. Explore DreamAndScale Mentorship for ₹49,999.",
  "path": "/learn-with-mentorship"
});

export default function LearnWithMentorshipPage() {
  return <><JsonLd data={courseSchema({ name: PROGRAMS.mentorship.title, description: metadata.description, path: "/learn-with-mentorship", amount: PROGRAMS.mentorship.amount })} /><JsonLd data={breadcrumbs([["Home", "/"], ["Programs", "/programs"], [PROGRAMS.mentorship.title, "/learn-with-mentorship"]])} /><ProgramOfferPage page={page} /></>;
}

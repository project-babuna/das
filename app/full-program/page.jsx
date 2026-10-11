import JsonLd from "../components/JsonLd";
import { PROGRAMS } from "../../lib/programs";
import { pageMetadata, courseSchema, breadcrumbs } from "../../lib/seo";
import ProgramOfferPage from "../components/ProgramOfferPage";
import { programPages } from "../programContent";

const page = programPages["full-program"];

export const metadata = pageMetadata({
  "title": "Full Program: 120 Hours of Business Learning | DreamAndScale",
  "description": "Learn how to build a business with 120 hours of self-paced learning. Connect customers, products, finance, and growth. Explore the ₹9,999 Full Program.",
  "path": "/full-program"
});

export default function FullProgramPage() {
  return <><JsonLd data={courseSchema({ name: PROGRAMS.full_program.title, description: metadata.description, path: "/full-program", amount: PROGRAMS.full_program.amount })} /><JsonLd data={breadcrumbs([["Home", "/"], ["Programs", "/programs"], [PROGRAMS.full_program.title, "/full-program"]])} /><ProgramOfferPage page={page} /></>;
}

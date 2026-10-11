import JsonLd from "../components/JsonLd";
import { PROGRAMS } from "../../lib/programs";
import { pageMetadata, courseSchema, breadcrumbs } from "../../lib/seo";
import ClaritySessionLandingPage from "../ClaritySessionLandingPage";

export const metadata = pageMetadata({
  "title": "₹199 Business Clarity Session | DreamAndScale",
  "description": "Join a 3-hour live online session to challenge business myths, understand the founder journey, and find your next step. Second Sunday monthly, 10:30 AM IST.",
  "path": "/clarity-session"
});

export default function ClaritySessionPage() {
  return <><JsonLd data={courseSchema({ name: PROGRAMS.clarity_session.title, description: metadata.description, path: "/clarity-session", amount: PROGRAMS.clarity_session.amount })} /><JsonLd data={breadcrumbs([["Home", "/"], ["Programs", "/programs"], [PROGRAMS.clarity_session.title, "/clarity-session"]])} /><ClaritySessionLandingPage /></>;
}

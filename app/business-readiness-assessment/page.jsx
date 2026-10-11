import { pageMetadata } from "../../lib/seo";
import BusinessAssessmentTool from "../components/BusinessAssessmentTool";
import SiteFrame from "../components/SiteFrame";

export const metadata = pageMetadata({
  "title": "Free Business Readiness Assessment | DreamAndScale",
  "description": "Answer 18 practical questions to explore your business understanding, identify gaps, and find a clearer next step. Get your free business readiness report.",
  "path": "/business-readiness-assessment"
});

export default function BusinessReadinessAssessmentPage() {
  return (
    <SiteFrame>
      <main>
        <BusinessAssessmentTool mode="page" />
      </main>
    </SiteFrame>
  );
}

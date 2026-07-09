import BusinessAssessmentTool from "../components/BusinessAssessmentTool";
import SiteFrame from "../components/SiteFrame";

export const metadata = {
  title: "Free Business Readiness Assessment | DreamAndScale",
  description:
    "Take the free DreamAndScale Business Readiness Assessment to understand your clarity across idea, customers, market, business model, execution, structure, finance, and growth.",
  alternates: {
    canonical: "https://dreamandscale.com/business-readiness-assessment",
  },
};

export default function BusinessReadinessAssessmentPage() {
  return (
    <SiteFrame>
      <main>
        <BusinessAssessmentTool mode="page" />
      </main>
    </SiteFrame>
  );
}

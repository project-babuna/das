import PolicyPage from "../components/PolicyPage";
import { policyPages } from "../policyContent";

export const metadata = {
  title: "Terms And Conditions | DreamAndScale",
  description: "Terms And Conditions for DreamAndScale.",
  alternates: {
    canonical: "https://dreamandscale.com/terms-and-conditions",
  },
};

export default function TermsAndConditionsPage() {
  return <PolicyPage page={policyPages["terms-and-conditions"]} />;
}

import PolicyPage from "../components/PolicyPage";
import { policyPages } from "../policyContent";

export const metadata = {
  title: "Privacy Policy | DreamAndScale",
  description: "Privacy Policy for DreamAndScale.",
  alternates: {
    canonical: "https://dreamandscale.com/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return <PolicyPage page={policyPages["privacy-policy"]} />;
}

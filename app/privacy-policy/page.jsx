import PolicyPage from "../components/PolicyPage";
import { policyPages } from "../policyContent";

export const metadata = {
  title: "Privacy Policy | DreamAndScale",
  description: "Privacy Policy for DreamAndScale.",
};

export default function PrivacyPolicyPage() {
  return <PolicyPage page={policyPages["privacy-policy"]} />;
}

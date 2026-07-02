import PolicyPage from "../components/PolicyPage";
import { policyPages } from "../policyContent";

export const metadata = {
  title: "Refund Policy | DreamAndScale",
  description: "Refund Policy for DreamAndScale.",
};

export default function RefundPolicyPage() {
  return <PolicyPage page={policyPages["refund-policy"]} />;
}

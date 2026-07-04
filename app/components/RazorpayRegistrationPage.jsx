import SiteFrame from "./SiteFrame";
import { RegistrationCheckout } from "./RegistrationCheckout";

export default function RazorpayRegistrationPage() {
  return (
    <SiteFrame ctaHref="/register?program=clarity_session" ctaLabel="Book ₹199 Session">
      <main>
        <RegistrationCheckout />
      </main>
    </SiteFrame>
  );
}

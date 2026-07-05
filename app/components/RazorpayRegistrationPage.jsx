import SiteFrame from "./SiteFrame";
import { RegistrationCheckout } from "./RegistrationCheckout";

export default function RazorpayRegistrationPage() {
  return (
    <SiteFrame hideCta>
      <main>
        <RegistrationCheckout />
      </main>
    </SiteFrame>
  );
}

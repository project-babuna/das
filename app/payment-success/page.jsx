import SiteFrame from "../components/SiteFrame";
import PaymentSuccessContent from "../components/PaymentSuccessContent";

export const metadata = {
  title: "Payment Successful | DreamAndScale",
  description: "Your DreamAndScale Clarity Session registration is confirmed.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PaymentSuccessPage({ searchParams }) {
  return (
    <SiteFrame ctaHref="/full-program" ctaLabel="Explore Program">
      <main>
        <section className="content-hero status-hero">
          <PaymentSuccessContent orderId={searchParams?.order_id || ""} />
        </section>
      </main>
    </SiteFrame>
  );
}

import SiteFrame from "../components/SiteFrame";

export const metadata = {
  title: "Payment Successful | DreamAndScale",
  description: "Your DreamAndScale Clarity Session registration is confirmed.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PaymentSuccessPage() {
  return (
    <SiteFrame ctaHref="/full-program" ctaLabel="Explore Program">
      <main>
        <section className="content-hero status-hero">
          <div className="container status-card">
            <span className="status-mark status-mark-success" aria-hidden="true">
              ✓
            </span>
            <p className="eyebrow">Payment successful</p>
            <h1>Your Registration Is Confirmed</h1>
            <p>
              Your payment is successful and your seat for the DreamAndScale Clarity Session is
              confirmed.
            </p>
            <p>
              Session details will be shared on WhatsApp/email.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="/full-program">
                Explore Full Program
              </a>
              <a className="btn btn-secondary" href="/">
                Back To Home
              </a>
            </div>
            <p className="status-note">Please keep your WhatsApp number active for session updates.</p>
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}

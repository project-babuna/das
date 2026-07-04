import SiteFrame from "../components/SiteFrame";

export const metadata = {
  title: "Payment Successful | DreamAndScale",
  description: "Your DreamAndScale program payment was completed successfully.",
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
            <h1>Your DreamAndScale Registration Is Confirmed</h1>
            <p>
              Thank you for registering with DreamAndScale. Your payment has been verified, and
              your selected program has been marked as paid.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="/full-program">
                Explore Full Program
              </a>
              <a className="btn btn-secondary" href="/">
                Back To Home
              </a>
            </div>
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}

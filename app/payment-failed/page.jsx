import SiteFrame from "../components/SiteFrame";

export const metadata = {
  title: "Payment Failed | DreamAndScale",
  description: "Your DreamAndScale program payment could not be completed.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PaymentFailedPage() {
  return (
    <SiteFrame ctaHref="/register" ctaLabel="Try Again">
      <main>
        <section className="content-hero status-hero">
          <div className="container status-card">
            <span className="status-mark status-mark-failed" aria-hidden="true">
              !
            </span>
            <p className="eyebrow">Payment not completed</p>
            <h1>Your Payment Could Not Be Verified</h1>
            <p>
              The payment was not completed or could not be verified. No confirmed seat has been
              marked against this program registration attempt.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="/register">
                Try Payment Again
              </a>
              <a className="btn btn-secondary" href="/#clarity">
                Review Programs
              </a>
            </div>
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}

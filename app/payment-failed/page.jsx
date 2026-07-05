import SiteFrame from "../components/SiteFrame";

const allowedPrograms = new Set(["clarity_session", "full_program", "mentorship"]);

export const metadata = {
  title: "Payment Failed | DreamAndScale",
  description: "Your DreamAndScale program payment could not be completed.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PaymentFailedPage({ searchParams }) {
  const program = allowedPrograms.has(searchParams?.program)
    ? searchParams.program
    : "clarity_session";
  const retryHref = `/register?program=${program}`;

  return (
    <SiteFrame ctaHref={retryHref} ctaLabel="Try Again">
      <main>
        <section className="content-hero status-hero">
          <div className="container status-card">
            <span className="status-mark status-mark-failed" aria-hidden="true">
              !
            </span>
            <p className="eyebrow">Payment not completed</p>
            <h1>Your Payment Could Not Be Verified</h1>
            <p>
              Your payment was not completed or could not be verified. If money was deducted,
              please wait for bank/Razorpay confirmation or contact DreamAndScale with your
              registered phone number.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href={retryHref}>
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

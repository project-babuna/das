import SiteFrame from "../components/SiteFrame";

export const metadata = {
  title: "Become a DreamAndScale Knowledge Partner",
  description:
    "DreamAndScale invites experienced professionals, business leaders, consultants, entrepreneurs, and business school faculty to become Founding Knowledge Partners.",
  alternates: {
    canonical: "https://dreamandscale.com/become-a-partner",
  },
  openGraph: {
    title: "Become a DreamAndScale Knowledge Partner",
    description:
      "Collaborate with DreamAndScale as a Knowledge Partner by delivering sessions, designing modules, mentoring learners, or contributing to curriculum development.",
    url: "https://dreamandscale.com/become-a-partner",
    siteName: "DreamAndScale",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Become a DreamAndScale Knowledge Partner",
    description:
      "Collaborate with DreamAndScale as a Knowledge Partner and help aspiring founders understand how businesses actually work.",
  },
};

const partnerContributions = [
  "Delivering live sessions",
  "Designing learning modules",
  "Sharing practical insights and case studies",
  "Mentoring aspiring founders",
  "Contributing to curriculum development",
];

export default function BecomePartnerPage() {
  return (
    <SiteFrame ctaHref="/contact?type=knowledge_partner" ctaLabel="Become a partner">
      <main>
        <section className="section partner-hero">
          <div className="container partner-hero-inner">
            <p className="partner-label">Knowledge Partner Program</p>
            <h1>Become a DreamAndScale Knowledge Partner</h1>
            <p>
              DreamAndScale is building a platform that helps aspiring founders understand how
              businesses actually work through practical learning from experienced professionals and
              educators.
            </p>
          </div>
        </section>

        <section className="section partner-section">
          <div className="container partner-layout">
            <div className="partner-copy">
              <h2>Founding Knowledge Partners</h2>
              <p>
                We are inviting a small number of experienced professionals, business leaders,
                consultants, entrepreneurs, and business school faculty to become our Founding
                Knowledge Partners.
              </p>
              <p>
                DreamAndScale manages the platform, learning framework, technology, operations, and
                learner experience, so you can focus on sharing your expertise.
              </p>
            </div>

            <div className="partner-card">
              <span>As a Knowledge Partner, you can contribute by:</span>
              <ul>
                {partnerContributions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section partner-cta-section">
          <div className="container partner-cta">
            <div>
              <h2>Interested in Collaborating?</h2>
              <p>
                If you are interested in becoming a DreamAndScale Knowledge Partner, please share
                your profile, area of expertise, and how you would like to collaborate.
              </p>
              <p>We will review suitable profiles and connect for a discussion.</p>
            </div>
            <a className="btn btn-primary" href="/contact?type=knowledge_partner">
              Contact DreamAndScale
            </a>
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}

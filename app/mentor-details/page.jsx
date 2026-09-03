import MentorDetailsForm from "../components/MentorDetailsForm";

export const metadata = {
  title: "Mentor & Knowledge Partner Onboarding | DreamAndScale",
  description:
    "Join the DreamAndScale mentor ecosystem and share your expertise, availability, and preferred mentorship format.",
  alternates: {
    canonical: "https://www.dreamandscale.com/mentor-details",
  },
};

export default function MentorDetailsPage() {
  return <MentorDetailsForm />;
}

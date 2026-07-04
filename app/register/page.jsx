import RazorpayRegistrationPage from "../components/RazorpayRegistrationPage";

export const metadata = {
  title: "Register for DreamAndScale Programs | Secure Payment",
  description:
    "Register and pay securely for DreamAndScale Clarity Session, Full Program, or Mentorship using Razorpay.",
  alternates: {
    canonical: "https://dreamandscale.com/register",
  },
  openGraph: {
    title: "Register for DreamAndScale Programs | Secure Payment",
    description:
      "Choose your DreamAndScale program and complete secure payment through Razorpay.",
    url: "https://dreamandscale.com/register",
    siteName: "DreamAndScale",
    type: "website",
    images: [
      {
        url: "/og/home.jpg",
        width: 1200,
        height: 630,
        alt: "DreamAndScale program registration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Register for DreamAndScale Programs | Secure Payment",
    description: "Register and pay securely for DreamAndScale programs using Razorpay.",
    images: ["/og/home.jpg"],
  },
};

export default function RegisterPage() {
  return <RazorpayRegistrationPage />;
}

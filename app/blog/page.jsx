import BlogIndex from "../components/BlogIndex";
import { blogPosts } from "../blogContent";

export const metadata = {
  title: "Business Clarity Insights | DreamAndScale Blog",
  description:
    "Read DreamAndScale insights on business ideas, market size, customer understanding, self-employment, and business decision-making.",
  alternates: {
    canonical: "https://dreamandscale.com/blog",
  },
  openGraph: {
    title: "Business Clarity Insights | DreamAndScale Blog",
    description:
      "Read practical DreamAndScale insights on business ideas, customers, markets, and better business decisions.",
    url: "https://dreamandscale.com/blog",
    siteName: "DreamAndScale",
    type: "website",
    images: [{ url: "/og/home.jpg", width: 1200, height: 630, alt: "DreamAndScale business clarity insights" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Clarity Insights | DreamAndScale Blog",
    description:
      "Practical insights on business clarity, ideas, markets, customers, and decision-making.",
    images: ["/og/home.jpg"],
  },
};

export default function BlogPage() {
  return <BlogIndex posts={blogPosts} />;
}

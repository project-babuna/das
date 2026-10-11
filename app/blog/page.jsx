import { pageMetadata } from "../../lib/seo";
import BlogIndex from "../components/BlogIndex";
import { blogPosts } from "../blogContent";

export const metadata = pageMetadata({
  "title": "Business & Entrepreneurship Insights | DreamAndScale",
  "description": "Practical guides to validating ideas, understanding customers, assessing markets, and choosing your next business step. Read DreamAndScale founder insights.",
  "path": "/blog"
});

export default function BlogPage() {
  return <BlogIndex posts={blogPosts} />;
}

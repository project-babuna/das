import { SITE_URL as siteUrl } from "../lib/seo";
import { blogPosts } from "./blogContent";
import { buildPrograms } from "./programs/catalog";

const blogRoutes = blogPosts.map(post => `/blog/${post.slug}`);

const routes = [
  ...["/programs", ...buildPrograms.map(program => `/programs/${program.slug}`)].map(path => ({ path, changeFrequency: "monthly", priority: 0.85 })),
  {
    path: "/about",
    changeFrequency: "monthly",
    priority: 0.65,
  },
  {
    path: "/",
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/clarity-session",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/business-readiness-assessment",
    changeFrequency: "monthly",
    priority: 0.85,
  },
  {
    path: "/full-program",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/learn-with-mentorship",
    changeFrequency: "monthly",
    priority: 0.85,
  },
  {
    path: "/blog",
    changeFrequency: "weekly",
    priority: 0.75,
  },
  {
    path: "/contact",
    changeFrequency: "monthly",
    priority: 0.65,
  },
  {
    path: "/become-a-partner",
    changeFrequency: "monthly",
    priority: 0.65,
  },
  ...blogRoutes.map((path) => ({
    path,
    changeFrequency: "monthly",
    priority: 0.7,
  })),
  {
    path: "/privacy-policy",
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    path: "/terms-and-conditions",
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    path: "/refund-policy",
    changeFrequency: "yearly",
    priority: 0.3,
  },
];

export default function sitemap() {
  return routes.map((route) => ({
    url: new URL(route.path, siteUrl).toString(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dreamandscale.com";

const blogRoutes = [
  "/blog/how-to-validate-a-business-idea",
  "/blog/business-vs-self-employment",
  "/blog/how-to-know-if-a-market-is-big-enough",
  "/blog/how-to-understand-customers-before-building-a-product",
  "/blog/should-you-start-a-business-or-keep-your-job",
];

const routes = [
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
  const lastModified = new Date();

  return routes.map((route) => ({
    url: new URL(route.path, siteUrl).toString(),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}

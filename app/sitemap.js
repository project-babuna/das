const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dreamandscale.com";

const routes = [
  {
    path: "/",
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/course",
    changeFrequency: "weekly",
    priority: 0.9,
  },
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

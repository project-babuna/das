const siteUrl = "https://www.dreamandscale.com";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/admin/"],
    },
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
  };
}

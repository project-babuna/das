const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dreamandscale.com";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
  };
}

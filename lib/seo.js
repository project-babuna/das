export const SITE_URL = "https://www.dreamandscale.com";
export const absoluteUrl = (path = "/") => new URL(path, SITE_URL).toString();

export function pageMetadata({ title, description, path, image = "/og/home.jpg", type = "website", noindex = false }) {
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: { title, description, url: absoluteUrl(path), siteName: "DreamAndScale", locale: "en_IN", type, images: [{ url: absoluteUrl(image), alt: title }] },
    twitter: { card: "summary_large_image", title, description, images: [absoluteUrl(image)] },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  };
}

export function breadcrumbs(items) {
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map(([name, path], index) => ({ "@type": "ListItem", position: index + 1, name, item: absoluteUrl(path) })) };
}

export function courseSchema({ name, description, path, amount }) {
  return { "@context": "https://schema.org", "@type": "Course", "@id": `${absoluteUrl(path)}#course`, name, description, url: absoluteUrl(path), provider: { "@type": "Organization", name: "DreamAndScale", url: SITE_URL }, offers: { "@type": "Offer", price: amount / 100, priceCurrency: "INR", url: absoluteUrl(path), category: "Paid" } };
}

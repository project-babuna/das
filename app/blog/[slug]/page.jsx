import { notFound } from "next/navigation";
import BlogArticle from "../../components/BlogArticle";
import { blogPosts, getPost } from "../../blogContent";
import { pageMetadata, breadcrumbs, absoluteUrl } from "../../../lib/seo";
import JsonLd from "../../components/JsonLd";

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }) {
  const post = getPost(params.slug);

  if (!post) return {};
  return pageMetadata({ title: `${post.title} | DreamAndScale`, description: post.description, path: `/blog/${post.slug}`, type: "article" });
}

export default function BlogArticlePage({ params }) {
  const post = getPost(params.slug);

  if (!post) {
    notFound();
  }

  const path = `/blog/${post.slug}`;
  const article = { "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description: post.description, mainEntityOfPage: absoluteUrl(path), url: absoluteUrl(path), image: absoluteUrl("/og/home.jpg"), inLanguage: "en", publisher: { "@type": "Organization", name: "DreamAndScale", url: absoluteUrl("/") }, articleSection: "Business & Entrepreneurship", articleBody: [post.intro, ...post.sections.map(section => `${section.heading}\n${section.body}`)].join("\n\n") };
  return <><JsonLd data={article} /><JsonLd data={breadcrumbs([["Home", "/"], ["Insights", "/blog"], [post.title, path]])} /><BlogArticle post={post} /></>;
}

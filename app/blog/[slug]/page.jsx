import { notFound } from "next/navigation";
import BlogArticle from "../../components/BlogArticle";
import { blogPosts, getPost } from "../../blogContent";

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }) {
  const post = getPost(params.slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | DreamAndScale`,
    description: post.description,
    alternates: {
      canonical: `https://dreamandscale.com/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | DreamAndScale`,
      description: post.description,
      url: `https://dreamandscale.com/blog/${post.slug}`,
      siteName: "DreamAndScale",
      type: "article",
      images: [
        {
          url: "/og/home.jpg",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | DreamAndScale`,
      description: post.description,
      images: ["/og/home.jpg"],
    },
  };
}

export default function BlogArticlePage({ params }) {
  const post = getPost(params.slug);

  if (!post) {
    notFound();
  }

  return <BlogArticle post={post} />;
}

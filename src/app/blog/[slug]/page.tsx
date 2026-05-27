import BlogArticle from "@/components/BlogArticle/BlogArticle";
import { ALL_BLOG_POSTS, getBlogPostBySlug, getRelatedPosts } from "@/mocks/blog";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import React from "react";
import type { Metadata } from "next";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ALL_BLOG_POSTS.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Blog | Atzomx" };
  }

  const t = await getTranslations("blog");
  const title = t(`posts.${post.id}.title`);
  const description = t(`posts.${post.id}.excerpt`);

  return {
    title: `${title} | Atzomx Blog`,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: post.coverImage, alt: title }],
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 2);

  return (
    <div className="site-main flex min-h-screen flex-1 flex-col bg-brand-cream">
      <BlogArticle post={post} relatedPosts={relatedPosts} />
    </div>
  );
}

import BlogArticle from "@/components/BlogArticle/BlogArticle";
import BlogUtilityHeader from "@/components/BlogBanner/BlogUtilityHeader";
import { ALL_BLOG_POSTS, getBlogPostBySlug, getRelatedPosts } from "@/mocks/blog";
import { getLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import React from "react";
import type { Metadata } from "next";

const SITE_URL = "https://atzomx.com.mx";
const SITE_NAME = "Atzomx Café y Coworking";

const OG_LOCALE: Record<string, string> = {
  es: "es_MX",
  en: "en_US",
  de: "de_DE",
  fr: "fr_FR",
};

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
  const locale = await getLocale();
  const title = t(`posts.${post.id}.title`);
  const description = t(`posts.${post.id}.excerpt`);
  const url = `${SITE_URL}/blog/${post.slug}`;
  const pageTitle = `${title} | Atzomx Blog`;
  const imageAlt = title;
  const shareImage = post.imageShare ?? post.coverImage;

  return {
    title: pageTitle,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale] ?? "es_MX",
      type: "article",
      publishedTime: post.publishedAt,
      images: [
        {
          url: shareImage,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [shareImage],
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
  const t = await getTranslations("blog");
  const title = t(`posts.${post.id}.title`);
  const description = t(`posts.${post.id}.excerpt`);
  const url = `${SITE_URL}/blog/${post.slug}`;
  const shareImage = post.imageShare ?? post.coverImage;
  const shareImageAbsolute = shareImage.startsWith("http")
    ? shareImage
    : `${SITE_URL}${shareImage}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    image: shareImageAbsolute,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logos/logo-atzomx.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogUtilityHeader backHref="/blog" backLabelKey="backToBlog" />
      <div className="site-main flex min-h-screen flex-1 flex-col bg-brand-cream">
        <BlogArticle post={post} relatedPosts={relatedPosts} />
      </div>
    </>
  );
}

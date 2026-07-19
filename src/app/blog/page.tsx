import BlogIndex from "@/components/BlogIndex/BlogIndex";
import BlogBanner from "@/components/BlogBanner/BlogBanner";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("blog.metadata");
  const title = t("title");
  const description = t("description");
  const image = "/images/og/blog-og.webp";

  return {
    title,
    description,
    alternates: {
      canonical: "https://atzomx.com.mx/blog",
    },
    openGraph: {
      title,
      description,
      url: "https://atzomx.com.mx/blog",
      siteName: "Atzomx Café y Coworking",
      locale: "es_MX",
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: "Atzomx Blog",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default function BlogPage() {
  return (
    <div className="site-main flex min-h-screen flex-1 flex-col bg-brand-cream">
      <BlogBanner />
      <BlogIndex />
    </div>
  );
}

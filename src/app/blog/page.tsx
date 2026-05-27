import BlogIndex from "@/components/BlogIndex/BlogIndex";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("blog.metadata");

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      images: [{ url: "/images/og/blog-og.webp", alt: "Atzomx Blog" }],
      type: "website",
    },
    alternates: {
      canonical: "https://atzomx.com.mx/blog",
    },
  };
}

export default function BlogPage() {
  return (
    <div className="site-main flex min-h-screen flex-1 flex-col bg-brand-cream">
      <BlogIndex />
    </div>
  );
}

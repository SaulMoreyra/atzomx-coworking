"use client";

import React from "react";
import { ALL_BLOG_POSTS } from "@/mocks/blog";
import { useTranslations } from "next-intl";

const BlogIndexMasthead = () => {
  const t = useTranslations("blog.banner");

  return (
    <section className="relative z-content w-full border-b border-brand-green/15 bg-brand-cream pt-site-menu-sticky text-brand-green">
      <div className="section-container max-w-3xl py-10 md:py-14 lg:max-w-4xl">
        <p className="text-label text-[10px] tracking-[0.22em] text-brand-green/50 md:text-xs">
          {t("articlesCount", { count: ALL_BLOG_POSTS.length })}
        </p>
        <h1 className="text-display mt-3 text-4xl leading-[0.95] tracking-wide md:text-5xl lg:text-6xl">
          {t("title")}
        </h1>
        <div className="mt-5 h-1 border-b border-t border-brand-green/20" aria-hidden="true" />
        <p className="text-body mt-6 max-w-xl text-base leading-relaxed text-brand-green/75 md:text-lg">
          {t("tagline")}
        </p>
      </div>
    </section>
  );
};

export default BlogIndexMasthead;

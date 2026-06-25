"use client";

import HomeSectionIntro from "@/components/ui/HomeSectionIntro/HomeSectionIntro";
import { ALL_BLOG_POSTS } from "@/mocks/blog";
import { useTranslations } from "next-intl";
import React from "react";

const BlogIndexMasthead = () => {
  const t = useTranslations("blog.banner");

  return (
    <section className="relative z-content w-full bg-brand-cream pt-site-menu-sticky text-brand-green">
      <div className="section-container max-w-3xl py-10 md:py-14 lg:max-w-4xl">
        <HomeSectionIntro
          kicker={t("articlesCount", { count: ALL_BLOG_POSTS.length })}
          title={t("title")}
          subtitle={t("tagline")}
          titleClassName="text-3xl md:text-4xl lg:text-5xl"
        />
      </div>
    </section>
  );
};

export default BlogIndexMasthead;

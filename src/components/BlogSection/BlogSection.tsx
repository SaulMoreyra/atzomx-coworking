"use client";

import { FEATURED_BLOG_POSTS } from "@/mocks/blog";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import { ArrowRight } from "react-feather";
import BlogCard from "../BlogCard/BlogCard";
import HomeSectionIntro from "../ui/HomeSectionIntro/HomeSectionIntro";

const BlogSection = () => {
  const t = useTranslations("blog.section");
  const [featured, ...rest] = FEATURED_BLOG_POSTS;

  return (
    <section id="blog" data-header-surface="cream" className="w-full border-t border-brand-green/10 bg-brand-cream py-14 md:py-20">
      <div className="section-container max-w-3xl lg:max-w-4xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-12">
          <HomeSectionIntro kicker={t("sectionTitle")} title={t("title")} subtitle={t("subtitle")} />
          <Link
            href="/blog"
            className="text-label inline-flex min-h-[44px] shrink-0 items-center gap-2 self-start border-b-2 border-brand-green pb-1 text-[10px] tracking-[0.16em] text-brand-green transition-colors duration-200 hover:text-brand-green/80 focus-brand md:text-xs">
            {t("viewAll")}
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

        {featured ? (
          <div className="mt-10 border-t border-brand-green/12 pt-10 md:mt-12 md:pt-12">
            <BlogCard post={featured} variant="lead" />
            {rest.length > 0 ? (
              <ul className="mt-8 flex flex-col md:mt-10" role="list">
                {rest.map(post => (
                  <li key={post.id} className="border-t border-brand-green/12">
                    <BlogCard post={post} variant="index" />
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default BlogSection;

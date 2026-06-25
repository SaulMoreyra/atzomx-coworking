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
    <section
      id="blog"
      data-header-surface="cream"
      className="relative w-full overflow-x-clip bg-brand-cream py-14 md:py-20">
      <div className="section-container relative max-w-3xl lg:max-w-4xl">
        <div className="relative flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-12">
          <div className="relative min-w-0 max-w-xl">
            <HomeSectionIntro
              kicker={t("sectionTitle")}
              title={t("title")}
              subtitle={t("subtitle")}
            />
          </div>
          <Link
            href="/blog"
            className="text-label relative z-[1] inline-flex min-h-[44px] shrink-0 items-center gap-2 self-start text-[10px] tracking-[0.16em] text-brand-green transition-colors duration-200 hover:text-brand-green/75 focus-brand md:text-xs">
            {t("viewAll")}
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

        {featured ? (
          <div className="relative z-[1] mt-10 md:mt-12">
            <div className="bg-brand-main/50 px-5 py-8 md:px-8 md:py-10">
              <BlogCard post={featured} variant="lead" />
            </div>
            {rest.length > 0 ? (
              <ul className="mt-8 flex flex-col divide-y divide-brand-green md:mt-10" role="list">
                {rest.map(post => (
                  <li key={post.id}>
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

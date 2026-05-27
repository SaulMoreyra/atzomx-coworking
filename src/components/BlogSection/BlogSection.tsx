"use client";

import { FEATURED_BLOG_POSTS } from "@/mocks/blog";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import { ArrowRight } from "react-feather";
import BlogCard from "../BlogCard/BlogCard";
import Heading from "../Heading/Heading";
import HighlightShape from "../ui/HighlightShape/HighlightShape";
import Label from "../ui/Label/Label";
import OrganicDivider from "../ui/OrganicDivider/OrganicDivider";

const BlogSection = () => {
  const t = useTranslations("blog.section");
  const [featured, ...rest] = FEATURED_BLOG_POSTS;

  return (
    <>
      <OrganicDivider fill="cream" variant="star" />
      <section id="blog" data-header-surface="cream" className="w-full bg-brand-cream py-14 md:py-20">
        <div className="section-container flex flex-col items-center gap-4 text-center">
          <HighlightShape variant="clover" fill="accent" size={52} className="opacity-90" />
          <Label as="p" className="text-xs tracking-[0.25em]">
            {t("sectionTitle")}
          </Label>
          <Heading className="mt-2">{t("title")}</Heading>
          <p className="text-body max-w-xl text-sm leading-relaxed text-brand-green/65 md:text-base">{t("subtitle")}</p>
        </div>

        {featured ? (
          <div className="section-container mt-10 md:mt-12">
            <BlogCard post={featured} variant="hero" className="mb-6 md:mb-8" />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
              {rest.map(post => (
                <BlogCard key={post.id} post={post} variant="horizontal" />
              ))}
            </div>
          </div>
        ) : null}

        <div className="section-container mt-10 flex justify-center md:mt-12">
          <Link
            href="/blog"
            className="text-label inline-flex min-h-[44px] items-center justify-center gap-2 rounded-brand border border-brand-green bg-brand-green px-6 py-3 text-sm text-brand-cream transition-colors duration-200 hover:bg-brand-green/90 focus-brand">
            {t("viewAll")}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default BlogSection;

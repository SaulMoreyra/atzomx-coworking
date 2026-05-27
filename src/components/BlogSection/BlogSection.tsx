"use client";

import { FEATURED_BLOG_POSTS } from "@/mocks/blog";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
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
      <section id="blog" className="w-full bg-brand-cream py-14 md:py-20">
        <div className="section-container flex flex-col items-center gap-4 text-center">
          <HighlightShape variant="clover" fill="accent" size={52} className="opacity-90" />
          <Label as="p" className="text-xs tracking-[0.25em]">
            {t("sectionTitle")}
          </Label>
          <Heading className="mt-2">{t("title")}</Heading>
        </div>

        {featured ? (
          <div className="section-container mt-10 grid grid-cols-1 gap-4 md:mt-12 md:grid-cols-2 md:gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <BlogCard post={featured} variant="featured" className="h-full" />
            </div>
            <div className="flex flex-col gap-4 md:gap-6 lg:col-span-5">
              {rest.map(post => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        ) : null}

        <div className="section-container mt-10 flex justify-center md:mt-12">
          <Link
            href="/blog"
            className="inline-flex min-h-[44px] items-center justify-center rounded-brand border border-brand-accent bg-brand-accent px-6 py-3 text-label text-base text-brand-green transition-colors duration-200 hover:border-brand-accent/80 hover:bg-brand-accent/80 focus-brand">
            {t("viewAll")}
          </Link>
        </div>
      </section>
    </>
  );
};

export default BlogSection;

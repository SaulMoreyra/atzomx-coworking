"use client";

import { type BlogCategory, type BlogPost } from "@/common/types/blogTypes";
import BlogCard from "@/components/BlogCard/BlogCard";
import { ALL_BLOG_POSTS } from "@/mocks/blog";
import { useTranslations } from "next-intl";
import React, { useMemo, useState } from "react";
import cx from "classnames";

const FILTER_CATEGORIES: Array<BlogCategory | "all"> = ["all", "coworking", "coffee", "community", "oaxaca"];

const getLeadPost = (posts: BlogPost[]) => posts.find(post => post.featured) ?? posts[0];

const BlogIndex = () => {
  const t = useTranslations("blog");
  const [activeCategory, setActiveCategory] = useState<BlogCategory | "all">("all");

  const leadPost = useMemo(() => getLeadPost(ALL_BLOG_POSTS), []);

  const indexPosts = useMemo(() => {
    if (activeCategory === "all") {
      return ALL_BLOG_POSTS.filter(post => post.id !== leadPost?.id);
    }
    return ALL_BLOG_POSTS.filter(post => post.category === activeCategory);
  }, [activeCategory, leadPost?.id]);

  const showLead = activeCategory === "all" && leadPost != null;
  const showEmpty = !showLead && indexPosts.length === 0;

  return (
    <section className="w-full bg-brand-cream pb-14 pt-8 md:pb-20 md:pt-10">
      <div className="section-container max-w-3xl lg:max-w-4xl">
        <div className="mb-8 flex flex-col gap-6 md:mb-10 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <p className="text-body max-w-md text-sm leading-relaxed text-brand-green/70 md:text-base">
            {t("index.intro", { count: ALL_BLOG_POSTS.length })}
          </p>

          <nav aria-label={t("index.filterLabel")} className="shrink-0 lg:min-w-[14rem]">
            <span className="text-label mb-2 block text-[10px] tracking-[0.2em] text-brand-green/45">
              {t("index.filterLabel")}
            </span>
            <ul className="flex flex-wrap gap-x-4 gap-y-1 lg:flex-col lg:gap-y-0" role="list">
              {FILTER_CATEGORIES.map(category => {
                const isActive = activeCategory === category;
                const label = category === "all" ? t("index.filterAll") : t(`categories.${category}`);

                return (
                  <li key={category}>
                    <button
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => {
                        setActiveCategory(category);
                      }}
                      className={cx(
                        "text-label min-h-[44px] border-b-2 py-2 text-left text-[10px] tracking-[0.16em] transition-colors duration-200 focus-brand md:text-xs",
                        isActive
                          ? "border-brand-green text-brand-green"
                          : "border-transparent text-brand-green/50 hover:border-brand-green/25 hover:text-brand-green/80"
                      )}>
                      {label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {showLead ? (
          <div className="mb-10 border-b border-brand-green/15 pb-10 md:mb-12 md:pb-12">
            <BlogCard post={leadPost} variant="lead" />
          </div>
        ) : null}

        {showEmpty ? (
          <p className="text-body border-t border-brand-green/12 py-10 text-center text-sm text-brand-green/65 md:text-base">
            {t("index.emptyState")}
          </p>
        ) : (
          <div className="border-t border-brand-green/12" role="feed" aria-label={t("banner.title")}>
            {indexPosts.map(post => (
              <BlogCard key={post.id} post={post} variant="index" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogIndex;

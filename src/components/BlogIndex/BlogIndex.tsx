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
        <p className="text-body max-w-2xl text-sm leading-relaxed text-brand-green/70 md:text-base">
          {t("index.intro", { count: ALL_BLOG_POSTS.length })}
        </p>

        <nav aria-label={t("index.filterLabel")} className="mt-8 md:mt-10">
          <span className="text-label mb-2 block text-[10px] tracking-[0.2em] text-brand-green/45">
            {t("index.filterLabel")}
          </span>
          <ul className="-mx-0.5 flex flex-wrap gap-2" role="list">
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
                      "text-label min-h-[44px] rounded-none border px-3 py-2 text-[10px] tracking-[0.14em] transition-colors duration-200 focus-brand md:text-xs",
                      isActive
                        ? "border-brand-green bg-brand-green text-brand-cream"
                        : "border-brand-green bg-transparent text-brand-green/65 hover:bg-brand-main/50 hover:text-brand-green"
                    )}>
                    {label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {showLead ? (
          <div className="mt-10 bg-brand-main/50 px-5 py-8 md:mt-12 md:px-8 md:py-10">
            <BlogCard post={leadPost} variant="lead" />
          </div>
        ) : null}

        {showEmpty ? (
          <p className="text-body mt-10 py-8 text-sm text-brand-green/65 md:text-base">
            {t("index.emptyState")}
          </p>
        ) : (
          <ol
            className={cx("divide-y divide-brand-green", showLead ? "mt-10 md:mt-12" : "mt-10 md:mt-12")}
            role="feed"
            aria-label={t("banner.title")}>
            {indexPosts.map(post => (
              <li key={post.id} className="min-w-0">
                <BlogCard post={post} variant="index" />
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
};

export default BlogIndex;

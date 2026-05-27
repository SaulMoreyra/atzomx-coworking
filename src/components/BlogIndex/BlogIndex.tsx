"use client";

import { type BlogCategory, type BlogPost } from "@/common/types/blogTypes";
import BlogCard from "@/components/BlogCard/BlogCard";
import HighlightShape from "@/components/ui/HighlightShape/HighlightShape";
import { ALL_BLOG_POSTS } from "@/mocks/blog";
import { useTranslations } from "next-intl";
import React, { useMemo, useState } from "react";
import cx from "classnames";

const FILTER_CATEGORIES: Array<BlogCategory | "all"> = ["all", "coworking", "coffee", "community", "oaxaca"];

const getHeroPost = (posts: BlogPost[]) =>
  posts.find(post => post.featured) ?? posts[0];

const BlogIndex = () => {
  const t = useTranslations("blog");
  const [activeCategory, setActiveCategory] = useState<BlogCategory | "all">("all");

  const heroPost = useMemo(() => getHeroPost(ALL_BLOG_POSTS), []);

  const filteredPosts = useMemo(() => {
    const withoutHero = ALL_BLOG_POSTS.filter(post => post.id !== heroPost?.id);
    if (activeCategory === "all") return withoutHero;
    return ALL_BLOG_POSTS.filter(post => post.category === activeCategory);
  }, [activeCategory, heroPost?.id]);

  const showHero = activeCategory === "all" && heroPost != null;
  const showEmpty = !showHero && filteredPosts.length === 0;

  return (
    <section className="w-full bg-brand-cream py-10 md:py-16">
      <div className="section-container max-w-6xl">
        <div className="mb-8 flex flex-col gap-6 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-2">
            <HighlightShape variant="clover" fill="accent" size={40} className="opacity-90" />
            <p className="text-body text-sm text-brand-green/65 md:text-base">
              {t("index.intro", { count: ALL_BLOG_POSTS.length })}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-label text-[10px] tracking-[0.2em] text-brand-green/50">{t("index.filterLabel")}</span>
            <div className="flex flex-wrap gap-2" role="group" aria-label={t("index.filterLabel")}>
              {FILTER_CATEGORIES.map(category => {
                const isActive = activeCategory === category;
                const label = category === "all" ? t("index.filterAll") : t(`categories.${category}`);

                return (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => {
                      setActiveCategory(category);
                    }}
                    className={cx(
                      "text-label min-h-[44px] rounded-full border px-4 py-2 text-[10px] tracking-[0.14em] transition-colors duration-200 focus-brand md:text-xs",
                      isActive
                        ? "border-brand-green bg-brand-green text-brand-cream"
                        : "border-brand-green/20 bg-brand-main/40 text-brand-green hover:border-brand-green/35 hover:bg-brand-main/70"
                    )}>
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {showHero ? (
          <div className="mb-8 md:mb-10">
            <BlogCard post={heroPost} variant="hero" />
          </div>
        ) : null}

        {showEmpty ? (
          <p className="text-body rounded-brand border border-brand-green/10 bg-brand-main/30 px-6 py-10 text-center text-sm text-brand-green/70 md:text-base">
            {t("index.emptyState")}
          </p>
        ) : (
          <div
            className={cx(
              "grid grid-cols-1 gap-5 md:gap-6",
              activeCategory === "all" ? "lg:grid-cols-12" : "md:grid-cols-2"
            )}>
            {activeCategory === "all" ? (
              <>
                {filteredPosts[0] ? (
                  <div className="lg:col-span-7">
                    <BlogCard post={filteredPosts[0]} variant="featured" className="h-full" />
                  </div>
                ) : null}
                {filteredPosts.length > 1 ? (
                  <div className="flex flex-col gap-5 md:gap-6 lg:col-span-5">
                    {filteredPosts.slice(1, 3).map(post => (
                      <BlogCard key={post.id} post={post} variant="horizontal" />
                    ))}
                  </div>
                ) : null}
                {filteredPosts[3] ? (
                  <div className="lg:col-span-12">
                    <BlogCard post={filteredPosts[3]} variant="horizontal" />
                  </div>
                ) : null}
              </>
            ) : (
              filteredPosts.map(post => <BlogCard key={post.id} post={post} variant="featured" className="h-full" />)
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogIndex;

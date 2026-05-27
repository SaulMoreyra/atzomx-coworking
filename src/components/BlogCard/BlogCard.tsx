"use client";

import { type BlogCategory, type BlogPost } from "@/common/types/blogTypes";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React, { type FC } from "react";
import cx from "classnames";
import { ArrowRight, Clock } from "react-feather";

interface BlogCardProps {
  post: BlogPost;
  variant?: "default" | "featured" | "horizontal" | "hero";
  className?: string;
}

const categoryAccent: Record<BlogCategory, string> = {
  coworking: "bg-brand-main text-brand-green border-brand-green/20",
  coffee: "bg-brand-accent/80 text-brand-green border-brand-green/15",
  community: "bg-brand-cream text-brand-green border-brand-green/20",
  oaxaca: "bg-brand-main/70 text-brand-green border-brand-green/15",
};

const BlogCard: FC<BlogCardProps> = ({ post, variant = "default", className }) => {
  const t = useTranslations("blog");
  const locale = useLocale();

  const formattedDate = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(post.publishedAt));

  const title = t(`posts.${post.id}.title`);
  const excerpt = t(`posts.${post.id}.excerpt`);
  const categoryLabel = t(`categories.${post.category}`);
  const categoryClass = categoryAccent[post.category];

  const metaRow = (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] uppercase tracking-[0.16em] text-brand-green/55">
      <span className={cx("border px-2 py-0.5", categoryClass)}>{categoryLabel}</span>
      <span>{formattedDate}</span>
      <span aria-hidden="true">·</span>
      <span className="inline-flex items-center gap-1">
        <Clock size={11} aria-hidden="true" />
        {t("readingTime", { minutes: post.readingMinutes })}
      </span>
    </div>
  );

  if (variant === "hero") {
    return (
      <article
        className={cx(
          "group relative overflow-hidden border border-brand-green/12 bg-brand-green shadow-[0_16px_40px_-20px_rgba(47,62,34,0.35)] transition-shadow duration-300 hover:shadow-[0_20px_48px_-18px_rgba(47,62,34,0.4)]",
          className
        )}>
        <Link href={`/blog/${post.slug}`} className="focus-brand relative block aspect-[4/5] sm:aspect-[16/9] md:aspect-[21/9]">
          <Image
            src={post.coverImage}
            alt={title}
            fill
            priority
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-brand-green via-brand-green/55 to-brand-green/10"
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6 text-brand-cream sm:p-8 md:gap-4 md:p-10">
            <span className="text-label w-fit rounded-full border border-brand-cream/25 bg-brand-cream/10 px-3 py-1 text-[10px] tracking-[0.2em] text-brand-cream">
              {t("index.featuredLabel")}
            </span>
            <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-brand-cream/70">
              <span className="border border-brand-cream/20 bg-brand-cream/10 px-2 py-0.5">{categoryLabel}</span>
              <span>{formattedDate}</span>
              <span aria-hidden="true">·</span>
              <span>{t("readingTime", { minutes: post.readingMinutes })}</span>
            </div>
            <h2 className="text-label max-w-3xl text-xl normal-case leading-snug tracking-wide text-brand-cream md:text-3xl lg:text-4xl">
              {title}
            </h2>
            <p className="text-body max-w-2xl line-clamp-2 text-sm leading-relaxed text-brand-cream/80 md:text-base">
              {excerpt}
            </p>
            <span className="text-label inline-flex min-h-[44px] w-fit items-center gap-2 text-xs tracking-[0.14em] text-brand-cream transition-transform duration-200 group-hover:translate-x-1">
              {t("readMore")}
              <ArrowRight size={14} aria-hidden="true" />
            </span>
          </div>
        </Link>
      </article>
    );
  }

  if (variant === "horizontal") {
    return (
      <article
        className={cx(
          "group flex h-full flex-col overflow-hidden border border-brand-green/10 bg-brand-cream transition-all duration-200 sm:flex-row",
          "hover:border-brand-green/22 hover:shadow-[0_12px_32px_-16px_rgba(47,62,34,0.2)]",
          className
        )}>
        <Link
          href={`/blog/${post.slug}`}
          className="focus-brand relative block aspect-[16/10] shrink-0 overflow-hidden sm:aspect-auto sm:w-[38%] sm:min-h-[200px]">
          <Image
            src={post.coverImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 100vw, 40vw"
          />
        </Link>
        <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
          {metaRow}
          <Link href={`/blog/${post.slug}`} className="focus-brand">
            <h3 className="text-label text-base normal-case leading-snug tracking-wide text-brand-green transition-colors duration-200 group-hover:text-brand-green/75 md:text-lg">
              {title}
            </h3>
          </Link>
          <p className="text-body line-clamp-2 flex-1 text-sm leading-relaxed text-brand-green/65">{excerpt}</p>
          <Link
            href={`/blog/${post.slug}`}
            className="text-label inline-flex min-h-[44px] items-center gap-2 text-xs text-brand-green transition-all duration-200 group-hover:gap-3 focus-brand">
            {t("readMore")}
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </article>
    );
  }

  const isFeatured = variant === "featured";

  return (
    <article
      className={cx(
        "group flex h-full flex-col overflow-hidden border border-brand-green/10 bg-brand-cream transition-all duration-200",
        "hover:border-brand-green/22 hover:shadow-[0_12px_32px_-16px_rgba(47,62,34,0.2)]",
        className
      )}>
      <Link
        href={`/blog/${post.slug}`}
        className={cx(
          "focus-brand relative block overflow-hidden",
          isFeatured ? "aspect-[16/10]" : "aspect-[16/10]"
        )}>
        <Image
          src={post.coverImage}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          sizes={isFeatured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
        />
        {isFeatured ? (
          <span className="text-label absolute left-4 top-4 rounded-full border border-brand-cream/30 bg-brand-green/75 px-3 py-1 text-[10px] tracking-[0.18em] text-brand-cream backdrop-blur-sm">
            {t("index.featuredLabel")}
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
        {metaRow}
        <Link href={`/blog/${post.slug}`} className="focus-brand">
          <h3
            className={cx(
              "text-label normal-case leading-snug tracking-wide text-brand-green transition-colors duration-200 group-hover:text-brand-green/75",
              isFeatured ? "text-lg md:text-xl lg:text-2xl" : "text-base md:text-lg"
            )}>
            {title}
          </h3>
        </Link>
        <p
          className={cx(
            "text-body flex-1 leading-relaxed text-brand-green/65",
            isFeatured ? "line-clamp-4 text-sm md:text-base" : "line-clamp-3 text-sm"
          )}>
          {excerpt}
        </p>
        <Link
          href={`/blog/${post.slug}`}
          className="text-label inline-flex min-h-[44px] items-center gap-2 text-xs text-brand-green transition-all duration-200 group-hover:gap-3 focus-brand">
          {t("readMore")}
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;

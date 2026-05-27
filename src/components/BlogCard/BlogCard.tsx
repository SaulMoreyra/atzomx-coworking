"use client";

import { type BlogPost } from "@/common/types/blogTypes";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React, { type FC } from "react";
import cx from "classnames";
import { ArrowRight } from "react-feather";

interface BlogCardProps {
  post: BlogPost;
  variant?: "default" | "featured";
  className?: string;
}

const BlogCard: FC<BlogCardProps> = ({ post, variant = "default", className }) => {
  const t = useTranslations("blog");
  const locale = useLocale();

  const formattedDate = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(post.publishedAt));

  const isFeatured = variant === "featured";

  return (
    <article
      className={cx(
        "group flex h-full flex-col border border-brand-green/10 bg-brand-cream transition-colors duration-200 hover:border-brand-green/25",
        className
      )}>
      <Link
        href={`/blog/${post.slug}`}
        className="focus-brand relative block aspect-[16/10] overflow-hidden">
        <Image
          src={post.coverImage}
          alt={t(`posts.${post.id}.title`)}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          sizes={isFeatured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
        />
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
        <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-brand-green/50">
          <span className="border border-brand-green/15 bg-brand-main/50 px-2 py-1 text-brand-green">
            {t(`categories.${post.category}`)}
          </span>
          <span>{formattedDate}</span>
          <span aria-hidden="true">·</span>
          <span>{t("readingTime", { minutes: post.readingMinutes })}</span>
        </div>

        <Link href={`/blog/${post.slug}`} className="focus-brand">
          <h3
            className={cx(
              "text-label normal-case tracking-wide text-brand-green transition-colors duration-200 group-hover:text-brand-green/75",
              isFeatured ? "text-lg md:text-xl" : "text-base"
            )}>
            {t(`posts.${post.id}.title`)}
          </h3>
        </Link>

        <p className="text-body line-clamp-3 flex-1 text-sm leading-relaxed text-brand-green/65">
          {t(`posts.${post.id}.excerpt`)}
        </p>

        <Link
          href={`/blog/${post.slug}`}
          className="text-label inline-flex min-h-[44px] items-center gap-2 text-xs text-brand-green transition-colors duration-200 hover:text-brand-green/70 focus-brand">
          {t("readMore")}
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;

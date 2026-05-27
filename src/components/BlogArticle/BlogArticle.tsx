"use client";

import { type BlogPost } from "@/common/types/blogTypes";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React, { type FC } from "react";
import Label from "../ui/Label/Label";
import OrganicDivider from "../ui/OrganicDivider/OrganicDivider";
import { ArrowLeft } from "react-feather";

interface BlogArticleProps {
  post: BlogPost;
}

const BlogArticle: FC<BlogArticleProps> = ({ post }) => {
  const t = useTranslations("blog");
  const locale = useLocale();

  const formattedDate = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(post.publishedAt));

  const paragraphs = t.raw(`posts.${post.id}.paragraphs`) as string[];

  return (
    <>
      <OrganicDivider fill="cream" variant="cloud" />
      <article className="w-full bg-brand-cream pb-16 pt-8 md:pb-20 md:pt-12">
        <div className="section-container max-w-3xl">
          <Link
            href="/blog"
            className="text-label mb-8 inline-flex min-h-[44px] items-center gap-2 text-xs text-brand-green/70 transition-colors duration-200 hover:text-brand-green focus-brand">
            <ArrowLeft size={16} aria-hidden="true" />
            {t("backToBlog")}
          </Link>

          <div className="mb-4 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-brand-green/50">
            <span className="border border-brand-green/15 bg-brand-main px-2 py-1 text-brand-green">
              {t(`categories.${post.category}`)}
            </span>
            <span>{t("publishedOn", { date: formattedDate })}</span>
            <span aria-hidden="true">·</span>
            <span>{t("readingTime", { minutes: post.readingMinutes })}</span>
          </div>

          <Label as="h1" className="text-label block text-2xl normal-case tracking-wide text-brand-green md:text-4xl">
            {t(`posts.${post.id}.title`)}
          </Label>

          <div className="relative mt-8 aspect-[16/9] overflow-hidden border border-brand-green/10">
            <Image
              src={post.coverImage}
              alt={t(`posts.${post.id}.title`)}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>

          <div className="mt-8 space-y-5">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-body text-base leading-relaxed text-brand-green/80 md:text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogArticle;

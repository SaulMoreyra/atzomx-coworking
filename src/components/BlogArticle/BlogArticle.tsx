"use client";

import { type BlogPost } from "@/common/types/blogTypes";
import BlogCard from "@/components/BlogCard/BlogCard";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React, { type FC } from "react";
import Label from "../ui/Label/Label";
import OrganicDivider from "../ui/OrganicDivider/OrganicDivider";
import { ArrowLeft, Clock } from "react-feather";

interface BlogArticleProps {
  post: BlogPost;
  relatedPosts?: BlogPost[];
}

const BlogArticle: FC<BlogArticleProps> = ({ post, relatedPosts = [] }) => {
  const t = useTranslations("blog");
  const locale = useLocale();

  const formattedDate = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(post.publishedAt));

  const paragraphs = t.raw(`posts.${post.id}.paragraphs`) as string[];
  const title = t(`posts.${post.id}.title`);
  const [leadParagraph, ...bodyParagraphs] = paragraphs;

  return (
    <>
      <article className="w-full bg-brand-cream pb-12 pt-8 md:pb-16 md:pt-10">
        <div className="section-container max-w-3xl">
          <Link
            href="/blog"
            className="text-label mb-8 inline-flex min-h-[44px] items-center gap-2 text-xs text-brand-green/70 transition-colors duration-200 hover:text-brand-green focus-brand">
            <ArrowLeft size={16} aria-hidden="true" />
            {t("backToBlog")}
          </Link>

          <div className="mb-5 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-brand-green/50">
            <span className="border border-brand-green/15 bg-brand-main px-2 py-1 text-brand-green">
              {t(`categories.${post.category}`)}
            </span>
            <span>{t("publishedOn", { date: formattedDate })}</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock size={11} aria-hidden="true" />
              {t("readingTime", { minutes: post.readingMinutes })}
            </span>
          </div>

          <Label as="h1" className="text-label block text-2xl normal-case leading-tight tracking-wide text-brand-green md:text-4xl lg:text-[2.75rem]">
            {title}
          </Label>

          <div className="relative mt-8 aspect-[16/9] overflow-hidden border border-brand-green/10 bg-brand-main/30">
            <Image
              src={post.coverImage}
              alt={title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>

          {leadParagraph ? (
            <p className="text-body mt-8 border-l-2 border-brand-accent pl-5 text-lg font-medium leading-relaxed text-brand-green/90 md:text-xl">
              {leadParagraph}
            </p>
          ) : null}

          <div className="mt-8 space-y-5">
            {bodyParagraphs.map((paragraph, index) => (
              <p key={index} className="text-body text-base leading-[1.75] text-brand-green/80 md:text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 ? (
        <>
          <OrganicDivider fill="main" variant="wave" />
          <section className="w-full bg-brand-main py-12 md:py-16" aria-labelledby="related-posts-heading">
            <div className="section-container max-w-6xl">
              <div className="mb-8 flex flex-col gap-2 md:mb-10">
                <Label as="p" className="text-xs tracking-[0.25em]">
                  {t("article.sectionTitle")}
                </Label>
                <h2 id="related-posts-heading" className="text-label text-xl normal-case tracking-wide text-brand-green md:text-2xl">
                  {t("article.relatedTitle")}
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
                {relatedPosts.map(related => (
                  <BlogCard key={related.id} post={related} variant="horizontal" />
                ))}
              </div>
            </div>
          </section>
        </>
      ) : null}
    </>
  );
};

export default BlogArticle;

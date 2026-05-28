"use client";

import { type BlogPost } from "@/common/types/blogTypes";
import BlogCard from "@/components/BlogCard/BlogCard";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import React, { type FC } from "react";
import { Clock } from "react-feather";

interface BlogArticleProps {
  post: BlogPost;
  relatedPosts?: BlogPost[];
}

/* Hallmark · macrostructure: Long Document · tone: editorial · anchor hue: forest-green
 * redesign: /blog/[slug] · brand preserved · enrichment: none
 */

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
        <div className="section-container max-w-[65ch] lg:max-w-3xl">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] uppercase tracking-[0.16em] text-brand-green/50">
            <span className="border border-brand-green/15 bg-brand-main/60 px-2 py-0.5 text-brand-green">
              {t(`categories.${post.category}`)}
            </span>
            <span>{formattedDate}</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock size={11} aria-hidden="true" />
              {t("readingTime", { minutes: post.readingMinutes })}
            </span>
          </div>

          <h1 className="text-display-prose mt-5 text-3xl leading-[1.05] text-brand-green md:text-4xl lg:text-[2.75rem]">
            {title}
          </h1>

          <div
            className="mt-6 h-px w-full bg-brand-green/15"
            aria-hidden="true"
          />

          {leadParagraph ? (
            <p className="text-body mt-8 text-lg font-medium leading-[1.65] text-brand-green/90 md:text-xl">
              {leadParagraph}
            </p>
          ) : null}

          <figure className="relative mx-auto mt-8 max-w-full overflow-hidden border border-brand-green/12 bg-brand-main/20">
            <div className="relative aspect-[3/2] w-full max-h-[420px]">
              <Image
                src={post.coverImage}
                alt={title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 672px"
              />
            </div>
          </figure>

          <div className="mt-10 space-y-6">
            {bodyParagraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-body text-base leading-[1.75] text-brand-green/82 md:text-[1.0625rem]">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 ? (
        <section
          className="w-full border-t border-brand-green/15 bg-brand-cream py-12 md:py-14"
          aria-labelledby="related-posts-heading">
          <div className="section-container max-w-3xl lg:max-w-4xl">
            <h2
              id="related-posts-heading"
              className="text-label mb-6 text-[10px] tracking-[0.2em] text-brand-green/50 md:mb-8">
              {t("article.relatedTitle")}
            </h2>
            <div className="border-t border-brand-green/12">
              {relatedPosts.map(related => (
                <BlogCard key={related.id} post={related} variant="index" />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
};

export default BlogArticle;

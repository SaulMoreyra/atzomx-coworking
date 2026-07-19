"use client";

import { type BlogContentBlock, type BlogPost } from "@/common/types/blogTypes";
import BlogCard from "@/components/BlogCard/BlogCard";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import React, { type FC, type ReactNode } from "react";
import { Clock } from "react-feather";

interface BlogArticleProps {
  post: BlogPost;
  relatedPosts?: BlogPost[];
}

/* Hallmark · macrostructure: Long Document · tone: editorial · anchor hue: forest-green
 * redesign: /blog/[slug] · brand preserved · enrichment: none
 * typographic prose · square chips · related list on brand-main band
 */

const renderInlineMarks = (text: string, keyPrefix = "t"): ReactNode => {
  const boldParts = text.split(/(\*\*[^*]+\*\*)/g);

  return boldParts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={`${keyPrefix}-b-${index}`} className="font-semibold text-brand-green">
          {part.slice(2, -2)}
        </strong>
      );
    }

    const italicParts = part.split(/(\*[^*]+\*)/g);
    return italicParts.map((italicPart, italicIndex) => {
      if (italicPart.startsWith("*") && italicPart.endsWith("*") && italicPart.length > 2) {
        return (
          <em key={`${keyPrefix}-i-${index}-${italicIndex}`} className="italic">
            {italicPart.slice(1, -1)}
          </em>
        );
      }
      return italicPart;
    });
  });
};

const isBlogContentBlock = (value: unknown): value is BlogContentBlock => {
  if (!value || typeof value !== "object" || !("type" in value)) return false;
  const block = value as BlogContentBlock;
  return (
    block.type === "paragraph" ||
    block.type === "heading" ||
    block.type === "list" ||
    block.type === "image"
  );
};

const BlogArticleBody: FC<{ blocks: BlogContentBlock[] }> = ({ blocks }) => (
  <div className="mt-10 space-y-6">
    {blocks.map((block, index) => {
      if (block.type === "heading") {
        const HeadingTag = block.level === 2 ? "h2" : "h3";
        return (
          <HeadingTag
            key={index}
            className={
              block.level === 2
                ? "text-display-prose pt-4 text-xl leading-snug text-brand-green md:text-2xl"
                : "text-label pt-2 text-sm normal-case tracking-wide text-brand-green md:text-base"
            }>
            {block.text}
          </HeadingTag>
        );
      }

      if (block.type === "list") {
        return (
          <ul
            key={index}
            className="flex list-none flex-col gap-3 border-l-2 border-brand-green pl-4"
            role="list">
            {block.items.map((item, itemIndex) => (
              <li
                key={itemIndex}
                className="text-body text-base leading-[1.75] text-brand-green/82 md:text-[1.0625rem]">
                {renderInlineMarks(item)}
              </li>
            ))}
          </ul>
        );
      }

      if (block.type === "image") {
        return (
          <figure
            key={index}
            className="relative mx-auto max-w-full overflow-hidden bg-brand-main/20">
            <div className="relative aspect-[3/2] w-full max-h-[420px]">
              <Image
                src={block.src}
                alt={block.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 672px"
              />
            </div>
          </figure>
        );
      }

      return (
        <p
          key={index}
          className="text-body text-base leading-[1.75] text-brand-green/82 md:text-[1.0625rem]">
          {renderInlineMarks(block.text)}
        </p>
      );
    })}
  </div>
);

const BlogArticle: FC<BlogArticleProps> = ({ post, relatedPosts = [] }) => {
  const t = useTranslations("blog");
  const locale = useLocale();

  const formattedDate = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(post.publishedAt));

  const title = t(`posts.${post.id}.title`);
  const rawBlocks = t.raw(`posts.${post.id}.blocks`);
  const hasBlocks = Array.isArray(rawBlocks) && rawBlocks.every(isBlogContentBlock);

  const paragraphs = hasBlocks ? [] : ((t.raw(`posts.${post.id}.paragraphs`) as string[]) ?? []);
  const [leadParagraph, ...bodyParagraphs] = paragraphs;
  const [leadBlock, ...bodyBlocks] = hasBlocks ? (rawBlocks as BlogContentBlock[]) : [];

  const leadText =
    leadBlock?.type === "paragraph" ? leadBlock.text : leadParagraph;

  return (
    <>
      <article className="w-full bg-brand-cream pb-12 pt-site-menu-sticky md:pb-16">
        <div className="section-container max-w-[65ch] lg:max-w-3xl">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] uppercase tracking-[0.16em] text-brand-green/50">
            <span className="rounded-none border border-brand-green bg-brand-main/60 px-2 py-0.5 text-brand-green">
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

          <div className="mt-6 h-px w-full bg-brand-green" aria-hidden="true" />

          {leadText ? (
            <p className="text-body mt-8 text-lg font-medium leading-[1.65] text-brand-green/90 md:text-xl">
              {renderInlineMarks(leadText)}
            </p>
          ) : null}

          <figure className="relative mx-auto mt-8 max-w-full overflow-hidden bg-brand-main/20">
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

          {hasBlocks ? (
            <BlogArticleBody blocks={bodyBlocks} />
          ) : (
            <div className="mt-10 space-y-6">
              {bodyParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-body text-base leading-[1.75] text-brand-green/82 md:text-[1.0625rem]">
                  {paragraph}
                </p>
              ))}
            </div>
          )}
        </div>
      </article>

      {relatedPosts.length > 0 ? (
        <section
          className="w-full bg-brand-main py-12 md:py-14"
          aria-labelledby="related-posts-heading">
          <div className="section-container max-w-3xl lg:max-w-4xl">
            <h2
              id="related-posts-heading"
              className="text-display-prose mb-6 text-xl text-brand-green md:mb-8 md:text-2xl">
              {t("article.relatedTitle")}
            </h2>
            <ul className="flex flex-col divide-y divide-brand-green" role="list">
              {relatedPosts.map(related => (
                <li key={related.id} className="min-w-0">
                  <BlogCard post={related} variant="index" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
};

export default BlogArticle;

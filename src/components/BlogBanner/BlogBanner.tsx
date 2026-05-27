"use client";

import Link from "next/link";
import React from "react";
import { ArrowLeft } from "react-feather";
import { type Locale } from "@/i18n/config";
import { ALL_BLOG_POSTS } from "@/mocks/blog";
import { useLocale, useTranslations } from "next-intl";
import HighlightShape from "../ui/HighlightShape/HighlightShape";
import Label from "../ui/Label/Label";
import LocaleSwitch from "../LocaleSwitch/LocaleSwitch";
import OrganicDivider from "../ui/OrganicDivider/OrganicDivider";

const BlogBanner = () => {
  const t = useTranslations("blog.banner");
  const locale = useLocale() as Locale;

  return (
    <>
      <header className="site-header-shell site-header-bar w-full">
        <div className="site-header-bar-inner flex items-center border-b border-brand-green/10 bg-brand-main text-brand-green">
          <div className="section-container flex h-[4.5rem] w-full items-center justify-between gap-3">
            <Link
              href="/"
              className="focus-brand inline-flex min-h-[44px] items-center gap-2 rounded-sm text-brand-green/70 transition-colors duration-200 hover:text-brand-green">
              <ArrowLeft size={18} aria-hidden="true" />
              <span className="text-label text-[10px] tracking-[0.14em] xl:text-xs">{t("backHome")}</span>
            </Link>
            <Link
              href="/"
              className="text-display rounded-sm text-lg tracking-wide focus-brand xl:text-xl"
              aria-label={t("backHome")}>
              ATZOMX
            </Link>
            <LocaleSwitch locale={locale} />
          </div>
        </div>
      </header>

      <section className="relative z-content w-full bg-brand-main pb-0 pt-site-menu-sticky text-brand-green">
        <div className="section-container flex max-w-5xl flex-col items-center py-8 text-center md:py-12">
          <HighlightShape variant="star" fill="accent" size={48} className="mb-4 opacity-90" />
          <Label as="h1" className="text-sm tracking-[0.25em] md:text-base">
            {t("title")}
          </Label>
          <p className="text-body mt-3 max-w-xl text-sm leading-relaxed text-brand-green/70 md:text-base">
            {t("tagline")}
          </p>
          <p className="text-label mt-4 text-[10px] tracking-[0.22em] text-brand-green/50 md:text-xs">
            {t("articlesCount", { count: ALL_BLOG_POSTS.length })}
          </p>
        </div>

        <OrganicDivider fill="cream" variant="clover" className="w-full shrink-0" />
      </section>
    </>
  );
};

export default BlogBanner;

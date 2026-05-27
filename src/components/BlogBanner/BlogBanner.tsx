"use client";

import Link from "next/link";
import React from "react";
import { type Locale } from "@/i18n/config";
import { useLocale, useTranslations } from "next-intl";
import HighlightShape from "../ui/HighlightShape/HighlightShape";
import Label from "../ui/Label/Label";
import LocaleSwitch from "../LocaleSwitch/LocaleSwitch";

const BlogBanner = () => {
  const t = useTranslations("blog.banner");
  const locale = useLocale() as Locale;

  return (
    <>
      <header className="site-header-shell site-header-bar w-full">
        <div className="site-header-bar-inner flex items-center border-b border-brand-green/10 bg-brand-main text-brand-green">
          <div className="section-container flex h-[4.5rem] w-full items-center justify-between">
            <Link
              href="/"
              className="text-display rounded-sm text-xl tracking-wide focus-brand sm:text-2xl"
              aria-label="Inicio">
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
          <p className="text-body mt-3 max-w-xl text-sm text-brand-green/70 md:text-base">
            {t("tagline")}
          </p>
        </div>
      </section>
    </>
  );
};

export default BlogBanner;

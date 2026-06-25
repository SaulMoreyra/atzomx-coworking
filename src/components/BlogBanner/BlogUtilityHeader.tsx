"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { ArrowLeft } from "react-feather";
import { type Locale } from "@/i18n/config";
import { useLocale, useTranslations } from "next-intl";
import LocaleSwitch from "../LocaleSwitch/LocaleSwitch";

interface BlogUtilityHeaderProps {
  backHref?: string;
  backLabelKey?: "banner.backHome" | "backToBlog";
}

const BlogUtilityHeader = ({
  backHref = "/",
  backLabelKey = "banner.backHome",
}: BlogUtilityHeaderProps) => {
  const t = useTranslations("blog");
  const locale = useLocale() as Locale;
  const backLabel = backLabelKey === "backToBlog" ? t("backToBlog") : t("banner.backHome");

  return (
    <header className="site-header-shell site-header-bar w-full">
      <div className="site-header-bar-inner flex items-center border-b border-brand-green bg-brand-main text-brand-green">
        <div className="section-container flex h-[4.5rem] w-full items-center justify-between gap-3">
          <Link
            href={backHref}
            className="focus-brand inline-flex min-h-[44px] items-center gap-2 rounded-sm text-brand-green/70 transition-colors duration-200 hover:text-brand-green">
            <ArrowLeft size={18} aria-hidden="true" />
            <span className="text-label text-[10px] tracking-[0.14em] xl:text-xs">{backLabel}</span>
          </Link>
          <Link href="/" className="focus-brand shrink-0 rounded-sm" aria-label={t("banner.backHome")}>
            <Image
              src="/images/logos/logo-atzomx.svg"
              alt="Atzomx"
              width={237}
              height={49}
              priority
              unoptimized
              className="h-6 w-auto xl:h-7"
            />
          </Link>
          <LocaleSwitch locale={locale} />
        </div>
      </div>
    </header>
  );
};

export default BlogUtilityHeader;

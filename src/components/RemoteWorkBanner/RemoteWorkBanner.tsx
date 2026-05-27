"use client";

import WhatsAppLink from "@/components/WhatsAppLink/WhatsAppLink";
import Link from "next/link";
import React from "react";
import { ArrowLeft, ArrowRight } from "react-feather";
import { type Locale } from "@/i18n/config";
import { useLocale, useTranslations } from "next-intl";
import HighlightShape from "../ui/HighlightShape/HighlightShape";
import Label from "../ui/Label/Label";
import LocaleSwitch from "../LocaleSwitch/LocaleSwitch";
import OrganicDivider from "../ui/OrganicDivider/OrganicDivider";

const TRUST_KEYS = ["wifi", "timezone", "location"] as const;

const RemoteWorkBanner = () => {
  const t = useTranslations("remoteWork.banner");
  const tCta = useTranslations("remoteWork.cta");
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
        <div className="section-container flex max-w-4xl flex-col items-center py-8 text-center md:py-12">
          <HighlightShape variant="cloud" fill="accent" size={48} className="mb-4 opacity-90" />
          <Label as="h1" className="text-sm tracking-[0.25em] md:text-base">
            {t("title")}
          </Label>
          <p className="text-body mt-3 max-w-2xl text-sm leading-relaxed text-brand-green/70 md:text-base">
            {t("subtitle")}
          </p>

          <ul
            className="mt-6 flex flex-wrap items-center justify-center gap-2 md:mt-8 md:gap-3"
            aria-label="Trust indicators">
            {TRUST_KEYS.map(key => (
              <li
                key={key}
                className="text-label rounded-full border border-brand-green/20 bg-brand-cream/60 px-3 py-1.5 text-[10px] tracking-[0.12em] md:text-xs">
                {t(`trust.${key}`)}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex w-full max-w-md flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:justify-center">
            <WhatsAppLink
              message={tCta("whatsappMessage")}
              className="text-label inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-brand border border-brand-green bg-brand-green px-6 py-3 text-sm text-brand-cream transition-colors duration-200 hover:bg-brand-green/90 focus-brand sm:flex-initial">
              {t("ctaWhatsapp")}
            </WhatsAppLink>
            <Link
              href="/#plans"
              className="text-label inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-brand border border-brand-green/25 bg-brand-cream/80 px-6 py-3 text-sm text-brand-green transition-colors duration-200 hover:border-brand-green hover:bg-brand-cream focus-brand sm:flex-initial">
              {t("ctaPlans")}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <OrganicDivider fill="cream" variant="cloud" className="w-full shrink-0" />
      </section>
    </>
  );
};

export default RemoteWorkBanner;

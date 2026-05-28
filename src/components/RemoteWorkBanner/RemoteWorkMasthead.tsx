"use client";

import WhatsAppLink from "@/components/WhatsAppLink/WhatsAppLink";
import Link from "next/link";
import { useTranslations } from "next-intl";
import React from "react";
import { ArrowRight } from "react-feather";

const TRUST_KEYS = ["wifi", "timezone", "location"] as const;

const RemoteWorkMasthead = () => {
  const t = useTranslations("remoteWork.banner");
  const tCta = useTranslations("remoteWork.cta");

  return (
    <section className="relative z-content w-full border-b border-brand-green/15 bg-brand-cream pt-site-menu-sticky text-brand-green">
      <div className="section-container max-w-3xl py-10 md:py-14 lg:max-w-4xl">
        <h1 className="text-display min-w-0 [overflow-wrap:anywhere] text-4xl leading-[0.95] tracking-wide md:text-5xl lg:text-6xl">
          {t("title")}
        </h1>
        <div className="mt-5 h-1 border-b border-t border-brand-green/20" aria-hidden="true" />
        <p className="text-body mt-6 max-w-xl text-base leading-relaxed text-brand-green/75 md:text-lg">
          {t("subtitle")}
        </p>
        <p className="text-label mt-4 text-[10px] tracking-[0.18em] text-brand-green/50 md:text-xs">
          {TRUST_KEYS.map((key, index) => (
            <React.Fragment key={key}>
              {index > 0 ? <span aria-hidden="true"> · </span> : null}
              {t(`trust.${key}`)}
            </React.Fragment>
          ))}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2">
          <WhatsAppLink
            message={tCta("whatsappMessage")}
            className="text-label inline-flex min-h-[44px] items-center rounded-sm text-xs text-brand-green underline-offset-4 hover:underline focus-brand md:text-sm">
            {t("ctaWhatsapp")}
          </WhatsAppLink>
          <span className="text-brand-green/30" aria-hidden="true">
            ·
          </span>
          <Link
            href="/#plans"
            className="text-label inline-flex min-h-[44px] items-center gap-1.5 rounded-sm text-xs text-brand-green/70 underline-offset-4 hover:text-brand-green hover:underline focus-brand md:text-sm">
            {t("ctaPlans")}
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RemoteWorkMasthead;

"use client";

import { useTranslations } from "next-intl";
import React from "react";

const STAT_KEYS = ["walkable", "nearest", "farthest"] as const;

const AlrededorMasthead = () => {
  const t = useTranslations("alrededor.banner");

  return (
    <section className="relative z-content w-full border-b border-brand-green bg-brand-cream pt-site-menu-sticky text-brand-green">
      <div className="section-container max-w-3xl py-10 md:py-14 lg:max-w-4xl">
        <p className="text-label mb-3 text-[10px] tracking-[0.22em] text-brand-green/50 md:text-xs">
          {t("kicker")}
        </p>
        <h1 className="text-display min-w-0 [overflow-wrap:anywhere] text-4xl leading-[0.95] tracking-wide md:text-5xl lg:text-6xl">
          {t("title")}
        </h1>
        <div
          className="mt-5 h-1 border-b border-t border-brand-green"
          aria-hidden="true"
        />
        <p className="text-body mt-6 max-w-xl text-base leading-relaxed text-brand-green/75 md:text-lg">
          {t("subtitle")}
        </p>

        <dl className="mt-10 grid grid-cols-1 gap-6 border-y border-brand-green py-8 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-brand-green">
          {STAT_KEYS.map(key => (
            <div
              key={key}
              className="min-w-0 sm:px-6 sm:first:pl-0 sm:last:pr-0">
              <dt className="text-label text-[10px] tracking-[0.14em] text-brand-green/55 md:text-xs">
                {t(`stats.${key}.label`)}
              </dt>
              <dd className="text-display-prose mt-2 text-2xl font-bold tabular-nums text-brand-green md:text-3xl">
                {t(`stats.${key}.value`)}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default AlrededorMasthead;

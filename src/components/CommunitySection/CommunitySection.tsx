"use client";

import { COMMUNITY_EVENTS } from "@/mocks/events";
import { BRAND_CONTACT } from "@/design-system";
import HomeSectionIntro from "@/components/ui/HomeSectionIntro/HomeSectionIntro";
import Link from "next/link";
import { useTranslations } from "next-intl";
import React from "react";

const CommunitySection = () => {
  const t = useTranslations("home.community");

  return (
    <section id="community" data-header-surface="cream" className="w-full border-t border-brand-green/10 bg-brand-cream py-14 text-brand-green md:py-20">
      <div className="section-container max-w-3xl lg:max-w-4xl">
        <HomeSectionIntro kicker={t("sectionTitle")} title={t("title")} subtitle={t("subtitle")} />

        <ol className="mt-10 border-t border-brand-green/12 md:mt-12" role="list">
          {COMMUNITY_EVENTS.map(event => (
            <li
              key={event.id}
              className="grid grid-cols-1 gap-3 border-b border-brand-green/12 py-6 md:grid-cols-[7rem_minmax(0,1fr)] md:gap-8 md:py-8">
              <p className="text-label text-[10px] tracking-[0.16em] text-brand-green/45 md:pt-1 md:text-xs">
                {t(`dates.${event.dateKey}`)}
              </p>
              <div className="min-w-0">
                <h3 className="text-display-prose text-lg font-bold leading-snug text-brand-green md:text-xl">
                  {t(`events.${event.id}.title`)}
                </h3>
                <p className="text-body mt-2 text-sm leading-relaxed text-brand-green/75 md:text-base">
                  {t(`events.${event.id}.description`)}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-col items-start gap-3 border-t border-brand-green/12 pt-8 md:mt-12">
          <Link
            href={BRAND_CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-label inline-flex min-h-[44px] items-center justify-center rounded-brand border border-brand-green bg-brand-green px-6 py-3 text-sm text-brand-cream transition-colors duration-200 hover:bg-brand-green/90 focus-brand">
            {t("instagramCta")}
          </Link>
          <p className="text-body text-xs text-brand-green/55 md:text-sm">{t("instagramHint")}</p>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;

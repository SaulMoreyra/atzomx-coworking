"use client";

import { COMMUNITY_EVENTS } from "@/mocks/events";
import { BRAND_CONTACT } from "@/design-system";
import HighlightShape from "@/components/ui/HighlightShape/HighlightShape";
import Label from "@/components/ui/Label/Label";
import OrganicDivider from "@/components/ui/OrganicDivider/OrganicDivider";
import Link from "next/link";
import { useTranslations } from "next-intl";
import React from "react";
import { Calendar, Coffee, Users } from "react-feather";

const EVENT_ICONS = {
  workshop: Calendar,
  community: Users,
  coffee: Coffee,
} as const;

const CommunitySection = () => {
  const t = useTranslations("home.community");

  return (
    <>
      <OrganicDivider fill="cream" variant="star" />
      <section id="community" className="w-full bg-brand-cream py-14 text-brand-green md:py-20">
        <div className="section-container max-w-5xl">
          <div className="mb-10 flex flex-col items-center gap-3 text-center md:mb-12">
            <HighlightShape variant="star" fill="accent" size={48} className="opacity-90" />
            <Label as="p" className="text-xs tracking-[0.25em]">
              {t("sectionTitle")}
            </Label>
            <h2 className="text-label text-xl normal-case tracking-wide md:text-2xl">{t("title")}</h2>
            <p className="text-body max-w-2xl text-sm leading-relaxed text-brand-green/70 md:text-base">
              {t("subtitle")}
            </p>
          </div>

          <ul className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
            {COMMUNITY_EVENTS.map(event => {
              const Icon = EVENT_ICONS[event.type];
              return (
                <li
                  key={event.id}
                  className="flex flex-col gap-4 border border-brand-green/12 bg-brand-main/35 p-6 transition-shadow duration-200 hover:shadow-[0_8px_24px_-12px_rgba(47,62,34,0.15)] md:p-7">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-accent text-brand-green">
                    <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-brand-green/45">
                      {t(`dates.${event.dateKey}`)}
                    </span>
                    <h3 className="text-label text-sm tracking-[0.12em] md:text-base">
                      {t(`events.${event.id}.title`)}
                    </h3>
                    <p className="text-body text-sm leading-relaxed text-brand-green/75">
                      {t(`events.${event.id}.description`)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-10 flex flex-col items-center gap-3 text-center">
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
    </>
  );
};

export default CommunitySection;

"use client";

import HomeSectionIntro from "@/components/ui/HomeSectionIntro/HomeSectionIntro";
import { useTranslations } from "next-intl";
import React from "react";

const STORY_KEYS = ["story1", "story2", "story3"] as const;

const TeamSection = () => {
  const t = useTranslations("home.team");

  return (
    <section id="team" data-header-surface="main" className="w-full bg-brand-main py-14 text-brand-green md:py-20">
      <div className="section-container max-w-5xl">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16 xl:gap-20">
          <div className="min-w-0 lg:sticky lg:top-[calc(4.5rem+1.5rem+env(safe-area-inset-top,0px))] lg:self-start">
            <HomeSectionIntro kicker={t("sectionTitle")} title={t("title")} subtitle={t("subtitle")} />
          </div>

          <div className="text-body min-w-0 space-y-5 text-sm leading-relaxed text-brand-green/80 md:space-y-6 md:text-base">
            {STORY_KEYS.map(key => (
              <p key={key}>{t(key)}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;

/* Hallmark · macrostructure: Index-First (section) · tone: editorial · anchor hue: forest-green
 * design-system: DESIGN.md · theme: Atzomx brand (preserved)
 */
"use client";

import { COMMUNITY_EVENTS } from "@/mocks/events";
import { filterUpcomingEventsInCurrentAndNextMonth } from "@/lib/community-events";
import { BRAND_CONTACT } from "@/design-system";
import HomeSectionIntro from "@/components/ui/HomeSectionIntro/HomeSectionIntro";
import SectionSticker from "@/components/ui/SectionSticker/SectionSticker";
import WhatsAppLink from "@/components/WhatsAppLink/WhatsAppLink";
import Link from "next/link";
import { useTranslations } from "next-intl";
import React, { useMemo } from "react";
import { ArrowRight } from "react-feather";

const CommunitySection = () => {
  const t = useTranslations("home.community");
  const upcomingEvents = useMemo(
    () => filterUpcomingEventsInCurrentAndNextMonth(COMMUNITY_EVENTS),
    []
  );

  return (
    <section
      id="community"
      data-header-surface="main"
      className="relative w-full overflow-x-clip bg-brand-main py-14 text-brand-green md:py-20">
      <div className="section-container max-w-5xl">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_14rem] lg:gap-16 xl:gap-20">
          <div className="relative min-w-0">
            <HomeSectionIntro
              kicker={t("sectionTitle")}
              title={t("title")}
              subtitle={t("subtitle")}
            />

            <SectionSticker
              id="sticker-laptop-man"
              sizes="(max-width: 1024px) 36vw, 200px"
              className="absolute -right-4 top-0 z-0 w-[9rem] opacity-40 md:w-[10rem] md:opacity-55 lg:hidden"
            />

            <ol
              className="relative z-[1] mt-10 divide-y divide-brand-green md:mt-12"
              role="list">
              {upcomingEvents.length === 0 ? (
                <li className="py-8">
                  <p className="text-body text-sm leading-relaxed text-brand-green/70 md:text-base">
                    {t("emptyState")}
                  </p>
                </li>
              ) : (
                upcomingEvents.map(event => {
                  const titleId = `community-event-${event.id}-title`;

                  return (
                    <li
                      key={event.id}
                      aria-labelledby={titleId}
                      className="grid grid-cols-1 gap-3 py-6 md:grid-cols-[6.5rem_minmax(0,1fr)] md:gap-8 md:py-8">
                      <p className="text-schedule min-w-0 [overflow-wrap:anywhere] text-brand-green md:pt-1">
                        {t(`events.${event.id}.date`)}
                      </p>
                      <div className="min-w-0">
                        <h3
                          id={titleId}
                          className="text-display-prose min-w-0 text-lg font-bold leading-snug text-brand-green [overflow-wrap:anywhere] md:text-xl">
                          {t(`events.${event.id}.title`)}
                        </h3>
                        <p className="text-body mt-2 text-sm leading-relaxed text-brand-green/75 [overflow-wrap:anywhere] md:text-base">
                          {t(`events.${event.id}.description`)}
                        </p>
                        {event.registrationUrl ? (
                          <Link
                            href={event.registrationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-label mt-4 inline-flex min-h-[44px] items-center gap-2 py-2 text-[10px] tracking-[0.14em] text-brand-green transition-colors duration-200 hover:border-brand-green hover:text-brand-green/80 focus-brand md:text-xs">
                            {t("registerCta")}
                            <ArrowRight
                              size={14}
                              aria-hidden="true"
                              className="shrink-0"
                            />
                          </Link>
                        ) : null}
                      </div>
                    </li>
                  );
                })
              )}
            </ol>
          </div>

          <aside className="relative min-w-0 lg:sticky lg:top-[calc(4.5rem+1.5rem+env(safe-area-inset-top,0px))] lg:self-start">
            <SectionSticker
              id="sticker-laptop-man"
              sizes="176px"
              className="mx-auto mb-6 hidden w-[11rem] lg:block"
            />
            <p className="text-display-prose text-base font-bold leading-snug text-brand-green md:text-lg">
              {t("eventHostPrompt")}
            </p>
            <WhatsAppLink
              message={t("eventHostMessage")}
              className="text-label mt-4 inline-flex min-h-[44px] w-full items-center justify-center rounded-brand border border-brand-green bg-brand-green px-6 py-3 text-sm text-brand-cream transition-colors duration-200 hover:bg-brand-green/90 focus-brand lg:w-auto">
              {t("eventHostCta")}
            </WhatsAppLink>

            <div className="mt-8 pt-2">
              <p className="text-body text-sm leading-relaxed text-brand-green/70">
                {t("instagramHint")}
              </p>
              <Link
                href={BRAND_CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-label mt-4 inline-flex min-h-[44px] w-full items-center justify-center rounded-brand border border-brand-green bg-brand-cream px-6 py-3 text-sm text-brand-green transition-colors duration-200 hover:border-brand-green focus-brand lg:w-auto">
                {t("instagramCta")}
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;

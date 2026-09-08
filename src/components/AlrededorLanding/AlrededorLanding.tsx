"use client";

import WhatsAppLink from "@/components/WhatsAppLink/WhatsAppLink";
import HomeSectionIntro from "@/components/ui/HomeSectionIntro/HomeSectionIntro";
import { BRAND_CONTACT } from "@/design-system";
import {
  NEARBY_PLACES,
  PLACE_CATEGORIES,
  type PlaceCategory,
} from "@/mocks/places";
import cx from "classnames";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { ArrowRight, ExternalLink } from "react-feather";

/* Hallmark · pre-emit critique: P4 H4 E4 S4 R5 V4 */
/* Hallmark · macrostructure: Neighborhood Guide · tone: editorial · anchor hue: forest-green
 * design-system: DESIGN.md · theme: Atzomx brand (preserved)
 */

type DistanceFilter = "all" | "5" | "10";
type CategoryFilter = "all" | PlaceCategory;

const DISTANCE_KEYS: DistanceFilter[] = ["all", "5", "10"];
const ROUTINE_KEYS = ["coffee", "focus", "lunch", "walk"] as const;

const GALLERY_TILES = [
  {
    src: "/images/coworking/atzomx.webp",
    captionKey: "facadeCaption" as const,
    alt: "Atzomx facade on Los Libres",
  },
  {
    src: "/images/coworking/lunch.webp",
    captionKey: "communityCaption" as const,
    alt: "Shared table at Atzomx coworking",
  },
] as const;

const filterButtonClass = (isActive: boolean) =>
  cx(
    "text-label min-h-[44px] rounded-none border px-3 py-2 text-[10px] tracking-[0.14em] transition-colors duration-200 focus-brand md:text-xs",
    isActive
      ? "border-brand-green bg-brand-green text-brand-cream"
      : "border-brand-green bg-transparent text-brand-green/65 hover:bg-brand-main/50 hover:text-brand-green"
  );

const AlrededorLanding = () => {
  const t = useTranslations("alrededor");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [distance, setDistance] = useState<DistanceFilter>("all");

  const categoryCounts = useMemo(() => {
    const counts: Record<PlaceCategory, number> = {
      cafe: 0,
      food: 0,
      park: 0,
      culture: 0,
    };
    for (const place of NEARBY_PLACES) {
      counts[place.category] += 1;
    }
    return counts;
  }, []);

  const filteredPlaces = useMemo(() => {
    return NEARBY_PLACES.filter(place => {
      if (category !== "all" && place.category !== category) return false;
      if (distance === "all") return true;
      return place.walkMinutes <= Number(distance);
    });
  }, [category, distance]);

  return (
    <div className="w-full bg-brand-cream text-brand-green">
      <section className="border-y border-brand-green bg-brand-cream md:sticky md:top-site-header md:z-20">
        <div className="section-container flex flex-col gap-5 py-4 md:flex-row md:items-end md:justify-between md:gap-8 md:py-5">
          <nav aria-label={t("filters.categoryLabel")} className="min-w-0">
            <span className="text-label mb-2 block text-[10px] tracking-[0.2em] text-brand-green/45">
              {t("filters.categoryLabel")}
            </span>
            <ul className="flex flex-wrap gap-2" role="list">
              <li>
                <button
                  type="button"
                  aria-pressed={category === "all"}
                  onClick={() => {
                    setCategory("all");
                  }}
                  className={filterButtonClass(category === "all")}>
                  {t("filters.all", { count: NEARBY_PLACES.length })}
                </button>
              </li>
              {PLACE_CATEGORIES.map(key => (
                <li key={key}>
                  <button
                    type="button"
                    aria-pressed={category === key}
                    onClick={() => {
                      setCategory(key);
                    }}
                    className={filterButtonClass(category === key)}>
                    {t(`filters.categories.${key}`, {
                      count: categoryCounts[key],
                    })}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t("filters.distanceLabel")} className="shrink-0">
            <span className="text-label mb-2 block text-[10px] tracking-[0.2em] text-brand-green/45">
              {t("filters.distanceLabel")}
            </span>
            <ul className="flex flex-wrap gap-2" role="list">
              {DISTANCE_KEYS.map(key => (
                <li key={key}>
                  <button
                    type="button"
                    aria-pressed={distance === key}
                    onClick={() => {
                      setDistance(key);
                    }}
                    className={filterButtonClass(distance === key)}>
                    {t(`filters.distance.${key}`)}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="section-container grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start lg:gap-16">
          <div className="min-w-0">
            {filteredPlaces.length === 0 ? (
              <p className="text-body py-8 text-sm text-brand-green/65 md:text-base">
                {t("filters.empty")}
              </p>
            ) : (
              <ol
                className="divide-y divide-brand-green/12 border-y border-brand-green/12"
                role="list">
                {filteredPlaces.map(place => {
                  const highlights = t.raw(
                    `places.${place.id}.highlights`
                  ) as string[];

                  return (
                    <li key={place.id} id={place.id} className="py-8 md:py-10">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                        <div className="min-w-0">
                          <p className="text-label text-[10px] tracking-[0.16em] text-brand-green/45">
                            {t(`filters.categoryNames.${place.category}`)}
                          </p>
                          <h2 className="text-display-prose mt-2 min-w-0 [overflow-wrap:anywhere] text-xl font-bold leading-snug text-brand-green md:text-2xl">
                            {t(`places.${place.id}.name`)}
                          </h2>
                        </div>
                        <p className="text-schedule shrink-0 text-sm text-brand-green/70 sm:text-right">
                          <span className="block text-base font-bold tabular-nums text-brand-green">
                            {t("list.walkMinutes", {
                              minutes: place.walkMinutes,
                            })}
                          </span>
                          <span className="text-label mt-1 block text-[10px] tracking-[0.12em] text-brand-green/50">
                            {t("list.walkMeters", { meters: place.walkMeters })}
                          </span>
                        </p>
                      </div>

                      <p className="text-body mt-4 max-w-xl text-sm leading-relaxed text-brand-green/75 md:text-base">
                        {t(`places.${place.id}.description`)}
                      </p>

                      {highlights.length > 0 ? (
                        <p className="text-label mt-4 text-[10px] tracking-[0.12em] text-brand-green/55 md:text-xs">
                          {highlights.slice(0, 3).join(" · ")}
                        </p>
                      ) : null}

                      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-schedule text-xs text-brand-green/55">
                          {t(`places.${place.id}.hours`)}
                        </p>
                        <a
                          href={place.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-label inline-flex min-h-[44px] items-center gap-1.5 rounded-sm text-[10px] tracking-[0.14em] text-brand-green underline-offset-4 hover:underline focus-brand md:text-xs">
                          {t("list.seeOnMaps")}
                          <ExternalLink size={14} aria-hidden="true" />
                        </a>
                      </div>
                    </li>
                  );
                })}
              </ol>
            )}
          </div>

          <aside className="min-w-0 lg:sticky lg:top-[calc(theme(spacing.site-header)+6.5rem)]">
            <p className="text-label text-[10px] tracking-[0.2em] text-brand-green/45">
              {t("map.kicker")}
            </p>
            <p className="text-display-prose mt-2 text-lg font-bold text-brand-green md:text-xl">
              {t("map.title")}
            </p>
            <iframe
              title={t("map.iframeTitle")}
              src={BRAND_CONTACT.mapsEmbed}
              width="100%"
              height="360"
              allowFullScreen
              loading="lazy"
              className="mt-5 h-[240px] w-full border border-brand-green grayscale-[20%] contrast-[1.05] md:h-[360px]"
            />
            <a
              href={BRAND_CONTACT.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-label mt-4 inline-flex min-h-[44px] items-center gap-2 border-b-2 border-brand-green pb-1 text-[10px] tracking-[0.16em] text-brand-green transition-colors duration-200 hover:text-brand-green/80 focus-brand md:text-xs">
              {t("map.openMaps")}
              <ArrowRight size={14} aria-hidden="true" />
            </a>
          </aside>
        </div>
      </section>

      <section className="border-t border-brand-green bg-brand-main py-14 md:py-20">
        <div className="section-container max-w-3xl lg:max-w-4xl">
          <HomeSectionIntro
            kicker={t("routine.kicker")}
            title={t("routine.title")}
            subtitle={t("routine.subtitle")}
          />

          <ol
            className="mt-10 border-t border-brand-green md:mt-12"
            role="list">
            {ROUTINE_KEYS.map((key, index) => (
              <li
                key={key}
                className="grid grid-cols-1 gap-3 border-b border-brand-green py-6 md:grid-cols-[6.5rem_minmax(0,1fr)] md:gap-8 md:py-8">
                <div className="min-w-0 md:pt-1">
                  <span className="text-label block text-[10px] tracking-[0.2em] text-brand-green/40 md:text-xs">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-schedule mt-1 block text-sm tabular-nums text-brand-green">
                    {t(`routine.steps.${key}.time`)}
                  </span>
                </div>
                <div className="min-w-0">
                  <h3 className="text-display-prose text-lg font-bold leading-snug text-brand-green md:text-xl">
                    {t(`routine.steps.${key}.title`)}
                  </h3>
                  <p className="text-body mt-2 text-sm leading-relaxed text-brand-green/75 md:text-base">
                    {t(`routine.steps.${key}.description`)}
                  </p>
                  <p className="text-label mt-3 text-[10px] tracking-[0.16em] text-brand-green/50">
                    {t(`routine.steps.${key}.tag`)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-brand-green py-14 md:py-20">
        <div className="section-container">
          <HomeSectionIntro
            kicker={t("gallery.kicker")}
            title={t("gallery.title")}
          />

          <ul
            className="mt-10 grid grid-cols-1 gap-6 md:mt-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-8"
            role="list">
            {GALLERY_TILES.map(tile => (
              <li key={tile.src} className="min-w-0">
                <figure>
                  <div className="relative aspect-[4/3] min-w-0 overflow-hidden border border-brand-green bg-brand-main/20">
                    <Image
                      src={tile.src}
                      alt={tile.alt}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <figcaption className="text-label mt-3 text-[10px] tracking-[0.16em] text-brand-green/55">
                    {t(`gallery.${tile.captionKey}`)}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-brand-green py-14 md:py-20">
        <div className="section-container max-w-3xl lg:max-w-4xl">
          <HomeSectionIntro
            title={t("cta.title")}
            subtitle={t("cta.description")}
          />

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <WhatsAppLink
              message={t("cta.whatsappMessage")}
              className="text-label inline-flex min-h-[44px] items-center justify-center rounded-brand border border-brand-green bg-brand-green px-6 py-3 text-sm text-brand-cream transition-colors duration-200 hover:bg-brand-green/90 focus-brand sm:w-auto">
              {t("cta.whatsapp")}
            </WhatsAppLink>
            <Link
              href="/#plans"
              className="text-label inline-flex min-h-[44px] items-center justify-center gap-2 rounded-brand border border-brand-green bg-brand-main px-6 py-3 text-sm text-brand-green transition-colors duration-200 hover:border-brand-green focus-brand sm:w-auto">
              {t("cta.plans")}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AlrededorLanding;

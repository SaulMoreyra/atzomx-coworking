"use client";

import { type ReviewType } from "@/common/types/planTypes";
import WhatsAppLink from "@/components/WhatsAppLink/WhatsAppLink";
import ReviewCard from "@/components/ReviewCard/ReviewCard";
import HomeSectionIntro from "@/components/ui/HomeSectionIntro/HomeSectionIntro";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import React, { type FC } from "react";
import { ArrowRight } from "react-feather";

interface RemoteWorkLandingProps {
  reviews: ReviewType[];
  reviewsSource: "google" | "static";
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
}

const HIGHLIGHT_KEYS = ["wifi", "timezone", "location"] as const;
const WORKFLOW_KEYS = ["async", "focus", "community"] as const;
const AMENITY_KEYS = ["coffee", "terrace", "chairs", "meeting"] as const;
const STAT_KEYS = ["wifi", "timezone", "plans"] as const;

const SPACE_PREVIEW_IMAGES = [
  { src: "/images/coworking/monitor.webp", alt: "Desk with monitor" },
  { src: "/images/coworking/coffeebar.webp", alt: "Coffee bar" },
  { src: "/images/coworking/puff.webp", alt: "Terrace" },
] as const;

const RemoteWorkLanding: FC<RemoteWorkLandingProps> = ({
  reviews,
  reviewsSource,
  rating,
  userRatingCount,
  googleMapsUri,
}) => {
  const t = useTranslations("remoteWork");
  const featuredReviews = reviews.slice(0, 3);
  const showGoogleRating = reviewsSource === "google" && rating != null && userRatingCount != null;

  return (
    <div className="w-full bg-brand-cream text-brand-green">
      {/* Context + stats */}
      <section className="border-t border-brand-green py-14 md:py-20">
        <div className="section-container max-w-3xl lg:max-w-4xl">
          <HomeSectionIntro kicker={t("problem.sectionTitle")} title={t("problem.title")} />

          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
            <div className="min-w-0">
              <p className="text-body text-base leading-relaxed text-brand-green/80 md:text-lg">{t("problem.lead")}</p>
              <p className="text-body mt-4 text-sm leading-relaxed text-brand-green/70 md:text-base">
                {t("problem.context")}
              </p>
            </div>
            <div className="min-w-0 border-t border-brand-green pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
              <p className="text-label mb-3 text-[10px] tracking-[0.18em] text-brand-green/45">
                {t("problem.solutionTitle")}
              </p>
              <p className="text-body text-base leading-relaxed text-brand-green/80 md:text-lg">{t("problem.solution")}</p>
            </div>
          </div>

          <dl className="mt-12 grid grid-cols-1 gap-6 border-y border-brand-green py-8 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-brand-green">
            {STAT_KEYS.map(key => (
              <div key={key} className="min-w-0 sm:px-6 sm:first:pl-0 sm:last:pr-0">
                <dt className="text-label text-[10px] tracking-[0.14em] text-brand-green/55 md:text-xs">
                  {t(`stats.${key}.label`)}
                </dt>
                <dd className="text-display-prose mt-2 text-2xl font-bold tabular-nums text-brand-green md:text-3xl">
                  {t(`stats.${key}.value`)}
                  {t(`stats.${key}.suffix`) ? (
                    <span className="ml-1 text-base font-semibold md:text-lg">{t(`stats.${key}.suffix`)}</span>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 border-t border-brand-green pt-10 md:pt-12">
            <HomeSectionIntro
              kicker={t("localValues.sectionTitle")}
              title={t("localValues.title")}
              subtitle={t("localValues.lead")}
            />
            <p className="text-body mt-6 max-w-2xl text-sm leading-relaxed text-brand-green/65 md:text-base">
              {t("localValues.note")}
            </p>
          </div>
        </div>
      </section>

      {/* Narrative workflow */}
      <section className="border-t border-brand-green bg-brand-main py-14 md:py-20">
        <div className="section-container max-w-3xl lg:max-w-4xl">
          <HomeSectionIntro
            kicker={t("workflow.sectionTitle")}
            title={t("workflow.title")}
            subtitle={t("workflow.subtitle")}
          />

          <ol className="mt-10 border-t border-brand-green md:mt-12" role="list">
            {WORKFLOW_KEYS.map((key, index) => (
              <li
                key={key}
                className="grid grid-cols-1 gap-3 border-b border-brand-green py-6 md:grid-cols-[3.5rem_minmax(0,1fr)] md:gap-8 md:py-8">
                <span className="text-label text-[10px] tracking-[0.2em] text-brand-green/40 md:pt-1 md:text-xs">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h3 className="text-display-prose text-lg font-bold leading-snug text-brand-green md:text-xl">
                    {t(`workflow.steps.${key}.title`)}
                  </h3>
                  <p className="text-body mt-2 text-sm leading-relaxed text-brand-green/75 md:text-base">
                    {t(`workflow.steps.${key}.description`)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Highlights */}
      <section className="border-t border-brand-green py-14 md:py-20">
        <div className="section-container max-w-3xl lg:max-w-4xl">
          <HomeSectionIntro
            kicker={t("highlights.sectionTitle")}
            title={t("highlights.title")}
            subtitle={t("highlights.subtitle")}
          />

          <ul className="mt-10 divide-y divide-brand-green border-y border-brand-green md:mt-12" role="list">
            {HIGHLIGHT_KEYS.map(key => (
              <li key={key} className="grid gap-2 py-5 md:grid-cols-[8rem_minmax(0,1fr)] md:gap-6 md:py-6">
                <h3 className="text-label text-[10px] tracking-[0.14em] text-brand-green md:text-xs">
                  {t(`highlights.${key}.title`)}
                </h3>
                <p className="text-body text-sm leading-relaxed text-brand-green/75 md:text-base">
                  {t(`highlights.${key}.description`)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Amenities */}
      <section className="border-t border-brand-green py-12 md:py-14">
        <div className="section-container max-w-3xl lg:max-w-4xl">
          <HomeSectionIntro kicker={t("amenities.sectionTitle")} title={t("amenities.title")} />
          <ul className="mt-8 flex flex-wrap gap-x-4 gap-y-2 md:mt-10" role="list">
            {AMENITY_KEYS.map(key => (
              <li key={key}>
                <span className="text-label inline-flex min-h-[44px] items-center border-b-2 border-brand-green px-1 py-2 text-[10px] tracking-[0.14em] text-brand-green/70 md:text-xs">
                  {t(`amenities.${key}`)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Space preview */}
      <section className="border-t border-brand-green py-14 md:py-20">
        <div className="section-container max-w-3xl lg:max-w-4xl">
          <HomeSectionIntro
            kicker={t("spacePreview.sectionTitle")}
            title={t("spacePreview.title")}
            subtitle={t("spacePreview.subtitle")}
          />

          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 md:mt-12 md:gap-5" role="list">
            {SPACE_PREVIEW_IMAGES.map(image => (
              <li key={image.src} className="relative aspect-[4/3] min-w-0 overflow-hidden border border-brand-green bg-brand-main/20">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </li>
            ))}
          </ul>

          <p className="mt-8">
            <Link
              href="/#gallery"
              className="text-label inline-flex min-h-[44px] items-center gap-2 border-b-2 border-brand-green pb-1 text-[10px] tracking-[0.16em] text-brand-green transition-colors duration-200 hover:text-brand-green/80 focus-brand md:text-xs">
              {t("spacePreview.galleryLink")}
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </p>
        </div>
      </section>

      {/* Testimonials */}
      {featuredReviews.length > 0 ? (
        <section className="border-t border-brand-green bg-brand-main py-14 md:py-20">
          <div className="section-container mb-8 md:mb-10">
            <HomeSectionIntro kicker={t("testimonials.sectionTitle")} title={t("testimonials.title")} />
            <p className="text-label mt-4 text-[10px] tracking-[0.14em] text-brand-green/65 md:text-xs">
              {showGoogleRating
                ? t("testimonials.googleRatingSummary", {
                    rating: rating.toFixed(1),
                    count: userRatingCount,
                  })
                : t("testimonials.badge")}
            </p>
          </div>

          <div
            className="scroll-snap-x flex gap-4 overflow-x-auto pb-4 pl-6 md:gap-6 md:pl-12 xl:pl-20"
            role="list"
            aria-label={t("testimonials.title")}>
            {featuredReviews.map((review, index) => (
              <div
                key={review.id ?? `${review.client.name}-${index}`}
                role="listitem"
                className="w-[min(85vw,300px)] shrink-0 scroll-snap-start md:w-[min(32vw,360px)]">
                <ReviewCard
                  review={review}
                  googleMapsUri={reviewsSource === "google" ? googleMapsUri : undefined}
                  readMoreLabel={t("testimonials.readMore")}
                  readLessLabel={t("testimonials.readLess")}
                  viewOnGoogleLabel={t("testimonials.viewOnGoogle")}
                />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* CTA */}
      <section className="border-t border-brand-green py-14 md:py-20">
        <div className="section-container max-w-3xl lg:max-w-4xl">
          <HomeSectionIntro title={t("cta.title")} subtitle={t("cta.description")} />

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

          <p className="text-body mt-10 text-sm text-brand-green/60">
            {t("cta.articlePrompt")}{" "}
            <Link
              href="/blog/remote-work-oaxaca"
              className="rounded-sm text-brand-green underline underline-offset-4 hover:text-brand-green/80 focus-brand">
              {t("cta.articleLink")}
            </Link>
          </p>
        </div>
      </section>

      {/* Mobile sticky CTA */}
      <div
        className="fixed inset-x-0 bottom-0 z-header border-t border-brand-green bg-brand-cream/95 px-4 py-3 backdrop-blur-sm lg:hidden"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}>
        <div className="mx-auto flex max-w-md gap-3">
          <Link
            href="/#plans"
            className="text-label inline-flex min-h-[44px] flex-1 items-center justify-center rounded-brand border border-brand-green bg-brand-main px-4 py-2.5 text-xs tracking-[0.1em] text-brand-green transition-colors duration-200 hover:border-brand-green focus-brand">
            {t("cta.plans")}
          </Link>
          <WhatsAppLink
            message={t("cta.whatsappMessage")}
            className="text-label inline-flex min-h-[44px] flex-1 items-center justify-center rounded-brand border border-brand-green bg-brand-green px-4 py-2.5 text-xs tracking-[0.1em] text-brand-cream transition-colors duration-200 hover:bg-brand-green/90 focus-brand">
            {t("cta.stickyWhatsapp")}
          </WhatsAppLink>
        </div>
      </div>

      <div className="h-20 lg:hidden" aria-hidden="true" />
    </div>
  );
};

export default RemoteWorkLanding;

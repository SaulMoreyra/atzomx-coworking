"use client";

import { type ReviewType } from "@/common/types/planTypes";
import WhatsAppLink from "@/components/WhatsAppLink/WhatsAppLink";
import ReviewCard from "@/components/ReviewCard/ReviewCard";
import Heading from "@/components/Heading/Heading";
import HighlightShape from "@/components/ui/HighlightShape/HighlightShape";
import Label from "@/components/ui/Label/Label";
import OrganicDivider from "@/components/ui/OrganicDivider/OrganicDivider";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import React, { type FC } from "react";
import {
  ArrowRight,
  Clock,
  Coffee,
  Home,
  MapPin,
  Monitor,
  Sun,
  Users,
  Wifi,
} from "react-feather";
import cx from "classnames";

interface RemoteWorkLandingProps {
  reviews: ReviewType[];
  reviewsSource: "google" | "static";
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
}

const HIGHLIGHT_ICONS = [Wifi, Clock, MapPin] as const;
const HIGHLIGHT_KEYS = ["wifi", "timezone", "location"] as const;
const WORKFLOW_KEYS = ["async", "focus", "community"] as const;
const WORKFLOW_ICONS = [Home, Monitor, Users] as const;
const AMENITY_KEYS = ["coffee", "terrace", "chairs", "meeting"] as const;
const AMENITY_ICONS = [Coffee, Sun, Monitor, Users] as const;
const STAT_KEYS = ["wifi", "timezone", "plans"] as const;

const SPACE_PREVIEW_IMAGES = [
  { src: "/images/coworking/monitor.webp", alt: "Desk with monitor" },
  { src: "/images/coworking/coffeebar.webp", alt: "Coffee bar" },
  { src: "/images/coworking/puff.webp", alt: "Terrace" },
] as const;

const HighlightCard: FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  accent: "main" | "cream";
}> = ({ icon, title, description, accent }) => (
  <article
    className={cx(
      "group flex min-h-[180px] flex-col gap-5 border border-brand-green/12 p-6 transition-all duration-200 md:min-h-[200px] md:p-8",
      "hover:border-brand-green/25 hover:shadow-[0_10px_28px_-12px_rgba(47,62,34,0.18)]",
      accent === "main" ? "bg-brand-main" : "bg-brand-cream"
    )}>
    <div
      className={cx(
        "flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-brand-green",
        accent === "main" ? "bg-brand-accent" : "bg-brand-main"
      )}
      aria-hidden="true">
      {icon}
    </div>
    <div className="flex flex-col gap-2">
      <Label as="h3" className="text-sm tracking-[0.14em] md:text-base">
        {title}
      </Label>
      <p className="text-body text-base leading-relaxed text-brand-green/75 md:text-lg">{description}</p>
    </div>
  </article>
);

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
      {/* Problem / context */}
      <section className="section-container max-w-5xl py-14 md:py-20">
        <div className="mb-10 flex flex-col items-center gap-3 text-center md:mb-12">
          <Label as="p" className="text-xs tracking-[0.25em]">
            {t("problem.sectionTitle")}
          </Label>
          <Heading>{t("problem.title")}</Heading>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col gap-4 border border-brand-green/10 bg-brand-main/40 p-6 md:p-8">
            <p className="text-body text-base leading-relaxed text-brand-green/80 md:text-lg">{t("problem.lead")}</p>
            <p className="text-body text-sm leading-relaxed text-brand-green/70 md:text-base">{t("problem.context")}</p>
          </div>
          <div className="flex flex-col gap-4 border border-brand-green/12 bg-brand-cream p-6 md:p-8">
            <Label as="h3" className="text-xs tracking-[0.2em]">
              {t("problem.solutionTitle")}
            </Label>
            <p className="text-body text-base leading-relaxed text-brand-green/80 md:text-lg">{t("problem.solution")}</p>
          </div>
        </div>

        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 md:mt-10 md:gap-5">
          {STAT_KEYS.map(key => (
            <li
              key={key}
              className="flex flex-col items-center gap-1 border border-brand-green/10 bg-brand-main/30 px-4 py-6 text-center">
              <span className="text-display text-3xl tabular-nums text-brand-green md:text-4xl">
                {t(`stats.${key}.value`)}
                {t(`stats.${key}.suffix`) ? (
                  <span className="ml-1 text-lg md:text-xl">{t(`stats.${key}.suffix`)}</span>
                ) : null}
              </span>
              <span className="text-label text-[10px] tracking-[0.14em] text-brand-green/65 md:text-xs">
                {t(`stats.${key}.label`)}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-10 border border-brand-green/12 bg-brand-main/25 p-6 md:mt-12 md:p-8">
          <div className="mx-auto flex max-w-3xl flex-col gap-4 text-center">
            <Label as="p" className="text-xs tracking-[0.25em]">
              {t("localValues.sectionTitle")}
            </Label>
            <h3 className="text-label text-lg normal-case tracking-wide md:text-xl">{t("localValues.title")}</h3>
            <p className="text-body text-sm leading-relaxed text-brand-green/75 md:text-base">{t("localValues.lead")}</p>
            <p className="text-body text-sm leading-relaxed text-brand-green/65 md:text-base">{t("localValues.note")}</p>
          </div>
        </div>
      </section>

      <OrganicDivider fill="main" variant="cloud" />

      {/* Workflow */}
      <section className="w-full bg-brand-main py-14 md:py-20">
        <div className="section-container max-w-5xl">
          <div className="mb-10 flex flex-col items-center gap-3 text-center md:mb-12">
            <HighlightShape variant="star" fill="accent" size={44} className="opacity-90" />
            <Label as="p" className="text-xs tracking-[0.25em]">
              {t("workflow.sectionTitle")}
            </Label>
            <h2 className="text-label text-xl normal-case tracking-wide md:text-2xl">{t("workflow.title")}</h2>
            <p className="text-body max-w-2xl text-sm leading-relaxed text-brand-green/70 md:text-base">
              {t("workflow.subtitle")}
            </p>
          </div>

          <ol className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-5">
            {WORKFLOW_KEYS.map((key, index) => {
              const Icon = WORKFLOW_ICONS[index];
              return (
                <li
                  key={key}
                  className="relative flex flex-col gap-4 border border-brand-green/12 bg-brand-cream p-6 md:p-7">
                  <span
                    className="text-display text-4xl text-brand-green/15"
                    aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-accent text-brand-green">
                    <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-label text-sm tracking-[0.12em] md:text-base">
                      {t(`workflow.steps.${key}.title`)}
                    </h3>
                    <p className="text-body text-sm leading-relaxed text-brand-green/75 md:text-base">
                      {t(`workflow.steps.${key}.description`)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <OrganicDivider fill="cream" variant="wave" />

      {/* Highlights */}
      <section className="section-container max-w-5xl py-14 md:py-20">
        <div className="mb-10 flex flex-col items-center gap-3 text-center md:mb-12">
          <Label as="p" className="text-xs tracking-[0.25em]">
            {t("highlights.sectionTitle")}
          </Label>
          <h2 className="text-label text-xl normal-case tracking-wide md:text-2xl">{t("highlights.title")}</h2>
          <p className="text-body max-w-2xl text-sm leading-relaxed text-brand-green/70 md:text-base">
            {t("highlights.subtitle")}
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {HIGHLIGHT_KEYS.map((key, index) => {
            const Icon = HIGHLIGHT_ICONS[index];
            return (
              <li key={key}>
                <HighlightCard
                  icon={<Icon size={28} strokeWidth={1.75} />}
                  title={t(`highlights.${key}.title`)}
                  description={t(`highlights.${key}.description`)}
                  accent={index % 2 === 0 ? "main" : "cream"}
                />
              </li>
            );
          })}
        </ul>
      </section>

      <OrganicDivider fill="accent" variant="clover" />

      {/* Amenities strip */}
      <section className="w-full bg-brand-accent py-12 md:py-14">
        <div className="section-container max-w-4xl">
          <div className="mb-8 flex flex-col items-center gap-2 text-center">
            <Label as="p" className="text-xs tracking-[0.25em]">
              {t("amenities.sectionTitle")}
            </Label>
            <h2 className="text-label text-lg normal-case tracking-wide md:text-xl">{t("amenities.title")}</h2>
          </div>
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {AMENITY_KEYS.map((key, index) => {
              const Icon = AMENITY_ICONS[index];
              return (
                <li
                  key={key}
                  className="flex min-h-[88px] flex-col items-center justify-center gap-2 border border-brand-green/12 bg-brand-cream/80 px-3 py-4 text-center">
                  <Icon size={20} strokeWidth={1.75} aria-hidden="true" className="text-brand-green" />
                  <span className="text-label text-[10px] tracking-[0.1em] md:text-xs">{t(`amenities.${key}`)}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <OrganicDivider fill="cream" variant="star" />

      {/* Space preview */}
      <section className="section-container max-w-5xl py-14 md:py-20">
        <div className="mb-8 flex flex-col items-center gap-3 text-center md:mb-10">
          <Label as="p" className="text-xs tracking-[0.25em]">
            {t("spacePreview.sectionTitle")}
          </Label>
          <h2 className="text-label text-xl normal-case tracking-wide md:text-2xl">{t("spacePreview.title")}</h2>
          <p className="text-body max-w-xl text-sm leading-relaxed text-brand-green/70 md:text-base">
            {t("spacePreview.subtitle")}
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-5">
          {SPACE_PREVIEW_IMAGES.map(image => (
            <li
              key={image.src}
              className="relative aspect-[4/3] overflow-hidden border border-brand-green/10 bg-brand-main/30">
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

        <p className="mt-8 text-center">
          <Link
            href="/#gallery"
            className="text-label inline-flex min-h-[44px] items-center gap-2 text-sm tracking-[0.12em] text-brand-green underline-offset-4 hover:underline focus-brand">
            {t("spacePreview.galleryLink")}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </p>
      </section>

      {/* Social proof */}
      {featuredReviews.length > 0 ? (
        <>
          <OrganicDivider fill="main" variant="wave" />
          <section className="w-full bg-brand-main py-14 md:py-20">
            <div className="section-container mb-8 flex flex-col items-center gap-3 text-center md:mb-10">
              <Label as="p" className="text-xs tracking-[0.25em]">
                {t("testimonials.sectionTitle")}
              </Label>
              <span className="text-label rounded-full border border-brand-green/20 bg-brand-cream/60 px-4 py-1.5 text-[10px] md:text-xs">
                {showGoogleRating
                  ? t("testimonials.googleRatingSummary", {
                      rating: rating.toFixed(1),
                      count: userRatingCount,
                    })
                  : t("testimonials.badge")}
              </span>
              <h2 className="text-label text-xl normal-case tracking-wide md:text-2xl">{t("testimonials.title")}</h2>
            </div>

            <div
              className="scroll-snap-x flex gap-4 overflow-x-auto pb-4 pl-6 pr-6 md:gap-6 md:pl-12 md:pr-12"
              role="list"
              aria-label={t("testimonials.title")}>
              {featuredReviews.map((review, index) => (
                <div
                  key={review.id ?? `${review.client.name}-${index}`}
                  role="listitem"
                  className="scroll-snap-start w-[min(85vw,300px)] shrink-0 md:w-[min(32vw,360px)]">
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
        </>
      ) : null}

      <OrganicDivider fill="accent" variant="cloud" />

      {/* Final CTA */}
      <section className="w-full bg-brand-accent py-14 text-center md:py-20">
        <div className="section-container max-w-3xl">
          <HighlightShape variant="clover" fill="main" size={44} className="mx-auto mb-4 opacity-90" />
          <Label as="h2" className="mb-4 text-sm tracking-[0.2em] md:text-base">
            {t("cta.title")}
          </Label>
          <p className="text-body mb-8 text-base text-brand-green/75 md:text-lg">{t("cta.description")}</p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <WhatsAppLink
              message={t("cta.whatsappMessage")}
              className="text-label inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-brand border border-brand-green bg-brand-green px-6 py-3 text-sm text-brand-cream transition-colors duration-200 hover:bg-brand-green/90 focus-brand sm:w-auto">
              {t("cta.whatsapp")}
            </WhatsAppLink>
            <Link
              href="/#plans"
              className="text-label inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-brand border border-brand-green/25 bg-brand-cream px-6 py-3 text-sm text-brand-green transition-colors duration-200 hover:border-brand-green hover:bg-brand-cream/90 focus-brand sm:w-auto">
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
        className="fixed inset-x-0 bottom-0 z-header border-t border-brand-green/15 bg-brand-cream/95 px-4 py-3 backdrop-blur-sm lg:hidden"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}>
        <div className="mx-auto flex max-w-md gap-3">
          <Link
            href="/#plans"
            className="text-label inline-flex min-h-[44px] flex-1 items-center justify-center rounded-brand border border-brand-green/25 bg-brand-main px-4 py-2.5 text-xs tracking-[0.1em] text-brand-green transition-colors duration-200 hover:border-brand-green focus-brand">
            {t("cta.plans")}
          </Link>
          <WhatsAppLink
            message={t("cta.whatsappMessage")}
            className="text-label inline-flex min-h-[44px] flex-1 items-center justify-center rounded-brand border border-brand-green bg-brand-green px-4 py-2.5 text-xs tracking-[0.1em] text-brand-cream transition-colors duration-200 hover:bg-brand-green/90 focus-brand">
            {t("cta.stickyWhatsapp")}
          </WhatsAppLink>
        </div>
      </div>

      {/* Spacer so sticky bar doesn't cover footer on mobile */}
      <div className="h-20 lg:hidden" aria-hidden="true" />
    </div>
  );
};

export default RemoteWorkLanding;

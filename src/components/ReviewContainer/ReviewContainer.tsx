"use client";

import { type ReviewType } from "@/common/types/planTypes";
import { motion as m, type Variants } from "framer-motion";
import React, { type FC } from "react";
import ReviewCard from "../ReviewCard/ReviewCard";
import HomeSectionIntro from "../ui/HomeSectionIntro/HomeSectionIntro";
import { useTranslations } from "next-intl";

interface ReviewContainerProps {
  reviews: ReviewType[];
  source: "google" | "static";
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
}

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, x: 16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

const ReviewContainer: FC<ReviewContainerProps> = ({
  reviews,
  source,
  rating,
  userRatingCount,
  googleMapsUri,
}) => {
  const t = useTranslations("home.reviews");
  const showGoogleRating = source === "google" && rating != null && userRatingCount != null;

  return (
    <section id="reviews" data-header-surface="accent" className="w-full bg-brand-accent py-14 text-brand-green md:py-20">
      <div className="section-container mb-8 md:mb-10">
        <HomeSectionIntro title={t("title")} kicker={t("sectionTitle")} />
        <p className="text-label mt-4 inline-flex text-[10px] tracking-[0.14em] text-brand-green/70 md:text-xs">
          {showGoogleRating
            ? t("googleRatingSummary", {
                rating: rating.toFixed(1),
                count: userRatingCount,
              })
            : t("badge")}
        </p>
      </div>

      <m.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="scroll-snap-x flex gap-4 overflow-x-auto pb-4 pl-6 md:gap-6 md:pl-12 xl:pl-20"
        role="list"
        aria-label={t("title")}>
        {reviews.map((review, index) => (
          <m.div
            key={review.id ?? `${review.client.name}-${index}`}
            variants={item}
            role="listitem"
            className="w-[min(85vw,300px)] shrink-0 scroll-snap-start md:w-[min(32vw,360px)]">
            <ReviewCard
              review={review}
              googleMapsUri={source === "google" ? googleMapsUri : undefined}
              readMoreLabel={t("readMore")}
              readLessLabel={t("readLess")}
              viewOnGoogleLabel={t("viewOnGoogle")}
            />
          </m.div>
        ))}
      </m.div>

      {source === "google" && googleMapsUri ? (
        <p className="section-container mt-8 text-left text-xs text-brand-green/70">
          {t("googleAttribution")}{" "}
          <a
            href={googleMapsUri}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-brand-green">
            {t("viewOnGoogle")}
          </a>
        </p>
      ) : null}
    </section>
  );
};

export default ReviewContainer;

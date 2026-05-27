"use client";

import { type ReviewType } from "@/common/types/planTypes";
import { motion as m, type Variants } from "framer-motion";
import React, { type FC } from "react";
import Heading from "../Heading/Heading";
import ReviewCard from "../ReviewCard/ReviewCard";
import Label from "../ui/Label/Label";
import OrganicDivider from "../ui/OrganicDivider/OrganicDivider";
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
    <>
      <OrganicDivider fill="accent" variant="clover" />
      <section id="reviews" className="w-full bg-brand-accent text-brand-green py-14 md:py-20">
      <div className="section-container flex flex-col items-center gap-4 text-center mb-8 md:mb-10">
        <Label as="p" className="text-xs tracking-[0.25em]">
          {t("sectionTitle")}
        </Label>
        <span className="text-label text-[10px] md:text-xs bg-brand-cream/60 border border-brand-green/20 rounded-full px-4 py-1.5">
          {showGoogleRating
            ? t("googleRatingSummary", {
                rating: rating.toFixed(1),
                count: userRatingCount,
              })
            : t("badge")}
        </span>
        <Heading className="mt-2">{t("title")}</Heading>
      </div>

      <m.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="scroll-snap-x flex gap-4 md:gap-6 overflow-x-auto pb-4 px-6 md:px-12 xl:px-20"
        role="list"
        aria-label={t("title")}>
        {reviews.map((review, index) => (
          <m.div
            key={review.id ?? `${review.client.name}-${index}`}
            variants={item}
            role="listitem"
            className="scroll-snap-start shrink-0 w-[min(85vw,300px)] md:w-[min(32vw,360px)]">
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

      {source === "google" && googleMapsUri && (
        <p className="section-container mt-8 text-center text-xs text-brand-green/70">
          {t("googleAttribution")}{" "}
          <a
            href={googleMapsUri}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-brand-green">
            {t("viewOnGoogle")}
          </a>
        </p>
      )}
      </section>
    </>
  );
};

export default ReviewContainer;

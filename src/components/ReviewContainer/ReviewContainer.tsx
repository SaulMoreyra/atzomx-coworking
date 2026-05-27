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
}

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, x: 16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

const ReviewContainer: FC<ReviewContainerProps> = ({ reviews }) => {
  const t = useTranslations("home.reviews");

  return (
    <>
      <OrganicDivider fill="accent" variant="clover" />
      <section id="reviews" className="w-full bg-brand-accent text-brand-green py-14 md:py-20">
      <div className="section-container flex flex-col items-center gap-4 text-center mb-8 md:mb-10">
        <Label as="p" className="text-xs tracking-[0.25em]">
          {t("sectionTitle")}
        </Label>
        <span className="text-label text-[10px] md:text-xs bg-brand-cream/60 border border-brand-green/20 rounded-full px-4 py-1.5">
          {t("badge")}
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
            key={index}
            variants={item}
            role="listitem"
            className="scroll-snap-start shrink-0 w-[min(85vw,300px)] md:w-[min(32vw,340px)]">
            <ReviewCard review={review} />
          </m.div>
        ))}
      </m.div>
      </section>
    </>
  );
};

export default ReviewContainer;

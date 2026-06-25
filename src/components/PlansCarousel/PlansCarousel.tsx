"use client";

import { type PlanType } from "@/common/types/planTypes";
import HomeSectionIntro from "@/components/ui/HomeSectionIntro/HomeSectionIntro";
import SectionSticker from "@/components/ui/SectionSticker/SectionSticker";
import React, { type FC } from "react";
import PlanBanner from "../PlanBanner/PlanBanner";
import PlanComparisonMatrix from "../PlanComparisonMatrix/PlanComparisonMatrix";
import PlansPricingTable from "../PlansPricingTable/PlansPricingTable";
import { useTranslations } from "next-intl";

interface PlansCarouselProps {
  plans: PlanType[];
}

const PlansCarousel: FC<PlansCarouselProps> = ({ plans }) => {
  const t = useTranslations("home.plans");

  return (
    <section
      id="plans"
      data-header-surface="cream"
      className="relative w-full overflow-x-clip bg-brand-cream">
      <div className="section-container relative py-12 md:py-16">
        <HomeSectionIntro title={t("sectionTitle")} />

        <SectionSticker
          id="sticker-laptop-man"
          sizes="(max-width: 768px) 32vw, 176px"
          className="absolute right-[4rem] top-[10rem] z-0 w-[8.5rem] opacity-45 sm:w-[9.5rem] md:left-[24rem] md:top-[28rem] md:w-[11rem] md:opacity-100 lg:w-[12rem]"
        />
      </div>

      <div className="flex flex-col">
        {plans.map((plan, index) => (
          <PlanBanner key={plan.id} plan={plan} reverse={index % 2 === 1} />
        ))}
      </div>

      <PlansPricingTable plans={plans} />
      <PlanComparisonMatrix />
    </section>
  );
};

export default PlansCarousel;

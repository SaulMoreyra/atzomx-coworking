"use client";

import { type PlanType } from "@/common/types/planTypes";
import HomeSectionIntro from "@/components/ui/HomeSectionIntro/HomeSectionIntro";
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
    <section id="plans" data-header-surface="cream" className="w-full border-t border-brand-green/10 bg-brand-cream">
      <div className="section-container py-12 md:py-16">
        <HomeSectionIntro title={t("sectionTitle")} />
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

"use client";

import { type PlanType } from "@/common/types/planTypes";
import { highlightDividerVariants, planSlideSurfaces, type BrandSurface, type OrganicDividerFill } from "@/design-system";
import React, { Fragment, type FC } from "react";
import PlanBanner from "../PlanBanner/PlanBanner";
import PlanComparisonMatrix from "../PlanComparisonMatrix/PlanComparisonMatrix";
import PlansPricingTable from "../PlansPricingTable/PlansPricingTable";
import Label from "../ui/Label/Label";
import HighlightShape from "../ui/HighlightShape/HighlightShape";
import OrganicDivider from "../ui/OrganicDivider/OrganicDivider";
import { useTranslations } from "next-intl";

interface PlansCarouselProps {
  plans: PlanType[];
}

const dividerVariants = highlightDividerVariants;

const toDividerFill = (surface: BrandSurface): OrganicDividerFill => {
  if (surface === "green") return "green";
  if (surface === "white") return "cream";
  return surface;
};

/** Vertical full-bleed plan bands — editorial layout, no carousel boxes */
const PlansCarousel: FC<PlansCarouselProps> = ({ plans }) => {
  const t = useTranslations("home.plans");

  return (
    <section id="plans" className="w-full bg-brand-cream">
      <div className="section-container py-10 md:py-14 text-center">
        <div className="flex flex-col items-center gap-3">
          <HighlightShape variant="star" fill="accent" size={56} className="opacity-90" />
          <Label as="h2" className="text-sm md:text-base tracking-[0.25em]">
            {t("sectionTitle")}
          </Label>
        </div>
      </div>

      <div className="flex flex-col">
        {plans.map((plan, index) => {
          const surface: BrandSurface = planSlideSurfaces[index % planSlideSurfaces.length];
          const nextSurface: BrandSurface | null =
            index + 1 < plans.length
              ? planSlideSurfaces[(index + 1) % planSlideSurfaces.length]
              : null;

          return (
            <Fragment key={plan.id}>
              {index === 0 ? (
                <OrganicDivider
                  fill={toDividerFill(surface)}
                  variant={dividerVariants[index % dividerVariants.length]}
                />
              ) : null}
              <PlanBanner
                plan={plan}
                surface={surface}
                trailingDivider={
                  nextSurface && surface !== nextSurface
                    ? {
                        fill: toDividerFill(nextSurface),
                        variant: dividerVariants[(index + 1) % dividerVariants.length],
                      }
                    : undefined
                }
              />
            </Fragment>
          );
        })}
      </div>

      <PlansPricingTable plans={plans} />
      <PlanComparisonMatrix />
    </section>
  );
};

export default PlansCarousel;

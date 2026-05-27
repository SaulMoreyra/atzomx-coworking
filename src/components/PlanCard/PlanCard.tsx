import React from "react";
import { type PlanType } from "@/common/types/planTypes";
import { FeaturesByCategory } from "@/mocks/products";
import cx from "classnames";
import { Check, Minus } from "react-feather";
import { useTranslations } from "next-intl";

interface PlanCardProps {
  plan: PlanType;
}

const PlanCard = ({ plan }: PlanCardProps) => {
  const t = useTranslations(`home.plans.features.${plan.area}`);
  const featuresSet = new Set(plan.features);
  const features = FeaturesByCategory[plan.area];

  return (
    <div className="p-6 md:p-8 bg-brand-cream border border-brand-green/15 flex flex-col">
      <ul className="flex flex-col gap-3 md:gap-4">
        {Object.values(features).map((feature, index) => {
          const isIncluded = featuresSet.has(feature);
          return (
            <li className="flex flex-row gap-3 items-start" key={index}>
              {isIncluded ? (
                <Check
                  className="text-brand-green min-w-[20px] mt-0.5 shrink-0"
                  size={20}
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              ) : (
                <Minus
                  className="text-brand-green/25 min-w-[20px] mt-0.5 shrink-0"
                  size={20}
                  aria-hidden="true"
                />
              )}
              <p
                className={cx(
                  "text-body text-left text-base md:text-lg",
                  isIncluded ? "text-brand-green" : "text-brand-green/35"
                )}>
                {t(feature)}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PlanCard;

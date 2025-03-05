import React from "react";
import { type PlanType } from "@/common/types/planTypes";
import { FeaturesByCategory } from "@/mocks/products";
import cx from "classnames";
import { CheckSquare, Square } from "react-feather";
import { useTranslations } from "next-intl";

interface PlanCardProps {
  plan: PlanType;
}

const PlanCard = ({ plan }: PlanCardProps) => {
  const t = useTranslations(`home.plans.features.${plan.area}`);
  const featuresSet = new Set(plan.features);
  const features = FeaturesByCategory[plan.area];

  return (
    <div className="p-10 flex gap-5 bg-white rounded-md shadow-sm hover:shadow-xl flex-col">
      <ul className="flex flex-col gap-5">
        {Object.values(features).map((feature, index) => (
          <li className="flex flex-row gap-3" key={index}>
            {featuresSet.has(feature) ? (
              <CheckSquare className="text-theme-mint min-w-[24px]" />
            ) : (
              <Square className="text-gray-400 min-w-[24px]" />
            )}
            <p
              className={cx(
                "text-xl text-left",
                featuresSet.has(feature) ? "text-theme-mint" : "text-gray-400"
              )}>
              {t(feature)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlanCard;

"use client";

import {
  COMPARISON_FEATURE_KEYS,
  getComparisonPlans,
  planIncludesComparisonFeature,
} from "@/design-system/plan-comparison";
import Label from "@/components/ui/Label/Label";
import HighlightShape from "@/components/ui/HighlightShape/HighlightShape";
import { useTranslations } from "next-intl";
import React from "react";
import { Check, Minus } from "react-feather";
import cx from "classnames";

const PlanComparisonMatrix = () => {
  const t = useTranslations("home.planComparison");
  const tPlans = useTranslations("home.plans");
  const tFeatures = useTranslations("home.plans.features");

  const plans = getComparisonPlans();

  return (
    <div className="section-container max-w-6xl py-12 md:py-16">
      <div className="mb-8 flex flex-col items-center gap-2 text-center md:mb-10">
        <HighlightShape variant="star" fill="accent" size={44} className="opacity-90" />
        <Label as="p" className="text-xs tracking-[0.25em]">
          {t("sectionTitle")}
        </Label>
        <h3 className="text-label text-lg normal-case tracking-wide md:text-xl">{t("title")}</h3>
        <p className="text-body max-w-xl text-sm text-brand-green/65 md:text-base">{t("subtitle")}</p>
      </div>

      {/* Mobile: stacked cards */}
      <div className="flex flex-col gap-4 lg:hidden">
        {plans.map(plan => (
          <article
            key={plan.id}
            className="border border-brand-green/12 bg-brand-cream p-5 md:p-6">
            <div className="mb-4 flex items-baseline justify-between gap-3 border-b border-brand-green/10 pb-4">
              <h4 className="text-label text-sm normal-case tracking-wide md:text-base">
                {tPlans(`plans.${plan.id}.name`)}
              </h4>
              <span className="text-lg font-semibold tabular-nums text-brand-green md:text-xl">
                {plan.startPrice === 0 ? t("freePrice") : `$${plan.startPrice}`}
                {plan.startPrice > 0 ? (
                  <span className="text-label ml-1 text-[10px] font-normal text-brand-green/50">
                    /{t("hour")}
                  </span>
                ) : null}
              </span>
            </div>
            <ul className="flex flex-col gap-2.5">
              {COMPARISON_FEATURE_KEYS.map(featureKey => {
                const included = planIncludesComparisonFeature(plan, featureKey);
                const featureLabel =
                  plan.id === "free" && featureKey === "high-speed-internet"
                    ? tFeatures("cafeteria.stable-internet")
                    : tFeatures(`co-working.${featureKey}`);

                return (
                  <li key={featureKey} className="flex items-start gap-2.5">
                    {included ? (
                      <Check size={18} className="mt-0.5 shrink-0 text-brand-green" aria-hidden="true" />
                    ) : (
                      <Minus size={18} className="mt-0.5 shrink-0 text-brand-green/25" aria-hidden="true" />
                    )}
                    <span
                      className={cx(
                        "text-body text-sm",
                        included ? "text-brand-green" : "text-brand-green/35"
                      )}>
                      {featureLabel}
                    </span>
                  </li>
                );
              })}
            </ul>
          </article>
        ))}
      </div>

      {/* Desktop: matrix table */}
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full min-w-[720px] border-collapse border border-brand-green/12 bg-brand-cream text-left">
          <thead>
            <tr className="border-b border-brand-green/12 bg-brand-main/40">
              <th scope="col" className="text-label px-5 py-4 text-xs tracking-[0.14em] md:px-6">
                {t("featureColumn")}
              </th>
              {plans.map(plan => (
                <th
                  key={plan.id}
                  scope="col"
                  className="text-label px-4 py-4 text-center text-xs normal-case tracking-wide md:px-5">
                  <span className="block">{tPlans(`plans.${plan.id}.name`)}</span>
                  <span className="mt-1 block text-base font-semibold tabular-nums text-brand-green">
                    {plan.startPrice === 0 ? t("freePrice") : `$${plan.startPrice}`}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARISON_FEATURE_KEYS.map((featureKey, rowIndex) => (
              <tr
                key={featureKey}
                className={cx(
                  "border-b border-brand-green/10 last:border-b-0",
                  rowIndex % 2 === 0 ? "bg-brand-cream" : "bg-brand-main/20"
                )}>
                <th scope="row" className="text-body px-5 py-3.5 text-sm font-medium text-brand-green md:px-6">
                  {featureKey === "high-speed-internet"
                    ? t("wifiRow")
                    : tFeatures(`co-working.${featureKey}`)}
                </th>
                {plans.map(plan => {
                  const included = planIncludesComparisonFeature(plan, featureKey);
                  return (
                    <td key={plan.id} className="px-4 py-3.5 text-center md:px-5">
                      <span className="sr-only">
                        {tPlans(`plans.${plan.id}.name`)} —{" "}
                        {included ? t("included") : t("notIncluded")}
                      </span>
                      {included ? (
                        <Check size={20} className="mx-auto text-brand-green" aria-hidden="true" />
                      ) : (
                        <Minus size={20} className="mx-auto text-brand-green/25" aria-hidden="true" />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlanComparisonMatrix;

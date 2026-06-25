import { type PlanType } from "@/common/types/planTypes";
import { ALL_PLANS } from "@/mocks/products";

export const COMPARISON_PLAN_IDS = ["free", "standard", "individual", "monitor"] as const;

export type ComparisonPlanId = (typeof COMPARISON_PLAN_IDS)[number];

/** Rows shown in the side-by-side plan matrix */
export const COMPARISON_FEATURE_KEYS = [
  "high-speed-internet",
  "ergonomic-chairs",
  "unlimited-coffee-tea-and-water",
  "individual-desk",
  "extra-monitor",
  "roof-top-access",
  "discount-on-cafeteria-menu",
] as const;

export type ComparisonFeatureKey = (typeof COMPARISON_FEATURE_KEYS)[number];

const FREE_WIFI_FEATURES = ["stable-internet", "high-speed-internet"];

export const getComparisonPlans = (): PlanType[] =>
  ALL_PLANS.filter(plan => COMPARISON_PLAN_IDS.includes(plan.id as ComparisonPlanId));

export const planIncludesComparisonFeature = (
  plan: PlanType,
  featureKey: ComparisonFeatureKey
): boolean => {
  if (featureKey === "high-speed-internet" && plan.id === "free") {
    return plan.features.some(feature => FREE_WIFI_FEATURES.includes(feature));
  }

  return plan.features.includes(featureKey);
};

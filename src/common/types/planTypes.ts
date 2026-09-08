export enum CategoryPlan {
  CAFETERIA = "cafeteria",
  COWORKING = "co-working",
  MEETING_ROOM = "meeting-room",
  LOCKERS = "lockers",
}

export type CategoryPlanType = "cafeteria" | "co-working" | "meeting-room" | "lockers";

export const PLAN_PRICE_PERIODS = ["day", "week", "month"] as const;

export type PlanPricePeriod = (typeof PLAN_PRICE_PERIODS)[number];

export type PlanPrices = Partial<Record<PlanPricePeriod, number>>;

export interface PlanType {
  id: string;
  startPrice: number;
  area: CategoryPlanType;
  features: string[];
  prices?: PlanPrices;
}

export interface ReviewType {
  id?: string;
  client: {
    name: string;
    image: string;
  };
  rating: number;
  review: string;
  source?: "google" | "static";
}

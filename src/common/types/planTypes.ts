export enum CategoryPlan {
  CAFETERIA = "cafeteria",
  COWORKING = "co-working",
  MEETING_ROOM = "meeting-room",
}

export type CategoryPlanType = "cafeteria" | "co-working" | "meeting-room";

export interface PlanType {
  id: string;
  startPrice: number;
  area: CategoryPlanType;
  features: string[];
}

export interface ReviewType {
  client: {
    name: string;
    image: string;
  };
  rating: number;
  review: string;
}

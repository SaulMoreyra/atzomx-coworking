export enum CategoryPlan {
  CAFETERIA = "cafeteria",
  COWORKING = "coworking",
  MEETING_ROOM = "meeting room",
}

export type CategoryPlanType = "cafeteria" | "coworking" | "meeting room";

export type PlanType = {
  name: string;
  startPrice: number;
  features: string[];
  description: string;
  category: CategoryPlanType;
};

export type ReviewType = {
  client: {
    name: string;
    image: string;
  };
  rating: number;
  review: string;
};

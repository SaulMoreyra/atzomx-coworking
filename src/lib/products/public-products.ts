import type { FoodType } from "@/common/types/menuTypes";
import type { PlanType } from "@/common/types/planTypes";
import { ALL_FOODS } from "@/mocks/menu";
import { ALL_PLANS } from "@/mocks/products";

export async function getPublicMenu(): Promise<FoodType[]> {
  return ALL_FOODS;
}

export async function getPublicPlans(): Promise<PlanType[]> {
  return ALL_PLANS;
}

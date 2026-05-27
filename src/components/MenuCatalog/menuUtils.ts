import { type FoodType } from "@/common/types/menuTypes";

export const groupFoodsByCategory = (items: FoodType[]) => {
  return items.reduce<Record<string, FoodType[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});
};

export const categorySectionId = (category: string) => `menu-cat-${category}`;

import { type FoodType } from "@/common/types/menuTypes";

export const MENU_DEFAULT_IMAGE = "/images/menu/default-item.png";

/** Category fallbacks — replace PNGs in public/images/menu/ when real photos are ready */
export const MENU_CATEGORY_DEFAULTS: Record<string, string> = {
  coffee: MENU_DEFAULT_IMAGE,
  lunch: "/images/menu/default-lunch.png",
  dessert: "/images/menu/default-dessert.png",
  smoothies: "/images/menu/default-smoothie.png",
  combos: "/images/menu/default-combo.png",
  frappes: "/images/menu/default-frappe.png",
  extras: "/images/menu/default-extras.png",
  "italian-sodas": "/images/menu/default-soda.png",
};

export const getMenuCategoryDefault = (category: string) =>
  MENU_CATEGORY_DEFAULTS[category] ?? MENU_DEFAULT_IMAGE;

export const groupFoodsByCategory = (items: FoodType[]) => {
  return items.reduce<Record<string, FoodType[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});
};

export const categorySectionId = (category: string) => `menu-cat-${category}`;

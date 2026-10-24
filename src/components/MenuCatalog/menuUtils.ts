import { type FoodType } from "@/common/types/menuTypes";

export const MENU_DEFAULT_IMAGE = "/images/menu/default-item.png";

/** Category fallbacks — replace PNGs in public/images/menu/ when real photos are ready */
export const MENU_CATEGORY_DEFAULTS: Record<string, string> = {
  teas: MENU_DEFAULT_IMAGE,
  sweet: MENU_DEFAULT_IMAGE,
  coffee: MENU_DEFAULT_IMAGE,
  frappes: "/images/menu/default-frappe.png",
  signatures: MENU_DEFAULT_IMAGE,
  extras: "/images/menu/default-extras.png",
  smoothies: "/images/menu/default-smoothie.png",
  drinks: "/images/menu/default-soda.png",
  house: "/images/menu/default-lunch.png",
  bowls: "/images/menu/default-smoothie.png",
  sandwiches: "/images/menu/default-lunch.png",
  more: "/images/menu/default-dessert.png",
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

export const getScrollBehavior = (): ScrollBehavior =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

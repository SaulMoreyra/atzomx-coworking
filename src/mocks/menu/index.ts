import { coffee } from "./coffee";
import { dessert } from "./dessert";
import { extras } from "./extras";
import { frappes } from "./frappes";
import { lunch } from "./lunch";
import { smoothies } from "./smoothies";

export const ALL_FOODS = [
  coffee,
  lunch,
  dessert,
  smoothies,
  frappes,
  extras,
].flat();

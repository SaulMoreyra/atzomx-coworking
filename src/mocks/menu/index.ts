import { coffee } from "./coffee";
import { combos } from "./combos";
import { dessert } from "./dessert";
import { extras } from "./extras";
import { frappes } from "./frappes";
import { italianSodas } from "./italian-sodas";
import { lunch } from "./lunch";
import { smoothies } from "./smoothies";

export const ALL_FOODS = [
  coffee,
  lunch,
  dessert,
  smoothies,
  combos,
  frappes,
  italianSodas,
  extras,
].flat();

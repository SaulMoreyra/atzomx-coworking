import { bowls } from "./bowls";
import { coffee } from "./coffee";
import { drinks } from "./drinks";
import { extras } from "./extras";
import { frappes } from "./frappes";
import { house } from "./house";
import { more } from "./more";
import { sandwiches } from "./sandwiches";
import { signatures } from "./signatures";
import { smoothies } from "./smoothies";
import { sweet } from "./sweet";
import { teas } from "./teas";

export const MENU_CATEGORY_ORDER = [
  "teas",
  "sweet",
  "coffee",
  "frappes",
  "signatures",
  "extras",
  "smoothies",
  "drinks",
  "house",
  "bowls",
  "sandwiches",
  "more",
];

export const ALL_FOODS = [
  teas,
  sweet,
  coffee,
  frappes,
  signatures,
  extras,
  smoothies,
  drinks,
  house,
  bowls,
  sandwiches,
  more,
].flat();

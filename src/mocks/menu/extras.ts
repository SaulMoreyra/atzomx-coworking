import { type FoodType } from "@/common/types/menuTypes";

export const extras: FoodType[] = [
  {
    id: "chai-latte",
    price: 65,
    image: "/images/food/chai-latte.png",
    variants: [
      { name: "hot", price: 65 },
      { name: "iced", price: 70 },
    ],
    category: "extras",
  },
  {
    id: "choco-latte",
    price: 65,
    image: "/images/food/choco-latte.png",
    variants: [],
    category: "extras",
  },
  {
    id: "tizanas",
    price: 70,
    image: "/images/food/tizanas.png",
    variants: [
      { name: "hot", price: 70 },
      { name: "iced", price: 75 },
    ],
    category: "extras",
  },
  {
    id: "sodas",
    price: 35,
    image: "/images/food/sodas.png",
    variants: [],
    category: "extras",
  },
  {
    id: "topo-chico",
    price: 35,
    image: "/images/food/topo-chico.png",
    variants: [],
    category: "extras",
  },
  {
    id: "tea",
    price: 40,
    image: "/images/food/tea.png",
    variants: [
      { name: "hot", price: 40 },
      { name: "iced", price: 45 },
    ],
    category: "extras",
  },
];

import { type FoodType } from "@/common/types/menuTypes";

export const teas: FoodType[] = [
  {
    id: "tea",
    price: 40,
    image: "/images/food/tizanas.webp",
    variants: [
      { name: "hot", price: 40 },
      { name: "iced", price: 45 },
    ],
    category: "teas",
  },
  {
    id: "tizanas",
    price: 70,
    image: "/images/food/tizanas.webp",
    variants: [
      { name: "hot", price: 70 },
      { name: "iced", price: 75 },
    ],
    category: "teas",
  },
  {
    id: "chai-latte",
    price: 65,
    image: "/images/extras/chai.webp",
    variants: [
      { name: "hot", price: 65 },
      { name: "iced", price: 70 },
    ],
    category: "teas",
  },
  {
    id: "choco-latte",
    price: 60,
    image: "/images/coffee/mocca.webp",
    variants: [
      { name: "hot", price: 60 },
      { name: "iced", price: 65 },
    ],
    category: "teas",
  },
  {
    id: "dirty-chai",
    price: 70,
    image: "/images/extras/chai.webp",
    variants: [
      { name: "hot", price: 70 },
      { name: "iced", price: 75 },
    ],
    category: "teas",
  },
];

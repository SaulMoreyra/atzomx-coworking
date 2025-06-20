import { type FoodType } from "@/common/types/menuTypes";

export const lunch: FoodType[] = [
  {
    id: "turkey-sandwich",
    price: 110,
    image: "/images/food/green-sandwich.webp",
    variants: [
      { name: "chips", price: 110 },
      { name: "salad", price: 110 },
    ],
    category: "lunch",
  },
  {
    id: "iberian-sandwich",
    price: 115,
    image: "/images/food/green-sandwich.webp",
    variants: [
      { name: "chips", price: 115 },
      { name: "salad", price: 115 },
    ],
    category: "lunch",
  },
  {
    id: "serrano-sandwich",
    price: 135,
    image: "/images/food/green-sandwich.webp",
    variants: [
      { name: "chips", price: 135 },
      { name: "salad", price: 135 },
    ],
    category: "lunch",
  },
  {
    id: "house-salad",
    price: 90,
    image: "/images/food/house-salad.webp",
    variants: [],
    category: "lunch",
  },
  {
    id: "red-berry-bowl",
    price: 90,
    image: "/images/food/red-berry-bowl.webp",
    variants: [],
    category: "lunch",
  },
  {
    id: "chocolate-bowl",
    price: 90,
    image: "/images/food/chocolate-bowl.webp",
    variants: [],
    category: "lunch",
  },
];

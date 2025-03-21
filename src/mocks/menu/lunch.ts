import { type FoodType } from "@/common/types/menuTypes";

export const lunch: FoodType[] = [
  {
    id: "green-sandwich",
    price: 110,
    image: "/images/food/espresso.jpeg",
    variants: [
      { name: "chips", price: 110 },
      { name: "salad", price: 110 },
    ],
    category: "lunch",
  },
  {
    id: "turkey-sandwich",
    price: 110,
    image: "/images/food/turkey-sandwich.png",
    variants: [
      { name: "chips", price: 110 },
      { name: "salad", price: 110 },
    ],
    category: "lunch",
  },
  {
    id: "iberian-sandwich",
    price: 115,
    image: "/images/food/espresso.jpeg",
    variants: [
      { name: "chips", price: 115 },
      { name: "salad", price: 115 },
    ],
    category: "lunch",
  },
  {
    id: "serrano-sandwich",
    price: 135,
    image: "/images/food/espresso.jpeg",
    variants: [
      { name: "chips", price: 135 },
      { name: "salad", price: 135 },
    ],
    category: "lunch",
  },
  {
    id: "house-salad",
    price: 90,
    image: "/images/food/house-salad.png",
    variants: [],
    category: "lunch",
  },
  {
    id: "red-berry-bowl",
    price: 90,
    image: "/images/food/red-berry-bowl.png",
    variants: [],
    category: "lunch",
  },
  {
    id: "chocolate-bowl",
    price: 90,
    image: "/images/food/chocolate-bowl.png",
    variants: [],
    category: "lunch",
  },
];

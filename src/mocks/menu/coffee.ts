import { type FoodType } from "@/common/types/menuTypes";

export const coffee: FoodType[] = [
  {
    id: "espresso",
    price: 40,
    image: "/images/coffee/espresso.webp",
    variants: [{ name: "hot", price: 40 }],
    category: "coffee",
  },
  {
    id: "macchiato",
    price: 50,
    image: "/images/coffee/espresso.webp",
    variants: [{ name: "hot", price: 50 }],
    category: "coffee",
  },
  {
    id: "americano",
    price: 40,
    image: "/images/coffee/americano.webp",
    variants: [
      { name: "hot", price: 45 },
      { name: "iced", price: 50 },
    ],
    category: "coffee",
  },
  {
    id: "cappuccino",
    price: 60,
    image: "/images/coffee/cappuccino.webp",
    variants: [
      { name: "hot", price: 60 },
      { name: "iced", price: 65 },
    ],
    category: "coffee",
  },
  {
    id: "latte",
    price: 60,
    image: "/images/coffee/latte.webp",
    variants: [
      { name: "hot", price: 60 },
      { name: "iced", price: 65 },
    ],
    category: "coffee",
  },
  {
    id: "mocca",
    price: 65,
    image: "/images/coffee/mocca.webp",
    variants: [
      { name: "hot", price: 65 },
      { name: "iced", price: 70 },
    ],
    category: "coffee",
  },
  {
    id: "flat-white",
    price: 65,
    image: "/images/coffee/flat-white.webp",
    variants: [
      { name: "hot", price: 65 },
      { name: "iced", price: 70 },
    ],
    category: "coffee",
  },
  {
    id: "espresso-berry",
    price: 75,
    image: "/images/coffee/espresso.webp",
    variants: [{ name: "iced", price: 75 }],
    category: "coffee",
  },
  {
    id: "espresso-tonic",
    price: 75,
    image: "/images/coffee/espresso.webp",
    variants: [{ name: "iced", price: 75 }],
    category: "coffee",
  },
  {
    id: "cold-brew",
    price: 65,
    image: "/images/coffee/cold-brew.webp",
    variants: [{ name: "iced", price: 65 }],
    category: "coffee",
  },
  {
    id: "methods",
    price: 70,
    image: "/images/coffee/espresso.webp",
    variants: [{ name: "hot", price: 70 }],
    category: "coffee",
  },
];

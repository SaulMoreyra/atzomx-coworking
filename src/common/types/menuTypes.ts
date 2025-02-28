export type VariantType = {
  name: string;
  price: number;
};

export type FoodType = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  variants: VariantType[];
  category: string;
};

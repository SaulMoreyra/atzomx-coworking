export interface VariantType {
  name: string;
  price: number;
}

export interface FoodType {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  variants: VariantType[];
  category: string;
}

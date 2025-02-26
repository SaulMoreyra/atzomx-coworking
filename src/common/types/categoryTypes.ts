type Subcategory = {
  id: number;
  name: string;
  categoryId: number;
};

export type CategoryType = {
  id: number;
  name: string;
  image: string;
} & { subcategories: Subcategory[] };

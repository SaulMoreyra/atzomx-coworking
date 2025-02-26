type Category = {
  id: number;
  name: string;
  image: string;
};

type Subcategory = {
  id: number;
  name: string;
  categoryId: number;
};

type Product = {
  id: number;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  name: string;
  description: string;
  image: string;
  stock: number;
  categoryId: number;
  subcategoryId: number;
};

export type ProductType = Omit<Product, "price"> & {
  category: Category;
  subcategory: Subcategory;
  price: number;
};
export type ProductEntityType = Product & {
  category: Category;
  subcategory: Subcategory;
};

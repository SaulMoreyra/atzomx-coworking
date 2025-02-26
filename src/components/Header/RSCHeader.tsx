import React from "react";
import Header from "./Header";
import { ImageType } from "@/common/types/categoryTypes";
import { ProductType } from "@/common/types/productTypes";
import { ALL_IMAGES, ALL_PRODUCTS } from "@/mocks/products";

const categories: ImageType[] = ALL_IMAGES;
const trendingProducts: ProductType[] = ALL_PRODUCTS;

export default async function RSCHeader() {
  return <Header categories={categories} trendingProducts={trendingProducts} />;
}

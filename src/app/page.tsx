import React from "react";

import { type ReviewType } from "@/common/types/planTypes";
import { type ProductType } from "@/common/types/productTypes";

import Heading from "@/components/Heading/Heading";
import ImagesCarousel from "@/components/ImagesCarousel/ImagesCarousel";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import PlansCarousel from "@/components/PlansCarousel/PlansCarousel";
import Presentation from "@/components/Presentation/Presentation";
import ProductCard from "@/components/ProductCard/ProductCard";
import ReviewContainer from "@/components/ReviewContainer/ReviewContainer";
import ServiceBenefits from "@/components/ServiceBenefits/ServiceBenefits";
import {
  ALL_IMAGES,
  ALL_PLANS,
  ALL_PRODUCTS,
  ALL_REVIEWS,
} from "@/mocks/products";

export default async function Home() {
  const trendingProducts: ProductType[] = [...ALL_PRODUCTS];
  const latestProducts: ProductType[] = [...ALL_PRODUCTS];
  const testimonials: ReviewType[] = [...ALL_REVIEWS];

  return (
    <PageWrapper>
      <Presentation />
      <div className="min-h-screen-header flex flex-col gap-20 mb-40">
        <ServiceBenefits />
        <ImagesCarousel images={ALL_IMAGES} />
      </div>
      <PlansCarousel plans={ALL_PLANS} />
      <div className="flex flex-col gap-20">
        <div className="flex flex-col gap-10">
          <Heading>Trending products</Heading>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
            {trendingProducts.splice(0, 4).map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <Heading>Fresh arrivals</Heading>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
            {latestProducts.splice(0, 4).map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
          </div>
        </div>
        <ReviewContainer reviews={testimonials} />
      </div>
    </PageWrapper>
  );
}

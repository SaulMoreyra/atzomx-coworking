import React from "react";

import { type ReviewType } from "@/common/types/planTypes";
import { type ProductType } from "@/common/types/productTypes";

import About from "@/components/About/About";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Heading from "@/components/Heading/Heading";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import PlansCarousel from "@/components/PlansCarousel/PlansCarousel";
import Presentation from "@/components/Presentation/Presentation";
import ProductCard from "@/components/ProductCard/ProductCard";
import ReviewContainer from "@/components/ReviewContainer/ReviewContainer";
import { ALL_PLANS, ALL_PRODUCTS, ALL_REVIEWS } from "@/mocks/products";

export default async function Home() {
  const trendingProducts: ProductType[] = [...ALL_PRODUCTS];
  const latestProducts: ProductType[] = [...ALL_PRODUCTS];
  const testimonials: ReviewType[] = [...ALL_REVIEWS];

  return (
    <>
      <Header />
      <div className="min-h-screen">
        <PageWrapper>
          <Presentation />
          <About />
          <PlansCarousel plans={ALL_PLANS} />
          <ReviewContainer reviews={testimonials} />
        </PageWrapper>
      </div>
      <Footer />
    </>
  );
}

import React from "react";
import { type ReviewType } from "@/common/types/planTypes";
import About from "@/components/About/About";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import PlansCarousel from "@/components/PlansCarousel/PlansCarousel";
import Presentation from "@/components/Presentation/Presentation";
import ReviewContainer from "@/components/ReviewContainer/ReviewContainer";
import { ALL_PLANS, ALL_REVIEWS } from "@/mocks/products";

export default async function Home() {
  const testimonials: ReviewType[] = [...ALL_REVIEWS];

  return (
    <>
      <Header />
      <main className="site-main min-h-screen flex flex-col pt-site-header">
        <Presentation />
        <About />
        <PlansCarousel plans={ALL_PLANS} />
        <ReviewContainer reviews={testimonials} />
      </main>
      <Footer />
    </>
  );
}

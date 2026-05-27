import React from "react";
import About from "@/components/About/About";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import PlansCarousel from "@/components/PlansCarousel/PlansCarousel";
import Presentation from "@/components/Presentation/Presentation";
import ReviewContainer from "@/components/ReviewContainer/ReviewContainer";
import { ALL_PLANS } from "@/mocks/products";
import { getReviews } from "@/services/reviews/getReviews";

export default async function Home() {
  const reviewsData = await getReviews();

  return (
    <>
      <Header />
      <main className="site-main min-h-screen flex flex-col pt-site-header">
        <Presentation />
        <About />
        <PlansCarousel plans={ALL_PLANS} />
        <ReviewContainer {...reviewsData} />
      </main>
      <Footer />
    </>
  );
}

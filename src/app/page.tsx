import React from "react";
import About from "@/components/About/About";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import IntlMessages, {
  SHARED_CLIENT_MESSAGES,
} from "@/components/IntlMessages/IntlMessages";
import PlansCarousel from "@/components/PlansCarousel/PlansCarousel";
import Presentation from "@/components/Presentation/Presentation";
import SpaceGallery from "@/components/SpaceGallery/SpaceGallery";
import ReviewContainer from "@/components/ReviewContainer/ReviewContainer";
import CommunitySection from "@/components/CommunitySection/CommunitySection";
import TeamSection from "@/components/TeamSection/TeamSection";
import BlogSection from "@/components/BlogSection/BlogSection";
import FaqSection from "@/components/FaqSection/FaqSection";
import { getPublicPlans } from "@/lib/products/public-products";
import { getReviews } from "@/services/reviews/getReviews";

const HOME_CLIENT_MESSAGES = [
  ...SHARED_CLIENT_MESSAGES,
  "home.gallery",
  "home.plans",
];

export default async function Home() {
  const [reviewsData, plans] = await Promise.all([
    getReviews(),
    getPublicPlans(),
  ]);

  return (
    <IntlMessages namespaces={HOME_CLIENT_MESSAGES}>
      <Header />
      <main className="site-main min-h-screen flex flex-col pt-site-header">
        <Presentation />
        <About />
        <SpaceGallery />
        <PlansCarousel plans={plans} />
        <FaqSection />
        <BlogSection />
        <CommunitySection />
        <TeamSection />
        <ReviewContainer {...reviewsData} />
      </main>
      <Footer />
    </IntlMessages>
  );
}

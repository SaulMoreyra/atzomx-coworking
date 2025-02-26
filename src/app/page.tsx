import { CategoryType } from "@/common/types/categoryTypes";
import { ReviewType } from "@/common/types/planTypes";
import { ProductType } from "@/common/types/productTypes";
import Category from "@/components/Category/Category";
import Heading from "@/components/Heading/Heading";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import PlansCarousel from "@/components/PlansCarousel/PlansCarousel";
import Presentation from "@/components/Presentation/Presentation";
import ProductCard from "@/components/ProductCard/ProductCard";
import ReviewContainer from "@/components/ReviewContainer/ReviewContainer";
import ServiceBenefits from "@/components/ServiceBenefits/ServiceBenefits";
import {
  ALL_CATEGORIES,
  ALL_PLANS,
  ALL_PRODUCTS,
  ALL_REVIEWS,
} from "@/mocks/products";

export default async function Home() {
  const trendingProducts: ProductType[] = [...ALL_PRODUCTS];
  const latestProducts: ProductType[] = [...ALL_PRODUCTS];
  const categories: CategoryType[] = [...ALL_CATEGORIES];
  const testimonials: ReviewType[] = [...ALL_REVIEWS];

  return (
    <PageWrapper>
      <Presentation />
      <ServiceBenefits />
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
          <div className="flex flex-col items-center">
            <p className="text-xl text-gray-400">Shop by category</p>
          </div>
          <div
            className={`grid grid-cols-1 gap-5 md:grid-cols-${categories.length} min-h-[50vh] items-center`}
          >
            {categories.map((category, index) => (
              <Category
                key={index}
                category={category}
                className="h-[30vh] md:odd:h-full md:even:h-[80%]"
              />
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

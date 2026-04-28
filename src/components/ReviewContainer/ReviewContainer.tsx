"use client";

import { type ReviewType } from "@/common/types/planTypes";
import { motion as m, type Variants } from "framer-motion";
import React, { type FC, useMemo } from "react";
import Heading from "../Heading/Heading";
import ReviewCard from "../ReviewCard/ReviewCard";
import { useTranslations } from "next-intl";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface ReviewContainerProps {
  reviews: ReviewType[];
}

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

const ReviewContainer: FC<ReviewContainerProps> = ({ reviews }) => {
  const t = useTranslations("home.reviews");

  const reviewSlides = useMemo(() => {
    const slides: ReviewType[][] = [];
    for (let i = 0; i < reviews.length; i += 3) {
      slides.push(reviews.slice(i, i + 3));
    }
    return slides;
  }, [reviews]);

  return (
    <div
      id="reviews"
      className="bg-theme-gray rounded-md py-20 px-5 flex flex-col gap-10 relative overflow-hidden">
      <Heading className="md:absolute md:left-40">{t("title")}</Heading>

      <m.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        className="my-20">
        <Carousel
          showStatus={false}
          showArrows={true}
          swipeable={true}
          emulateTouch={true}
          infiniteLoop={true}
          autoPlay={true} >
          {reviewSlides.map((slide, slideIndex) => (
            <div key={slideIndex}>
              <m.ul className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-10">
                {slide.map((review, index) => (
                  <m.li variants={item} key={`${slideIndex}-${index}`}>
                    <ReviewCard review={review} />
                  </m.li>
                ))}
              </m.ul>
            </div>
          ))}
        </Carousel>
      </m.div>

      <div
        aria-hidden="true"
        className="absolute -bottom-4 left-[50%] -translate-x-[50%] text-9xl font-bold whitespace-nowrap opacity-10">
        {t("footer")}
      </div>
    </div>
  );
};

export default ReviewContainer;

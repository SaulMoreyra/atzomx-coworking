"use client";

import { type ReviewType } from "@/common/types/planTypes";
import { motion as m, type Variants } from "framer-motion";
import React, { type FC } from "react";
import Heading from "../Heading/Heading";
import ReviewCard from "../ReviewCard/ReviewCard";

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
  return (
    <div
      id="reviews"
      className="bg-theme-gray rounded-md py-20 px-5 flex flex-col gap-10 relative overflow-hidden">
      <Heading className="md:absolute md:left-40">Happy customers</Heading>
      <m.ul
        variants={container}
        initial="hidden"
        whileInView="visible"
        className="grid grid-cols-1 gap-5 my-20 md:grid-cols-3 md:gap-10">
        {reviews.map((review, index) => (
          <m.li variants={item} key={index}>
            <ReviewCard review={review} />
          </m.li>
        ))}
      </m.ul>
      <h1 className="absolute -bottom-4 left-[50%] -translate-x-[50%] text-9xl font-bold whitespace-nowrap opacity-10">
        customer reviews
      </h1>
    </div>
  );
};

export default ReviewContainer;

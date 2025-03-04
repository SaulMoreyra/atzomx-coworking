"use client";

import { type PlanType } from "@/common/types/planTypes";
import React, { type FC } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import PlanBanner from "../PlanBanner.tsx/PlanBanner";

interface HeroProps {
  plans: PlanType[];
}

const bannerBackgroundColours = [
  "bg-banner-blue",
  "bg-banner-cream",
  "bg-banner-yellow",
  "bg-banner-pink",
  "bg-banner-lavender",
  "bg-banner-peach",
];

const PlansCarousel: FC<HeroProps> = ({ plans }) => {
  return (
    <div id="plans" className="min-h-screen-header pt-5">
      <Carousel showStatus={false} infiniteLoop={true}>
        {plans.map((plan, index) => (
          <PlanBanner
            key={index}
            plan={plan}
            backgroundColor={bannerBackgroundColours[index]}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default PlansCarousel;

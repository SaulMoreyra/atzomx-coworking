"use client";

import { PlanType } from "@/common/types/planTypes";
import { type FC } from "react";
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
    <Carousel emulateTouch={true} showStatus={false} infiniteLoop={true}>
      {plans.map((plan, index) => (
        <PlanBanner
          key={index}
          plan={plan}
          backgroundColour={bannerBackgroundColours[index]}
        />
      ))}
    </Carousel>
  );
};

export default PlansCarousel;

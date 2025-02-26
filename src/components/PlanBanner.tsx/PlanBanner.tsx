"use client";

import { type PlanType } from "@/common/types/planTypes";
import Button from "@/components/Button/Button";
import cx from "classnames";
import { motion as m, type Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { type FC, useLayoutEffect, useRef } from "react";
import PlanCard from "../PlanCard/PlanCard";

interface PlanBannerProps {
  plan: PlanType;
  backgroundColour: string;
}

const PlanBanner: FC<PlanBannerProps> = ({ plan, backgroundColour }) => {
  const { name } = plan;
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "bottom bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    timeline.to(imageRef.current, {
      yPercent: -30,
    });
  }, []);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const animationVariants: Variants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <m.div
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      className={cx(
        "h-screen-header bg-theme-mint flex flex-col overflow-hidden rounded-md relative md:flex-row",
        backgroundColour
      )}>
      <div className="w-full md:w-3/5 flex flex-col justify-center items-center px-10 md:px-40">
        <div className="flex flex-col gap-5 py-10 md:py-0 w-full">
          <m.div
            variants={animationVariants}
            className="flex gap-5 items-center">
            <div className="h-[1px] bg-theme-black w-10" />
            <p className="text-2xl md:text-3xl">
              Best price of ${plan.startPrice}
            </p>
          </m.div>
          <m.p
            variants={animationVariants}
            className="text-5xl font-semibold text-left md:text-8xl">
            {name}
          </m.p>
          <m.div variants={animationVariants} className="relative">
            <a
              href="https://m.me/61569786946519"
              target="_blank"
              rel="noopener noreferrer">
              <Button className="text-2xl">Book</Button>
            </a>
          </m.div>
        </div>
      </div>
      <div className="w-2/5 h-full md:bg-white" />
      <div className="relative md:absolute bottom-[10%] h-[50%] md:right-[10%] md:h-[100%] md:-bottom-[0%] flex items-center justify-center w-full md:w-2/5">
        <div ref={imageRef} className="md:h-[50%] px-5 aspect-square relative">
          <PlanCard plan={plan} />
        </div>
      </div>
      <h1 className="absolute -bottom-2 md:-bottom-4 left-[50%] -translate-x-[50%] text-7xl md:text-9xl font-bold whitespace-nowrap opacity-10">
        {plan.category.toLowerCase()}
      </h1>
    </m.div>
  );
};

export default PlanBanner;

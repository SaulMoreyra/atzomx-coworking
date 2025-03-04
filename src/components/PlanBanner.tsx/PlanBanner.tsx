"use client";

import { type PlanType } from "@/common/types/planTypes";
import Button from "@/components/Button/Button";
import cx from "classnames";
import { motion as m, type Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { type FC, useLayoutEffect, useRef } from "react";
import PlanCard from "../PlanCard/PlanCard";
import { useTranslations } from "next-intl";

interface PlanBannerProps {
  plan: PlanType;
  backgroundColor: string;
}

const PlanBanner: FC<PlanBannerProps> = ({ plan, backgroundColor }) => {
  const { id } = plan;
  const t = useTranslations(`home.plans.plans.${id}`);
  const tPlans = useTranslations("home.plans");
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
        "min-h-[calc(100dvh-40px)] bg-theme-mint flex flex-col overflow-hidden rounded-md relative lg:flex-row",
        backgroundColor
      )}>
      <div className="w-full flex flex-col justify-center px-10 lg:px-40">
        <div className="flex flex-col gap-5 py-10 lg:py-0 w-full lg:w-3/5 relative">
          {plan.startPrice > 0 && (
            <m.div
              variants={animationVariants}
              className="flex gap-5 items-center justify-end lg:justify-start">
              <p className="font-semibold text-2xl lg:text-3xl gap-5">
                {tPlans("from")}
              </p>
              <div className="rounded-full p-5 bg-white text-4xl font-semibold lg:text-6xl flex justify-center items-center">
                <span className="">${plan.startPrice}</span>
              </div>
            </m.div>
          )}
          <m.p
            variants={animationVariants}
            className="text-5xl font-semibold text-left lg:text-8xl mt-5">
            {t("name")}
          </m.p>
          <m.p
            variants={animationVariants}
            className="text-left text-2xl lg:text-3xl -mt-5">
            {t("description")}
          </m.p>
          <m.div
            variants={animationVariants}
            className="relative flex gap-5 justify-between items-center">
            <a
              href="https://m.me/61569786946519"
              target="_blank"
              rel="noopener noreferrer">
              <Button className="text-2xl">Book</Button>
            </a>
          </m.div>
        </div>
      </div>
      <div className="relative flex-1 lg:absolute h-[50%] lg:right-[0%] lg:h-[100%] flex items-center justify-center w-full lg:w-2/5">
        <div ref={imageRef} className="lg:h-[50%] px-5 aspect-square relative">
          <PlanCard plan={plan} />
        </div>
      </div>
      <h1 className="absolute -bottom-2 lg:-bottom-4 left-[50%] -translate-x-[50%] text-7xl lg:text-9xl font-bold whitespace-nowrap opacity-10">
        {t("area").toLowerCase()}
      </h1>
    </m.div>
  );
};

export default PlanBanner;

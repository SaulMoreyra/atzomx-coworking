"use client";

import cx from "classnames";
import { motion as m, type Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import React, { FC, useLayoutEffect, useRef } from "react";
import Button from "../Button/Button";

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

const animationVariantsImage: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};

const Presentation: FC = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  const onClickPlans = () => {
    const element = document.getElementById("plans");
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
      yPercent: -100,
    });
  }, []);

  return (
    <m.div
      id="home"
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      className={cx(
        "h-[calc(100dvh-104px)] mb-5 bg-white flex flex-col overflow-hidden rounded-md relative md:flex-row"
      )}>
      <div className="w-full h-full bg-banner-soft">
        <div className="absolute h-[100%] w-[100%] flex items-center flex-1 flex-col justify-center gap-5">
          <m.div
            variants={animationVariantsImage}
            ref={imageRef}
            className="h-[25%] md:h-[35%] aspect-video relative">
            <Image
              src="/images/logos/logo-letters.svg"
              alt="product"
              fill={true}
              className="object-contain invert"
            />
          </m.div>
          <m.div variants={animationVariants} className="relative">
            <Button onClick={onClickPlans}>See plans</Button>
          </m.div>
        </div>
      </div>
    </m.div>
  );
};

export default Presentation;

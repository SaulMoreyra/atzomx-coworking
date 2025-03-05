import React from "react";
import { ALL_IMAGES } from "@/mocks/products";
import ImagesCarousel from "../ImagesCarousel/ImagesCarousel";
import ServiceBenefits from "../ServiceBenefits/ServiceBenefits";
import Heading from "../Heading/Heading";
import { useTranslations } from "next-intl";

const publicFocused = [
  "freelancers",
  "remote-workers",
  "creatives",
  "digital-nomads",
  "coffee-lovers",
];

const About = () => {
  const t = useTranslations("home.about");

  return (
    <div
      id="about"
      className="min-h-screen-header flex flex-col gap-10 py-5 justify-center">
      <div className="flex flex-col justify-center gap-4 text-4xl md:text-5xl text-center">
        <Heading>{t("title")}</Heading>
        <ol className="list-none list-slide-up h-12 md:h-20 block text-4xl md:text-7xl">
          {publicFocused.map((item, index) => (
            <li key={index}>
              <span className="text-primary-main">{t(`public.${item}`)}</span>
            </li>
          ))}
        </ol>
      </div>
      <ServiceBenefits />
      <ImagesCarousel images={ALL_IMAGES} />
    </div>
  );
};

export default About;

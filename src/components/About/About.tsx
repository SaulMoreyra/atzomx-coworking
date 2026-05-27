import React from "react";
import RotatingWords from "../RotatingWords/RotatingWords";
import ServiceBenefits from "../ServiceBenefits/ServiceBenefits";
import Heading from "../Heading/Heading";
import HighlightShape from "../ui/HighlightShape/HighlightShape";
import SectionBlock from "../ui/SectionBlock/SectionBlock";
import { useTranslations } from "next-intl";

const publicFocused = [
  "freelancers",
  "remote-workers",
  "developers",
  "digital-nomads",
  "coffee-lovers",
] as const;

const About = () => {
  const t = useTranslations("home.about");
  const rotatingWords = publicFocused.map(item => t(`public.${item}`));

  return (
    <SectionBlock id="about" surface="cream" headerSurface="cream" className="w-full py-14 md:py-20">
      <div className="section-container flex flex-col gap-14 md:gap-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center md:gap-8">
          <HighlightShape variant="cloud" fill="accent" size={52} className="opacity-95" />
          <Heading>{t("title")}</Heading>
          <RotatingWords words={rotatingWords} className="mt-1 md:mt-2" />
        </div>

        <ServiceBenefits />
      </div>
    </SectionBlock>
  );
};

export default About;

import React from "react";
import FeedGrid from "../FeedGrid/FeedGrid";
import RotatingWords from "../RotatingWords/RotatingWords";
import ServiceBenefits from "../ServiceBenefits/ServiceBenefits";
import Heading from "../Heading/Heading";
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
    <SectionBlock id="about" surface="cream" className="w-full py-12 md:py-16">
      <div className="section-container flex flex-col gap-12">
        <div className="flex flex-col justify-center gap-6 text-center">
          <Heading>{t("title")}</Heading>
          <RotatingWords words={rotatingWords} />
        </div>
        <ServiceBenefits />
      </div>

      {/* Full-bleed feed — edge-to-edge like @atzomx Instagram */}
      <div className="mt-12 md:mt-16">
        <FeedGrid />
      </div>
    </SectionBlock>
  );
};

export default About;

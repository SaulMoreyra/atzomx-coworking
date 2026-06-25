/* Hallmark · macrostructure: Split Studio · tone: editorial · anchor hue: forest-green
 * presentation: preserved · post-hero redesign scope: home sections after Presentation
 */

import RotatingWords from "../RotatingWords/RotatingWords";
import ServiceBenefits from "../ServiceBenefits/ServiceBenefits";
import BrandIllustration from "../ui/BrandIllustration/BrandIllustration";
import HomeSectionIntro from "../ui/HomeSectionIntro/HomeSectionIntro";
import SectionBlock from "../ui/SectionBlock/SectionBlock";
import { useTranslations } from "next-intl";
import React from "react";

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
    <SectionBlock
      id="about"
      surface="cream"
      headerSurface="cream"
      className="w-full py-14 md:py-20">
      <div className="section-container grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16 xl:gap-20">
        <div className="flex min-w-0 flex-col gap-2 md:gap-4 relative">
          <HomeSectionIntro
            title={t("title")}
            titleClassName="text-xl md:text-2xl lg:text-2xl"
          />
          <RotatingWords
            words={rotatingWords}
            align="left"
            wordClassName="text-display text-xl leading-none text-brand-green md:text-2xl lg:text-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none right-0 top-[10rem] z-0 w-[15rem] md:w-[16.5rem] absolute opacity-50 md:opacity-100">
            <BrandIllustration
              id="coworking-laptop"
              sizes="(max-width: 768px) 36vw, 216px"
            />
          </div>
        </div>
        <ServiceBenefits />
      </div>
    </SectionBlock>
  );
};

export default About;

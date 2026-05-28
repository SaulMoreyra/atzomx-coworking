/* Hallmark · macrostructure: Split Studio · tone: editorial · anchor hue: forest-green
 * presentation: preserved · post-hero redesign scope: home sections after Presentation
 */

import RotatingWords from "../RotatingWords/RotatingWords";
import ServiceBenefits from "../ServiceBenefits/ServiceBenefits";
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
    <SectionBlock id="about" surface="cream" headerSurface="cream" className="w-full border-t border-brand-green/10 py-14 md:py-20">
      <div className="section-container grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16 xl:gap-20">
        <div className="flex min-w-0 flex-col gap-6 md:gap-8">
          <HomeSectionIntro title={t("title")} />
          <RotatingWords
            words={rotatingWords}
            className="items-start justify-start text-left sm:items-start sm:justify-start [&_span]:!text-left [&_span]:sm:!inline-block"
          />
        </div>

        <ServiceBenefits />
      </div>
    </SectionBlock>
  );
};

export default About;

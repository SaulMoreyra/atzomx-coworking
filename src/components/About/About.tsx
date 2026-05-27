import React from "react";
import FeedGrid from "../FeedGrid/FeedGrid";
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
];

const About = () => {
  const t = useTranslations("home.about");

  return (
    <SectionBlock id="about" surface="cream" className="w-full py-12 md:py-16">
      <div className="section-container flex flex-col gap-12">
        <div className="flex flex-col justify-center gap-6 text-center">
          <Heading>{t("title")}</Heading>
          <ol className="list-none list-slide-up h-12 md:h-20 block text-3xl md:text-6xl">
            {publicFocused.map((item, index) => (
              <li key={index}>
                <span className="text-display text-brand-green">{t(`public.${item}`)}</span>
              </li>
            ))}
          </ol>
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

import React from "react";
import { ALL_IMAGES } from "@/mocks/products";
import ImagesCarousel from "../ImagesCarousel/ImagesCarousel";
import ServiceBenefits from "../ServiceBenefits/ServiceBenefits";
import Heading from "../Heading/Heading";

const PUBLIC = [
  "Freelancers",
  "Remote workers",
  "Creatives",
  "Digital nomads",
  "Coffee lovers",
];

const About = () => {
  return (
    <div className="min-h-screen-header flex flex-col gap-10 py-5 justify-center">
      <div className="flex flex-col justify-center gap-4 text-4xl md:text-5xl text-center">
        <Heading>Specially Designed for</Heading>
        <ol className="list-none list-slide-up h-14 md:h-20 block text-5xl md:text-7xl">
          {PUBLIC.map((item, index) => (
            <li key={index}>
              <span className="text-primary-main">{item}</span>
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

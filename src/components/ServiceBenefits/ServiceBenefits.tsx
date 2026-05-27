"use client";

import { useTranslations } from "next-intl";
import React, { type FC } from "react";
import { MessageSquare, Calendar, Zap, Coffee } from "react-feather";
import Label from "../ui/Label/Label";

interface BenefitProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Benefit: FC<BenefitProps> = ({ icon, title, description }) => {
  return (
    <div className="flex gap-4 p-5 bg-brand-main/40 border-y border-brand-green/10 sm:border sm:border-brand-green/10">
      <div className="text-brand-green shrink-0" aria-hidden="true">
        {icon}
      </div>
      <div>
        <Label as="h3" className="text-base md:text-lg mb-1">
          {title}
        </Label>
        <p className="text-body text-brand-green/70 text-base md:text-lg">{description}</p>
      </div>
    </div>
  );
};

const ServiceBenefits = () => {
  const t = useTranslations("home.benefits");
  return (
    <div className="flex justify-center items-center py-2">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 w-full max-w-6xl">
        <Benefit
          icon={<Zap size={36} />}
          title={t("wifi.title")}
          description={t("wifi.description")}
        />
        <Benefit
          icon={<Calendar size={36} />}
          title={t("plans.title")}
          description={t("plans.description")}
        />
        <Benefit
          icon={<Coffee size={36} />}
          title={t("coffee.title")}
          description={t("coffee.description")}
        />
        <Benefit
          icon={<MessageSquare size={36} />}
          title={t("feedback.title")}
          description={t("feedback.description")}
        />
      </div>
    </div>
  );
};

export default ServiceBenefits;

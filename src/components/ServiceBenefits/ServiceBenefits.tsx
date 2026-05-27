"use client";

import Label from "../ui/Label/Label";
import { useTranslations } from "next-intl";
import React, { type FC } from "react";
import { MessageSquare, Calendar, Zap, Coffee } from "react-feather";
import cx from "classnames";

interface BenefitProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  accent?: "main" | "accent";
}

const ChairIcon: FC<{ size?: number }> = ({ size = 28 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true">
    <path d="M6 12h12" />
    <path d="M7 12V8a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4" />
    <path d="M5 12v3" />
    <path d="M19 12v3" />
    <path d="M7 15v3" />
    <path d="M17 15v3" />
    <path d="M7 18h10" />
  </svg>
);

const Benefit: FC<BenefitProps> = ({ icon, title, description, accent = "accent" }) => {
  return (
    <article
      className={cx(
        "group flex min-h-[180px] flex-col gap-5 border border-brand-green/12 p-6 transition-all duration-200 md:min-h-[200px] md:p-8",
        "hover:border-brand-green/25 hover:shadow-[0_10px_28px_-12px_rgba(47,62,34,0.18)]",
        accent === "main" ? "bg-brand-main" : "bg-brand-cream"
      )}>
      <div
        className={cx(
          "flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-brand-green",
          accent === "main" ? "bg-brand-accent" : "bg-brand-main"
        )}
        aria-hidden="true">
        {icon}
      </div>
      <div className="flex flex-col gap-2">
        <Label as="h3" className="text-sm tracking-[0.14em] md:text-base">
          {title}
        </Label>
        <p className="text-body text-base leading-relaxed text-brand-green/75 md:text-lg">{description}</p>
      </div>
    </article>
  );
};

const BENEFIT_KEYS = ["wifi", "plans", "coffee", "chairs", "feedback"] as const;

const benefitIcons: Record<(typeof BENEFIT_KEYS)[number], React.ReactNode> = {
  wifi: <Zap size={28} strokeWidth={1.75} />,
  plans: <Calendar size={28} strokeWidth={1.75} />,
  coffee: <Coffee size={28} strokeWidth={1.75} />,
  chairs: <ChairIcon size={28} />,
  feedback: <MessageSquare size={28} strokeWidth={1.75} />,
};

const ServiceBenefits = () => {
  const t = useTranslations("home.benefits");

  return (
    <div className="flex w-full flex-col items-center gap-8 md:gap-10">
      <div className="flex flex-col items-center gap-2 text-center">
        <Label as="p" className="text-xs tracking-[0.25em]">
          {t("sectionTitle")}
        </Label>
        <p className="text-body max-w-lg text-sm text-brand-green/65 md:text-base">{t("sectionSubtitle")}</p>
      </div>

      <ul className="grid w-full max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-5">
        {BENEFIT_KEYS.map((key, index) => (
          <li key={key} className={cx(index === 4 && "sm:col-span-2 sm:max-w-md sm:justify-self-center lg:col-span-1 lg:max-w-none")}>
            <Benefit
              icon={benefitIcons[key]}
              title={t(`${key}.title`)}
              description={t(`${key}.description`)}
              accent={index % 2 === 0 ? "main" : "accent"}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceBenefits;

import React, { type FC, type ElementType } from "react";
import { Clock, MapPin, PhoneCall, Mail } from "react-feather";
import cx from "classnames";
import { useTranslations } from "next-intl";
import Label from "../ui/Label/Label";
import BrandIllustration from "../ui/BrandIllustration/BrandIllustration";
import { BRAND_CONTACT } from "@/design-system";

interface MenuInformationProps {
  className?: string;
}

const MenuInformation: FC<MenuInformationProps> = ({ className }) => {
  const t = useTranslations("menu");

  return (
    <aside
      className={cx(
        "bg-brand-main border border-brand-green/10 p-5 pb-6 self-start text-brand-green",
        className
      )}>
      <Label as="h2" className="text-sm tracking-[0.2em] mb-4 block">
        {t("information.title")}
      </Label>

      <BrandIllustration id="barista" className="max-w-[130px] mx-auto mb-5" />

      <div className="flex flex-col gap-4">
        <InfoRow icon={Clock} title={t("information.hours")}>
          <p className="text-body text-sm">{t("information.schedule-days")}</p>
          <p className="text-schedule text-xs mt-0.5">{t("information.schedule-hours")}</p>
        </InfoRow>

        <InfoRow icon={MapPin} title={t("information.address")}>
          <p className="text-body text-sm leading-relaxed">{BRAND_CONTACT.address}</p>
          <a
            target="_blank"
            href={BRAND_CONTACT.mapsLink}
            className="text-label text-xs text-brand-green/70 hover:text-brand-green underline-offset-2 hover:underline mt-1 inline-block"
            rel="noreferrer">
            {t("information.button-map")}
          </a>
        </InfoRow>

        <InfoRow icon={PhoneCall} title={t("information.contact")}>
          <a href={BRAND_CONTACT.phoneHref} className="text-body text-sm hover:underline">
            {BRAND_CONTACT.phone}
          </a>
        </InfoRow>

        <InfoRow icon={Mail} title="Email">
          <a href={BRAND_CONTACT.emailHref} className="text-body text-sm break-all hover:underline">
            {BRAND_CONTACT.email}
          </a>
        </InfoRow>
      </div>
    </aside>
  );
};

interface InfoRowProps {
  icon: ElementType<{ className?: string; size?: string | number }>;
  title: string;
  children: React.ReactNode;
}

const InfoRow: FC<InfoRowProps> = ({ icon: Icon, title, children }) => (
  <div className="flex gap-3">
    <div className="p-2 bg-brand-cream border border-brand-green/10 flex items-center justify-center w-10 h-10 shrink-0 text-brand-green">
      <Icon size={20} aria-hidden="true" />
    </div>
    <div className="min-w-0">
      <Label as="h3" className="text-xs mb-1 block normal-case tracking-wide font-semibold">
        {title}
      </Label>
      {children}
    </div>
  </div>
);

export default MenuInformation;

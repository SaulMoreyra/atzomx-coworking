"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Facebook, Instagram, Mail, Phone, PhoneCall } from "react-feather";
import { Mastercard, Visa, Amex } from "react-payment-logos/dist/flat";
import Label from "../ui/Label/Label";
import OrganicDivider from "../ui/OrganicDivider/OrganicDivider";
import { BRAND_CONTACT } from "@/design-system";
import { trackWhatsAppConversion } from "@/lib/analytics";

const SOCIAL_NETWORKS = [
  { icon: Instagram, name: BRAND_CONTACT.instagramHandle, url: BRAND_CONTACT.instagram },
  { icon: Facebook, name: "Facebook", url: BRAND_CONTACT.facebook },
  { icon: Phone, name: "WhatsApp", url: BRAND_CONTACT.whatsapp },
  { icon: PhoneCall, name: BRAND_CONTACT.phone, url: BRAND_CONTACT.phoneHref },
  { icon: Mail, name: BRAND_CONTACT.email, url: BRAND_CONTACT.emailHref },
];

const Footer = () => {
  const t = useTranslations("home.footer");
  const tHours = useTranslations("home.hours");

  return (
    <footer id="contact" data-header-surface="cream" className="w-full bg-brand-cream text-brand-green">
      <OrganicDivider fill="cream" variant="star" />

      <div className="w-full">
        <div className="section-container py-8 pb-6 text-center">
          <Label as="h2" className="mb-4 text-sm tracking-[0.25em]">
            {t("sectionTitle")}
          </Label>
          <p className="text-body text-sm text-brand-green/70">{t("payments")}</p>
          <div className="mt-3 flex items-center justify-center">
            <Visa id="visa" style={{ margin: 8, width: 44 }} />
            <Mastercard id="mastercard" style={{ margin: 8, width: 44 }} />
            <Amex id="amex" style={{ margin: 8, width: 44 }} />
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="section-container flex flex-col gap-8 py-10 md:py-12">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            <div className="flex flex-col gap-4">
              <Label as="h3" className="text-xs tracking-[0.2em]">
                {t("social_networks")}
              </Label>
              {SOCIAL_NETWORKS.map(network => (
                <a
                  key={network.name}
                  href={network.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    if (network.name === "WhatsApp") trackWhatsAppConversion();
                  }}
                  className="focus-brand text-body flex items-center gap-3 rounded-sm text-sm text-brand-green/80 transition-colors duration-200 hover:text-brand-green">
                  <network.icon size={18} className="min-w-[18px]" aria-hidden="true" />
                  <span>{network.name}</span>
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <Label as="h3" className="text-xs tracking-[0.2em]">
                {t("address")}
              </Label>
              <p className="text-body max-w-xs text-sm leading-relaxed text-brand-green/80">
                {BRAND_CONTACT.address}
              </p>
              <a
                href={BRAND_CONTACT.website}
                className="text-label text-xs text-brand-green/70 underline-offset-2 transition-colors duration-200 hover:text-brand-green hover:underline">
                atzomx.com.mx
              </a>
              <div className="text-schedule mt-2 space-y-1 text-xs text-brand-green/60">
                <p>
                  <span className="text-brand-green/75">{tHours("weekdaysLabel")}: </span>
                  {tHours("weekdaysHours")}
                </p>
                <p>
                  <span className="text-brand-green/75">{tHours("saturdayLabel")}: </span>
                  {tHours("saturdayHours")}
                </p>
                <p>
                  <span className="text-brand-green/75">{tHours("sundayLabel")}: </span>
                  {tHours("sundayHours")}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <Label as="h3" className="text-xs tracking-[0.2em]">
                {t("location")}
              </Label>
              <iframe
                title="atzomx-location"
                src={BRAND_CONTACT.mapsEmbed}
                width="100%"
                height="200"
                allowFullScreen={true}
                loading="lazy"
                className="border border-brand-green grayscale-[20%] contrast-[1.05]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="section-container py-6 text-center md:text-left">
          <p className="text-label text-[10px] tracking-[0.25em] text-brand-green/45">© 2026 ATZOMX</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

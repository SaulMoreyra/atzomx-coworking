import BlogUtilityHeader from "@/components/BlogBanner/BlogUtilityHeader";
import VirtualTour from "@/components/VirtualTour/VirtualTour";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("tour.metadata");

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      images: [
        { url: "/images/og/atzomx-og.webp", alt: "Atzomx Coworking Oaxaca" },
      ],
      type: "website",
    },
    alternates: {
      canonical: "https://atzomx.com.mx/recorrido-360",
    },
  };
}

export default async function VirtualTourPage() {
  const t = await getTranslations("tour.banner");

  return (
    <div className="site-main flex min-h-screen flex-1 flex-col bg-brand-cream">
      <BlogUtilityHeader />
      <section className="relative z-content w-full border-b border-brand-green bg-brand-cream pt-site-menu-sticky text-brand-green">
        <div className="section-container max-w-3xl py-10 md:py-14 lg:max-w-4xl">
          <h1 className="text-display min-w-0 [overflow-wrap:anywhere] text-4xl leading-[0.95] tracking-wide md:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <div
            className="mt-5 h-1 border-b border-t border-brand-green"
            aria-hidden="true"
          />
          <p className="text-body mt-6 max-w-xl text-base leading-relaxed text-brand-green/75 md:text-lg">
            {t("subtitle")}
          </p>
        </div>
      </section>
      <VirtualTour />
    </div>
  );
}

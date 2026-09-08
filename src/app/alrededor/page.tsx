import AlrededorBanner from "@/components/AlrededorBanner/AlrededorBanner";
import AlrededorLanding from "@/components/AlrededorLanding/AlrededorLanding";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("alrededor.metadata");

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
      canonical: "https://atzomx.com.mx/alrededor",
    },
  };
}

export default function AlrededorPage() {
  return (
    <div className="site-main flex min-h-screen flex-1 flex-col bg-brand-cream">
      <AlrededorBanner />
      <AlrededorLanding />
    </div>
  );
}

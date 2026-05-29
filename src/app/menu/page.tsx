import MenuBanner from "@/components/MenuBanner/MenuBanner";
import MenuCatalog from "@/components/MenuCatalog/MenuCatalog";
import { getPublicMenu } from "@/lib/products/public-products";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("menu.metadata");

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      images: [{ url: "/images/og/menu-og.webp", alt: "Atzomx Menu" }],
      type: "website",
    },
    alternates: {
      canonical: "https://atzomx.com.mx/menu",
    },
  };
}

export default async function MenuPage() {
  const foods = await getPublicMenu();

  return (
    <div className="site-main flex min-h-screen flex-1 flex-col bg-brand-cream">
      <MenuBanner itemCount={foods.length} />
      <MenuCatalog foods={foods} />
    </div>
  );
}

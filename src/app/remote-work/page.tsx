import RemoteWorkBanner from "@/components/RemoteWorkBanner/RemoteWorkBanner";
import RemoteWorkLanding from "@/components/RemoteWorkLanding/RemoteWorkLanding";
import { getReviews } from "@/services/reviews/getReviews";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("remoteWork.metadata");

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      images: [{ url: "/images/og/remote-work-og.webp", alt: "Atzomx Coworking Oaxaca" }],
      type: "website",
    },
    alternates: {
      canonical: "https://atzomx.com.mx/remote-work",
    },
  };
}

export default async function RemoteWorkPage() {
  const reviewsData = await getReviews();

  return (
    <div className="site-main flex min-h-screen flex-1 flex-col bg-brand-cream">
      <RemoteWorkBanner />
      <RemoteWorkLanding
        reviews={reviewsData.reviews}
        reviewsSource={reviewsData.source}
        rating={reviewsData.rating}
        userRatingCount={reviewsData.userRatingCount}
        googleMapsUri={reviewsData.googleMapsUri}
      />
    </div>
  );
}

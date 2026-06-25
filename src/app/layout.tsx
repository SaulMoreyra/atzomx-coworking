import React from "react";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import type { Metadata, Viewport } from "next";
import { businessJsonLd } from "@/lib/business-jsonld";
import { BRAND_CONTACT } from "@/design-system";
import WhatsAppFab from "@/components/WhatsAppFab/WhatsAppFab";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#fffbed",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://atzomx.com.mx"),
  title: "Atzomx | Coworking & Café en Oaxaca",
  description:
    "Coworking en el Centro de Oaxaca con WiFi de 1000 Mbps, sillas ergonómicas, clima y café ilimitado. Desde $59 MXN/hora. Reserva por WhatsApp.",
  keywords: [
    "coworking Oaxaca",
    "coworking Oaxaca Centro",
    "café coworking Oaxaca",
    "espacio de coworking Oaxaca de Juárez",
    "digital nomads Oaxaca",
    "WiFi rápido Oaxaca",
    "sala de juntas Oaxaca",
    "Atzomx",
  ],
  category: "Coworking",
  alternates: {
    canonical: "/",
  },
  other: {
    "llms-txt": `${BRAND_CONTACT.website}/llms.txt`,
  },
  openGraph: {
    title: "Atzomx | Coworking & Café en Oaxaca",
    description:
      "Coworking en el Centro de Oaxaca con WiFi de 1000 Mbps, sillas ergonómicas y café ilimitado. Desde $59 MXN/hora.",
    url: "https://atzomx.com.mx",
    siteName: "Atzomx Café y Coworking",
    images: [
      {
        url: "/images/og/atzomx-og.webp",
        width: 1200,
        height: 630,
        alt: "Interior del coworking Atzomx en el Centro de Oaxaca",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atzomx | Coworking & Café en Oaxaca",
    description:
      "Coworking en el Centro de Oaxaca con WiFi de 1000 Mbps, sillas ergonómicas y café ilimitado.",
    images: ["/images/og/atzomx-og.webp"],
  },
  robots: "index, follow",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link
          rel="alternate"
          type="text/plain"
          href={`${BRAND_CONTACT.website}/llms.txt`}
          title="LLM site index"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(businessJsonLd),
          }}
        />
        <GoogleTagManager gtmId="GTM-NDNK3CRK" />
        <GoogleTagManager gtmId="AW-16900625108" />
        <GoogleAnalytics gaId="AW-16900625108" />
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
          <WhatsAppFab />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

import React from "react";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://atzomx.com.mx"),
  title: "Atzomx | Coworking & Café en Oaxaca",
  description:
    "Coworking en el Centro de Oaxaca con WiFi de 1000 Mbps, sillas ergonómicas, clima y café ilimitado. Desde $59 MXN/hora. Reserva por WhatsApp.",
  alternates: {
    canonical: "/",
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
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["CafeOrCoffeeShop", "LocalBusiness"],
              name: "Atzomx Café y Coworking",
              image: [
                "https://atzomx.com.mx/images/og/atzomx-og.webp",
                "https://atzomx.com.mx/images/coworking/atzomx.webp",
                "https://atzomx.com.mx/images/coworking/meeting-room.webp",
              ],
              logo: "https://atzomx.com.mx/images/logos/logo-symbol.svg",
              "@id": "https://atzomx.com.mx",
              url: "https://atzomx.com.mx",
              telephone: "+525219515155328",
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                streetAddress: "C. de Los Libres 800-B",
                addressLocality: "Oaxaca de Juárez",
                addressRegion: "Oaxaca",
                postalCode: "68000",
                addressCountry: "MX",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 17.0689553,
                longitude: -96.7181622,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                  ],
                  opens: "09:00",
                  closes: "18:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Saturday",
                  opens: "10:00",
                  closes: "20:00",
                },
              ],
              sameAs: [
                "https://www.instagram.com/atzomx/",
                "https://www.facebook.com/profile.php?id=61569786946519",
                "https://maps.app.goo.gl/7MMrgV3Uhf7x5KNF9",
              ],
              amenityFeature: [
                {
                  "@type": "LocationFeatureSpecification",
                  name: "WiFi de 1000 Mbps",
                  value: true,
                },
                {
                  "@type": "LocationFeatureSpecification",
                  name: "Aire acondicionado",
                  value: true,
                },
                {
                  "@type": "LocationFeatureSpecification",
                  name: "Mobiliario ergonómico",
                  value: true,
                },
                {
                  "@type": "LocationFeatureSpecification",
                  name: "Terraza",
                  value: true,
                },
                {
                  "@type": "LocationFeatureSpecification",
                  name: "Sala de juntas",
                  value: true,
                },
              ],
              hasMenu: "https://atzomx.com.mx/menu",
              servesCuisine: [
                "Café de especialidad",
                "Desayunos",
                "Sándwiches",
                "Bowls",
              ],
            }),
          }}
        />
        <GoogleTagManager gtmId="GTM-NDNK3CRK" />
        <GoogleTagManager gtmId="AW-16900625108" />
        <GoogleAnalytics gaId="AW-16900625108" />
        <Script id="conversion-contacto" strategy="afterInteractive">
          {`gtag('event', 'conversion', {'send_to': 'AW-16900625108/TrwICJDbkoUbENSl7Po-'});`}
        </Script>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

import React from "react";
import "./globals.css";

export const metadata = {
  title: "Atzomx | Coworking & Café en Oaxaca",
  description:
    "Atzomx es un espacio de coworking en el corazón de Oaxaca con café ilimitado, WiFi rápido y un ambiente ideal para trabajar.",
  keywords: [
    "coworking en Oaxaca",
    "espacios de trabajo Oaxaca",
    "café y coworking",
    "oficinas compartidas",
    "freelancers Oaxaca",
    "wifi rápido Oaxaca",
    "espacios para trabajar",
    "zona de trabajo en Oaxaca",
    "mejor coworking en Oaxaca",
    "trabajar remoto en Oaxaca",
    "networking en Oaxaca",

    "coworking in Oaxaca",
    "best coworking Oaxaca",
    "freelancer workspace Oaxaca",
    "digital nomad Oaxaca",
    "remote work Oaxaca",
    "shared office Oaxaca",
    "high-speed WiFi coworking",
    "work-friendly cafe",
    "hot desk Oaxaca",
    "meeting rooms Oaxaca",
    "business hub Oaxaca",
  ],
  openGraph: {
    title: "Atzomx | Coworking & Café en Oaxaca",
    description:
      "Disfruta de un coworking con café ilimitado y un espacio cómodo en el centro de Oaxaca.",
    url: "https://atzomx.com",
    images: ["/favicon.ico"],
    type: "website",
    locale: "es_MX",
  },
  instagram: {
    card: "summary_large_image",
    site: "@atzomx",
    title: "Atzomx | Coworking & Café en Oaxaca",
    description:
      "Un coworking con café ilimitado, WiFi rápido y un ambiente ideal para trabajar en Oaxaca.",
    images: ["/favicon.ico"],
  },
  facebook: {
    card: "summary_large_image",
    site: "@atzomx",
    title: "Atzomx | Coworking & Café en Oaxaca",
    description:
      "Un coworking con café ilimitado, WiFi rápido y un ambiente ideal para trabajar en Oaxaca.",
    images: ["/favicon.ico"],
  },
  robots: "index, follow",
  canonical: "https://atzomx.com",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

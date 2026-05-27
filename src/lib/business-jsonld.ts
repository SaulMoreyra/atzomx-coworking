import { BRAND_CONTACT } from "@/design-system";

const SITE_URL = BRAND_CONTACT.website;

/** Schema.org JSON-LD — LocalBusiness + CoworkingSpace for search engines and AI crawlers */
export const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["CoworkingSpace", "CafeOrCoffeeShop", "LocalBusiness"],
  "@id": SITE_URL,
  name: "Atzomx Café y Coworking",
  alternateName: ["Atzomx Coworking", "Atzomx Oaxaca"],
  description:
    "Coworking space and specialty café in downtown Oaxaca de Juárez, Mexico. 1000 Mbps fiber WiFi, ergonomic chairs, air conditioning, unlimited specialty coffee, shared and private desks, external monitors, and meeting room. Flexible plans from 59 MXN/hour. Ideal for freelancers, remote workers, and digital nomads.",
  url: SITE_URL,
  telephone: "+5252195155328",
  email: BRAND_CONTACT.email,
  priceRange: "$$",
  currenciesAccepted: "MXN",
  paymentAccepted: "Cash, Credit Card, Debit Card",
  image: [
    `${SITE_URL}/images/og/atzomx-og.webp`,
    `${SITE_URL}/images/coworking/atzomx.webp`,
    `${SITE_URL}/images/coworking/meeting-room.webp`,
  ],
  logo: `${SITE_URL}/images/logos/logo-symbol.svg`,
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
  hasMap: BRAND_CONTACT.mapsLink,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
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
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "75",
    bestRating: "5",
  },
  knowsLanguage: ["es", "en", "fr", "de"],
  areaServed: {
    "@type": "City",
    name: "Oaxaca de Juárez",
  },
  sameAs: [
    BRAND_CONTACT.instagram,
    BRAND_CONTACT.facebook,
    BRAND_CONTACT.mapsLink,
  ],
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "1000 Mbps fiber WiFi", value: true },
    { "@type": "LocationFeatureSpecification", name: "Air conditioning", value: true },
    { "@type": "LocationFeatureSpecification", name: "Ergonomic chairs", value: true },
    { "@type": "LocationFeatureSpecification", name: "External monitors", value: true },
    { "@type": "LocationFeatureSpecification", name: "Rooftop terrace", value: true },
    { "@type": "LocationFeatureSpecification", name: "Meeting room (up to 6 people)", value: true },
    { "@type": "LocationFeatureSpecification", name: "Unlimited specialty coffee", value: true },
  ],
  hasMenu: `${SITE_URL}/menu`,
  servesCuisine: ["Specialty coffee", "Breakfast", "Sandwiches", "Bowls", "Smoothies"],
  makesOffer: [
    {
      "@type": "Offer",
      name: "Free café plan",
      description: "Work in the café area; pay only for what you consume.",
      price: "0",
      priceCurrency: "MXN",
      url: `${SITE_URL}/#plans`,
    },
    {
      "@type": "Offer",
      name: "Standard coworking",
      description: "Shared desk in upstairs coworking area.",
      price: "59",
      priceCurrency: "MXN",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "59",
        priceCurrency: "MXN",
        unitText: "hour",
      },
      url: `${SITE_URL}/#plans`,
    },
    {
      "@type": "Offer",
      name: "Individual desk",
      description: "Private desk in coworking area.",
      price: "79",
      priceCurrency: "MXN",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "79",
        priceCurrency: "MXN",
        unitText: "hour",
      },
      url: `${SITE_URL}/#plans`,
    },
    {
      "@type": "Offer",
      name: "Desk with monitor",
      description: "Private desk with external monitor.",
      price: "89",
      priceCurrency: "MXN",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "89",
        priceCurrency: "MXN",
        unitText: "hour",
      },
      url: `${SITE_URL}/#plans`,
    },
    {
      "@type": "Offer",
      name: "Meeting room",
      description: "Room for 2–6 people with Smart TV and whiteboard.",
      price: "259",
      priceCurrency: "MXN",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "259",
        priceCurrency: "MXN",
        unitText: "hour",
      },
      url: `${SITE_URL}/#plans`,
    },
  ],
  potentialAction: {
    "@type": "ReserveAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: BRAND_CONTACT.whatsapp,
      actionPlatform: [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/MobileWebPlatform",
      ],
    },
    result: {
      "@type": "Reservation",
      name: "Coworking reservation via WhatsApp",
    },
  },
} as const;

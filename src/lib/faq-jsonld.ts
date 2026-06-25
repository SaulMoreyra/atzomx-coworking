import { BRAND_CONTACT } from "@/design-system";

interface FaqItem {
  question: string;
  answer: string;
}

export const buildFaqJsonLd = (items: FaqItem[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map(item => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
  url: `${BRAND_CONTACT.website}/#faq`,
});

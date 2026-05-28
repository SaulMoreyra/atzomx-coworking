import { Antonio } from "next/font/google";

/** Condensed display with Latin Extended — blog/article titles with accents (é, ñ, ü, …) */
export const fontDisplayProse = Antonio({
  weight: "700",
  subsets: ["latin", "latin-ext"],
  variable: "--font-display-prose",
  display: "swap",
});

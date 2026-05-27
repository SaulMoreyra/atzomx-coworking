import { brandColors } from "./tokens";

/**
 * SVG paths for organic section transitions (viewBox 0 0 1440 120).
 * `star`, `cloud`, `clover` echo @atzomx Instagram highlight shapes.
 */
export const organicDividerPaths = {
  wave: "M0,48 C320,88 640,8 960,48 C1120,68 1320,28 1440,48 V120 H0 Z",
  blob: "M0,56 C240,16 480,72 720,40 C960,8 1200,64 1440,44 V120 H0 Z",
  scallop: "M0,64 C120,32 240,80 360,48 C480,16 600,72 720,52 C840,32 960,68 1080,44 C1200,20 1320,76 1440,56 V120 H0 Z",
  /** Plans highlight — pointed rhythm */
  star: "M0,72 L120,48 L240,68 L360,42 L480,66 L600,38 L720,64 L840,40 L960,62 L1080,36 L1200,58 L1320,34 L1440,56 L1440,120 L0,120 Z",
  /** Menú / Nosotros highlight — soft cloud bumps */
  cloud: "M0,58 C120,28 240,78 360,50 C480,22 600,72 720,46 C840,20 960,68 1080,44 C1200,18 1320,66 1440,52 L1440,120 L0,120 Z",
  /** Coworking highlight — triple-lobe flow */
  clover: "M0,62 C180,30 300,82 420,52 C540,22 660,78 780,50 C900,22 1020,76 1140,48 C1260,20 1380,74 1440,58 L1440,120 L0,120 Z",
} as const;

export type OrganicDividerVariant = keyof typeof organicDividerPaths;

export type OrganicDividerFill = "cream" | "main" | "accent" | "green";

export const organicDividerFills: Record<OrganicDividerFill, string> = {
  cream: brandColors.cream,
  main: brandColors.main,
  accent: brandColors.accent,
  green: brandColors.green,
};

/** Highlight-shaped dividers used across landing + menu */
export const highlightDividerVariants = ["star", "cloud", "clover"] as const;

export type HighlightDividerVariant = (typeof highlightDividerVariants)[number];

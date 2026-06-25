/**
 * ATZOMX design tokens — single source of truth for brand values.
 * Official palette (4 colors). Tailwind maps these in tailwind.config.js.
 */
export const brandColors = {
  /** Crema — fondos base, calidez */
  cream: "#fffbed",
  /** Verde principal — bloques dominantes, fondos de sección */
  main: "#d4e6c0",
  /** Verde fuente — textos, logo, line art, iconos */
  green: "#2f3e22",
  /** Accent — promos, CTAs secundarios, highlights */
  accent: "#d3bedb",
  /** Texto sobre fondos oscuros (verde fuente) */
  "on-green": "#fffbed",
  /** Texto sobre fondos claros (verde principal / crema) */
  "on-main": "#2f3e22",
} as const;

export type BrandColor = keyof typeof brandColors;

/** Superficies permitidas — solo los 4 colores oficiales + blanco puntual */
export type BrandSurface = "main" | "cream" | "accent" | "green" | "white";

export const brandSurfaces: Record<BrandSurface, string> = {
  main: "bg-brand-main",
  cream: "bg-brand-cream",
  accent: "bg-brand-accent",
  green: "bg-brand-green",
  white: "bg-white",
};

/** Rotación de slides de planes — alterna los 3 fondos claros de marca */
export const planSlideSurfaces: BrandSurface[] = [
  "main",
  "cream",
  "accent",
  "main",
  "cream",
  "accent",
];

export const typography = {
  /** ATZOMX wordmark — Blur (prefer SVG logo in UI) */
  logo: "font-logo",
  /** Short all-caps display — Anonymous Pro Bold */
  display: "font-sans font-bold uppercase",
  /** Headlines with accents — Anonymous Pro Bold */
  displayProse: "font-sans font-bold",
  body: "font-sans",
  /** Kickers, nav, buttons, metadata — Anonymous Pro caps */
  label: "font-mono",
  /** Hours, admin slugs, tabular data — Anonymous Pro */
  mono: "font-mono",
  labelTracking: "tracking-[0.12em]",
  labelSize: "text-sm md:text-base",
} as const;

export const layout = {
  containerPadding: "px-6 md:px-12 xl:px-20",
  sectionGap: "gap-10",
  sectionRadius: "rounded-none",
  maxWidth: "max-w-7xl",
} as const;

export const motion = {
  transitionFast: "duration-200",
  transitionBase: "duration-300",
} as const;

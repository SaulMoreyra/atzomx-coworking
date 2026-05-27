// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const defaultTheme = require("tailwindcss/defaultTheme");

/** Official ATZOMX palette — 4 colors only */
const OFFICIAL = {
  cream: "#fffbed",
  main: "#d5f4c3",
  green: "#2f3e22",
  accent: "#d3bedb",
};

/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [],
  theme: {
    extend: {
      colors: {
        brand: {
          cream: OFFICIAL.cream,
          main: OFFICIAL.main,
          green: OFFICIAL.green,
          accent: OFFICIAL.accent,
          "on-green": OFFICIAL.cream,
          "on-main": OFFICIAL.green,
        },
      },
      fontFamily: {
        sans: ["Mabry", ...defaultTheme.fontFamily.sans],
        druk: ["Druk", ...defaultTheme.fontFamily.sans],
      },
      letterSpacing: {
        label: "0.12em",
        wide: "0.08em",
      },
      borderRadius: {
        brand: "0.75rem",
      },
      height: {
        "screen-header": "100dvh",
      },
      minHeight: {
        "screen-header": "100dvh",
      },
      zIndex: {
        content: "0",
        sticky: "40",
        header: "100",
        "header-bar": "1000",
        overlay: "110",
      },
      spacing: {
        "site-header": "calc(4.5rem + env(safe-area-inset-top, 0px))",
      },
      padding: {
        "site-header": "calc(4.5rem + env(safe-area-inset-top, 0px))",
      },
      scrollMargin: {
        "site-header": "calc(4.5rem + env(safe-area-inset-top, 0px))",
      },
      backgroundImage: {
        na: 'url("/images/na.png")',
      },
    },
  },
};

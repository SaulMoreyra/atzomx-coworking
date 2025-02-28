// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const defaultTheme = require("tailwindcss/defaultTheme");

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
        theme: {
          white: "#fbfbfb",
          gray: "#efefef",
          black: "#1c211f",
        },
        filter: {
          white: "#ffffff",
          black: "#000000",
          gray: "#808080",
          red: "#ef233c",
          blue: "#4cc9f0",
          green: "#06d6a0",
          yellow: "#f4d35e",
          orange: "#ffa500",
          purple: "#c77dff",
          pink: "#ff70a6",
          brown: "#a52a2a",
          na: "#808080",
        },
        banner: {
          mint: "#D8E2DC",
          blue: "#bedbfe",
          cream: "#f4eee0",
          lavender: "#E3DFF3",
          peach: "#FAD4C0",
          pink: "#F3C6C3",
          yellow: "#FAE3B0",
          soft: "#C5D6CC",
        },
        primary: {
          soft: "#C5D6CC",
          main: "#6F8D81",
        },
      },
      fontFamily: {
        sans: ["Mabry", ...defaultTheme.fontFamily.sans],
        druk: ["Druk"],
      },
      height: {
        "screen-header": "100dvh",
      },
      minHeight: {
        "screen-header": "100dvh",
      },
      backgroundImage: {
        na: 'url("/images/na.png")',
      },
    },
  },
};

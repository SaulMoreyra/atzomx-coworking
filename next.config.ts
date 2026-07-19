import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const config: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "images.squarespace-cdn.com" },
      { protocol: "https", hostname: "asimetrias.com.mx" },
      { protocol: "https", hostname: "www.oaxaca.gob.mx" },
    ],
  },
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
};

export default withNextIntl(config);

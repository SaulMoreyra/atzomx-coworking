import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const config: NextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
};

export default withNextIntl(config);

/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: "https://atzomx.com.mx/",
  generateRobotsTxt: true,
  additionalPaths: async config => {
    return [
      {
        loc: "/",
        priority: 1.0,
        lastmod: new Date().toISOString(),
      },
      {
        loc: "/menu",
        priority: 0.7,
        lastmod: new Date().toISOString(),
      },
    ];
  },
  exclude: ["/404", "/500"],
};

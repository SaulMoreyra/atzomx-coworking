/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: "https://atzomx.com.mx/",
  generateRobotsTxt: true,
  additionalPaths: async config => {
    console.log(config);
    return [
      {
        loc: "/menu",
        lastmod: new Date().toISOString(),
      },
    ];
  },
  exclude: ["/404", "/500"],
};

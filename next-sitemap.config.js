/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: "https://atzomx.com.mx/",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "cohere-ai", allow: "/" },
      { userAgent: "Bytespider", allow: "/" },
      { userAgent: "Meta-ExternalAgent", allow: "/" },
      { userAgent: "*", allow: "/" },
    ],
    additionalSitemaps: ["https://atzomx.com.mx/sitemap.xml"],
    transformRobotsTxt: async (_, robotsTxt) =>
      `# Atzomx — https://atzomx.com.mx\n# LLM index: https://atzomx.com.mx/llms.txt\n# Full AI profile: https://atzomx.com.mx/llms-full.txt\n\n${robotsTxt}`,
  },
  additionalPaths: async () => {
    const blogSlugs = [
      "welcome-atzomx",
      "specialty-coffee-oaxaca",
      "remote-work-oaxaca",
      "community-coworking",
    ];

    const blogPaths = blogSlugs.map(slug => ({
      loc: `/blog/${slug}`,
      priority: 0.6,
      lastmod: new Date().toISOString(),
    }));

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
      {
        loc: "/blog",
        priority: 0.7,
        lastmod: new Date().toISOString(),
      },
      {
        loc: "/remote-work",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      },
      ...blogPaths,
    ];
  },
  exclude: ["/404", "/500"],
};

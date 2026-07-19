/** @type {import('next-sitemap').IConfig} */

const fs = require("fs");
const path = require("path");

/** Keep sitemap blog URLs in sync with `src/mocks/blog/index.ts`. */
function getBlogSlugs() {
  const mockPath = path.join(__dirname, "src/mocks/blog/index.ts");
  const source = fs.readFileSync(mockPath, "utf8");
  return [...source.matchAll(/^\s*slug:\s*"([^"]+)"/gm)].map(match => match[1]);
}

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
    const blogPaths = getBlogSlugs().map(slug => ({
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
  exclude: ["/404", "/500", "/admin", "/admin/*", "/api/*"],
};

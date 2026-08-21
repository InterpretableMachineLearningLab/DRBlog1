/**
 * Site-wide configuration.
 *
 * Change these values first when making Nova your own — every page, the RSS
 * feed and the sitemap read from here (the build script keeps its own copy in
 * scripts/rss.mjs, so update that too if you change the URL or title).
 */
export const site = {
  name: "Nova",
  title: "Nova — Notes on the fast, simple web",
  description:
    "Nova is the journal of Pixel & Oak, a studio that builds fast, SEO-ready websites. Essays on performance, static sites, design and the craft of the web.",
  url: "https://pixelandoak-nova.pages.dev",
  author: {
    name: "Pixel & Oak",
    bio: "A web studio building fast, SEO-ready websites for small businesses.",
    url: "https://pixelandoak.com/templates/nextjs-blog-template/",
  },
  social: {
    github: "https://github.com/haider484991",
    x: "https://x.com/pixelandoak",
    linkedin: "https://www.linkedin.com/company/pixelandoak",
    rss: "/rss.xml",
  },
} as const;

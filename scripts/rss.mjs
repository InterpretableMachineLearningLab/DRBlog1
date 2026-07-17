/**
 * Build-time feed generation.
 *
 * Runs before `next build` (see the "build" script in package.json) and emits:
 *   - public/rss.xml      — RSS 2.0 feed of all posts
 *   - public/sitemap.xml  — sitemap for every static route + post
 *
 * Plain Node, no framework required: `node scripts/rss.mjs`.
 * NOTE: keep SITE in sync with lib/site.ts if you change your URL or title.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const SITE = {
  name: "Nova",
  title: "Nova — Notes on the fast, simple web",
  description:
    "Nova is the journal of Pixel & Oak, a studio that builds fast, SEO-ready websites. Essays on performance, static sites, design and the craft of the web.",
  url: "https://pixelandoak-nova.pages.dev",
  language: "en-us",
};

const ROOT = process.cwd();
const POSTS_DIR = path.join(ROOT, "content", "posts");
const PUBLIC_DIR = path.join(ROOT, "public");

/** Escape a string for use in XML text nodes and attributes. */
function xml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function loadPosts() {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const { data } = matter(fs.readFileSync(path.join(POSTS_DIR, file), "utf8"));
      return {
        slug: file.replace(/\.md$/, ""),
        title: String(data.title ?? ""),
        date: String(data.date ?? ""),
        excerpt: String(data.excerpt ?? ""),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

function buildRss(posts) {
  const items = posts
    .map((post) => {
      const url = `${SITE.url}/articles/${post.slug}/`;
      const pubDate = new Date(`${post.date}T00:00:00Z`).toUTCString();
      const categories = post.tags
        .map((tag) => `      <category>${xml(tag)}</category>`)
        .join("\n");
      return `    <item>
      <title>${xml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${xml(post.excerpt)}</description>
${categories}
    </item>`;
    })
    .join("\n");

  const lastBuildDate = posts.length
    ? new Date(`${posts[0].date}T00:00:00Z`).toUTCString()
    : new Date().toUTCString();

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xml(SITE.title)}</title>
    <link>${SITE.url}/</link>
    <description>${xml(SITE.description)}</description>
    <language>${SITE.language}</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE.url}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;
}

function buildSitemap(posts) {
  const staticRoutes = ["/", "/articles/", "/about/"];
  const today = new Date().toISOString().slice(0, 10);

  const urls = [
    ...staticRoutes.map((route) => ({ loc: `${SITE.url}${route}`, lastmod: today })),
    ...posts.map((post) => ({
      loc: `${SITE.url}/articles/${post.slug}/`,
      lastmod: post.date,
    })),
  ]
    .map(
      ({ loc, lastmod }) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

const posts = loadPosts();
fs.mkdirSync(PUBLIC_DIR, { recursive: true });
fs.writeFileSync(path.join(PUBLIC_DIR, "rss.xml"), buildRss(posts), "utf8");
fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap.xml"), buildSitemap(posts), "utf8");

console.log(`✓ Generated rss.xml and sitemap.xml (${posts.length} posts)`);

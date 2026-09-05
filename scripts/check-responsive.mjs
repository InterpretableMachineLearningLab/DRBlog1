#!/usr/bin/env node
/**
 * Responsive regression check for the built site.
 *
 * Walks every `index.html` in `out/` — so a page added later is covered
 * without touching this file — serves them, and loads each one at six
 * viewports from a 360px phone to a 1440px laptop. A page fails if it
 * overflows sideways, if the browser has to zoom out to fit it, or if its
 * body copy is smaller than 16px on a tablet or larger.
 *
 *   npm run build && npm run check:responsive
 *
 * Requires Playwright's Chromium:  npx playwright install chromium
 */
import { createServer } from "node:http";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "out");

const VIEWPORTS = [
  { name: "phone-360", width: 360, height: 800, mobile: true },
  { name: "phone-390", width: 390, height: 844, mobile: true },
  { name: "tablet-768", width: 768, height: 1024, mobile: false },
  { name: "ipad-820", width: 820, height: 1180, mobile: false },
  { name: "ipad-1024", width: 1024, height: 1366, mobile: false },
  { name: "laptop-1440", width: 1440, height: 900, mobile: false },
];

const MIME = {
  ".html": "text/html", ".css": "text/css", ".js": "text/javascript",
  ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png",
  ".jpg": "image/jpeg", ".woff": "font/woff", ".woff2": "font/woff2",
  ".ttf": "font/ttf", ".eot": "application/vnd.ms-fontobject",
  ".xml": "application/xml", ".txt": "text/plain",
};

/** Every route in the build, derived from where the index.html files are. */
async function findRoutes(dir = OUT, prefix = "/") {
  const routes = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || entry.name === "_next") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      routes.push(...(await findRoutes(full, `${prefix}${entry.name}/`)));
    } else if (entry.name === "index.html") {
      routes.push(prefix);
    }
  }
  return routes;
}

function serve(port) {
  const server = createServer(async (req, res) => {
    const url = decodeURIComponent((req.url || "/").split("?")[0]);
    let file = path.join(OUT, url);
    try {
      if ((await stat(file)).isDirectory()) file = path.join(file, "index.html");
    } catch {
      file = path.join(OUT, "404.html");
    }
    try {
      const body = await readFile(file);
      res.writeHead(200, { "content-type": MIME[path.extname(file)] ?? "application/octet-stream" });
      res.end(body);
    } catch {
      res.writeHead(404).end("not found");
    }
  });
  return new Promise((resolve) => server.listen(port, "127.0.0.1", () => resolve(server)));
}

/** Runs inside the page. Returns everything the assertions need. */
function probe() {
  const W = document.documentElement.clientWidth;
  const isClipped = (el) => {
    for (let n = el.parentElement; n; n = n.parentElement) {
      if (getComputedStyle(n).overflowX !== "visible") return true;
    }
    return false;
  };
  const worst = [...document.querySelectorAll("body *")]
    .filter((el) => !isClipped(el))
    .map((el) => ({ el, box: el.getBoundingClientRect() }))
    .filter((o) => o.box.right > W + 1 && o.box.width > 0)
    .sort((a, b) => b.box.right - a.box.right)[0];

  // The longest paragraph, not the first: the first one on the 404 page is a
  // small "404" eyebrow label, which is meant to be 14px.
  const copy = [...document.querySelectorAll(".prose p, main p")]
    .filter((el) => (el.textContent || "").trim().length > 60)
    .sort((a, b) => (b.textContent || "").length - (a.textContent || "").length)[0];
  return {
    clientWidth: W,
    innerWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    bodyFontPx: copy ? parseFloat(getComputedStyle(copy).fontSize) : null,
    bodyCopySample: copy ? (copy.textContent || "").trim().slice(0, 40) : null,
    offender: worst
      ? `${worst.el.tagName.toLowerCase()}${worst.el.className ? "." + String(worst.el.className).trim().split(/\s+/)[0] : ""} → ${Math.round(worst.box.right)}px`
      : null,
  };
}

const PORT = 4319;
const server = await serve(PORT);

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  console.error("playwright is not installed. Run:  npm i -D playwright && npx playwright install chromium");
  server.close();
  process.exit(2);
}

let browser;
try {
  browser = await chromium.launch();
} catch (err) {
  console.error("Could not launch Chromium. Run:  npx playwright install chromium\n" + err.message);
  server.close();
  process.exit(2);
}

const routes = (await findRoutes()).sort();
const failures = [];

console.log(`Checking ${routes.length} route(s) at ${VIEWPORTS.length} viewports\n`);

for (const route of routes) {
  const cells = [];
  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      isMobile: vp.mobile,
    });
    const page = await ctx.newPage();
    await page.goto(`http://127.0.0.1:${PORT}${route}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(300);
    const r = await page.evaluate(probe);
    await ctx.close();

    const overflow = r.scrollWidth - r.clientWidth;
    const problems = [];
    if (overflow > 1) problems.push(`overflows by ${overflow}px (${r.offender ?? "unknown element"})`);
    if (r.innerWidth !== r.clientWidth) problems.push(`zoomed to fit (innerWidth ${r.innerWidth} vs ${r.clientWidth})`);
    if (vp.width >= 768 && r.bodyFontPx !== null && r.bodyFontPx < 16) {
      problems.push(`body copy is ${r.bodyFontPx}px`);
    }

    cells.push(problems.length ? `${vp.name}:FAIL` : `${vp.name}:ok`);
    for (const p of problems) failures.push(`${route}  ${vp.name}  ${p}`);
  }
  console.log(`${route.padEnd(36)} ${cells.join("  ")}`);
}

await browser.close();
server.close();

if (failures.length) {
  console.error(`\n${failures.length} failure(s):`);
  for (const f of failures) console.error("  " + f);
  process.exit(1);
}
console.log("\nAll routes fit every viewport.");

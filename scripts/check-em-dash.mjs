#!/usr/bin/env node
/**
 * Fails the build on em dashes in anything the site ships.
 *
 * Em dashes were the strongest tell that this site's copy was machine
 * written: 37 of them across the article and the pages. They were removed by
 * rewriting the sentences, not by swapping the punctuation, and this keeps
 * them out.
 *
 *   npm run check:em-dash      (also a step of npm run build)
 *
 * Scope is deliberately PROSE, not source. Code comments are free to use
 * whatever punctuation they like; what matters is what a reader sees. So the
 * check covers content/, the handful of source files that hold site copy, and
 * the built .html / .txt / .xml, which is the ground truth for what ships.
 */
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

/** U+2014 em dash, and U+2015 horizontal bar, which renders the same. */
const DASH = /[—―]/g;

/**
 * Two compiled bundles hold prose this repository cannot edit at the source
 * level: the Svelte source for the interactive article is not here, so its
 * text only exists as strings inside the compiled output. Removing an em dash
 * properly means rewriting the sentence around it, which is not something to
 * do blind inside a minified file.
 *
 * They are pinned instead of ignored. The count may not RISE. If it falls,
 * the check still passes and asks for the baseline to be lowered.
 */
const BASELINES = {
  "out/pacmap/bundle.js": 36,
  "out/pacmap/bundle-supplement.js": 8,
};

/** Site copy lives in these; everything else in the tree is code. */
const SOURCE_FILES = [
  "content",
  "lib/site.ts",
  "app/page.tsx",
  "app/articles/page.tsx",
  "app/not-found.tsx",
  "app/articles/[slug]/page.tsx",
  "public/pacmap/index.html",
  "public/pacmap/global.css",
  "scripts/rss.mjs",
];

/** In the build, only rendered documents count. */
const BUILT_EXT = new Set([".html", ".txt", ".xml"]);

function* walk(dir, keep) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    if (entry.name === "_next" || entry.name === "node_modules") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full, keep);
    else if (keep(full)) yield full;
  }
}

function countIn(file) {
  let text;
  try {
    text = readFileSync(file, "utf8");
  } catch {
    return [];
  }
  DASH.lastIndex = 0;
  const hits = [];
  let match;
  while ((match = DASH.exec(text)) !== null) {
    hits.push({
      line: text.slice(0, match.index).split("\n").length,
      context: text
        .slice(Math.max(0, match.index - 50), match.index + 50)
        .replace(/\s+/g, " ")
        .trim(),
    });
  }
  return hits;
}

const findings = [];
const notes = [];

// 1. Site copy in source, so an author sees this before building.
for (const entry of SOURCE_FILES) {
  const full = path.join(ROOT, entry);
  if (!existsSync(full)) continue;
  const files = statSync(full).isDirectory()
    ? [...walk(full, () => true)]
    : [full];
  for (const file of files) {
    for (const hit of countIn(file)) {
      findings.push({ file: path.relative(ROOT, file), ...hit });
    }
  }
}

// 2. What actually ships.
const out = path.join(ROOT, "out");
if (existsSync(out)) {
  for (const file of walk(out, (f) => BUILT_EXT.has(path.extname(f)))) {
    for (const hit of countIn(file)) {
      findings.push({ file: path.relative(ROOT, file), ...hit });
    }
  }

  // 3. The pinned bundles.
  for (const [rel, baseline] of Object.entries(BASELINES)) {
    const full = path.join(ROOT, rel);
    if (!existsSync(full)) continue;
    const n = countIn(full).length;
    if (n > baseline) {
      findings.push({
        file: rel,
        line: 1,
        context: `${n} em dashes, baseline is ${baseline}. A new one was introduced.`,
      });
    } else if (n < baseline) {
      notes.push(
        `${rel} is down to ${n} em dashes from a baseline of ${baseline}. ` +
          `Lower BASELINES in scripts/check-em-dash.mjs.`
      );
    }
  }
}

for (const note of notes) console.log(`Note: ${note}`);

if (findings.length === 0) {
  console.log("Em dashes: clean (site copy and built documents).");
  process.exit(0);
}

console.error(`\nEm dashes: ${findings.length} found in site copy.\n`);
for (const f of findings) {
  console.error(`  ${f.file}:${f.line}`);
  console.error(`     ...${f.context}...`);
}
console.error(
  "\nRewrite the sentence rather than swapping the dash for a comma; a dash\n" +
    "with a comma dropped into its place still reads like a dash.\n"
);
process.exit(1);

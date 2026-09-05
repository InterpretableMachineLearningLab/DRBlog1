#!/usr/bin/env node
/**
 * Fails the build on British spellings in anything the site ships.
 *
 * This is a Duke lab site, so the house style is US English. The article and
 * the compiled /pacmap/ prose had drifted to optimis-ation, neighbo-ur,
 * initialis-ation, colo-ur, behavio-ur, visualis-ation and parametris-ing,
 * and nothing caught it. This does.
 *
 *   npm run check:spelling      (also the last step of npm run build)
 *
 * It scans the SOURCE, so an author sees the error before shipping, and also
 * the BUILT OUTPUT when out/ exists. The second pass is the one that matters
 * for public/pacmap/bundle.js: the Svelte source for that article is not in
 * this repository, so its prose only exists as compiled strings.
 */
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

/**
 * Each rule is [pattern, suggested US form].
 *
 * Every pattern must be a word that cannot show up as an identifier, a CSS
 * class or a library token, because this also runs against minified output.
 * Three candidates were considered and deliberately left out:
 *
 *   grey      The bundled color-name table defines grey, darkgrey, dimgrey,
 *             lightgrey, slategrey, darkslategrey and lightslategrey as real
 *             CSS keyword aliases. Renaming those breaks color parsing, and
 *             prose here already says gray.
 *   analysis  Correct in US English; only analyse/analysed/analysing differ,
 *             and those are covered below.
 *   emphasis  Same, and .hljs-emphasis is a highlight.js class name.
 */
const RULES = [
  [/\boptimis(e|es|ed|ing|ation|ations|er|ers)\b/gi, "optimiz..."],
  [/\bvisualis(e|es|ed|ing|ation|ations)\b/gi, "visualiz..."],
  [/\bnormalis(e|es|ed|ing|ation|ations)\b/gi, "normaliz..."],
  [/\bparametris(e|es|ed|ing|ation|ations)\b/gi, "parametriz..."],
  [/\binitialis(e|es|ed|ing|ation|ations)\b/gi, "initializ..."],
  [/\b(re)?organis(e|es|ed|ing|ation|ations)\b/gi, "organiz..."],
  [/\bsummaris(e|es|ed|ing)\b/gi, "summariz..."],
  [/\brecognis(e|es|ed|ing)\b/gi, "recogniz..."],
  [/\bemphasis(e|es|ed|ing)\b/gi, "emphasiz..."],
  [/\banalys(e|es|ed|ing|er|ers)\b/gi, "analyz..."],
  [/\bneighbour(s|ing|hood|hoods|ly)?\b/gi, "neighbor"],
  [/\bcolour(s|ed|ing|ful|less)?\b/gi, "color"],
  [/\bbehaviour(s|al|ally)?\b/gi, "behavior"],
  [/\bcentre(s|d)?\b/gi, "center"],
  [/\bartefact(s)?\b/gi, "artifact"],
  [/\bcatalogue(s|d)?\b/gi, "catalog"],
  [/\bdefence(s)?\b/gi, "defense"],
  [/\blicence(s|d)?\b/gi, "license"],
  [/\bpractis(e|es|ed|ing)\b/gi, "practice"],
  [/\bwhilst\b/gi, "while"],
  [/\blabell(ed|ing)\b/gi, "labeled / labeling"],
  [/\bmodelling\b/gi, "modeling"],
  [/\bcancell(ed|ing)\b/gi, "canceled / canceling"],
  [/\btravell(ed|ing)\b/gi, "traveled / traveling"],
  [/\bmetre(s)?\b/gi, "meter"],
];

const SCAN_DIRS = ["content", "app", "components", "lib", "scripts", "public", "out"];

/** Framework chunks and encoded data carry no prose worth checking. */
const SKIP_DIRS = new Set(["node_modules", ".next", ".git", "_next"]);
const SKIP_EXT = new Set([
  ".json", ".png", ".jpg", ".jpeg", ".gif", ".webp", ".ico", ".woff", ".woff2",
  ".ttf", ".eot", ".map", ".base64", ".ijmap", ".svg",
]);
/** This file names the British forms on purpose. */
const SKIP_FILES = new Set([path.join(ROOT, "scripts", "check-spelling.mjs")]);

function* walk(dir) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (!SKIP_EXT.has(path.extname(entry.name)) && !SKIP_FILES.has(full)) {
      yield full;
    }
  }
}

const findings = [];

for (const dirName of SCAN_DIRS) {
  const dir = path.join(ROOT, dirName);
  if (!existsSync(dir) || !statSync(dir).isDirectory()) continue;

  for (const file of walk(dir)) {
    let text;
    try {
      text = readFileSync(file, "utf8");
    } catch {
      continue;
    }

    for (const [pattern, suggestion] of RULES) {
      pattern.lastIndex = 0;
      let match;
      while ((match = pattern.exec(text)) !== null) {
        findings.push({
          file: path.relative(ROOT, file),
          line: text.slice(0, match.index).split("\n").length,
          found: match[0],
          suggestion,
          // Minified output has no useful line numbers, so carry context.
          context: text
            .slice(Math.max(0, match.index - 45), match.index + match[0].length + 45)
            .replace(/\s+/g, " ")
            .trim(),
        });
      }
    }
  }
}

if (findings.length === 0) {
  console.log(`Spelling: clean (${RULES.length} rules, US English).`);
  process.exit(0);
}

console.error(
  `\nSpelling: ${findings.length} British form(s) found. This site uses US English.\n`
);
for (const f of findings) {
  console.error(`  ${f.file}:${f.line}  "${f.found}"  suggests  ${f.suggestion}`);
  console.error(`     ...${f.context}...`);
}
console.error(
  "\nIf a hit is a library token or a CSS keyword rather than prose, add it to\n" +
    "the exclusions documented at the top of scripts/check-spelling.mjs.\n"
);
process.exit(1);

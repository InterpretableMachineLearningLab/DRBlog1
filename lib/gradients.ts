/**
 * Deterministic gradient cover art.
 *
 * Every post gets a cover generated from its tags — no stock photos, no image
 * pipeline, and the same post always renders the same gradient. Six tasteful
 * pairs, tuned to sit quietly next to the zinc/indigo palette.
 */
const GRADIENTS = [
  "bg-linear-to-br from-indigo-500 via-indigo-400 to-sky-400",
  "bg-linear-to-br from-violet-500 via-purple-400 to-fuchsia-400",
  "bg-linear-to-br from-sky-500 via-cyan-400 to-teal-300",
  "bg-linear-to-br from-rose-400 via-pink-400 to-fuchsia-300",
  "bg-linear-to-br from-amber-300 via-orange-300 to-rose-300",
  "bg-linear-to-br from-emerald-400 via-teal-400 to-cyan-300",
] as const;

/** Small stable string hash (djb2). */
function hash(input: string): number {
  let h = 5381;
  for (let i = 0; i < input.length; i++) {
    h = (h * 33) ^ input.charCodeAt(i);
  }
  return Math.abs(h);
}

/** Pick a gradient class list for a post, keyed by its tags (slug as fallback). */
export function gradientFor(tags: string[], fallback = "nova"): string {
  const key = tags.length > 0 ? tags.join("-").toLowerCase() : fallback;
  return GRADIENTS[hash(key) % GRADIENTS.length];
}

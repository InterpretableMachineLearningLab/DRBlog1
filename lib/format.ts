/**
 * Display helpers that are safe to import from client components
 * (no Node.js APIs — lib/posts.ts uses `fs` and is server-only).
 */

/** Format an ISO date for display, pinned to UTC to avoid off-by-one days. */
export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

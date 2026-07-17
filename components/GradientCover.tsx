import { gradientFor } from "@/lib/gradients";

/**
 * Cover art without images: a deterministic gradient derived from the post's
 * tags, plus a soft highlight so it reads as intentional art rather than a
 * flat fill. Same tags → same gradient, every build.
 */
export function GradientCover({
  tags,
  seed,
  className = "",
}: {
  tags: string[];
  seed?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden rounded-2xl ring-1 ring-zinc-900/5 ring-inset dark:ring-white/10 ${gradientFor(tags, seed)} ${className}`}
    >
      {/* soft top-left light source */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.5),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.25),transparent_55%)]" />
      {/* gentle darkening toward the bottom for depth */}
      <div className="absolute inset-0 bg-linear-to-t from-zinc-900/20 to-transparent" />
    </div>
  );
}

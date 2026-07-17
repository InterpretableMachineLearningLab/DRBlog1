import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

function NavCard({
  post,
  direction,
}: {
  post: PostMeta;
  direction: "prev" | "next";
}) {
  const isPrev = direction === "prev";
  return (
    <Link
      href={`/articles/${post.slug}`}
      className={`group flex flex-col rounded-2xl border border-zinc-200 p-5 transition hover:border-indigo-500/40 hover:bg-indigo-50/40 dark:border-zinc-700/60 dark:hover:border-indigo-400/40 dark:hover:bg-indigo-500/5 ${
        isPrev ? "items-start text-left" : "items-end text-right sm:col-start-2"
      }`}
    >
      <span className="text-xs font-medium tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
        {isPrev ? "← Previous article" : "Next article →"}
      </span>
      <span className="mt-2 text-sm font-semibold text-zinc-900 transition group-hover:text-indigo-600 dark:text-zinc-100 dark:group-hover:text-indigo-400">
        {post.title}
      </span>
    </Link>
  );
}

/**
 * Previous / next links at the bottom of a post.
 * "Previous" is the older post, "Next" the newer one.
 */
export function PostNav({
  older,
  newer,
}: {
  older?: PostMeta;
  newer?: PostMeta;
}) {
  if (!older && !newer) return null;
  return (
    <nav
      aria-label="Adjacent articles"
      className="mt-16 grid grid-cols-1 gap-4 border-t border-zinc-200 pt-10 sm:grid-cols-2 dark:border-zinc-800"
    >
      {older && <NavCard post={older} direction="prev" />}
      {newer && <NavCard post={newer} direction="next" />}
    </nav>
  );
}

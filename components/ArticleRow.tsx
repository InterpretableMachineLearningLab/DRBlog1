import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import { ArrowRightIcon } from "@/components/Icons";

/**
 * Borderless list-style card used on the home page: date rail, title,
 * excerpt, "Read article". The left border picks up the indigo accent on
 * hover, and the whole card is clickable via the stretched link.
 */
export function ArticleRow({ post }: { post: PostMeta }) {
  return (
    <article className="group relative border-l-2 border-zinc-200 pl-6 transition hover:border-indigo-500 dark:border-zinc-700/60 dark:hover:border-indigo-400">
      <time
        dateTime={post.date}
        className="text-sm text-zinc-500 dark:text-zinc-400"
      >
        {formatDate(post.date)}
      </time>
      <h3 className="mt-2 text-lg font-semibold tracking-tight text-zinc-900 sm:text-xl dark:text-zinc-100">
        <Link href={`/articles/${post.slug}`} className="after:absolute after:inset-0">
          <span className="transition group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
            {post.title}
          </span>
        </Link>
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-400">
        {post.excerpt}
      </p>
      <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400">
        Read article
        <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </span>
    </article>
  );
}

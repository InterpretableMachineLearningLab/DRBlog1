import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import { GradientCover } from "@/components/GradientCover";
import { TagPill } from "@/components/TagPill";

/**
 * Grid-style card used on the articles index: gradient cover art, date,
 * title, excerpt and tag pills. Fully clickable via the stretched link.
 */
export function ArticleCard({ post }: { post: PostMeta }) {
  return (
    <article className="group relative flex flex-col">
      <GradientCover
        tags={post.tags}
        seed={post.slug}
        className="aspect-16/9 w-full transition duration-300 group-hover:scale-[1.015] group-hover:shadow-lg group-hover:shadow-indigo-500/10"
      />
      <div className="mt-5 flex flex-1 flex-col">
        <time
          dateTime={post.date}
          className="text-sm text-zinc-500 dark:text-zinc-400"
        >
          {formatDate(post.date)} &middot; {post.readingTime} min read
        </time>
        <h3 className="mt-2 text-lg font-semibold tracking-tight text-zinc-900 sm:text-xl dark:text-zinc-100">
          <Link
            href={`/articles/${post.slug}`}
            className="after:absolute after:inset-0"
          >
            <span className="transition group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
              {post.title}
            </span>
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-400">
          {post.excerpt}
        </p>
        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <TagPill key={tag} tag={tag} />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

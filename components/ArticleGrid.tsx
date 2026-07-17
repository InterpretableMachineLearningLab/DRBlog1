"use client";

import { useState } from "react";
import type { PostMeta } from "@/lib/posts";
import { ArticleCard } from "@/components/ArticleCard";

/**
 * Client-side tag filter + article grid for /articles.
 * Receives serializable post metadata from the server page.
 */
export function ArticleGrid({
  posts,
  tags,
}: {
  posts: PostMeta[];
  tags: string[];
}) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const visible = activeTag
    ? posts.filter((post) => post.tags.includes(activeTag))
    : posts;

  const pillBase =
    "rounded-full px-4 py-1.5 text-sm font-medium transition cursor-pointer";
  const pillActive = "bg-indigo-600 text-white shadow-sm dark:bg-indigo-500";
  const pillIdle =
    "bg-white text-zinc-600 ring-1 ring-zinc-900/5 hover:text-indigo-600 hover:ring-indigo-500/30 dark:bg-zinc-800/60 dark:text-zinc-300 dark:ring-white/10 dark:hover:text-indigo-400";

  return (
    <div>
      <div
        role="group"
        aria-label="Filter articles by tag"
        className="flex flex-wrap gap-2"
      >
        <button
          type="button"
          onClick={() => setActiveTag(null)}
          aria-pressed={activeTag === null}
          className={`${pillBase} ${activeTag === null ? pillActive : pillIdle}`}
        >
          All
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag(tag)}
            aria-pressed={activeTag === tag}
            className={`${pillBase} ${activeTag === tag ? pillActive : pillIdle}`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2">
        {visible.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="mt-12 text-zinc-600 dark:text-zinc-400">
          No articles with that tag yet.
        </p>
      )}
    </div>
  );
}

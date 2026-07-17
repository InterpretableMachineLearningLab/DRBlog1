import type { Metadata } from "next";
import { ArticleGrid } from "@/components/ArticleGrid";
import { getAllPosts, getAllTags, toMeta } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Essays on web performance, static sites, dark mode, Tailwind CSS and the craft of building fast websites — from the Pixel & Oak studio journal.",
  openGraph: {
    title: "Articles — Nova",
    description:
      "Essays on web performance, static sites, dark mode, Tailwind CSS and the craft of building fast websites.",
    url: "/articles",
    type: "website",
  },
};

export default function ArticlesPage() {
  const posts = getAllPosts().map(toMeta);
  const tags = getAllTags();

  return (
    <div>
      <div className="mx-auto max-w-5xl px-4 pt-20 sm:px-6 sm:pt-28 lg:px-8">
        <header className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-100">
            All articles
          </h1>
          <p className="mt-6 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            Everything we&apos;ve written, newest first — on performance,
            static sites, design and the tools we reach for on every project.
            Filter by topic, or subscribe via{" "}
            <a
              href="/rss.xml"
              className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
            >
              RSS
            </a>
            .
          </p>
        </header>

        <div className="mt-14 sm:mt-16">
          <ArticleGrid posts={posts} tags={tags} />
        </div>
      </div>
    </div>
  );
}

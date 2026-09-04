import type { Metadata } from "next";
import { ArticleGrid } from "@/components/ArticleGrid";
import { PageShell, bodyCopy } from "@/components/PageShell";
import { getAllPosts, getAllTags, toMeta } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Interactive write-ups from the Interpretable Machine Learning Lab at Duke University: long-form explanations of the algorithms and ideas the lab works on.",
  openGraph: {
    title: "Articles | Interpretable ML Lab",
    description:
      "Interactive write-ups from the Interpretable Machine Learning Lab at Duke University.",
    url: "/articles",
    type: "website",
  },
};

export default function ArticlesPage() {
  const posts = getAllPosts().map(toMeta);
  const tags = getAllTags();

  return (
    <div>
      <PageShell width="wide">
        <header className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-100">
            All articles
          </h1>
          <p className={`mt-6 ${bodyCopy} text-zinc-600 dark:text-zinc-400`}>
            Long-form explanations of the algorithms and ideas the lab
            works on, written to be read and played with rather than
            skimmed.
          </p>
        </header>

        <div className="mt-14 sm:mt-16">
          <ArticleGrid posts={posts} tags={tags} />
        </div>
      </PageShell>
    </div>
  );
}

import type { Metadata } from "next";
import { ArticleGrid } from "@/components/ArticleGrid";
import { PageShell, bodyCopy } from "@/components/PageShell";
import { getAllPosts, getAllTags, toMeta } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Writing from the Interpretable Machine Learning Lab — interactive posts on interpretable models, dimensionality reduction, and the algorithms that come out of the lab.",
  openGraph: {
    title: "Articles — Interpretable ML Lab",
    description:
      "Writing from the Interpretable Machine Learning Lab.",
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
            Interactive writing from the lab — long-form explanations of the
            algorithms and ideas we work on, each one designed to be read
            and played with rather than just skimmed.
          </p>
        </header>

        <div className="mt-14 sm:mt-16">
          <ArticleGrid posts={posts} tags={tags} />
        </div>
      </PageShell>
    </div>
  );
}

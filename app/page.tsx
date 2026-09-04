import { ArticleRow } from "@/components/ArticleRow";
import { PageShell, bodyCopy } from "@/components/PageShell";
import { getAllPosts, toMeta } from "@/lib/posts";

export default function HomePage() {
  const posts = getAllPosts().map(toMeta);

  return (
    <div>
      {/* Hero */}
      <PageShell width="wide">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-100">
            Interpretable Machine Learning{" "}
            <span className="text-indigo-600 dark:text-indigo-400">Lab</span>
          </h1>
          <p className={`mt-6 ${bodyCopy} text-zinc-600 dark:text-zinc-400`}>
            Cynthia Rudin&apos;s research group at Duke University. The lab
            designs machine learning models whose reasoning processes people
            can understand: extremely sparse models, interpretable neural
            networks, interpretable matching methods for causal inference,
            and dimension reduction for data visualization. It applies them
            to problems in healthcare, criminal justice, materials science
            and computer vision.
          </p>
        </div>
      </PageShell>

      {/* Articles */}
      <PageShell className="mt-20 pt-0 sm:mt-24 sm:pt-0 lg:pt-0">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Writing
        </h2>
        <div className="mt-8 flex flex-col gap-14">
          {posts.map((post) => (
            <ArticleRow key={post.slug} post={post} />
          ))}
        </div>
      </PageShell>
    </div>
  );
}

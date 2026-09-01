import { ArticleRow } from "@/components/ArticleRow";
import { SocialLinks } from "@/components/SocialLinks";
import { getAllPosts, toMeta } from "@/lib/posts";

export default function HomePage() {
  const posts = getAllPosts().map(toMeta);

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-4 pt-20 sm:px-6 sm:pt-28 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-100">
            Interpretable Machine Learning{" "}
            <span className="text-indigo-600 dark:text-indigo-400">Lab</span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            We are Cynthia Rudin&apos;s research group at Duke University.
            We build machine learning models that people can actually
            understand — sparse decision rules, interpretable neural
            networks, and dimensionality-reduction methods that preserve
            real structure. This is where we write about the work.
          </p>
          <div className="mt-6">
            <SocialLinks />
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="mx-auto mt-20 max-w-3xl px-4 sm:mt-24 sm:px-6 lg:px-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Writing
        </h2>
        <div className="mt-8 flex flex-col gap-14">
          {posts.map((post) => (
            <ArticleRow key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}

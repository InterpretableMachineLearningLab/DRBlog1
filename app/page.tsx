import { ArticleRow } from "@/components/ArticleRow";
import { NewsletterCard } from "@/components/NewsletterCard";
import { SocialLinks } from "@/components/SocialLinks";
import { WorkWithUsCard } from "@/components/WorkWithUsCard";
import { getAllPosts, toMeta } from "@/lib/posts";

export default function HomePage() {
  const posts = getAllPosts().map(toMeta);

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-4 pt-20 sm:px-6 sm:pt-28 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-100">
            Notes on the fast,{" "}
            <span className="text-indigo-600 dark:text-indigo-400">simple</span>{" "}
            web.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            We&apos;re Pixel &amp; Oak, a studio that builds fast, SEO-ready
            websites. This is where we write about performance, static sites,
            design systems and the small decisions that make the web feel
            instant.
          </p>
          <div className="mt-6">
            <SocialLinks />
          </div>
        </div>
      </section>

      {/* Articles + sidebar */}
      <section className="mx-auto mt-20 max-w-5xl px-4 sm:mt-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-3 lg:gap-x-12">
          <div className="lg:col-span-2">
            <h2 className="sr-only">Latest articles</h2>
            <div className="flex flex-col gap-14">
              {posts.map((post) => (
                <ArticleRow key={post.slug} post={post} />
              ))}
            </div>
          </div>

          <aside className="space-y-8 lg:sticky lg:top-8 lg:self-start">
            <NewsletterCard />
            <WorkWithUsCard />
          </aside>
        </div>
      </section>
    </div>
  );
}

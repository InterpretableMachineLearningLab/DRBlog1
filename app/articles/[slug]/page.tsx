import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AuthorCard } from "@/components/AuthorCard";
import { GradientCover } from "@/components/GradientCover";
import { MarkdownContent } from "@/components/MarkdownContent";
import { PostNav } from "@/components/PostNav";
import { TagPill } from "@/components/TagPill";
import { formatDate } from "@/lib/format";
import { site } from "@/lib/site";
import { getAllPosts, getPostBySlug, toMeta } from "@/lib/posts";

interface Params {
  slug: string;
}

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/articles/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [site.author.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  // Posts are sorted newest → oldest.
  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.slug === post.slug);
  const newer = index > 0 ? toMeta(posts[index - 1]) : undefined;
  const older = index < posts.length - 1 ? toMeta(posts[index + 1]) : undefined;

  return (
    <div className="mx-auto max-w-2xl px-4 pt-16 sm:px-6 sm:pt-20 lg:px-8">
      <Link
        href="/articles"
        className="group inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400"
      >
        <span aria-hidden="true" className="transition-transform group-hover:-translate-x-0.5">
          ←
        </span>
        All articles
      </Link>

      <article className="mt-8">
        <header>
          <GradientCover
            tags={post.tags}
            seed={post.slug}
            className="aspect-21/9 w-full"
          />
          <h1 className="mt-8 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-100">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-zinc-500 dark:text-zinc-400">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">&middot;</span>
            <span>{post.readingTime} min read</span>
          </div>
          {post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <TagPill key={tag} tag={tag} />
              ))}
            </div>
          )}
        </header>

        <div className="mt-10">
          <MarkdownContent content={post.content} />
        </div>
      </article>

      <PostNav older={older} newer={newer} />
      <AuthorCard />
    </div>
  );
}

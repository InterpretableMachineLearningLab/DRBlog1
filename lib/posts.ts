import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const WORDS_PER_MINUTE = 225;

export interface Post {
  slug: string;
  title: string;
  date: string; // ISO string, e.g. "2026-07-01"
  excerpt: string;
  tags: string[];
  content: string;
  readingTime: number; // minutes, rounded up
}

/** Everything except the body — safe to pass to client components. */
export type PostMeta = Omit<Post, "content">;

function readPost(fileName: string): Post {
  const slug = fileName.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, fileName), "utf8");
  const { data, content } = matter(raw);

  const words = content.trim().split(/\s+/).length;

  return {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ""),
    excerpt: String(data.excerpt ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    content,
    readingTime: Math.max(1, Math.ceil(words / WORDS_PER_MINUTE)),
  };
}

/** All posts, newest first. */
export function getAllPosts(): Post[] {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".md"))
    .map(readPost)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

/** Unique tags across all posts, alphabetical. */
export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) tags.add(tag);
  }
  return [...tags].sort((a, b) => a.localeCompare(b));
}

/** Strip the body so the object can cross the server → client boundary. */
export function toMeta(post: Post): PostMeta {
  const { content: _content, ...meta } = post;
  return meta;
}

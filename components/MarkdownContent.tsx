import type { ComponentPropsWithoutRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";

/**
 * A table that is allowed to be wider than the text column.
 *
 * Prose is capped at a readable measure, which is far narrower than a
 * four-column comparison table needs. Without this wrapper the table is
 * squeezed to fit and its columns collapse to a few characters wide; with it
 * the table keeps a sane minimum column width (see globals.css) and scrolls
 * sideways instead. On phones the scroll area runs edge to edge, so the
 * gesture starts where the finger already is. On a wide desktop the
 * table instead breaks out past the text column, which stays at a
 * readable measure.
 */
function ProseTable({
  node: _node,
  ...props
}: ComponentPropsWithoutRef<"table"> & { node?: unknown }) {
  return (
    <div className="-mx-5 my-8 overflow-x-auto overscroll-x-contain px-5 sm:mx-0 sm:px-0 xl:-mx-16">
      <table {...props} />
    </div>
  );
}

/**
 * Renders a post body with tuned typography. Runs entirely at build time —
 * the markdown pipeline ships zero JavaScript to the browser.
 *
 * rehype-slug gives every heading an id so in-article links (and deep links
 * shared from outside) land on the right section.
 *
 * Type scales up with the viewport (`sm:prose-lg`) in step with the column
 * width set by the page, so the line length stays in the same range from a
 * phone to a desktop rather than the text staying 16px in a wider box.
 */
export function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="prose prose-zinc sm:prose-lg dark:prose-invert prose-headings:tracking-tight prose-headings:scroll-mt-24 prose-a:font-medium prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline hover:prose-a:underline-offset-4 dark:prose-a:text-indigo-400 prose-blockquote:border-l-indigo-500 prose-blockquote:font-normal prose-blockquote:not-italic prose-blockquote:text-zinc-600 dark:prose-blockquote:text-zinc-400 prose-strong:font-semibold prose-hr:border-zinc-200 dark:prose-hr:border-zinc-700 prose-th:text-left max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, rehypeHighlight]}
        components={{ table: ProseTable }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

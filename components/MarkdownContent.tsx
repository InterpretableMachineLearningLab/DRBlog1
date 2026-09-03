import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";

/**
 * Renders a post body with tuned typography. Runs entirely at build time —
 * the markdown pipeline ships zero JavaScript to the browser.
 *
 * rehype-slug gives every heading an id so in-article links (and deep links
 * shared from outside) land on the right section.
 */
export function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="prose prose-zinc dark:prose-invert prose-headings:tracking-tight prose-headings:scroll-mt-24 prose-a:font-medium prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline hover:prose-a:underline-offset-4 dark:prose-a:text-indigo-400 prose-blockquote:border-l-indigo-500 prose-blockquote:font-normal prose-blockquote:not-italic prose-blockquote:text-zinc-600 dark:prose-blockquote:text-zinc-400 prose-strong:font-semibold prose-hr:border-zinc-200 dark:prose-hr:border-zinc-700 prose-th:text-left max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, rehypeHighlight]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

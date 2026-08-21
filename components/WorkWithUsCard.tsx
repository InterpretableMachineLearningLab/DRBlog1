import { ArrowRightIcon } from "@/components/Icons";

export function WorkWithUsCard() {
  return (
    <div className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-700/60">
      <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        Work with us
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        Nova is built and maintained by Pixel &amp; Oak, a studio crafting
        fast, SEO-ready websites for small businesses.
      </p>
      <a
        href="https://pixelandoak.com/templates/nextjs-blog-template/?utm_source=nova-template"
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 transition hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
      >
        Start a project
        <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </a>
    </div>
  );
}

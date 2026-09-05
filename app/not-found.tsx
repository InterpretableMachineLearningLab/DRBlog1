import Link from "next/link";
import { PageShell, bodyCopy } from "@/components/PageShell";

export default function NotFound() {
  return (
    <div>
      <PageShell className="flex flex-col items-start">
        <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
          404
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-100">
          Lost among the stars.
        </h1>
        <p className={`mt-6 ${bodyCopy} text-zinc-600 dark:text-zinc-400`}>
          The page you&apos;re looking for doesn&apos;t exist. It may have
          moved, or the link was mistyped.
        </p>
        <Link
          href="/"
          className="mt-8 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400"
        >
          Back to home
        </Link>
      </PageShell>
    </div>
  );
}

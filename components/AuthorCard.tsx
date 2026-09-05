import { site } from "@/lib/site";

export function AuthorCard() {
  const initial = site.author.name.trim().charAt(0).toUpperCase();
  return (
    <div className="mt-16 flex items-center gap-4 rounded-2xl border border-zinc-200 p-6 dark:border-zinc-700/60">
      <div
        aria-hidden="true"
        className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-linear-to-br from-indigo-500 to-sky-400 text-lg font-bold text-white shadow-sm"
      >
        {initial}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          {site.author.name}
        </p>
        <p className="mt-0.5 text-sm text-zinc-600 sm:text-base dark:text-zinc-400">
          {site.author.bio}
        </p>
      </div>
    </div>
  );
}

import Link from "next/link";
import { site } from "@/lib/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/articles", label: "Articles" },
] as const;

export function Footer() {
  return (
    <footer className="mt-24 border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-5 py-10 sm:flex-row sm:justify-between sm:px-6 lg:px-8 xl:max-w-6xl">
        <nav aria-label="Footer">
          <ul className="flex items-center gap-6 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="transition hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex max-w-md flex-col items-center gap-1 text-sm text-zinc-500 sm:items-end sm:text-right dark:text-zinc-400">
          <p>
            {site.title} · Duke University
          </p>
        </div>
      </div>
    </footer>
  );
}

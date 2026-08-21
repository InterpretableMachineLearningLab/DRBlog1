import Link from "next/link";
import { site } from "@/lib/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/articles", label: "Articles" },
  { href: "/about", label: "About" },
] as const;

export function Footer() {
  return (
    <footer className="mt-24 border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-10 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
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

        <div className="flex flex-col items-center gap-1 text-sm text-zinc-500 sm:items-end dark:text-zinc-400">
          <p>&copy; {new Date().getFullYear()} Pixel &amp; Oak. All rights reserved.</p>
          <p>
            Built by{" "}
            <a
              href="https://pixelandoak.com/templates/nextjs-blog-template/?utm_source=nova-template"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-zinc-700 transition hover:text-indigo-600 dark:text-zinc-300 dark:hover:text-indigo-400"
            >
              Pixel &amp; Oak
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

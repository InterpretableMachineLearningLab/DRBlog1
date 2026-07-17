"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ChevronDownIcon } from "@/components/Icons";

const links = [
  { href: "/", label: "Home" },
  { href: "/articles", label: "Articles" },
  { href: "/about", label: "About" },
] as const;

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="relative z-50 flex justify-center pt-6 sm:pt-8">
      <div className="flex items-center gap-3">
        {/* Desktop: floating pill nav */}
        <nav className="hidden rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-sm ring-1 ring-zinc-900/5 backdrop-blur md:block dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
          <ul className="flex items-center">
            {links.map(({ href, label }) => {
              const active = isActive(pathname, href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`relative block px-4 py-2.5 transition ${
                      active
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "hover:text-indigo-600 dark:hover:text-indigo-400"
                    }`}
                  >
                    {label}
                    {active && (
                      <span className="absolute inset-x-3 -bottom-px h-px bg-linear-to-r from-indigo-500/0 via-indigo-500/60 to-indigo-500/0 dark:via-indigo-400/60" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile: "Menu" pill opening a dropdown panel */}
        <div className="relative md:hidden">
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex items-center gap-1.5 rounded-full bg-white/90 px-4 py-2.5 text-sm font-medium text-zinc-800 shadow-sm ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10"
          >
            Menu
            <ChevronDownIcon
              className={`h-3.5 w-3.5 text-zinc-500 transition-transform ${menuOpen ? "rotate-180" : ""}`}
            />
          </button>

          {menuOpen && (
            <>
              {/* Backdrop — click anywhere to close */}
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
                className="fixed inset-0 z-40 cursor-default bg-zinc-800/20 backdrop-blur-xs dark:bg-black/40"
              />
              <div
                id="mobile-nav"
                className="absolute left-1/2 z-50 mt-3 w-48 -translate-x-1/2 rounded-2xl bg-white p-2 shadow-lg ring-1 ring-zinc-900/5 dark:bg-zinc-800 dark:ring-white/10"
              >
                <ul className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  {links.map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        onClick={() => setMenuOpen(false)}
                        className={`block rounded-xl px-4 py-2.5 transition hover:bg-zinc-50 dark:hover:bg-zinc-700/50 ${
                          isActive(pathname, href)
                            ? "text-indigo-600 dark:text-indigo-400"
                            : ""
                        }`}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>

        <ThemeToggle />
      </div>
    </header>
  );
}

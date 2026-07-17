"use client";

import { SunIcon, MoonIcon } from "@/components/Icons";

/**
 * Dark-mode toggle. The current theme lives entirely in the `dark` class on
 * <html> (set pre-paint by the inline script in app/layout.tsx), so this
 * component needs no state and can never mismatch during hydration — the two
 * icons swap purely via CSS.
 */
export function ThemeToggle() {
  function toggleTheme() {
    const root = document.documentElement;
    const isDark = root.classList.toggle("dark");
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      // localStorage unavailable (private mode) — theme still toggles for this visit.
    }
  }

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      onClick={toggleTheme}
      className="group rounded-full bg-white/90 p-2.5 shadow-sm ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-zinc-800/90 dark:ring-white/10"
    >
      <SunIcon className="h-5 w-5 text-zinc-500 transition group-hover:text-indigo-500 dark:hidden" />
      <MoonIcon className="hidden h-5 w-5 text-zinc-400 transition group-hover:text-indigo-400 dark:block" />
    </button>
  );
}

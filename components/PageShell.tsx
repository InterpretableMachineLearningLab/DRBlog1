import type { ReactNode } from "react";

/**
 * The one place page width, gutters and top padding are decided.
 *
 * Every page routes through this so a new page is responsive by
 * construction rather than by remembering to copy a class string. The
 * companion check — `npm run check:responsive` — walks the built output and
 * fails on any page that overflows its viewport, so a page that opts out of
 * this component still has to justify itself.
 *
 * The width ladder is deliberately short. Before this existed the content
 * column measured 608–672px on a 768px tablet, an 820px iPad and a 1440px
 * laptop alike: one layout for every screen above phone size.
 */
const WIDTH = {
  /**
   * A reading column. Steps up once at `lg`; paired with body type that goes
   * 16px → 18px at `sm`, this holds the line length between roughly 45 and 80
   * characters from a 360px phone to a desktop, instead of letting it run to
   * 92 characters in a wider box at a fixed 16px.
   */
  prose: "max-w-2xl lg:max-w-3xl",
  /**
   * Index and grid pages, where the content is cards rather than sentences
   * and extra width buys another column instead of a longer line.
   */
  wide: "max-w-5xl xl:max-w-6xl",
} as const;

export type ShellWidth = keyof typeof WIDTH;

export function PageShell({
  width = "prose",
  className = "",
  children,
}: {
  width?: ShellWidth;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`mx-auto w-full ${WIDTH[width]} px-5 pt-14 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24 ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * Body-copy type scale for hand-written pages, matching what
 * `MarkdownContent` gets from `sm:prose-lg`. Long-form paragraphs and lists
 * should use this rather than a bare `text-base`, so prose grows with the
 * column instead of staying 16px in a wider one.
 */
export const bodyCopy =
  "text-base leading-relaxed sm:text-lg sm:leading-relaxed";

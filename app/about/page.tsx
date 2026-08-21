import type { Metadata } from "next";
import { SocialLinks } from "@/components/SocialLinks";

export const metadata: Metadata = {
  title: "About",
  description:
    "Nova is a free, open-source Next.js blog template by Pixel & Oak — static-export, markdown-powered, dark-mode-ready and built to be made your own.",
  openGraph: {
    title: "About — Nova",
    description:
      "Nova is a free, open-source Next.js blog template by Pixel & Oak — static-export, markdown-powered and built to be made your own.",
    url: "/about",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 pt-20 sm:px-6 sm:pt-28 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-100">
          A blog template that&apos;s{" "}
          <span className="text-indigo-600 dark:text-indigo-400">finished</span>{" "}
          on day one.
        </h1>

        <div className="mt-8 space-y-6 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          <p>
            Nova is the blog template we wished existed every time a client
            said &ldquo;we just want a fast, good-looking blog.&rdquo; Most
            free templates look free. The polished ones cost as much as a nice
            dinner for four and still ship with a CMS you don&apos;t need. So
            we built Nova the way we build client sites at{" "}
            <a
              href="https://pixelandoak.com/templates/nextjs-blog-template/?utm_source=nova-template"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Pixel &amp; Oak
            </a>{" "}
            — static-first, obsessively fast, typography-led — and gave it
            away.
          </p>
          <p>
            Everything is markdown. Drop a <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">.md</code>{" "}
            file into <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">content/posts</code>,
            give it a title, date, excerpt and a few tags, and the build does
            the rest: the article pages, the tag filters, the reading times,
            the RSS feed, the sitemap, even the cover art — those gradients are
            generated from each post&apos;s tags, so the site looks finished
            without a single stock photo.
          </p>
          <p>
            The whole thing exports to plain HTML with{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">next build</code>.
            No server, no database, no cold starts. Host it free on Cloudflare
            Pages, Vercel, Netlify or GitHub Pages, and it will score green on
            Core Web Vitals out of the box — because there&apos;s almost
            nothing to load.
          </p>
        </div>

        <section className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Making it yours
          </h2>
          <ul className="mt-6 space-y-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            <li>
              <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
                Name and links.
              </strong>{" "}
              Edit <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">lib/site.ts</code>{" "}
              — site title, description, URL, author and social handles all
              live in one file.
            </li>
            <li>
              <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
                Accent color.
              </strong>{" "}
              Nova uses indigo. Search-and-replace{" "}
              <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">indigo-</code>{" "}
              with any Tailwind color — <em>sky</em>, <em>emerald</em>,{" "}
              <em>rose</em> — and the whole theme follows, aurora included.
            </li>
            <li>
              <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
                Writing.
              </strong>{" "}
              One markdown file per post in{" "}
              <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">content/posts</code>.
              The README documents every frontmatter field.
            </li>
            <li>
              <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
                Newsletter.
              </strong>{" "}
              The signup card is provider-agnostic — point the form at
              Buttondown, Kit, Mailchimp or your own endpoint.
            </li>
          </ul>
          <p className="mt-6 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            The full customization guide lives in the README. If you build
            something with Nova, we&apos;d genuinely love to see it.
          </p>
        </section>

        <div className="mt-10">
          <SocialLinks />
        </div>
      </div>
    </div>
  );
}

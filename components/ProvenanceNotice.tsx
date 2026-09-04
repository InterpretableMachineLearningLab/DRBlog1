import { site } from "@/lib/site";

/**
 * Says who is responsible for this site.
 *
 * The site carries a research lab's name, its PI's name and a copyright line,
 * so a reader reasonably assumes the lab published it. Until that is actually
 * true, the page should say so rather than leave the reader to infer it.
 * Flip `site.provenance.reviewed` to true and this renders nothing.
 */
export function ProvenanceNotice({ className = "" }: { className?: string }) {
  if (site.provenance.reviewed) return null;

  return (
    <p className={`text-sm text-zinc-500 dark:text-zinc-400 ${className}`}>
      {site.provenance.notice}{" "}
      <a
        href={site.provenance.officialUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-zinc-700 transition hover:text-indigo-600 dark:text-zinc-300 dark:hover:text-indigo-400"
      >
        Official lab page →
      </a>
    </p>
  );
}

export function TagPill({ tag }: { tag: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700 ring-1 ring-indigo-600/10 ring-inset dark:bg-indigo-500/10 dark:text-indigo-300 dark:ring-indigo-400/20">
      {tag}
    </span>
  );
}

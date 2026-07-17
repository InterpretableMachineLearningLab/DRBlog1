/**
 * Nova's signature motif: a soft aurora washing down from the top of the
 * page — two large blurred radial gradients, dimmer in dark mode. Purely
 * decorative, so it is hidden from assistive tech and ignores the pointer.
 */
export function Aurora() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[36rem] overflow-hidden"
    >
      <div className="absolute -top-40 -left-40 h-[30rem] w-[42rem] rounded-full bg-linear-to-br from-indigo-300/50 via-sky-300/30 to-transparent blur-3xl dark:from-indigo-500/20 dark:via-sky-500/10" />
      <div className="absolute -top-52 -right-40 h-[34rem] w-[44rem] rounded-full bg-linear-to-bl from-violet-300/40 via-indigo-300/25 to-transparent blur-3xl dark:from-violet-500/15 dark:via-indigo-500/10" />
    </div>
  );
}

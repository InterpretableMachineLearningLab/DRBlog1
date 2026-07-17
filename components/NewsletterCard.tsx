import { MailIcon } from "@/components/Icons";

/**
 * "Stay up to date" card. The form is intentionally unwired — point the
 * `action` at your newsletter provider (Buttondown, Kit, Mailchimp…).
 * See the README's customization guide.
 */
export function NewsletterCard() {
  return (
    <div className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-700/60">
      <h2 className="flex items-center gap-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <MailIcon className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
        Stay up to date
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        Get notified when we publish something new, and unsubscribe at any
        time. No spam, ever.
      </p>
      <form className="mt-5 flex gap-2" action="#" method="post">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          placeholder="Email address"
          aria-label="Email address"
          required
          className="min-w-0 flex-auto rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-500 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-indigo-400"
        />
        <button
          type="submit"
          className="flex-none rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 active:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400"
        >
          Join
        </button>
      </form>
    </div>
  );
}

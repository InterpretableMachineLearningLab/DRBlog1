import { site } from "@/lib/site";
import { GitHubIcon, LinkedInIcon, RssIcon, XIcon } from "@/components/Icons";

// Lightweight helper for `Object.hasOwn`-style access — the site config only
// includes the handles the lab actually uses, so `x`/`linkedin` may be absent.
type Social = typeof site.social & { x?: string; linkedin?: string };

const iconClass =
  "h-5 w-5 text-zinc-500 transition group-hover:text-indigo-500 dark:text-zinc-400 dark:group-hover:text-indigo-400";

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      aria-label={label}
      className="group -m-1 p-1"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

export function SocialLinks() {
  const social = site.social as Social;
  return (
    <div className="flex items-center gap-5">
      {social.github && (
        <SocialLink href={social.github} label="Follow on GitHub">
          <GitHubIcon className={iconClass} />
        </SocialLink>
      )}
      {social.x && (
        <SocialLink href={social.x} label="Follow on X">
          <XIcon className={iconClass} />
        </SocialLink>
      )}
      {social.linkedin && (
        <SocialLink href={social.linkedin} label="Follow on LinkedIn">
          <LinkedInIcon className={iconClass} />
        </SocialLink>
      )}
      {social.rss && (
        <SocialLink href={social.rss} label="Subscribe to the RSS feed">
          <RssIcon className={iconClass} />
        </SocialLink>
      )}
    </div>
  );
}

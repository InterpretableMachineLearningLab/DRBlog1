import { site } from "@/lib/site";
import { GitHubIcon, LinkedInIcon, RssIcon, XIcon } from "@/components/Icons";

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
  return (
    <div className="flex items-center gap-5">
      <SocialLink href={site.social.github} label="Follow on GitHub">
        <GitHubIcon className={iconClass} />
      </SocialLink>
      <SocialLink href={site.social.x} label="Follow on X">
        <XIcon className={iconClass} />
      </SocialLink>
      <SocialLink href={site.social.linkedin} label="Follow on LinkedIn">
        <LinkedInIcon className={iconClass} />
      </SocialLink>
      <SocialLink href={site.social.rss} label="Subscribe to the RSS feed">
        <RssIcon className={iconClass} />
      </SocialLink>
    </div>
  );
}

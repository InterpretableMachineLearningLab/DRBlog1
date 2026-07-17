---
title: "Static-first: why we export Next.js sites to plain HTML"
date: "2026-05-28"
excerpt: "Servers are a liability you rent by the month. For most content sites, `output: 'export'` turns Next.js into a build tool that emits the fastest, cheapest, most boring artifact on the web: files."
tags: ["nextjs", "engineering"]
---

There's a moment in every project where someone asks "where will this be hosted?" and the answers start accumulating costs: a Node server, a container, a database, monitoring for the container, alerts for the monitoring. For a blog. For a marketing site. For pages that change, at most, a few times a week.

Our default answer at Pixel & Oak is different: **nowhere**. Or more precisely — everywhere, as static files.

## What "static export" actually means

Next.js has a mode where the framework stops being a server and becomes a compiler. One line of configuration:

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true, // emit /articles/my-post/index.html
};

export default nextConfig;
```

Run `next build` and instead of a deployment that needs Node.js, you get an `out/` directory of HTML, CSS and JavaScript. Every route is pre-rendered at build time. Dynamic routes work too — you just enumerate them:

```ts
// app/articles/[slug]/page.tsx
export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}
```

The result deploys to anything that can serve a file: Cloudflare Pages, Netlify, GitHub Pages, an S3 bucket, a $4 shared host, a Raspberry Pi. This very blog template works exactly this way.

## The case for files

**Speed you don't have to engineer.** A static page's time-to-first-byte is however long it takes a CDN edge node to read a file from cache — routinely under 50ms worldwide. There is no render step to optimize, no database round-trip to cache, no cold start to warm. The fastest server code is the code that already ran, last Tuesday, on your build machine.

**Security you don't have to patch.** No running process means no process to exploit. There's no admin login to brute-force, no ORM to inject through, no dependency CVE that can be triggered at request time. Your attack surface is a web server serving files — a problem the industry solved decades ago.

**Costs that round to zero.** Static hosting is free at every major provider up to generous limits, and nearly free past them. More importantly, costs are *predictable*: a traffic spike from a viral post is a good day, not an infrastructure incident at 2 a.m.

**Longevity.** Files don't rot the way runtimes do. A static site built today will still deploy unchanged in five years, while a server app will have survived three Node LTS cycles and a framework migration. When we hand a site to a client, "it's just files" is a genuinely kind parting gift.

## What you give up (and what replaces it)

Static export disables the parts of Next.js that need a server, and it's worth being honest about them:

- **No API routes or server actions.** Forms post to a third-party endpoint or an edge function instead. Contact forms, newsletters and comments all have excellent hosted options.
- **No `next/image` optimization service.** Pre-optimize images at build time, or serve modern formats directly. (Nova sidesteps this entirely with generated gradient covers.)
- **No per-request personalization.** True — but content sites shouldn't be personalizing at the HTML layer anyway. Anything per-user can hydrate client-side after a fast static shell.
- **Rebuilds on every change.** Publishing means running a build. With builds under a minute and CI wired to your repo, "git push to publish" is a feature, not a chore.

If your product is an app — dashboards, auth, live data — use the server. That's what it's for. But be suspicious when a *content* site drags a runtime along. The dynamic tail shouldn't wag the static dog.

## The mindset shift

"Static-first" isn't nostalgia for the nineties web. It's a sequencing discipline: start from files, and add a server only when a requirement genuinely demands one — not because the framework's happy path assumes it. Most sites never hit that requirement. They just needed to be fast, cheap, secure and durable.

Files were always good at that.

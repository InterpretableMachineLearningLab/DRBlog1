---
title: "Designing dark mode that doesn't feel like an afterthought"
date: "2026-05-09"
excerpt: "Inverting colors is easy; designing a second theme is not. Notes on palettes, elevation, the flash-of-wrong-theme bug, and treating dark mode as a first-class design target."
tags: ["design", "css"]
---

You can spot a bolted-on dark mode instantly: pure black backgrounds, blinding pure-white text, brand colors that suddenly vibrate, shadows that have nowhere to fall. The site technically has a dark theme. It just doesn't have a dark *design*.

Here's what we've learned shipping dark modes that people actually leave on.

## Start with the right darks

Pure black (`#000`) is rarely the answer. Against it, white text creates the maximum possible contrast — which sounds virtuous but reads as harsh, with a halation effect that makes long text tiring. Almost every well-regarded dark UI settles on *very dark gray*, often with a subtle temperature. Nova uses Tailwind's zinc scale: `zinc-900` for the canvas, `zinc-800` for raised surfaces, `zinc-100` for primary text, `zinc-400` for secondary.

Two rules follow naturally:

- **Don't just invert.** Light mode's gray-100-on-white becomes muddy nonsense when flipped literally. Rebuild the hierarchy: in dark mode, *lighter means closer*. Raised cards get lighter backgrounds, not darker shadows — shadows barely read on dark canvases.
- **Desaturate and brighten accents.** A `500`-grade brand color that sings on white often buzzes on near-black. Shift one or two steps lighter: Nova's links are `indigo-600` in light mode and `indigo-400` in dark. Same hue, adjusted luminance, equal legibility.

## Respect the visitor's choice — all three of them

A visitor arrives with an OS preference, may then express a site-level preference, and expects both to be remembered. That's a tiny state machine:

1. No stored choice → follow `prefers-color-scheme`.
2. Explicit toggle → store it, and it wins from now on.
3. In CSS, key everything off a single class on `<html>`.

Tailwind's class strategy makes the CSS side one-dimensional. The delicate part is the first paint.

## Kill the flash of the wrong theme

The classic bug: the page renders light, then *snaps* dark once JavaScript loads. It happens because the theme decision was made after paint. The fix is a tiny inline script in `<head>` — before any stylesheet paints a pixel of the wrong theme:

```html
<script>
  (function () {
    try {
      var stored = localStorage.getItem("theme");
      var dark =
        stored === "dark" ||
        (stored !== "light" &&
          window.matchMedia("(prefers-color-scheme: dark)").matches);
      document.documentElement.classList.toggle("dark", dark);
    } catch (_) {}
  })();
</script>
```

Because it's inline and synchronous, the class is set before first paint. No flash, no `useEffect`, no hydration gymnastics. (If you're in React, put `suppressHydrationWarning` on `<html>` — the server can't know the visitor's choice, and that's fine.)

The toggle itself can then be refreshingly dumb:

```js
function toggleTheme() {
  const dark = document.documentElement.classList.toggle("dark");
  localStorage.setItem("theme", dark ? "dark" : "light");
}
```

## The details that separate "supported" from "designed"

- **Elevation via lightness.** Card: `zinc-800`. Popover above it: `zinc-700`ish. Reserve shadows for light mode; in dark mode use 1px rings (`ring-white/10`) to define edges.
- **Images and media.** Blinding white diagrams on a dark page feel like headlights. Where you control the asset, provide dark variants; where you don't, a slight `brightness(.9)` filter takes the edge off.
- **Code blocks can just stay dark.** Editors are dark; developers expect it. Nova renders code on `zinc-900` in *both* themes — one syntax palette, zero maintenance, and light mode gets a handsome contrast moment for free.
- **Meta polish.** Set `color-scheme: dark` so scrollbars and form controls match, and give mobile browsers a matching `theme-color`. These two lines do more for perceived quality than an hour of pixel-pushing.
- **Test with real content.** Long articles, tables, blockquotes, disabled buttons, focus rings. Dark mode bugs hide in the states you forgot you had.

## Afterthought is a schedule, not a skill

Teams don't ship bad dark modes because they can't design them — they ship bad ones because dark mode was scheduled last, after every color decision was already made. Flip the order: pick token pairs (light value, dark value) from day one, and dark mode stops being a feature. It's just your design system, photographed at night.

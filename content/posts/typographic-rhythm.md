---
title: "Finding Typographic Rhythm on the Web"
slug: "typographic-rhythm"
tags: ["typography", "design", "css"]
excerpt: "Line height, measure, and a modular scale are the quiet tools that make long-form reading feel effortless. Here is how I set them up from scratch."
publishedAt: "2026-04-28"
heroImage: "/images/posts/typographic-rhythm.png"
heroAlt: "Vintage letterpress metal type arranged in a wooden tray under warm light"
author: "maya-okafor"
---

Good typography is rarely noticed. When it works, readers simply keep reading. When it fails, they feel a vague friction they can't name, and they leave.

Rhythm is the most underrated part of that equation. It is the consistent spacing that lets the eye move down a page without stumbling.

## Start with the measure

The *measure* is the length of a line of text. Most research and centuries of print practice converge on roughly **45 to 75 characters** per line for comfortable reading.

On the web, the `ch` unit makes this trivial:

```css
.prose {
  max-width: 65ch;
}
```

That single declaration does more for readability than almost any font choice.

## Pick a line height, then respect it

Body text generally wants a line height between `1.5` and `1.7`. Headings want less — closer to `1.1` or `1.2` — because large type with generous leading looks disconnected.

> Leading should shrink as type size grows. Big type already has plenty of air.

Once you choose a base line height, derive your vertical spacing from it. If body text sits on a `1.75rem` rhythm, paragraph margins of `1.75rem` keep everything locked to the same invisible grid.

## Use a modular scale

Rather than picking heading sizes at random, multiply by a fixed ratio. A ratio of `1.25` (a *major third*) is a safe, versatile default:

| Step | Size     |
| ---- | -------- |
| 0    | 1rem     |
| 1    | 1.25rem  |
| 2    | 1.563rem |
| 3    | 1.953rem |
| 4    | 2.441rem |

The result is a hierarchy that feels intentional, because it is.

## Fluid type, carefully

`clamp()` lets type scale between viewport sizes without breakpoints:

```css
h1 {
  font-size: clamp(2rem, 1.2rem + 3vw, 3.5rem);
}
```

Always include a `rem` component in the preferred value so that user font-size preferences still apply. Pure `vw` units ignore zoom settings and quietly break accessibility.

## Checklist

- Limit line length to around 65 characters
- Keep body line height between 1.5 and 1.7
- Tighten heading line height
- Derive spacing from your base rhythm
- Use a consistent modular scale

None of these rules are new. That is the point: typographic rhythm is a solved problem, and the web finally has the tools to apply it well.

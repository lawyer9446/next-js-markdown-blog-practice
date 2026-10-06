---
title: "Design Systems Start With Tokens, Not Components"
slug: "design-systems"
tags: ["design", "process", "css"]
excerpt: "Before you build a single button, decide what your color, space, and type decisions are called. Naming is the real foundation of a design system."
publishedAt: "2026-02-24"
heroImage: "/images/posts/design-systems.png"
heroAlt: "Paint swatch cards and ceramic tiles arranged in a neat grid"
author: "maya-okafor"
---

It's tempting to kick off a design system by building a component library. Buttons, cards, modals — tangible things you can demo.

But components are downstream of decisions. If those decisions aren't named and shared, every component will quietly invent its own.

## What tokens are

Design tokens are named values for your visual decisions: colors, spacing, radii, typography, shadows, motion. They replace magic numbers with meaning.

```css
:root {
  --color-background: oklch(0.98 0.01 80);
  --color-foreground: oklch(0.22 0.02 50);
  --color-accent: oklch(0.58 0.14 40);
  --radius: 0.5rem;
}
```

## Name by role, not appearance

`--color-terracotta` tells you what a color looks like. `--color-accent` tells you what it's *for*. Role-based names survive rebrands, dark modes, and seasonal themes without a find-and-replace.

A useful pattern is two tiers:

- **Primitive tokens** — the raw palette (`--orange-500`)
- **Semantic tokens** — the roles that reference them (`--color-accent: var(--orange-500)`)

Components should only ever touch semantic tokens.

## Keep the palette small

Most interfaces need far fewer colors than designers expect. A background, a foreground, a muted tone, a border, and one accent will carry you a surprisingly long way. Every additional color is a decision someone has to make correctly, forever.

## Document the why

A token list is a dictionary. What teams really need is a style guide: *when* to use the accent, *why* spacing steps by eight, *which* combinations pass contrast. That context is what turns a set of variables into a shared language.

## Then build components

With tokens in place, components become assembly rather than invention. And when the brand inevitably evolves, you change a handful of values instead of hundreds of files.

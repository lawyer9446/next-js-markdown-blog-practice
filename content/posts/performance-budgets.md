---
title: "Performance Budgets That Teams Actually Keep"
slug: "performance-budgets"
tags: ["performance", "process", "nextjs"]
excerpt: "A budget nobody checks is just a wish. How to set realistic limits for JavaScript, images, and Core Web Vitals — and wire them into everyday work."
publishedAt: "2026-03-12"
heroImage: "/images/posts/performance-budgets.png"
heroAlt: "Vintage brass stopwatch beside a notebook with handwritten numbers"
author: "maya-okafor"
---

Every team agrees performance matters. Far fewer can tell you how much JavaScript their homepage ships today, or how that number changed last month.

A performance budget turns a vague value into a measurable constraint.

## Choose metrics users feel

Start with the Core Web Vitals, because they map directly to experience:

| Metric | What it measures         | Good target |
| ------ | ------------------------ | ----------- |
| LCP    | Loading of main content  | < 2.5s      |
| INP    | Responsiveness to input  | < 200ms     |
| CLS    | Visual stability         | < 0.1       |

Then add a few *resource* budgets that are easier to reason about during development, such as total JavaScript per route or the weight of the largest image.

## Set budgets from reality

Don't pick numbers from a blog post — including this one. Measure your current production site on a mid-range phone over a throttled connection. Set the budget slightly *below* today's numbers. The first goal is simply to stop getting worse.

## Make the budget visible

Budgets fail silently when they live in a document. They succeed when they show up where people already work:

1. Report bundle size changes on every pull request.
2. Fail CI when a route exceeds its JavaScript budget.
3. Review field data from real users weekly, not just lab scores.

## Common wins

- Serve responsive images with explicit dimensions to prevent layout shift.
- Keep heavy libraries in Server Components when possible.
- Lazy-load below-the-fold widgets.
- Audit third-party scripts quarterly. They are rarely as cheap as promised.

## Treat it like money

When a new feature needs to spend budget, that's a conversation, not a violation. Maybe it's worth it. Maybe something else can be cut. The budget's job is to make the trade-off explicit.

Speed isn't a project you finish. It's a habit you keep.

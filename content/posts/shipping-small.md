---
title: "The Case for Shipping Small"
slug: "shipping-small"
tags: ["process", "engineering", "writing"]
excerpt: "Big releases feel productive but hide risk. Small, frequent changes are easier to review, easier to roll back, and easier to explain."
publishedAt: "2026-01-08"
heroImage: "/images/posts/shipping-small.png"
heroAlt: "Small kraft paper parcels tied with twine stacked on a wooden shelf"
author: "maya-okafor"
---

There's a particular kind of dread that comes with a pull request touching forty files. Reviewers skim. Bugs slip through. And when something breaks in production, nobody is sure which of the forty changes caused it.

Shipping small is the antidote.

## Small changes are reviewable

A reviewer can genuinely understand a 50-line diff. At 500 lines, they're pattern-matching. At 5,000, they're approving on trust. The quality of review drops off a cliff as size grows.

## Small changes are reversible

When a tiny change misbehaves, reverting it is safe and boring. Reverting a large change often means reverting unrelated work along with it — or worse, attempting a risky partial rollback under pressure.

## How to slice work

- **Ship the data layer first**, behind no UI at all.
- **Use feature flags** to merge incomplete features safely.
- **Separate refactors from behavior changes.** Never do both in one PR.
- **Write the PR description first.** If it needs more than a paragraph, the change is probably too big.

## It's also a writing habit

Small changes force clearer communication. Each one needs a title and a reason. Over time, your commit history becomes a readable story of how the product evolved, rather than a series of "WIP" and "fix stuff."

> The best changelog is one you could read aloud.

## The compound effect

Teams that ship small ship more often. They get feedback sooner, catch problems earlier, and spend less time in merge conflicts. Nothing about it is glamorous. It just works.

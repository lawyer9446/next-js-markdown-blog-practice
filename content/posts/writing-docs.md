---
title: "Writing Documentation People Finish Reading"
slug: "writing-docs"
tags: ["writing", "process"]
excerpt: "Most docs fail not because they're wrong, but because they're exhausting. A few editorial habits that make technical writing clearer and kinder."
publishedAt: "2026-02-09"
heroImage: "/images/posts/writing-docs.png"
heroAlt: "Open notebook with a fountain pen and a cup of coffee on a wooden table"
author: "maya-okafor"
---

Documentation is a product. It has users, it has a job to do, and it can be measured by whether people succeed after reading it.

Here are the habits that have made the biggest difference in my own writing.

## Lead with the outcome

Readers arrive with a goal. Tell them, in the first sentence, whether they're in the right place:

> This guide shows you how to deploy a preview environment for every pull request.

Background and theory can come later — or in a separate page entirely.

## One idea per paragraph

Dense paragraphs hide information. Short ones expose it. If a paragraph covers two concepts, split it. If a sentence needs a semicolon, consider making it two sentences.

## Show, then tell

A working example is worth a page of explanation. Put the code first, then describe what it does:

```bash
npx create-next-app@latest my-blog --typescript
```

That command scaffolds a new project with TypeScript configured. Now the explanation has something concrete to point at.

## Use headings as a table of contents

Most readers scan before they read. Descriptive headings — *"Configure environment variables"* rather than *"Setup"* — let them jump straight to what they need. They also give screen reader users a fast way to navigate.

## Cut ruthlessly

After your first draft, delete:

- Words like *simply*, *just*, and *obviously*
- Sentences that restate the heading
- Caveats that apply to almost no one

What remains is usually clearer, and always shorter.

## Test it on someone

Hand your doc to a colleague who hasn't seen the feature. Watch where they pause. Those pauses are your next edits.

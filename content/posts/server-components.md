---
title: "A Mental Model for React Server Components"
slug: "server-components"
tags: ["react", "nextjs", "performance"]
excerpt: "Server Components aren't a rendering trick — they're a new boundary in your architecture. Thinking about them as layers makes everything click."
publishedAt: "2026-03-30"
heroImage: "/images/posts/server-components.png"
heroAlt: "Layered concrete stairs and walls with sharp light and shadow"
author: "maya-okafor"
---

When React Server Components first landed, most explanations focused on *what* they do. Fewer explained *how to think* about them. Here's the mental model that finally worked for me.

## Two layers, one tree

Imagine your component tree as a building. The **server layer** is the foundation: it reads databases, files, and secrets, and it never ships to the browser. The **client layer** is the furniture: interactive pieces that need state, effects, or event handlers.

Server Components can render Client Components. Client Components can *receive* Server Components as `children`, but cannot import them directly.

```tsx
// app/page.tsx — a Server Component
import { getPosts } from "@/lib/posts";
import { LikeButton } from "./like-button";

export default async function Page() {
  const posts = await getPosts();
  return posts.map((post) => (
    <article key={post.slug}>
      <h2>{post.title}</h2>
      <LikeButton slug={post.slug} />
    </article>
  ));
}
```

## Push interactivity to the leaves

The `"use client"` directive marks a boundary. Everything imported below it joins the client bundle. So the goal is to keep that boundary as low in the tree as possible.

> A button should be a Client Component. The page it lives on usually shouldn't be.

## Data flows down, once

Because Server Components run before the response is sent, they can fetch data directly — no `useEffect`, no loading spinners for the initial render, no client-side waterfalls.

That doesn't mean client-side fetching disappears. Live data, optimistic updates, and user-driven queries still belong on the client, ideally with a library like SWR.

## What you gain

- **Smaller bundles.** Markdown parsers, date libraries, and syntax highlighters can stay on the server.
- **Direct data access.** No API layer needed for read-only pages.
- **Streaming.** Slow sections can suspend while the rest of the page arrives.

## What to watch for

Props crossing the server–client boundary must be serializable. Functions, class instances, and dates need care. When you hit that wall, it's usually a sign the boundary is in the wrong place.

Once you see the tree as layers rather than a single runtime, the rules stop feeling arbitrary. They're just the shape of the building.

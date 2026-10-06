---
title: "Color Contrast Without the Guesswork"
slug: "color-contrast"
tags: ["accessibility", "design", "css"]
excerpt: "WCAG ratios, perceptual color spaces, and a repeatable process for building palettes that look good and stay readable for everyone."
publishedAt: "2026-01-22"
heroImage: "/images/posts/color-contrast.png"
heroAlt: "Overlapping translucent sheets of colored paper casting soft shadows"
author: "maya-okafor"
---

Low-contrast gray text is one of the most common accessibility failures on the web. It's also one of the easiest to prevent — once you have a process.

## Know the thresholds

WCAG 2 defines minimum contrast ratios between text and its background:

| Content                  | AA     | AAA    |
| ------------------------ | ------ | ------ |
| Body text                | 4.5:1  | 7:1    |
| Large text (24px+)       | 3:1    | 4.5:1  |
| UI components & icons    | 3:1    | —      |

These aren't aspirational. They're the floor.

## Work in a perceptual color space

Traditional HSL is misleading: a yellow and a blue with the same "lightness" value look wildly different to the human eye. **OKLCH** fixes this. Its lightness channel tracks how bright a color actually appears.

```css
--muted-foreground: oklch(0.5 0.02 50);
```

In OKLCH, you can adjust hue and chroma freely while keeping lightness — and therefore contrast — predictable.

## A repeatable process

1. Choose your background lightness first.
2. Set body text at least 0.5 lightness units away.
3. Derive muted and secondary text from the body color, checking each against 4.5:1.
4. Only then pick an accent, and test it on both background and foreground.

## Don't rely on color alone

Links should be underlined or otherwise distinguished. Error states need text or icons, not just red. Charts need patterns or labels. Roughly one in twelve men has some form of color vision deficiency.

## Test continuously

Browser dev tools show contrast ratios directly in the color picker. Run them every time a color changes. A palette that passed last quarter can drift after a single "small tweak."

Contrast is a constraint, but a generous one. Within it, there's still plenty of room for a palette with real personality.

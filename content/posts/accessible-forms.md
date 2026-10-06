---
title: "Accessible Forms Are Just Good Forms"
slug: "accessible-forms"
tags: ["accessibility", "design", "react"]
excerpt: "Labels, error messages, and focus management aren't extra polish. They are the form. A practical walkthrough of building inputs everyone can use."
publishedAt: "2026-04-14"
heroImage: "/images/posts/accessible-forms.png"
heroAlt: "Paper index cards with sketched form fields beside a pencil and ruler"
author: "maya-okafor"
---

Forms are where users stop browsing and start trusting you with something. A name, an email, a payment. If that moment is confusing, nothing else about the product matters.

The good news: nearly every accessibility improvement to a form is also a usability improvement for everyone.

## Every input needs a real label

Placeholder text is not a label. It disappears the moment someone starts typing, it often fails contrast requirements, and some assistive technologies skip it entirely.

```tsx
<label htmlFor="email">Email address</label>
<input id="email" name="email" type="email" autoComplete="email" />
```

Connecting `htmlFor` to `id` also makes the label clickable, which enlarges the hit area on touch devices for free.

## Describe errors, don't just color them

A red border tells a sighted user *something* is wrong. It tells a screen reader user nothing.

```tsx
<input
  id="email"
  aria-invalid={Boolean(error)}
  aria-describedby={error ? "email-error" : undefined}
/>
{error && (
  <p id="email-error" role="alert">
    {error}
  </p>
)}
```

Write error messages that explain how to fix the problem: *"Enter an email like name@example.com"* beats *"Invalid input"* every time.

## Group related fields

Radio buttons and checkboxes that answer a single question belong in a `fieldset` with a `legend`. The legend is announced as context for every option inside it.

## Respect the keyboard

1. Tab order should follow visual order.
2. Focus indicators must be clearly visible.
3. After submission fails, move focus to an error summary or the first invalid field.
4. Never trap focus unless you are inside a modal dialog.

## Use the right input types

`type="email"`, `type="tel"`, and `inputMode="numeric"` summon the right keyboard on mobile. `autoComplete` attributes let browsers and password managers fill fields correctly. These are tiny attributes with enormous impact.

## Test with real tools

Turn on VoiceOver or NVDA and fill out your own form with your eyes closed. Then do it with only a keyboard. You will find issues in minutes that no linter would ever catch.

Accessible forms are not a separate category of work. They are simply forms that were finished properly.

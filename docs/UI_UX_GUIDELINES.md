# UI / UX Guidelines

> Version: 1.0
>
> Status: Official Design Documentation
>
> Applies To:
>
> - Frontend Engineers
> - Designers
> - AI Coding Agents
>
> Last Updated:
>
> July 2026

---

# Purpose

This document defines the visual language, interaction principles, and user experience standards for TM-Management.

Every interface should feel modern, professional, and intuitive.

Our inspiration comes from products such as:

- Linear
- Notion
- GitHub
- Vercel
- Stripe
- Jira
- Slack

The goal is not to copy them, but to match their level of polish.

---

# Core Design Principles

The interface should be:

- Clean
- Spacious
- Fast
- Accessible
- Consistent
- Predictable
- Minimal
- Professional

Avoid unnecessary decoration.

Every element must have a purpose.

---

# Visual Hierarchy

Every screen should clearly communicate:

1. Primary action
2. Secondary actions
3. Supporting information
4. Metadata

Users should know where to look within three seconds.

---

# Layout

Use generous spacing.

Preferred maximum width:

```
max-w-7xl
```

Standard page padding:

```
px-6

lg:px-8
```

Maintain consistent vertical rhythm.

---

# Typography

Use hierarchy instead of excessive colors.

Example

Page Title

```
text-4xl
font-bold
```

Section Heading

```
text-2xl
font-semibold
```

Card Title

```
text-lg
font-semibold
```

Body

```
text-base
```

Caption

```
text-sm
text-muted-foreground
```

Never use more than three font sizes in one card.

---

# Color System

Primary

Cyan

Secondary

Neutral

Accent

Used sparingly

Success

Green

Warning

Amber

Danger

Red

Never introduce random colors.

Always use theme tokens.

---

# Components

Prefer reusable components.

Never duplicate button implementations.

Every screen should use:

- Button
- Card
- Input
- Badge
- Dialog
- Dropdown
- Avatar
- Tabs

from the shared design system.

---

# Cards

Cards should have

Rounded corners

Soft borders

Subtle hover

Comfortable padding

Avoid heavy shadows.

---

# Buttons

Primary

Main action

Secondary

Supporting action

Ghost

Navigation

Danger

Destructive actions only

Avoid multiple primary buttons beside each other.

---

# Forms

Every form must include

Labels

Descriptions

Validation

Loading states

Error messages

Disabled states

Success feedback

Never rely solely on placeholders.

---

# Empty States

Never leave empty pages.

Include

Illustration or icon

Title

Description

Action button

Example

"No projects yet"

Create Project

---

# Loading States

Prefer Skeletons.

Avoid full-page spinners whenever possible.

Every async action should communicate progress.

---

# Error States

Explain

What happened

Why

How to recover

Avoid technical jargon.

---

# Animations

Animations should feel natural.

Preferred duration

150–300ms

Use

Fade

Slide

Scale

Opacity

Avoid

Bounce

Flash

Long animations

---

# Framer Motion

Use for

Page transitions

Cards

Dialogs

Hero animations

Reveal effects

Do not animate everything.

Motion should support usability.

---

# Hover States

Every interactive element should provide feedback.

Buttons

Cards

Navigation

Dropdown items

Links

---

# Dashboard Design

Dashboards should communicate information quickly.

Use

Cards

Charts

Lists

Badges

Status indicators

Avoid clutter.

---

# Tables

Tables should include

Hover state

Alternating readability

Sorting

Search

Pagination

Responsive overflow

---

# Icons

Use Lucide React.

Icons should

Support labels

Not replace labels

Be consistent in size

Standard

```
size-4

size-5
```

---

# Mobile Experience

Design mobile first.

Navigation

Drawer

Bottom spacing

Touch targets

Responsive layouts

Every page should work well below 768px.

---

# Accessibility

Minimum touch size

44x44

Keyboard navigation

Required

ARIA labels

Required

Visible focus states

Required

Contrast

WCAG AA minimum

---

# Performance

Prefer

CSS animations

GPU transforms

Lazy loading

Avoid

Layout thrashing

Heavy animations

Large unnecessary images

---

# User Experience Principles

Users should always know

Where they are

What they can do

What just happened

What happens next

---

# AI Agent Rules

AI-generated UI must

Use existing components

Respect spacing

Respect typography

Follow color tokens

Avoid unnecessary animations

Match surrounding UI

Be responsive

Be accessible

Never introduce new visual patterns without approval.

---

# Final Principle

Every screen should feel like it belongs to the same product.

Consistency creates trust.

Users should never notice the interface—they should notice how easy it is to accomplish their work.

# Design System

> Version: 1.0
>
> Status: Official Engineering Documentation
>
> Applies To:
>
> - Frontend Engineers
> - UI/UX Designers
> - AI Coding Agents
>
> Last Updated:
>
> July 2026

---

# Purpose

This document defines the visual language of TM-Management.

Every interface in the application must follow this design system to ensure:

- Consistency
- Accessibility
- Scalability
- Professional appearance
- Excellent user experience

This document is the single source of truth for UI design.

---

# Design Philosophy

TM-Management follows a modern SaaS aesthetic inspired by:

- Linear
- Notion
- Vercel
- Stripe
- GitHub
- Raycast

Core principles:

- Minimal
- Clean
- Fast
- Spacious
- Consistent
- Accessible

Users should immediately feel that the application is premium.

---

# Design Principles

## 1. Consistency

The same interaction should always look and behave the same.

Examples:

- Primary buttons are always cyan.
- Cards always share the same radius.
- Inputs always have identical spacing.
- Animations follow the same timing.

---

## 2. Simplicity

Remove unnecessary elements.

Every component should have a purpose.

Avoid visual clutter.

---

## 3. Visual Hierarchy

Guide the user's attention.

Priority order:

1. Headings
2. Primary actions
3. Supporting information
4. Secondary actions
5. Decorative elements

---

## 4. Accessibility

Every interface must support:

- Keyboard navigation
- Focus indicators
- Proper color contrast
- Screen readers
- Reduced motion preferences

Accessibility is not optional.

---

# Brand Identity

## Primary Brand Color

Cyan

```css
#22D3EE
```

Used for:

- Primary buttons
- Active navigation
- Links
- Icons
- Focus rings
- Dashboard highlights

---

## Hover

```css
#06B6D4
```

---

## Active

```css
#0891B2
```

---

## Glow

```css
rgba(34,211,238,.30)
```

Used for:

- Hero glow
- Dashboard glow
- Shadows
- Accent lighting

---

# Semantic Colors

## Success

```css
#22C55E
```

---

## Warning

```css
#F59E0B
```

---

## Error

```css
#EF4444
```

---

## Information

```css
#3B82F6
```

---

# Typography

## Font

Use the project font defined in `globals.css`.

Never introduce additional fonts without approval.

---

## Heading Scale

H1

```
text-5xl
font-bold
```

Hero titles only.

---

H2

```
text-4xl
font-bold
```

Major sections.

---

H3

```
text-2xl
font-semibold
```

Cards and subsections.

---

Body

```
text-base
leading-7
```

---

Small Text

```
text-sm
text-muted-foreground
```

---

# Spacing

Prefer generous whitespace.

Recommended spacing scale:

```
2

4

6

8

12

16

20

24
```

Avoid arbitrary values unless necessary.

---

# Border Radius

Standard

```
rounded-lg
```

Cards

```
rounded-xl
```

Dialogs

```
rounded-2xl
```

Do not mix radius sizes randomly.

---

# Shadows

Use soft shadows.

Examples

```
shadow-sm

shadow-md

shadow-lg
```

Glow effects should only use the brand glow utility.

---

# Layout

Maximum content width

```
max-w-7xl
```

Sections

```
py-20
```

Containers

```
mx-auto

px-6
```

---

# Cards

Cards should:

- Use the card color token.
- Include consistent padding.
- Use subtle borders.
- Lift slightly on hover.

Example

```
rounded-xl

border

bg-card

shadow-sm
```

---

# Buttons

Primary

- Cyan background
- White text
- Soft hover
- Rounded corners

Secondary

- Neutral background
- Primary text

Ghost

- Transparent
- Hover background only

Danger

- Red

Never invent new button styles.

---

# Inputs

Every input should include:

- Label
- Placeholder
- Validation message
- Focus ring
- Accessible name

Use the shared Input component.

---

# Icons

Use:

Lucide React

Guidelines

- 16px for inline actions
- 20px for standard controls
- 24px for feature highlights

Icons should support the current theme.

---

# Animations

Animations should feel natural.

Allowed

Fade

Slide

Scale

Float

Hover lift

Page transitions

Preferred duration

```
200ms–350ms
```

Avoid long or distracting animations.

---

# Motion Library

Use:

Framer Motion

Do not mix multiple animation libraries.

---

# Hero Section

Every hero should include:

- Large headline
- Supporting description
- Primary CTA
- Secondary CTA
- Dashboard preview
- Background glow
- Decorative blur
- Trust indicators

The hero should communicate value within five seconds.

---

# Dashboard Style

Dashboard previews should include:

- Statistics
- Tasks
- Team activity
- Cards
- Charts
- Soft shadows
- Floating animation
- Cyan accent glow

Avoid placeholder text such as:

```
Coming Soon
```

Instead, create realistic UI mockups.

---

# Theme Support

Every component must support:

Light Mode

Dark Mode

Never hardcode colors.

Always use design tokens.

Examples

```
bg-card

bg-background

text-foreground

border-border

text-muted-foreground
```

---

# Hover States

Interactive elements must provide feedback.

Buttons

Lift slightly.

Cards

Translate upward slightly.

Links

Color transition.

Navigation

Underline or highlight.

---

# Empty States

Never leave blank pages.

Every empty state should include:

- Icon
- Title
- Description
- Primary action

Example

```
No projects yet.

Create your first project.
```

---

# Loading States

Prefer:

- Skeleton loaders
- Progress indicators
- Spinners only when necessary

Avoid flashing layouts.

---

# Responsive Design

Every page must support:

Mobile

Tablet

Laptop

Desktop

Use mobile-first development.

---

# Component Styling Rules

Always:

- Use Tailwind utilities.
- Use design tokens.
- Reuse components.
- Respect spacing scale.

Never:

- Hardcode colors.
- Duplicate styles.
- Create inconsistent variants.

---

# AI Agent Rules

AI agents must:

- Follow this design system before generating UI.
- Reuse existing UI components.
- Use the defined color palette.
- Respect spacing and typography scales.
- Prefer consistency over creativity.
- Support both themes.
- Use Framer Motion for complex animations.
- Never invent new visual patterns without updating this document.

---

# Design Review Checklist

Before merging a UI change:

- Uses design tokens
- Responsive
- Accessible
- Supports dark mode
- Consistent spacing
- Correct typography
- Proper hover states
- Smooth animations
- Uses shared components
- No hardcoded colors

---

# Final Principle

Every screen in TM-Management should feel like it belongs to the same product.

If a user navigates from the landing page to authentication, from authentication to the dashboard, and from the dashboard to project management, the experience should feel seamless.

Consistency builds trust.

Every pixel should have a purpose.

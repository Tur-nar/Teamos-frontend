# Code Style Guide

> Version: 1.0
>
> Status: Official Coding Standard
>
> Applies To:
>
> - Frontend Engineers
> - Backend Engineers contributing to the frontend
> - AI Coding Agents
>
> Last Updated:
>
> July 2026

---

# Purpose

This document defines the official coding standards for the TM-Management frontend.

Its goals are to:

- Ensure consistency across the codebase
- Improve readability
- Reduce bugs
- Simplify code reviews
- Help AI agents generate production-quality code
- Make the project easy to maintain as it grows

Every contributor should follow these conventions.

---

# Core Philosophy

The project values:

✅ Readability

✅ Simplicity

✅ Consistency

✅ Reusability

✅ Type Safety

Not:

❌ Clever code

❌ One-liners that are hard to read

❌ Premature optimization

❌ Unnecessary abstractions

Always optimize for the next developer who reads the code.

---

# General Principles

## 1. Write Code for Humans

Good code is understood before it is executed.

Ask yourself:

> "Will another engineer understand this six months from now?"

If not, rewrite it.

---

## 2. One Responsibility Per File

A file should solve one problem.

Examples

Good

```
Button.tsx

ThemeToggle.tsx

Navbar.tsx

project.service.ts
```

Bad

```
helpers.ts

utils.ts

common.ts
```

filled with unrelated logic.

---

## 3. Small Components

Components should remain small.

Preferred

```
50–150 lines
```

Avoid

```
400-line components
```

Split into reusable pieces.

---

# Naming Conventions

## Components

PascalCase

```
Navbar

Hero

ProjectCard

ThemeToggle
```

---

## Hooks

Always begin with

```
use
```

Examples

```
useAuth

useProjects

useMounted
```

---

## Providers

PascalCase ending in Provider

```
ThemeProvider

QueryProvider

OrganizationProvider
```

---

## Services

Lowercase

```
auth.service.ts

project.service.ts

task.service.ts
```

---

## Types

PascalCase

```
User

Project

Task

Organization
```

---

## Constants

UPPER_SNAKE_CASE

```
MAX_UPLOAD_SIZE

DEFAULT_PAGE_SIZE

API_TIMEOUT
```

---

## Variables

camelCase

```
currentUser

activeProject

dashboardStats
```

---

## Functions

Use verbs.

Good

```
createTask()

deleteProject()

updateProfile()

fetchDashboard()
```

Bad

```
task()

project()

profile()
```

---

# File Naming

Use

```
kebab-case
```

Examples

```
theme-toggle.tsx

auth-header.tsx

dashboard-card.tsx

project.service.ts
```

---

# Import Order

Always group imports.

Example

```ts
// React / Next
import Link from "next/link";

// Third-party
import { useQuery } from "@tanstack/react-query";

// Internal
import { Button } from "@/components/ui/button";
import { getProjects } from "@/services/project.service";
```

Never mix import groups randomly.

---

# Component Structure

Preferred order

```tsx
Imports

↓

Types

↓

Constants

↓

Component

↓

Hooks

↓

Handlers

↓

Return JSX
```

---

# Props

Always type props.

Good

```tsx
type ButtonProps = {
  children: React.ReactNode;
};
```

Bad

```tsx
(props: any)
```

---

# TypeScript Rules

Never use

```
any
```

Prefer

```
unknown

Record<>

Generics

Interfaces

Types
```

---

Always infer when possible.

Bad

```tsx
const name: string = "Solomon";
```

Good

```tsx
const name = "Solomon";
```

---

# Functions

Keep functions focused.

Good

```tsx
createProject();
```

Bad

```
createProjectAndSendEmailAndRefreshDashboard()
```

Split responsibilities.

---

# Components

Components should

- receive props
- render UI

Components should not

- call axios
- contain business logic
- manipulate global state

---

# State Management

Use

```
useState
```

for

- toggles
- modals
- dropdowns
- local UI

Use

TanStack Query

for

- API data
- server state

Never duplicate server data inside useState.

---

# Styling

Always prefer

Tailwind utility classes.

Avoid

```
style={{}}
```

unless absolutely necessary.

---

Use design tokens.

Good

```
bg-primary

text-muted-foreground

border-border
```

Bad

```
text-[#22d3ee]

bg-[#ffffff]
```

Hardcoded colors are discouraged.

---

# Class Names

Group logically.

Example

```tsx
className="
flex
items-center
justify-between
rounded-lg
border
bg-card
p-6
shadow-sm
"
```

Avoid unreadable one-line class strings when they become excessively long.

---

# Comments

Only comment

WHY

not

WHAT.

Bad

```tsx
// increment count

count++;
```

Good

```tsx
// Prevent duplicate submissions while request is pending.
```

---

# Error Handling

Never ignore errors.

Bad

```tsx
catch {}
```

Good

```tsx
catch (error) {
    console.error(error);
}
```

Eventually

Show user feedback.

---

# Console Logs

Allowed

Development

Forbidden

Production

Remove temporary debugging logs before merging.

---

# Magic Numbers

Avoid

```
padding: 17

limit = 73
```

Create constants.

---

# Reuse Before Creating

Before creating

- Button
- Card
- Modal
- Dialog
- Badge
- Avatar

Search the project first.

Never duplicate components.

---

# Performance

Avoid unnecessary renders.

Prefer

- memoization when justified
- lazy loading
- dynamic imports
- reusable hooks

Optimize only after identifying a real need.

---

# Accessibility

Every interactive element should support

- keyboard navigation
- focus states
- semantic HTML
- accessible labels

Buttons should always be buttons.

Links should always be links.

---

# Formatting

Use

Prettier

Do not manually fight the formatter.

---

# AI Coding Rules

Before generating code:

1. Search for an existing component.
2. Search for an existing service.
3. Search for an existing hook.
4. Reuse before creating.
5. Follow the existing folder structure.
6. Use existing design tokens.
7. Respect naming conventions.
8. Never introduce new architectural patterns without justification.

---

# Code Review Checklist

Before opening a Pull Request, verify:

- Code compiles.
- TypeScript has no errors.
- No unnecessary comments.
- No duplicated logic.
- Components are reusable.
- Types are defined.
- Hardcoded colors are avoided.
- Design system is respected.
- API calls are not inside components.
- Code is readable.

---

# Golden Rules

1. Readability over cleverness.
2. Simplicity over complexity.
3. Reuse over duplication.
4. Types over `any`.
5. Components render.
6. Hooks manage state.
7. Services communicate with APIs.
8. Providers manage global context.
9. Architecture is never bypassed.
10. Write code you would be proud to review.

---

# Final Principle

Every line of code added to TM-Management should make the project easier—not harder—to understand.

Good code is not measured by how impressive it looks.

Good code is measured by how confidently another engineer—or AI agent—can maintain it.

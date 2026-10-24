# Engineering Rules

> Version: 1.0
>
> Status: Official Engineering Documentation
>
> Applies To:
>
> - Frontend Engineers
> - Backend Engineers
> - Designers
> - QA Engineers
> - AI Coding Agents
>
> Last Updated:
>
> July 2026

---

# Purpose

This document defines the engineering principles and non-negotiable rules that govern the TM-Management codebase.

Every contributor must follow these rules before writing code.

These rules exist to ensure:

- Scalability
- Maintainability
- Consistency
- Reliability
- Professional engineering standards

If any documentation conflicts with these rules, **ENGINEERING_RULES.md takes precedence** unless explicitly stated otherwise.

---

# Core Engineering Philosophy

We optimize for:

- Readability
- Maintainability
- Simplicity
- Reusability
- Scalability
- Accessibility
- Performance

We **do not** optimize for writing the fewest lines of code.

The best code is code that another engineer can understand six months later.

---

# The Golden Rule

> Every line of code should make the project easier to maintain, not harder.

If a solution makes the codebase more complex without a clear benefit, it should not be merged.

---

# Rule 1 — Architecture First

Never write code before understanding the architecture.

Every feature must fit into the existing system.

Read:

- ARCHITECTURE.md
- DECISIONS.md

before implementing anything significant.

---

# Rule 2 — Never Duplicate Logic

Duplicate code is technical debt.

Before creating:

- a component
- a hook
- a utility
- a service
- a helper

Search the project.

If something similar already exists, extend or reuse it.

---

# Rule 3 — Components Must Stay Small

A component should have one responsibility.

If a file becomes difficult to understand, split it.

Prefer:

```
Dashboard

├── StatsCard
├── ActivityCard
├── TeamCard
└── CalendarCard
```

instead of one 800-line component.

---

# Rule 4 — Business Logic Does Not Belong in UI

UI components render.

They should not:

- perform API requests
- transform backend data
- contain authentication logic
- perform business calculations

Correct flow:

```
Component

↓

Hook

↓

Service

↓

API

↓

Backend
```

---

# Rule 5 — Single Source of Truth

There should only be one source of truth for any piece of information.

Examples

Authentication

→ Better Auth

Server Data

→ TanStack Query

Form State

→ React Hook Form

Theme

→ Theme Provider

Avoid duplicated state.

---

# Rule 6 — Prefer Composition Over Inheritance

Build interfaces by composing smaller components.

Good

```
<Card>

<CardHeader>

<CardContent>

<CardFooter>
```

Avoid monolithic components with many unrelated responsibilities.

---

# Rule 7 — Reuse Before Creating

Before writing new code ask:

Can I reuse:

- Button?
- Card?
- Input?
- Existing hook?
- Existing service?
- Existing utility?

Reuse first.

Create second.

---

# Rule 8 — Every Feature Must Be Responsive

Every screen must support:

- Mobile
- Tablet
- Laptop
- Desktop

Responsive design is required—not optional.

---

# Rule 9 — Accessibility Is Mandatory

Every interface must support:

- Keyboard navigation
- Screen readers
- Focus indicators
- Semantic HTML
- Color contrast

Accessibility is part of quality.

---

# Rule 10 — Performance Matters

Always consider:

- unnecessary renders
- unnecessary API requests
- unnecessary bundle size
- unnecessary state

Optimize only when needed, but never ignore obvious inefficiencies.

---

# Rule 11 — Strong Typing

Use TypeScript properly.

Never bypass the type system using:

```
any
```

unless there is a documented reason.

Prefer:

- interfaces
- type aliases
- generics
- inferred types

---

# Rule 12 — No Magic Values

Avoid unexplained numbers or strings.

Bad

```ts
if (status === 7)
```

Good

```ts
if (status === TaskStatus.Completed)
```

Constants should be named.

---

# Rule 13 — Design Tokens Only

Never hardcode:

Colors

Spacing

Radius

Typography

Always use the project's design tokens.

---

# Rule 14 — One Pattern Per Problem

Do not solve the same problem in multiple ways.

Example

If authentication uses Better Auth:

Do not introduce another authentication library.

If forms use React Hook Form:

Do not introduce Formik.

Consistency is more valuable than preference.

---

# Rule 15 — Documentation Is Part of the Feature

A feature is not complete until:

- documentation is updated
- roadmap is updated (if necessary)
- changelog is updated (when appropriate)

Code without documentation is incomplete.

---

# Rule 16 — Naming Matters

Names should explain intent.

Good

```
CreateOrganizationForm
```

Bad

```
Form2
```

Good

```
fetchProjects()
```

Bad

```
run()
```

---

# Rule 17 — Comments Explain Why

Avoid comments that explain obvious code.

Bad

```ts
// Increment count

count++;
```

Good

```ts
// Backend sends archived projects as active.
// Temporary workaround until API v2.
```

Comments should explain intent, not syntax.

---

# Rule 18 — Every Screen Should Feel Premium

TM-Management aims for a professional SaaS experience.

Every page should include:

- proper spacing
- smooth transitions
- loading states
- empty states
- hover feedback
- polished animations

Users should feel quality immediately.

---

# Rule 19 — Error Handling Is Required

Never ignore failures.

Every async operation should handle:

- loading
- success
- error

Provide meaningful feedback to the user.

---

# Rule 20 — Build for Scale

Always ask:

Will this still work when:

- 10 users become 10,000?
- 5 components become 500?
- 1 organization becomes 5,000?

Design with growth in mind.

---

# AI Agent Rules

Before generating code, an AI agent must:

1. Read the documentation.
2. Respect the architecture.
3. Reuse existing components.
4. Follow naming conventions.
5. Preserve design consistency.
6. Never invent APIs.
7. Never duplicate logic.
8. Never hardcode colors.
9. Keep commits focused.
10. Update documentation when required.

If unsure, the AI should ask for clarification instead of making assumptions.

---

# Engineering Checklist

Before submitting any work, verify:

- Architecture respected
- No duplicated code
- Strong typing used
- Responsive layout
- Accessible UI
- Design tokens used
- Existing components reused
- Error handling implemented
- Documentation updated
- Lint passes
- Build passes
- Tests pass (when applicable)

---

# Definition of Done

A task is complete only when:

- Functionality works
- Code follows project standards
- UI matches the design system
- Responsive behavior is verified
- Accessibility is considered
- Documentation is updated
- No lint errors remain
- Production build succeeds
- Code review feedback is addressed

Until then, the feature is considered **in progress**.

---

# Final Principle

TM-Management is not just a software project.

It is an engineering project.

Every contributor—human or AI—is responsible for leaving the codebase cleaner, more understandable, and more maintainable than they found it.

> **"Always leave the campsite cleaner than you found it."**

That is the engineering standard for TM-Management.

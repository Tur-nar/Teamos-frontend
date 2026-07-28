# Engineering Decisions (ADR)

> Version: 1.0
>
> Status: Official Engineering Documentation
>
> Applies To:
>
> - Frontend Engineers
> - Backend Engineers
> - Designers
> - AI Coding Agents
>
> Last Updated:
>
> July 2026

---

# Purpose

This document records important engineering and architectural decisions made during the development of TM-Management.

Unlike the changelog, this document answers:

> **Why did we make this decision?**

It provides historical context for future contributors and AI agents.

Every significant architectural or technical decision should be recorded here.

---

# Why This Document Exists

As software grows, people forget why certain technologies, patterns, or architectures were chosen.

Months later, developers begin asking questions like:

- Why are we using TanStack Query?
- Why did we choose Better Auth?
- Why is Axios wrapped inside services?
- Why is the dashboard component structured this way?

Instead of guessing, contributors should consult this document.

---

# Decision Record Format

Every decision must follow the template below.

```text
## ADR-XXX — Decision Title

Date:
YYYY-MM-DD

Status:
Accepted | Proposed | Deprecated | Replaced

Context

What problem existed?

Decision

What was chosen?

Reasoning

Why was this solution selected?

Alternatives Considered

What other options were evaluated?

Consequences

Positive outcomes

Trade-offs

References

Links to documentation or related files.
```

---

# ADR-001 — Next.js App Router

**Date**

2026-07

**Status**

Accepted

## Context

TM-Management requires a modern React framework capable of supporting:

- Server Components
- Nested layouts
- Route groups
- Streaming
- Production optimization
- Long-term scalability

## Decision

Use **Next.js App Router**.

## Reasoning

App Router provides:

- Modern React architecture
- Better layout composition
- Improved performance
- Server rendering
- Excellent developer experience

## Alternatives Considered

- React Router
- Remix
- Astro

## Consequences

Positive

- Cleaner routing
- Better scalability
- Easier layouts

Trade-offs

- Learning curve
- More framework conventions

---

# ADR-002 — TypeScript Everywhere

**Date**

2026-07

**Status**

Accepted

## Context

Large projects become difficult to maintain without strong typing.

## Decision

Use TypeScript throughout the frontend.

## Reasoning

Benefits include:

- Static analysis
- Better autocomplete
- Safer refactoring
- Improved AI assistance
- Fewer runtime errors

## Alternatives

- JavaScript

## Consequences

Positive

- Better maintainability
- Improved tooling

Trade-offs

- Additional type definitions

---

# ADR-003 — shadcn/ui

**Date**

2026-07

**Status**

Accepted

## Context

TM-Management needs a flexible component system.

## Decision

Adopt shadcn/ui as the UI foundation.

## Reasoning

shadcn/ui offers:

- Full source ownership
- Accessibility
- Tailwind integration
- Easy customization
- No runtime dependency

## Alternatives

- Material UI
- Chakra UI
- Ant Design

## Consequences

Positive

- Highly customizable
- Lightweight
- Consistent design system

Trade-offs

- Components must be maintained within the project

---

# ADR-004 — Tailwind CSS

**Date**

2026-07

**Status**

Accepted

## Decision

Use Tailwind CSS for styling.

## Reasoning

- Utility-first workflow
- Consistent design tokens
- Excellent performance
- Rapid UI development

---

# ADR-005 — Better Auth

**Date**

2026-07

**Status**

Accepted

## Context

Authentication is central to TM-Management.

## Decision

Use Better Auth for authentication.

## Reasoning

- Modern authentication
- Session management
- Organization support
- Strong TypeScript integration

## Alternatives

- NextAuth
- Clerk
- Auth0

---

# ADR-006 — TanStack Query

**Date**

2026-07

**Status**

Accepted

## Context

Server state must be managed efficiently.

## Decision

Use TanStack Query.

## Reasoning

Provides:

- Caching
- Automatic refetching
- Optimistic updates
- Request deduplication
- Background synchronization

## Alternatives

- SWR
- Redux Toolkit Query
- Custom hooks

---

# ADR-007 — React Hook Form + Zod

**Date**

2026-07

**Status**

Accepted

## Decision

Use React Hook Form with Zod.

## Reasoning

- Excellent performance
- Type-safe validation
- Minimal re-renders
- Great developer experience

---

# ADR-008 — Service Layer

**Date**

2026-07

**Status**

Accepted

## Context

Components should not communicate directly with APIs.

## Decision

All API communication goes through a dedicated service layer.

Architecture

```
UI

↓

Hook

↓

Service

↓

API Client

↓

Backend
```

## Reasoning

- Separation of concerns
- Easier testing
- Reusable API logic
- Cleaner components

---

# ADR-009 — Multi-Tenant Architecture

**Date**

2026-07

**Status**

Accepted

## Decision

Every authenticated user belongs to an organization.

Organizations own:

- Projects
- Tasks
- Members
- Teams
- Permissions

## Reasoning

Supports SaaS use cases and future scalability.

---

# ADR-010 — Design Tokens

**Date**

2026-07

**Status**

Accepted

## Decision

Use CSS variables as the single source of truth for colors, spacing, and theming.

## Reasoning

- Easy light/dark mode
- Consistency
- Better maintainability
- Simplified design updates

---

# Recording New Decisions

Record a new ADR when introducing:

- A new library
- A major architectural change
- A new state management strategy
- A deployment approach
- A testing framework
- A design system change
- A security decision
- A significant performance optimization

Do not create ADRs for small bug fixes or routine implementation details.

---

# Deprecating Decisions

If a previous decision is no longer valid:

1. Do **not** delete the original ADR.
2. Mark its status as **Deprecated** or **Replaced**.
3. Add a new ADR explaining the replacement.
4. Link the new ADR to the old one.

This preserves the project's engineering history.

---

# AI Agent Rules

Before introducing a new technology or architectural pattern, AI agents must:

1. Review existing ADRs.
2. Reuse established decisions where appropriate.
3. Avoid conflicting patterns.
4. Create a new ADR when recommending a major architectural change.
5. Explain the reasoning behind any proposed decision.

AI agents must treat this document as the authoritative source for architectural decisions.

---

# Engineering Principle

Code explains **how** something works.

Documentation explains **what** it does.

Architecture Decision Records explain **why** it exists.

The "why" is often the most valuable knowledge in a long-lived software project.

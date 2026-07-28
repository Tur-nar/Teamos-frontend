# AGENTS.md

> **TM-Management Frontend — AI Engineering Guide**
>
> Version: 2.0
>
> Status: Official AI Engineering Documentation
>
> Applies To:
>
> - ChatGPT
> - Claude
> - Gemini
> - Cursor
> - Windsurf
> - Cline
> - Roo Code
> - GitHub Copilot
> - Any future AI coding assistant
>
> Last Updated:
>
> July 2026

---

# Purpose

This document is the official onboarding guide for AI coding agents contributing to the TM-Management Frontend.

Before making any modification, every AI agent must understand:

- the product
- the architecture
- the engineering philosophy
- the current roadmap
- the coding standards
- the documentation hierarchy

This file serves as the entry point into the repository.

---

# Mission

Your goal is **not** simply to generate code.

Your goal is to help build a production-ready SaaS application while preserving consistency, maintainability, scalability, and engineering quality.

Every contribution should move the project closer to production.

---

# Project Summary

TM-Management is a modern multi-tenant team management platform.

The frontend is built using:

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Better Auth
- TanStack Query
- Axios
- React Hook Form
- Zod
- Framer Motion

The application aims to provide an experience comparable to:

- Linear
- Notion
- Jira
- ClickUp

---

# AI Reading Order

Before writing **any** code, read these documents in order.

1.

```
README.md
```

2.

```
docs/PROJECT_CONTEXT.md
```

3.

```
docs/FRONTEND_ROADMAP.md
```

4.

```
docs/ENGINEERING_RULES.md
```

5.

```
docs/ARCHITECTURE.md
```

6.

```
docs/DESIGN_SYSTEM.md
```

7.

```
docs/COMPONENT_GUIDELINES.md
```

8.

```
docs/API_INTEGRATION.md
```

9.

```
docs/STATE_MANAGEMENT.md
```

10.

```
docs/UI_UX_GUIDELINES.md
```

11.

```
docs/GIT_WORKFLOW.md
```

12.

```
docs/COMMIT_GUIDELINES.md
```

13.

```
docs/CODE_STYLE.md
```

14.

```
docs/FOLDER_STRUCTURE.md
```

15.

```
docs/CONTRIBUTING.md
```

16.

```
docs/DECISIONS.md
```

Never skip this reading order.

---

# Documentation Priority

If documentation appears to conflict, follow this hierarchy.

1.

ENGINEERING_RULES.md

↓

2.

ARCHITECTURE.md

↓

3.

PROJECT_CONTEXT.md

↓

4.

FRONTEND_ROADMAP.md

↓

5.

DESIGN_SYSTEM.md

↓

6.

Remaining documentation

Never invent behavior that contradicts higher-priority documents.

---

# Current Development Phase

Always determine the current phase before implementing anything.

Read

```
docs/FRONTEND_ROADMAP.md
```

Only work inside the active phase unless explicitly instructed otherwise.

Do **not** begin future phases early.

---

# Engineering Principles

The project values:

- readability
- maintainability
- scalability
- consistency
- simplicity

over

- clever code
- shortcuts
- unnecessary abstractions

---

# Architecture Rules

Always follow the project architecture.

Never invent new architectural patterns.

Always reuse existing project conventions.

Read:

```
ARCHITECTURE.md
```

before introducing new modules.

---

# Component Rules

Components should:

- have one responsibility
- be reusable
- be composable
- avoid business logic
- support dark mode
- support accessibility
- support responsiveness

Never duplicate existing components.

---

# API Rules

Never call Axios directly inside UI components.

Correct flow:

Component

↓

Service

↓

API Client

↓

Backend

Always use typed services.

---

# State Management

Server State

↓

TanStack Query

Form State

↓

React Hook Form

Validation

↓

Zod

Local UI

↓

React useState / useReducer

Global

↓

Context Providers

Never duplicate server state inside local state.

---

# Styling Rules

Always use:

Tailwind CSS

shadcn/ui

Design tokens

CSS Variables

Never hardcode:

colors

spacing

font sizes

radius

Use the design system.

---

# Animation Rules

Use Framer Motion for:

- page transitions
- hero animations
- reveal animations
- cards
- dialogs

Avoid excessive motion.

Animations should improve usability.

---

# Accessibility

Every contribution must support:

Keyboard navigation

ARIA labels

Visible focus states

Proper semantic HTML

Responsive layouts

WCAG-friendly contrast

Accessibility is mandatory.

---

# Performance

Prefer:

Server Components

Lazy loading

Dynamic imports

Optimized rendering

Memoization only when necessary

Avoid unnecessary re-renders.

---

# Error Handling

Every async feature should include:

loading

success

error

empty

retry

states.

---

# AI Decision Process

Before writing code ask:

1.

Does this already exist?

↓

Reuse.

---

2.

Is this documented?

↓

Follow documentation.

---

3.

Is this scalable?

↓

If not, redesign.

---

4.

Will another engineer understand it?

↓

If not, simplify.

---

# AI Guardrails

Never:

❌ Hardcode colors

❌ Duplicate components

❌ Ignore documentation

❌ Fetch directly inside presentation components

❌ Introduce new libraries without approval

❌ Create new architectural patterns

❌ Rewrite existing systems unnecessarily

❌ Bypass services

❌ Break phase boundaries

---

# Git Rules

Never commit directly to:

```
main
```

Use feature branches.

Create focused commits.

Follow Conventional Commits.

Read:

```
docs/GIT_WORKFLOW.md
```

---

# Code Generation Standards

Generated code should:

Compile successfully

Pass TypeScript

Pass ESLint

Follow folder structure

Match design system

Match project architecture

Avoid dead code

Avoid TODO placeholders unless requested

---

# If You Are Unsure

Do not guess.

Instead:

1.

Search existing components.

2.

Read documentation.

3.

Reuse established patterns.

4.

Choose the simplest maintainable solution.

---

# Definition of Success

A successful AI contribution should:

✅ Compile

✅ Pass lint

✅ Follow architecture

✅ Match the design language

✅ Respect documentation

✅ Be maintainable

✅ Be scalable

✅ Require minimal review

---

# Final Principle

You are an engineering collaborator—not the architect.

The documentation inside this repository is the single source of truth.

When your assumptions differ from the documentation, **the documentation always wins.**

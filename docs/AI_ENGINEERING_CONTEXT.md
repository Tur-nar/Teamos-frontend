# AI Engineering Context

> Version: 1.0
>
> Status: Official AI Engineering Documentation
>
> Applies To:
>
> - ChatGPT
> - Claude
> - Gemini
> - Cursor
> - GitHub Copilot
> - Windsurf
> - Cline
> - Roo Code
> - Any AI Coding Agent
>
> Last Updated:
>
> July 2026

---

# Purpose

This document provides essential context for AI coding agents contributing to the TM-Management frontend.

Before generating code, every AI agent should understand:

- project architecture
- engineering principles
- design philosophy
- coding standards
- development roadmap

This file acts as the primary onboarding guide for AI collaborators.

---

# Project Overview

TM-Management is a modern multi-tenant team management platform.

The goal is to build an experience comparable to:

- Linear
- Notion
- Jira
- ClickUp

The frontend emphasizes:

- performance
- maintainability
- scalability
- accessibility
- beautiful UX

---

# Technology Stack

Framework

Next.js App Router

Language

TypeScript

Styling

Tailwind CSS

UI Library

shadcn/ui

Forms

React Hook Form

Validation

Zod

Authentication

Better Auth

Server State

TanStack Query

HTTP

Axios

Animation

Framer Motion

Icons

Lucide React

Notifications

Sonner

---

# Current Development Phase

Always consult

```
FRONTEND_ROADMAP.md
```

Only work on the current phase unless explicitly instructed otherwise.

Do not implement future features prematurely.

---

# Project Philosophy

We value

Quality over speed

Reusable components over duplication

Architecture over shortcuts

Consistency over cleverness

Readable code over complex code

---

# Folder Structure

Before creating files

Read

```
FOLDER_STRUCTURE.md
```

Never invent new folders without necessity.

---

# Design System

Read

```
DESIGN_SYSTEM.md
```

Always use design tokens.

Never hardcode colors.

Reuse existing components.

---

# State Management

Read

```
STATE_MANAGEMENT.md
```

Server data

TanStack Query

Forms

React Hook Form

Local UI

React state

Global concerns

Context Providers

---

# API Communication

Read

```
API_INTEGRATION.md
```

Never call Axios directly inside components.

Flow

Component

↓

Service

↓

API Client

↓

Backend

---

# Component Rules

Read

```
COMPONENT_GUIDELINES.md
```

Components should

Be reusable

Be composable

Have one responsibility

Avoid business logic

---

# Code Style

Read

```
CODE_STYLE.md
```

Always

Use TypeScript

Prefer named exports where appropriate

Use project aliases

Avoid deeply nested logic

Write self-documenting code

---

# Git Workflow

Read

```
GIT_WORKFLOW.md
```

Never commit to main.

One feature branch.

Small commits.

Conventional commit messages.

---

# UI Expectations

Read

```
UI_UX_GUIDELINES.md
```

Every interface should

Feel premium

Be responsive

Be accessible

Match the design language

---

# Engineering Rules

Read

```
ENGINEERING_RULES.md
```

These rules override AI preferences.

Follow them strictly.

---

# AI Behavior Rules

Before writing code

1. Read relevant documentation.
2. Search for existing implementations.
3. Reuse before creating.
4. Follow established patterns.
5. Keep solutions simple.
6. Respect project architecture.

---

# When Creating Components

Prefer composition.

Avoid duplication.

Support dark mode.

Support responsiveness.

Support accessibility.

---

# When Writing Services

Keep business logic inside services.

Return typed responses.

Throw meaningful errors.

Never manipulate UI state.

---

# When Writing Pages

Pages should orchestrate components.

Avoid large files.

Move reusable logic elsewhere.

---

# When Writing Hooks

Hooks should

Start with "use"

Encapsulate reusable logic

Avoid unnecessary state

Be easy to test

---

# Performance Expectations

Avoid unnecessary re-renders.

Memoize only when beneficial.

Lazy load heavy components.

Optimize images.

Use dynamic imports where appropriate.

---

# Accessibility Expectations

Keyboard navigation

Visible focus

ARIA labels

Semantic HTML

Color contrast

Responsive layouts

These are mandatory.

---

# If Unsure

When multiple implementations are possible

Prefer the one that

Improves maintainability

Improves readability

Matches existing architecture

Requires the least future maintenance

---

# Never Do These

❌ Hardcode colors

❌ Duplicate components

❌ Bypass services

❌ Fetch data inside presentation components

❌ Introduce new libraries without approval

❌ Ignore documentation

❌ Break the current phase boundaries

❌ Commit generated code directly without review

---

# Success Criteria

A successful AI contribution should

Compile successfully

Pass linting

Match the design system

Follow project architecture

Require minimal manual changes

Feel like it was written by a senior engineer on the team

---

# Final Principle

AI is a collaborator, not the architect.

The architecture, engineering rules, and documentation are the source of truth.

When documentation conflicts with assumptions, always follow the documentation.

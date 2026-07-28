# Contributing to TM-Management

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

# Welcome

Thank you for contributing to **TM-Management**.

TM-Management is a modern multi-tenant team management platform focused on providing a beautiful, scalable, and maintainable experience for teams of every size.

We welcome contributions that improve the project while maintaining our engineering standards.

Before contributing, please read this document carefully.

---

# Project Philosophy

Every contribution should make the project:

- Easier to maintain
- Easier to understand
- More scalable
- More accessible
- Better documented

We value quality over speed.

---

# Before You Start

Every contributor should first read:

- README.md
- FRONTEND_ROADMAP.md
- ARCHITECTURE.md
- CODE_STYLE.md
- COMPONENT_GUIDELINES.md
- COMMIT_GUIDELINES.md
- API_INTEGRATION.md

These documents are the project's source of truth.

---

# Development Workflow

The standard workflow is:

```
Fork (if external)

↓

Clone Repository

↓

Create Branch

↓

Develop Feature

↓

Test

↓

Commit

↓

Push

↓

Open Pull Request

↓

Code Review

↓

Merge
```

Never develop directly on `main`.

---

# Branch Naming

Use descriptive branch names.

Examples

```
feature/authentication

feature/dashboard

feature/tasks

feature/kanban

fix/navbar-overflow

fix/theme-toggle

refactor/api-services

docs/update-roadmap
```

Do not use names like

```
new

work

project

branch1

testing
```

---

# Setting Up the Project

Clone the repository.

```
git clone <repository-url>
```

Install dependencies.

```
npm install
```

Run the development server.

```
npm run dev
```

Ensure the application builds successfully before making changes.

---

# Coding Standards

All code must follow the project's coding standards.

Required:

- TypeScript
- ESLint
- Prettier
- TailwindCSS
- shadcn/ui
- React best practices

See:

```
CODE_STYLE.md
```

---

# Component Standards

Before creating new components:

- Search for an existing component.
- Prefer composition over duplication.
- Use the design system.
- Follow naming conventions.

See:

```
COMPONENT_GUIDELINES.md
```

---

# API Rules

Frontend components must never call APIs directly.

Correct architecture:

```
Component

↓

Hook

↓

Service

↓

API Client

↓

Backend
```

See:

```
API_INTEGRATION.md
```

---

# State Management

Use the appropriate tool for the job.

React State

- UI state
- Modal visibility
- Dropdowns
- Local forms

TanStack Query

- Server state
- API data
- Caching
- Synchronization

React Hook Form

- Forms

Zod

- Validation

Never replace server state with local component state.

---

# Design Guidelines

Always use design tokens.

Preferred

```
bg-card

text-muted-foreground

border-border

bg-primary
```

Avoid hardcoded colors.

Bad

```
bg-[#22d3ee]
```

---

# Accessibility

Every contribution should consider accessibility.

Required

- Semantic HTML
- Keyboard navigation
- Visible focus states
- Proper labels
- Sufficient color contrast

---

# Responsive Design

Every page must work on:

- Mobile
- Tablet
- Laptop
- Desktop

Do not build desktop-only interfaces.

---

# Performance

Before opening a Pull Request:

- Remove unused imports.
- Remove console.log statements.
- Avoid unnecessary re-renders.
- Lazy load when appropriate.
- Optimize images.

---

# Documentation

If your contribution introduces:

- A new feature
- A new pattern
- A new architecture decision

Update the relevant documentation.

Code and documentation should evolve together.

---

# Testing Checklist

Before committing, verify:

- Application compiles
- TypeScript has no errors
- ESLint passes
- Feature behaves correctly
- No broken routes
- Responsive layout works
- Theme switching works (if affected)

---

# Commit Messages

Use Conventional Commits.

Examples

```
feat: implement organization onboarding

fix: resolve navbar hydration issue

refactor: simplify auth service

docs: update roadmap
```

See:

```
COMMIT_GUIDELINES.md
```

---

# Pull Requests

A Pull Request should:

- Solve one logical problem.
- Include a clear description.
- Reference related issues (if applicable).
- Include screenshots for UI changes.
- Pass all checks.

Do not combine unrelated work into one Pull Request.

---

# Code Review Expectations

Reviewers will check:

- Architecture
- Readability
- Reusability
- Accessibility
- Performance
- Documentation
- Testing
- Design consistency

Constructive feedback is encouraged.

---

# AI Agent Contribution Rules

AI agents contributing to TM-Management must:

- Read the documentation before generating code.
- Respect the architecture.
- Reuse existing components.
- Follow naming conventions.
- Avoid duplicate implementations.
- Keep changes focused.
- Update documentation when necessary.
- Never invent APIs or project structure.

When unsure, follow the documentation rather than making assumptions.

---

# What Not to Do

Do not:

- Commit directly to `main`
- Introduce breaking changes without discussion
- Duplicate components
- Hardcode colors
- Ignore lint errors
- Skip documentation
- Leave debugging code
- Commit secrets or environment variables

---

# Getting Help

If you are unsure about:

- Architecture
- Folder placement
- Component design
- State management
- API integration

Consult the documentation first.

If the answer is not documented, open a discussion before implementing a new pattern.

---

# Engineering Principles

Every contribution should improve at least one of the following:

- Readability
- Maintainability
- Reusability
- Performance
- Accessibility
- Developer Experience
- User Experience

Avoid changes that increase complexity without clear benefit.

---

# Contributor Checklist

Before submitting your work:

- Read the documentation.
- Create a feature branch.
- Follow the coding standards.
- Reuse existing components.
- Test your changes.
- Update documentation if needed.
- Write a meaningful commit message.
- Open a focused Pull Request.

---

# Thank You

Every contribution helps TM-Management become a better product and a better codebase.

Whether you're fixing a typo, improving performance, building a major feature, or contributing through an AI coding agent, thank you for helping maintain a professional engineering standard.

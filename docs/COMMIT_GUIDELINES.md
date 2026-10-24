# Commit Guidelines

> Version: 1.0
>
> Status: Official Engineering Documentation
>
> Applies To:
>
> - Frontend Engineers
> - Backend Engineers
> - AI Coding Agents
>
> Last Updated:
>
> July 2026

---

# Purpose

This document defines the official commit message convention for the TM-Management project.

A good commit history should:

- Explain **what changed**
- Explain **why it changed**
- Be easy to search
- Be easy to review
- Support future automation
- Help AI agents understand project evolution

Git history is part of the project's documentation.

---

# Philosophy

A commit should represent **one logical change**.

Good commits answer:

- What changed?
- Why was it changed?

Avoid mixing unrelated work in a single commit.

---

# Commit Message Format

TM-Management follows the Conventional Commits specification.

```
<type>: <short description>
```

Example

```
feat: implement organization onboarding
```

---

# Commit Types

## feat

A new feature.

Examples

```
feat: add dashboard statistics cards

feat: implement sign in page

feat: add organization selector
```

---

## fix

Bug fixes.

Examples

```
fix: resolve hydration mismatch

fix: correct sidebar scrolling

fix: prevent duplicate login requests
```

---

## refactor

Code improvements without changing functionality.

Examples

```
refactor: extract reusable auth card

refactor: simplify theme toggle logic

refactor: move API calls into services
```

---

## style

Visual or formatting changes.

Examples

```
style: improve landing page spacing

style: update button hover states

style: refine dashboard typography
```

---

## docs

Documentation changes.

Examples

```
docs: add API integration guide

docs: update frontend roadmap

docs: improve architecture documentation
```

---

## test

Testing.

Examples

```
test: add sign up form tests

test: cover dashboard service
```

---

## chore

Maintenance.

Examples

```
chore: update dependencies

chore: configure eslint

chore: clean project structure
```

---

## perf

Performance improvements.

Examples

```
perf: lazy load dashboard widgets

perf: optimize hero rendering
```

---

## build

Build configuration.

Examples

```
build: configure production environment

build: update next config
```

---

## ci

Continuous Integration.

Examples

```
ci: add GitHub Actions workflow

ci: update deployment pipeline
```

---

# Writing Good Commit Messages

Use the imperative mood.

Good

```
feat: add organization creation

fix: resolve login redirect

docs: update README
```

Bad

```
Added organization

Fixes bug

Changes

Update

Misc

Final

Done
```

---

# Keep the Subject Short

Recommended

```
50 characters or fewer
```

Good

```
feat: add reusable dashboard card
```

Bad

```
feat: this commit adds a reusable dashboard card together with improvements to the sidebar navigation and authentication system
```

The details belong in the commit body if needed.

---

# Commit Body (Optional)

When additional context is useful:

Example

```
feat: implement project creation

Added project creation flow with validation.

Includes:
- Form validation
- API integration
- Loading state
- Success toast
```

---

# Atomic Commits

Each commit should contain one logical change.

Good

```
feat: add theme toggle

feat: implement sign in page

fix: resolve navbar hydration issue
```

Bad

```
feat: add theme toggle, dashboard, login page, animations, API integration and fix navbar
```

---

# When to Commit

Commit after completing a meaningful unit of work.

Examples

✅ Authentication UI

✅ Dashboard layout

✅ Hero redesign

✅ API integration

❌ Every five minutes

❌ Every small CSS tweak

---

# Branch Workflow

Typical workflow

```
Create feature branch

↓

Develop feature

↓

Commit logically

↓

Push branch

↓

Open Pull Request

↓

Review

↓

Merge
```

Never commit directly to `main`.

---

# Examples From TM-Management

Landing Page

```
style: redesign landing page hero

feat: add dashboard preview

style: improve navigation interactions
```

Authentication

```
feat: implement sign up form

feat: integrate Better Auth login

fix: resolve authentication redirect
```

Dashboard

```
feat: add dashboard statistics

feat: implement recent activity widget
```

Projects

```
feat: implement project CRUD

fix: correct project filtering
```

Documentation

```
docs: create architecture guide

docs: update API integration guide
```

---

# Bad Commit Examples

Avoid

```
update

work

progress

done

final

last

fix

commit

today

small changes

testing
```

These provide no useful information.

---

# Pull Request Relationship

A pull request should contain several related commits.

Example

```
feat: implement sign up page

refactor: extract auth header

fix: resolve form validation issue

docs: update authentication guide
```

This tells a clear story.

---

# AI Agent Rules

AI agents must:

- Use Conventional Commits.
- Create atomic commits.
- Never use vague commit messages.
- Match the commit type to the change.
- Keep the subject concise.
- Avoid mixing unrelated changes.

Preferred order

```
feat

↓

refactor

↓

fix

↓

docs
```

---

# Commit Checklist

Before committing:

- Code compiles.
- No TypeScript errors.
- Lint passes.
- Tests pass (when applicable).
- Documentation updated (if needed).
- Only related files included.
- No temporary debugging code.
- Commit message follows this guide.

---

# Examples of Excellent Commits

```
feat: implement organization onboarding

feat: add reusable dashboard widgets

fix: resolve theme hydration mismatch

refactor: centralize API client configuration

style: improve landing page responsiveness

perf: optimize dashboard rendering

docs: add engineering handbook

chore: update project dependencies
```

---

# Final Principle

A commit is a snapshot of a meaningful engineering decision.

Someone reading the Git history should understand the evolution of TM-Management without opening every file.

Every commit should answer one question:

> "What valuable change does this introduce?"

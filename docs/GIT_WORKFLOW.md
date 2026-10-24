# Git Workflow

> Version: 1.0
>
> Status: Official Engineering Documentation
>
> Applies To:
>
> - Frontend Engineers
> - Tech Leads
> - AI Coding Agents
>
> Last Updated:
>
> July 2026

---

# Purpose

This document defines the official Git workflow for TM-Management.

Every contribution must follow this workflow to ensure:

- Clean commit history
- Safe collaboration
- Easier code reviews
- Predictable releases

---

# Branch Strategy

We use a feature-branch workflow.

```
main
│
├── feature/authentication
├── feature/landing-page
├── feature/dashboard
├── feature/tasks
├── feature/calendar
├── bugfix/login-error
├── hotfix/security-patch
```

Never work directly on `main`.

---

# Branch Naming

Use lowercase kebab-case.

Feature

```
feature/dashboard
feature/authentication
feature/settings
```

Bug Fix

```
bugfix/navbar-overflow
bugfix/theme-toggle
```

Hotfix

```
hotfix/session-expiry
```

Documentation

```
docs/update-roadmap
```

Refactor

```
refactor/auth-service
```

---

# Creating a Branch

Always update main first.

```bash
git checkout main
git pull origin main
```

Create a feature branch.

```bash
git checkout -b feature/dashboard
```

---

# Daily Workflow

1. Pull latest changes

```bash
git pull
```

2. Work on one feature only.

3. Test.

4. Commit.

5. Push.

6. Open Pull Request.

---

# Commit Frequency

Commit often.

Good

- Navbar complete
- Hero section complete
- Authentication UI complete

Bad

- Entire Phase 1 in one commit

Small commits make debugging easier.

---

# Commit Message Format

Use imperative mood.

Good

```
feat(auth): implement sign in form

feat(ui): redesign landing hero

fix(theme): resolve hydration mismatch

refactor(api): simplify auth service

docs: update roadmap

style(hero): improve spacing
```

Avoid

```
fixed

update

changes

working

done

final
```

---

# Commit Types

| Type     | Purpose               |
| -------- | --------------------- |
| feat     | New feature           |
| fix      | Bug fix               |
| docs     | Documentation         |
| style    | Styling only          |
| refactor | Internal improvements |
| test     | Tests                 |
| chore    | Maintenance           |
| perf     | Performance           |

---

# Before Every Commit

Run

```bash
npm run lint
```

Then

```bash
npm run build
```

Never commit broken builds.

---

# Before Every Push

Ensure

- TypeScript passes
- Build succeeds
- No console errors
- No lint errors

---

# Pull Requests

Every PR should include

- Summary
- Screenshots (if UI)
- Testing performed
- Related issue (if applicable)

Example

```
## Summary

Implemented authentication forms.

## Tested

✓ Sign In

✓ Sign Up

✓ Validation

## Screenshots

Attached
```

---

# Merge Rules

Merge only after

- Code review
- Passing CI
- Build success
- No merge conflicts

---

# Git Aliases

Recommended aliases

```bash
alias gs="git status"

alias ga="git add ."

alias gc="git commit"

alias gp="git push"

alias gl="git pull"

alias gco="git checkout"

alias gb="git branch"

alias gpl="git pull origin main"

alias gst="git stash"

alias gstp="git stash pop"
```

---

# AI Agent Rules

AI agents must

- Never commit directly to main.
- Work on one feature branch.
- Create focused commits.
- Never rewrite Git history.
- Never force push.
- Never commit secrets.
- Never commit generated files unless required.

---

# Engineering Checklist

Before pushing

- Branch correct
- Feature complete
- Build passes
- Lint passes
- Commit message follows convention
- Documentation updated

---

# Golden Rule

One feature.

One branch.

Many small commits.

One clean pull request.

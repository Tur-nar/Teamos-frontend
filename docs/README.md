# 🚀 TM-Management Frontend

> **A modern AI-ready multi-tenant team management platform built with Next.js, TypeScript, Better Auth, TanStack Query, Tailwind CSS, shadcn/ui, and Framer Motion.**

![Status](https://img.shields.io/badge/Status-Active%20Development-success)
![Frontend](https://img.shields.io/badge/Frontend-Next.js-black)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue)
![License](https://img.shields.io/badge/License-Private-red)

---

# Vision

TM-Management is a modern collaborative workspace designed to help organizations manage projects, teams, tasks, calendars, meetings, and communication from a single platform.

Our long-term goal is to combine the simplicity of **Linear**, the collaboration of **Notion**, the project management power of **Jira**, and intelligent AI assistance into one seamless experience.

This repository contains the **Frontend Application** responsible for delivering that experience.

---

# Product Goals

The frontend is built around five engineering principles.

## 1. Scalability

Every feature should support future growth without major rewrites.

Examples:

- Modular architecture
- Feature-based organization
- Reusable components
- Shared design system

---

## 2. Maintainability

Code should remain understandable six months after it was written.

We prioritize:

- readability
- simplicity
- consistency

over clever implementations.

---

## 3. User Experience

Every interaction should feel:

- Fast
- Responsive
- Predictable
- Delightful

Animations should improve usability—not distract from it.

---

## 4. Performance

The application should feel instantaneous.

Guidelines include:

- Server Components where appropriate
- Route-based code splitting
- Lazy loading
- Optimized rendering
- Image optimization
- Minimal re-renders
- Optimistic UI

---

## 5. Consistency

Every screen should feel like it belongs to the same product.

Typography, spacing, colors, buttons, forms, cards, and layouts all follow the shared design system.

---

# Tech Stack

| Category       | Technology           |
| -------------- | -------------------- |
| Framework      | Next.js (App Router) |
| Language       | TypeScript           |
| Styling        | Tailwind CSS         |
| UI Components  | shadcn/ui            |
| Icons          | Lucide React         |
| Forms          | React Hook Form      |
| Validation     | Zod                  |
| Authentication | Better Auth          |
| Server State   | TanStack Query       |
| HTTP Client    | Axios                |
| Animation      | Framer Motion        |
| Notifications  | Sonner               |
| Utilities      | clsx, tailwind-merge |

---

# Getting Started

## Clone the repository

```bash
git clone <repository-url>

cd TM-Management-frontend
```

---

## Install dependencies

```bash
npm install
```

---

## Start the development server

```bash
npm run dev
```

---

## Production build

```bash
npm run build
```

---

## Run linting

```bash
npm run lint
```

---

# Project Structure

```
src/

├── app/
├── components/
├── hooks/
├── lib/
├── providers/
├── schemas/
├── services/
├── types/
```

Detailed structure:

```
docs/FOLDER_STRUCTURE.md
```

---

# Documentation

The project documentation lives inside:

```
docs/
```

| Document                  | Description                         |
| ------------------------- | ----------------------------------- |
| PROJECT_CONTEXT.md        | Product vision and business context |
| FRONTEND_ROADMAP.md       | 12-phase development roadmap        |
| ARCHITECTURE.md           | Frontend architecture               |
| DESIGN_SYSTEM.md          | Design language                     |
| COMPONENT_GUIDELINES.md   | Component standards                 |
| API_INTEGRATION.md        | API communication                   |
| STATE_MANAGEMENT.md       | State architecture                  |
| UI_UX_GUIDELINES.md       | UI & UX rules                       |
| ENGINEERING_RULES.md      | Mandatory engineering standards     |
| CODE_STYLE.md             | TypeScript style guide              |
| GIT_WORKFLOW.md           | Git workflow                        |
| COMMIT_GUIDELINES.md      | Commit conventions                  |
| CONTRIBUTING.md           | Contribution guide                  |
| CHANGELOG.md              | Project history                     |
| DECISIONS.md              | Architectural decisions             |
| AI_ENGINEERING_CONTEXT.md | AI engineering handbook             |

---

# Current Development Status

## Active Phase

**Phase 1 — Authentication & Organization Onboarding**

### Completed

- ✅ Premium Landing Page
- ✅ Responsive Navigation
- ✅ Theme Switching
- ✅ Authentication UI
- ✅ Design System
- ✅ Motion-ready UI
- ✅ React Hook Form
- ✅ Zod Validation
- ✅ Shared UI Components

### In Progress

- Better Auth Integration
- Session Management
- Protected Routes
- Organization Onboarding

Full roadmap:

```
docs/FRONTEND_ROADMAP.md
```

---

# Development Workflow

Every feature follows this lifecycle.

```
Research

↓

Planning

↓

Architecture

↓

UI

↓

State

↓

API Integration

↓

Testing

↓

Documentation

↓

Commit

↓

Pull Request
```

---

# Engineering Philosophy

Before writing code ask:

- Can this component be reused?
- Does this belong somewhere else?
- Is there already an existing implementation?
- Is this scalable?
- Will another engineer understand it?

If the answer is **No**, refactor before continuing.

---

# AI Development

AI agents are first-class collaborators.

Before generating code they should read:

1. PROJECT_CONTEXT.md
2. FRONTEND_ROADMAP.md
3. ENGINEERING_RULES.md
4. ARCHITECTURE.md
5. DESIGN_SYSTEM.md
6. COMPONENT_GUIDELINES.md
7. API_INTEGRATION.md
8. STATE_MANAGEMENT.md
9. GIT_WORKFLOW.md

AI should never invent architectural patterns that contradict project documentation.

---

# Git Workflow

Every feature belongs in its own branch.

Examples

```
feature/authentication

feature/dashboard

feature/tasks

feature/calendar

feature/settings
```

Never develop directly on:

```
main
```

---

# Commit Convention

Examples

```bash
feat(auth): implement Better Auth login

fix(theme): resolve hydration mismatch

style(hero): redesign landing page

docs: update roadmap
```

See:

```
docs/COMMIT_GUIDELINES.md
```

---

# Pull Requests

Every Pull Request should include:

- Summary
- Screenshots (UI changes)
- Testing notes
- Related issues

---

# Frontend Standards

The application should always maintain:

- ✅ Responsive Design
- ✅ Accessibility
- ✅ Performance
- ✅ Clean Architecture
- ✅ Type Safety
- ✅ Reusable Components
- ✅ Minimal Re-renders
- ✅ Proper Loading States
- ✅ Proper Error States
- ✅ Empty States

---

# Contributors

### Frontend Engineering

**Solomon Theophilus**

---

### Backend Engineering

**Timi**

---

# License

**Private Repository**

TM-Management © 2026

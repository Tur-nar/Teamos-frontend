# PROJECT_CONTEXT.md

> Version: 1.0
>
> Status: Official Project Documentation
>
> Applies To:
>
> - Frontend Engineers
> - Backend Engineers
> - Designers
> - Product Managers
> - AI Coding Agents
>
> Last Updated:
>
> July 2026

---

# Project Overview

TM-Management is a modern, AI-ready, multi-tenant team management platform built to help organizations manage work from a single collaborative workspace.

The platform combines project management, task management, calendars, team collaboration, scheduling, notifications, organization management, and AI assistance into one cohesive product.

The objective is to build software that is beautiful, scalable, maintainable, and enjoyable to use.

---

# Vision

Our long-term vision is to create the operating system for modern teams.

Instead of switching between multiple tools for project management, documentation, meetings, calendars, messaging, and AI, organizations should be able to manage everything inside TM-Management.

The product should feel as polished as:

- Linear
- Notion
- Jira
- ClickUp
- GitHub
- Slack

while introducing AI-powered workflows that reduce repetitive work.

---

# Product Philosophy

TM-Management is built around four principles.

## 1. Simplicity

Complex systems should feel simple.

Users should spend their time completing work, not learning software.

---

## 2. Collaboration

Everything is designed around teams instead of individuals.

Projects, tasks, documents, and communication should naturally support collaboration.

---

## 3. Intelligence

Artificial Intelligence should assist users rather than replace them.

Examples include:

- task generation
- meeting summaries
- project insights
- productivity recommendations
- document assistance
- smart scheduling

---

## 4. Scalability

The platform should support:

- freelancers
- startups
- SMEs
- enterprises

without architectural changes.

---

# Target Users

Primary users include:

- startups
- software teams
- product managers
- designers
- developers
- marketing teams
- agencies
- educational organizations
- businesses

Every feature should improve team productivity.

---

# Core Product Modules

TM-Management consists of several major domains.

## Authentication

Handles:

- Sign Up
- Sign In
- Sessions
- Logout
- Password recovery

---

## Organizations

Organizations are the highest level of ownership.

Every user belongs to one or more organizations.

Organizations own:

- members
- projects
- tasks
- calendars
- documents

---

## Projects

Projects group related work.

Each project contains:

- members
- tasks
- milestones
- activity
- discussions

---

## Tasks

Tasks are the core productivity unit.

Tasks support:

- assignees
- priorities
- due dates
- comments
- attachments
- labels
- history

---

## Calendar

Used for:

- meetings
- deadlines
- reminders
- milestones

---

## Team Management

Includes:

- invitations
- roles
- permissions
- departments
- activity

---

## Notifications

Users receive updates about:

- assignments
- mentions
- comments
- invitations
- deadlines

---

## Settings

Users can manage:

- profile
- appearance
- organization
- preferences
- security

---

# Multi-Tenant Architecture

TM-Management is a multi-tenant application.

Every resource belongs to an organization.

Example

Organization

↓

Projects

↓

Tasks

↓

Comments

↓

Attachments

Users should never accidentally access resources from another organization.

Tenant isolation is a core architectural requirement.

---

# Frontend Responsibilities

The frontend is responsible for:

- rendering UI
- user interaction
- validation
- routing
- accessibility
- responsive layouts
- API communication
- optimistic UI
- caching

Business logic should remain inside services or backend APIs whenever appropriate.

---

# Backend Responsibilities

The backend is responsible for:

- authentication
- authorization
- business rules
- data persistence
- notifications
- organization management
- AI integrations
- auditing
- permissions

The frontend should consume backend APIs rather than duplicate business logic.

---

# Frontend–Backend Relationship

Communication follows this flow:

User

↓

Component

↓

Service

↓

API Client

↓

Backend

↓

Database

Components should never communicate directly with backend endpoints.

---

# Technology Overview

Frontend

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Hook Form
- Zod
- Better Auth
- TanStack Query
- Axios
- Framer Motion
- Lucide React

Backend

Maintained separately by the backend engineering team.

The frontend assumes a REST-based API exposed by the backend.

---

# Development Roadmap

Development follows twelve phases.

1. Authentication & Organization Onboarding
2. Application Shell
3. Dashboard
4. Projects
5. Tasks
6. Kanban Board
7. Calendar & Scheduling
8. Team Management
9. Notifications & Realtime
10. Settings
11. Performance & Quality
12. Deployment & Production

Detailed milestones are documented in:

```
docs/FRONTEND_ROADMAP.md
```

---

# Engineering Philosophy

The project favors:

- simplicity over cleverness
- readability over brevity
- architecture over shortcuts
- consistency over novelty
- composition over configuration

Every engineer should leave the codebase easier to understand than they found it.

---

# Documentation Hierarchy

When making engineering decisions, consult documentation in the following order:

1. ENGINEERING_RULES.md
2. ARCHITECTURE.md
3. PROJECT_CONTEXT.md
4. FRONTEND_ROADMAP.md
5. DESIGN_SYSTEM.md
6. STATE_MANAGEMENT.md
7. API_INTEGRATION.md
8. COMPONENT_GUIDELINES.md
9. Remaining documentation

Higher-priority documents override lower-priority ones.

---

# AI Collaboration

AI coding assistants are treated as engineering collaborators.

Before generating code, AI agents should understand:

- product goals
- architecture
- roadmap
- engineering rules
- design system
- state management
- API conventions

AI should never invent architecture that conflicts with project documentation.

---

# Definition of Success

TM-Management is successful when it provides:

- an intuitive user experience
- excellent performance
- maintainable architecture
- scalable code
- consistent design
- productive collaboration
- reliable multi-tenant behavior
- seamless AI-assisted workflows

Every contribution should move the project closer to this vision.

---

# Final Principle

TM-Management is not a tutorial project.

It is production software built with long-term maintainability in mind.

Every design decision, architectural choice, and implementation should support that goal.

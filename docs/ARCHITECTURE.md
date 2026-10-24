# Frontend Architecture

> Version: 1.0
>
> Status: Official Architecture Document
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

This document defines the official architecture of the TM-Management frontend.

Every engineer and AI agent working on this repository must follow these architectural principles.

The architecture exists to ensure the frontend remains:

- scalable
- maintainable
- predictable
- reusable
- testable
- production-ready

Architecture decisions should not change without discussion.

---

# Architecture Philosophy

TM-Management follows a layered architecture.

Instead of allowing every component to do everything, every layer has one responsibility.

Think of the frontend as a city.

Every building has a purpose.

Roads connect buildings.

People know exactly where to go.

If every building became a hospital, supermarket and airport at once, the city would collapse.

Software works the same way.

---

# High-Level Architecture

```

Frontend

↓

App Router

↓

Pages

↓

Layouts

↓

Components

↓

Hooks

↓

Services

↓

API Client

↓

Backend

```

Each layer only communicates with the layer directly below it.

---

# Engineering Principles

The architecture is guided by five principles.

## 1. Separation of Concerns

Every file should have one responsibility.

Examples

Component

Responsible for UI.

Service

Responsible for API communication.

Hook

Responsible for state synchronization.

Provider

Responsible for application context.

---

## 2. Reusability

Never duplicate UI.

If a component is used twice,

extract it.

Examples

Button

Input

Modal

Dialog

Card

Avatar

Badge

---

## 3. Scalability

Adding a new feature should not require changing unrelated folders.

New modules should fit naturally into the existing architecture.

---

## 4. Predictability

Developers should immediately know where code belongs.

If you need to think

"Where should this go?"

the architecture has failed.

---

## 5. Maintainability

Code written today should still be understandable next year.

Optimization never comes before readability.

---

# Folder Structure

```

src/

app/
components/
hooks/
lib/
providers/
schemas/
services/
types/

```

Each folder has one responsibility.

---

# App

```

app/

```

Contains routes.

Responsibilities

- pages
- layouts
- route groups
- metadata

Never place business logic here.

---

# Components

```

components/

```

Contains reusable UI.

Categories

```

components/

layout/

landing/

auth/

dashboard/

ui/

```

Rules

Components should

- receive props
- render UI
- remain reusable

Components should not

- call APIs
- perform business logic
- manage global state

---

# Hooks

```

hooks/

```

Contains reusable logic.

Examples

```

useAuth()

useProjects()

useMounted()

useTasks()

```

Hooks connect UI to data.

---

# Services

```

services/

```

Contains business operations.

Example

```

services/

auth/

dashboard/

projects/

tasks/

```

Responsibilities

- communicate with backend
- transform data
- expose reusable functions

---

# Providers

```

providers/

```

Global application wrappers.

Examples

Theme Provider

Query Provider

Future examples

Organization Provider

Notification Provider

Session Provider

---

# Lib

```

lib/

```

Shared utilities.

Examples

Axios Client

Better Auth Client

Utilities

Constants

Helpers

Never place UI here.

---

# Types

```

types/

```

Shared TypeScript interfaces.

Example

```

User

Task

Project

Organization

```

Never duplicate types.

---

# Schemas

```

schemas/

```

Validation.

Example

```

Sign Up

Login

Task

Project

```

Uses

Zod

---

# State Management Architecture

The application uses three kinds of state.

---

## Local State

Component only.

Examples

Modal open

Dropdown

Tabs

Accordion

Password visibility

Use

```

useState()

```

---

## Server State

Data from backend.

Examples

Projects

Tasks

User

Dashboard

Use

TanStack Query

Never use useState for server data.

---

## Global State

Rare.

Examples

Theme

Authentication

Organization

Notifications

Providers manage global state.

---

# Data Flow

```

Backend

↓

Axios

↓

Services

↓

TanStack Query

↓

Hooks

↓

Components

↓

UI

```

Never skip layers.

---

# Component Hierarchy

Pages

↓

Sections

↓

Feature Components

↓

Shared Components

↓

Primitive UI

Example

```

Dashboard Page

↓

Dashboard Layout

↓

Project List

↓

Project Card

↓

Button

```

---

# Dependency Direction

Allowed

```

Component

↓

Hook

↓

Service

↓

Axios

```

Forbidden

Component

↓

Axios

Forbidden

Service

↓

Component

Forbidden

Hook

↓

Page

Dependencies always point downward.

---

# UI Architecture

The design system is based on

shadcn/ui

Every custom component should be built using these primitives whenever possible.

Examples

Button

Card

Input

Dropdown

Dialog

Popover

Separator

---

# Feature Organization

As the application grows,

features own their components.

Example

```

dashboard/

projects/

tasks/

calendar/

notifications/

```

Each feature may contain

components

hooks

services

types

---

# Routing Architecture

Uses

Next.js App Router

Examples

```

/

/sign-in

/sign-up

/dashboard

/projects

/tasks

/calendar

/settings

```

Protected routes should live behind authentication middleware.

---

# Authentication Architecture

Authentication is owned by Better Auth.

Responsibilities

Better Auth

- sessions
- cookies
- refresh

Frontend

- UI
- forms
- redirects
- protected pages

---

# Multi-Tenant Architecture

Every authenticated user belongs to an organization.

Future modules should always assume an active organization exists.

Examples

Projects belong to organizations.

Tasks belong to organizations.

Members belong to organizations.

Never assume a global dataset.

---

# Performance Strategy

Architecture should encourage

- lazy loading
- code splitting
- memoization
- image optimization
- server rendering
- optimistic updates

Performance is designed into the architecture—not added later.

---

# Accessibility

Every component should support

- keyboard navigation
- screen readers
- semantic HTML
- focus states
- color contrast

Accessibility is a requirement.

Not a feature.

---

# Error Boundaries

Every major feature should eventually support

Loading

Error

Empty

Success

states.

No page should ever appear "broken."

---

# Naming Conventions

Components

```

ProjectCard

```

Hooks

```

useProjects

```

Providers

```

ThemeProvider

```

Services

```

project.service.ts

```

Types

```

Project

```

Files

kebab-case

Components

PascalCase

Variables

camelCase

Constants

UPPER_CASE

---

# AI Agent Rules

AI agents must never:

- create duplicate architecture
- introduce new folder structures
- bypass services
- bypass TanStack Query
- create multiple axios clients
- place business logic inside UI
- duplicate components
- ignore existing design system

Before writing code, AI agents should:

1. Search for an existing component.
2. Search for an existing hook.
3. Search for an existing service.
4. Reuse before creating.
5. Follow dependency direction.

If unsure, prefer extending existing architecture rather than inventing a new pattern.

---

# Future Architecture

The architecture is intentionally prepared for future modules.

Upcoming systems include

Dashboard

Projects

Tasks

Kanban

Calendar

Notifications

Organizations

Settings

Analytics

AI Assistant

Each module should integrate naturally into this architecture without restructuring the project.

---

# Architecture Checklist

Before merging any feature, verify:

- UI is separated from business logic.
- API calls live in services.
- Server state uses TanStack Query.
- Components are reusable.
- Types are shared.
- Validation uses Zod.
- No duplicated code.
- Folder structure is respected.
- Naming conventions are followed.
- Documentation is updated if architecture changes.

---

# Final Principle

The architecture should make the correct way the easiest way.

If a new engineer—or an AI agent—can understand where code belongs within minutes, then the architecture is doing its job.

Every architectural decision should favor clarity, consistency, and long-term maintainability over short-term convenience.

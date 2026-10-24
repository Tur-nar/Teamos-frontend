# State Management

> Version: 1.0
>
> Status: Official Engineering Documentation
>
> Applies To:
>
> - Frontend Engineers
> - AI Coding Agents
>
> Last Updated:
>
> July 2026

---

# Purpose

This document defines how state is managed throughout the TM-Management frontend.

Choosing the correct type of state prevents:

- duplicated data
- unnecessary re-renders
- inconsistent UI
- difficult debugging

Every new piece of state must fit into one of the categories below.

---

# Core Principle

Use the smallest, simplest state solution that solves the problem.

Do **not** introduce global state unless it is truly global.

---

# Types of State

TM-Management uses five categories of state.

| Type             | Tool                      |
| ---------------- | ------------------------- |
| Server State     | TanStack Query            |
| Form State       | React Hook Form           |
| URL State        | Next.js Router            |
| UI State         | React useState/useReducer |
| Global App State | Context Providers         |

---

# 1. Server State

Source of truth:

**TanStack Query**

Examples

- Current user
- Organization
- Projects
- Tasks
- Calendar
- Notifications

Never copy server data into useState.

Correct

```
useQuery()

↓

Render UI
```

Incorrect

```
useQuery()

↓

setState(data)
```

---

# Server State Responsibilities

TanStack Query handles

- fetching
- caching
- retries
- background refresh
- optimistic updates
- invalidation
- loading states

Never reimplement these manually.

---

# Query Keys

Always centralize query keys.

Example

```ts
queryKeys.user;

queryKeys.projects;

queryKeys.tasks;
```

Avoid

```ts
["user"]["task"]["project"];
```

scattered throughout the project.

---

# Mutations

Always use

```
useMutation()
```

Never call Axios directly inside UI components.

Correct

```
Component

↓

Service

↓

Mutation

↓

API
```

---

# 2. Form State

Source of truth

React Hook Form

Handles

- values
- validation
- dirty state
- touched fields
- submission
- reset

Never recreate form management manually.

Validation uses Zod.

---

# 3. URL State

Belongs in the URL.

Examples

```
?page=2

?status=open

?sort=latest

?search=meeting
```

Benefits

- Shareable links
- Refresh persistence
- Browser history support

---

# 4. UI State

Use React state for local UI only.

Examples

```tsx
const [open, setOpen];

const [expanded, setExpanded];

const [isEditing, setIsEditing];
```

Good uses

- Modal open
- Dropdown
- Tabs
- Sidebar
- Accordion

Do not store server data here.

---

# useReducer

Use when state becomes complex.

Example

Multi-step wizard

Dashboard filters

Complex selection

Otherwise prefer

```
useState
```

---

# 5. Global State

Use Context Providers only for truly global concerns.

Examples

Theme

Authentication

Organization

Query Client

Avoid putting

Projects

Tasks

Notifications

inside Context.

Those belong to TanStack Query.

---

# State Ownership

Every state should have exactly one owner.

Example

Authentication

↓

Better Auth

↓

Auth Provider

↓

Components consume it.

Never duplicate ownership.

---

# Derived State

Avoid storing data that can be calculated.

Bad

```ts
const [completedTasks];
```

Good

```ts
tasks.filter(...)
```

Store only source data.

---

# State Flow

Preferred architecture

```
Backend

↓

API

↓

TanStack Query

↓

Component

↓

User Interaction

↓

Mutation

↓

Backend
```

---

# Anti-Patterns

Avoid

Copying server data into useState.

Multiple sources of truth.

Passing state through many component levels.

Fetching inside deeply nested components.

Storing derived values.

Creating global state unnecessarily.

---

# When to Use What

Need to...

Fetch projects?

→ TanStack Query

Validate forms?

→ React Hook Form

Manage modal?

→ useState

Store theme?

→ Context

Store current page?

→ URL

---

# AI Agent Rules

Before creating state ask

Is this server data?

→ TanStack Query

Is this a form?

→ React Hook Form

Is this local UI?

→ useState

Is this global?

→ Context

Can this be derived?

→ Don't store it.

---

# Engineering Checklist

Before adding state

- Correct state category?
- Single source of truth?
- No duplication?
- Easy to understand?
- Easy to test?
- Easy to remove?

---

# Golden Rule

Never fight the architecture.

Server state belongs to TanStack Query.

Form state belongs to React Hook Form.

Local UI belongs to React.

Everything else should justify its existence.

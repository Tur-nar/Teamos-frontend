# Component Guidelines

> Version: 1.0
>
> Status: Official Engineering Documentation
>
> Applies To:
>
> - Frontend Engineers
> - Backend Engineers contributing to the frontend
> - AI Coding Agents
>
> Last Updated:
>
> July 2026

---

# Purpose

This document defines how components are designed, organized, implemented, and maintained throughout the TM-Management frontend.

The goal is to ensure that every component is:

- Reusable
- Predictable
- Accessible
- Maintainable
- Consistent
- Easy for humans and AI agents to understand

---

# Philosophy

Components are the building blocks of the application.

Each component should do one thing and do it well.

Good components are:

- Small
- Reusable
- Focused
- Easy to compose

Bad components become pages disguised as components.

---

# Component Hierarchy

TM-Management uses four levels of components.

```
Pages

↓

Feature Components

↓

Shared Components

↓

UI Primitives
```

---

# 1. Pages

Location

```
app/
```

Responsibilities

- Route composition
- Metadata
- Assemble sections
- Compose layouts

Pages should never contain business logic.

Example

```
dashboard/page.tsx
```

---

# 2. Feature Components

Location

```
components/dashboard/

components/tasks/

components/projects/

components/calendar/
```

Examples

```
TaskCard

ProjectTable

DashboardStats

KanbanColumn
```

Feature components belong to one feature only.

---

# 3. Shared Components

Location

```
components/layout/

components/auth/

components/common/
```

Examples

```
Navbar

Footer

AuthHeader

EmptyState

Section
```

Shared components may be reused by multiple features.

---

# 4. UI Components

Location

```
components/ui/
```

These are the design system primitives.

Examples

```
Button

Input

Card

Dialog

Avatar

Badge

Separator

DropdownMenu
```

These should be generic and reusable.

---

# Component Responsibilities

A component should:

- Receive props
- Render UI
- Emit events
- Remain reusable

A component should NOT:

- Call APIs
- Fetch server data directly
- Perform business logic
- Manage unrelated global state

---

# Component Size

Recommended

```
50–150 lines
```

Maximum

```
250 lines
```

If a component grows beyond this, consider extracting smaller components.

---

# Single Responsibility Principle

Each component should solve one problem.

Good

```
TaskCard
```

Displays a task.

Bad

```
TaskCard
```

Displays a task

Creates tasks

Deletes tasks

Fetches tasks

Updates tasks

---

# Props

Always type props.

Good

```tsx
type TaskCardProps = {
  task: Task;
  onClick?: () => void;
};
```

Bad

```tsx
(props: any)
```

---

# Default Props

Prefer sensible defaults.

Example

```tsx
size = "md";
```

instead of requiring every caller to provide it.

---

# Composition Over Duplication

Good

```
<Card>

<Button>

<Badge>

```

Bad

Creating

```
DashboardButton

AuthButton

SidebarButton
```

when Button variants solve the problem.

---

# Children

Use children when appropriate.

Example

```tsx
<Card>Content</Card>
```

Avoid creating unnecessary wrapper props.

---

# Component Naming

Use PascalCase.

Examples

```
ThemeToggle

ProjectCard

Navbar

TaskList

DashboardHeader
```

Avoid vague names.

Bad

```
Box

Thing

Item

Component
```

---

# File Naming

Use kebab-case.

Examples

```
theme-toggle.tsx

project-card.tsx

dashboard-header.tsx
```

---

# Folder Organization

Example

```
components/

ui/

layout/

landing/

dashboard/

auth/

projects/

tasks/

calendar/
```

Each folder owns its feature.

---

# Styling

Always use the design system.

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

# Variants

Prefer variants over duplicate components.

Good

```tsx
<Button variant="ghost">

<Button variant="outline">

<Button variant="default">
```

Bad

```
GhostButton

OutlineButton

PrimaryButton
```

---

# Accessibility

Every component must support:

- Keyboard navigation
- Focus states
- Semantic HTML
- Screen readers

Examples

Buttons

Use

```
<button>
```

Links

Use

```
<a>
```

Inputs

Always connect labels.

---

# State

Component state should remain local.

Examples

```
Modal

Dropdown

Accordion

Tabs
```

Server state belongs to TanStack Query.

---

# Side Effects

Avoid unnecessary effects.

Before writing

```tsx
useEffect(...)
```

Ask:

Can this be computed directly?

Can it be derived?

Can it be memoized?

Only use effects when synchronizing with an external system.

---

# API Calls

Never inside components.

Bad

```tsx
useEffect(() => {

axios.get(...)

})
```

Correct

```
Component

↓

Hook

↓

Service

↓

API
```

---

# Reusability Checklist

Before creating a new component ask:

- Does one already exist?
- Can a variant solve this?
- Can I compose existing components?
- Is this feature-specific?
- Should it live in ui?

---

# Loading States

Every asynchronous component should support:

Loading

Error

Empty

Success

Examples

Skeleton

Spinner

Placeholder

---

# Error States

Do not leave blank screens.

Good

```
No projects found.

Create your first project.
```

Bad

Nothing.

---

# Animations

Animations should enhance usability.

Allowed

- Fade
- Slide
- Scale
- Hover
- Focus

Avoid excessive or distracting motion.

Use Framer Motion for complex transitions.

---

# Performance

Avoid unnecessary renders.

Use:

- React.memo (only when justified)
- Lazy loading
- Dynamic imports
- Stable props

Do not optimize prematurely.

---

# Documentation

Reusable components should include:

- Purpose
- Props
- Usage example (where appropriate)

This helps future contributors and AI agents.

---

# AI Agent Rules

Before creating a component:

1. Search `components/ui`.
2. Search the feature folder.
3. Search shared components.
4. Reuse existing components when possible.
5. Use variants before creating duplicates.
6. Follow naming conventions.
7. Respect the design system.
8. Keep components focused.
9. Never place API calls inside components.
10. Keep components composable.

---

# Component Review Checklist

Before merging:

- Component has one responsibility.
- Props are typed.
- Naming follows conventions.
- Styling uses design tokens.
- Accessibility is considered.
- No duplicated functionality.
- No API calls inside the component.
- Loading and error states handled where necessary.
- Reusable before feature-specific.

---

# Examples

## Good

```
Button

↓

ThemeToggle

↓

Navbar

↓

Landing Page
```

Each layer builds upon the previous one.

---

## Bad

```
Navbar

↓

Axios

↓

Database
```

The component bypasses the architecture.

---

# Final Principle

A component should be easy to understand in isolation.

If another engineer—or an AI agent—can open the file and immediately answer:

- What does it do?
- What props does it accept?
- Where should it be used?
- What does it depend on?

Then the component has been designed well.

Every component should make the system easier to extend, not harder to maintain.

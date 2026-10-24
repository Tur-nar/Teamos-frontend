# Folder Structure

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

This document defines the official folder structure for the TM-Management frontend.

Every file must have a logical home.

A predictable folder structure makes the project:

- Easier to navigate
- Easier to scale
- Easier to maintain
- Easier for AI agents to understand

This document is the single source of truth for file organization.

---

# Guiding Principles

The folder structure follows these principles:

- Feature-first where appropriate
- Shared code lives in shared locations
- Business logic stays outside UI
- Reusable components are preferred
- Keep folders shallow unless nesting improves clarity

---

# Root Structure

```
src/
│
├── app/
├── components/
├── hooks/
├── lib/
├── providers/
├── services/
├── schemas/
├── types/
├── utils/
├── constants/
├── data/
├── styles/
├── assets/
└── middleware.ts
```

---

# app/

Contains all application routes using the Next.js App Router.

```
app/

layout.tsx
page.tsx
globals.css

(auth)/
dashboard/
projects/
tasks/
calendar/
settings/
organization/
```

Rules

- Every route owns its page.
- Keep route files small.
- Move reusable UI into components.

---

# Route Groups

Example

```
(auth)

sign-in

sign-up

forgot-password
```

Route groups organize code without affecting URLs.

---

# components/

Reusable UI.

Never place API logic here.

```
components/

auth/

layout/

landing/

dashboard/

projects/

tasks/

calendar/

organization/

settings/

shared/

ui/
```

---

## components/ui/

Contains reusable design system components.

Examples

```
Button

Input

Card

Dialog

DropdownMenu

Table

Tabs

Badge

Avatar

Skeleton

Separator
```

Every screen should reuse these components.

---

## components/auth/

Authentication UI.

Example

```
AuthCard

AuthHeader

PasswordInput

SignInForm

SignUpForm

ForgotPasswordForm
```

---

## components/layout/

Application layout.

Examples

```
Navbar

Sidebar

Section

Footer

PageHeader

Breadcrumbs

Container
```

---

## components/landing/

Marketing pages.

Examples

```
Hero

Features

Testimonials

Pricing

FAQ

CTA

Footer
```

---

## components/dashboard/

Dashboard-specific UI.

Examples

```
StatsCard

RecentTasks

CalendarWidget

ActivityFeed

QuickActions

Charts
```

---

# hooks/

Reusable React hooks.

Rules

- Hooks begin with `use`.
- One responsibility per hook.
- Never place API requests directly inside components.

Example

```
useMounted.ts

useMediaQuery.ts

useDebounce.ts

useCurrentOrganization.ts

usePermissions.ts

useThemePreference.ts
```

---

# services/

Business logic and API communication.

Components never call Axios directly.

Structure

```
services/

auth/

organization/

projects/

tasks/

notifications/
```

Example

```
services/auth/

auth.service.ts

session.service.ts
```

---

# lib/

Application infrastructure.

Contains reusable setup code.

Example

```
lib/

api/

auth/

query/

utils.ts
```

---

## lib/api/

HTTP configuration.

Example

```
client.ts

interceptors.ts
```

---

## lib/query/

TanStack Query configuration.

Example

```
query-client.ts

query-keys.ts
```

---

## lib/auth/

Authentication configuration.

Example

```
auth-client.ts

auth-options.ts
```

---

# providers/

React Context providers.

Examples

```
ThemeProvider

QueryProvider

AuthProvider

OrganizationProvider
```

Providers should only manage application-wide state.

---

# schemas/

Validation schemas.

Use Zod.

Example

```
auth/

organization/

project/

task/
```

---

# types/

Global TypeScript types.

Examples

```
auth.ts

project.ts

task.ts

organization.ts

user.ts

api.ts
```

Rules

Do not duplicate types.

---

# constants/

Application constants.

Examples

```
routes.ts

permissions.ts

roles.ts

query-keys.ts

storage.ts
```

Avoid magic strings throughout the codebase.

---

# utils/

Pure helper functions.

Rules

Utilities:

- Have no React dependencies.
- Have no browser side effects.
- Have no API requests.

Examples

```
format-date.ts

format-currency.ts

capitalize.ts

slugify.ts
```

---

# data/

Static application data.

Examples

```
features.ts

pricing.ts

faq.ts

mock-users.ts
```

No business logic belongs here.

---

# styles/

Additional styling resources.

Examples

```
animations.css

variables.css
```

Primary styling should remain in Tailwind.

---

# assets/

Static assets.

Examples

```
images/

icons/

illustrations/

logos/
```

---

# Public Folder

```
public/

favicon.ico

logo.svg

images/
```

Public assets should not be imported into source control as components unless necessary.

---

# Naming Conventions

Folders

```
kebab-case
```

Examples

```
sign-in

project-details

task-board
```

---

Files

Components

```
PascalCase.tsx
```

Example

```
ProjectCard.tsx
```

Hooks

```
useSomething.ts
```

Example

```
useCurrentUser.ts
```

Services

```
feature.service.ts
```

Example

```
task.service.ts
```

Schemas

```
feature.schema.ts
```

Example

```
sign-up.schema.ts
```

Types

```
feature.ts
```

Example

```
task.ts
```

---

# Import Order

Every file should follow this order:

1. External libraries

```
react

next

zod
```

2. Internal aliases

```
@/components

@/hooks

@/services
```

3. Relative imports

```
./

../
```

4. Styles

---

# Folder Responsibilities

| Folder     | Responsibility    |
| ---------- | ----------------- |
| app        | Routes            |
| components | UI                |
| hooks      | React hooks       |
| services   | Business logic    |
| providers  | Context providers |
| lib        | Infrastructure    |
| schemas    | Validation        |
| types      | Type definitions  |
| utils      | Pure helpers      |
| constants  | Shared constants  |
| assets     | Images & icons    |
| data       | Static data       |

---

# What Does NOT Belong

Do NOT put:

API requests inside components.

Business logic inside pages.

Validation inside services.

Hardcoded routes throughout the project.

Duplicate types.

Duplicate utilities.

---

# AI Agent Rules

Before creating a new file:

1. Search for an existing implementation.
2. Reuse before creating.
3. Place the file in the correct folder.
4. Follow naming conventions.
5. Avoid creating unnecessary nesting.
6. Do not invent new top-level folders without approval.

---

# Folder Creation Rules

Create a new folder only when:

- At least three related files will live there.
- It improves discoverability.
- It reduces complexity.

Do not create folders for single files unless future growth is expected.

---

# Engineering Checklist

Before adding a file:

- Correct folder?
- Correct name?
- Single responsibility?
- Reuses existing code?
- Matches project conventions?

If the answer to any question is **No**, reconsider the location.

---

# Final Principle

A developer should be able to find any file in TM-Management within a few seconds.

If someone has to guess where a file belongs, the folder structure needs improvement.

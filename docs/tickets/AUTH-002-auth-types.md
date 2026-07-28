# AUTH-002 — Better Auth Provider & Session Context

**Status:** Active

**Phase:** Phase 1 — Authentication & Organization Onboarding

**Priority:** High

---

# Objective

Create the global authentication provider responsible for exposing the current authenticated user and session to the entire frontend application.

This provider will become the single source of truth for authentication state.

No component should communicate directly with Better Auth after this provider has been introduced.

---

# Background

AUTH-001 completed the authentication service layer.

Current architecture:

UI

↓

auth.service.ts

↓

Better Auth SDK

↓

Backend

The application still lacks a global authentication state.

Without it:

- Navbar cannot know who is logged in.
- Dashboard cannot know the current user.
- Protected pages cannot check authentication.
- Every page would need to call Better Auth individually.

This ticket solves that problem.

---

# Backend Reference

Source:

docs/API_INTEGRATION.md

Authentication uses:

Better Auth

Session retrieval:

authClient.getSession()

Authentication is cookie-based.

Never store:

- JWT
- Session Token
- Refresh Token

inside:

- localStorage
- sessionStorage

The browser automatically manages authentication cookies.

---

# Scope

## Included

- AuthProvider
- React Context
- useAuth hook
- Session loading
- Loading state
- refreshSession()

---

## Not Included

Do NOT implement:

- Sign In
- Sign Up
- Protected Routes
- Middleware
- Organization
- Redirect Logic
- Route Guards
- Permission Checks

These belong to later tickets.

---

# Allowed Files

Create or modify only:

src/providers/auth-provider.tsx

src/hooks/use-auth.ts

src/app/providers.tsx

---

# Forbidden Files

Do not modify:

middleware.ts

layout.tsx

auth.service.ts

components/

pages/

services/

API routes

---

# Functional Requirements

The provider must expose:

- session
- user
- loading
- refreshSession()

The provider must:

- load session once on mount
- expose loading state
- update context after refreshSession()
- provide context to children

---

# Architecture

Application

↓

Providers

↓

AuthProvider

↓

React Context

↓

useAuth()

↓

Application Components

After this ticket:

Components should consume

useAuth()

instead of

authClient.getSession()

---

# Engineering Rules

Follow:

docs/ENGINEERING_RULES.md

docs/ARCHITECTURE.md

docs/STATE_MANAGEMENT.md

docs/API_INTEGRATION.md

---

# Acceptance Criteria

The ticket is complete when:

- AuthProvider exists
- useAuth() exists
- Session loads automatically
- Loading state exists
- refreshSession() exists
- No localStorage
- No JWT storage
- No redirects
- No middleware
- No authentication UI
- TypeScript passes
- ESLint passes
- Production build passes

---

# Verification

Run:

npm run lint

npx tsc --noEmit

npm run build

All commands must complete successfully.

---

# Deliverable

The frontend now has a global authentication context that every future feature can consume.

This becomes the foundation for:

- Protected Routes
- Navbar User Menu
- Dashboard
- Organization Switching
- Role-Based Access Control

---

# Dependencies

Requires:

✅ AUTH-001

Blocks:

AUTH-003

AUTH-004

AUTH-005

AUTH-006

---

# Definition of Done

- Code implemented
- Verified
- Reviewed
- Approved
- Moved to docs/tickets/completed/

STOP.

## Wait for review before starting another ticket.

# Code Review Checklist (Lead Engineer Review)

Before approving this ticket, verify each of the following carefully.

## 1. File Structure

Expected files:

src/
├── providers/
│ └── auth-provider.tsx
│
├── hooks/
│ └── use-auth.ts
│
└── app/
└── providers.tsx

No unrelated files should be created.

---

## 2. Separation of Concerns

Verify that:

✓ auth-provider.tsx

ONLY

- creates context
- manages session state
- exposes provider

It should NOT:

- navigate
- redirect
- display UI
- call toast
- perform login
- perform signup

---

## 3. Hook Design

Open

use-auth.ts

Check that:

✓ it only wraps

useContext()

✓ it throws a helpful error if used outside AuthProvider

Example:

"useAuth must be used inside AuthProvider."

No other business logic should exist.

---

## 4. Session Loading

Inside AuthProvider verify:

✓ session loads automatically

using

authClient.getSession()

inside

useEffect()

or an equivalent initialization pattern.

There should NOT be repeated session requests on every render.

---

## 5. Loading State

Confirm there is:

loading

Example:

loading = true

↓

fetch session

↓

loading = false

The provider should never leave loading permanently true.

---

## 6. refreshSession()

Confirm a function exists that:

calls

authClient.getSession()

updates

session

user

loading (if applicable)

No duplicate code should exist.

If the AI duplicated logic,

suggest extracting a helper function.

---

## 7. React Context

Verify the context contains only:

session

user

loading

refreshSession

Nothing else.

Do NOT allow:

organization

permissions

roles

notifications

Those belong to future tickets.

---

## 8. No Security Violations

Search project for:

localStorage

sessionStorage

token

jwt

There should be

NO

manual storage of authentication.

Authentication must remain cookie-based.

---

## 9. No Architecture Violations

Verify:

Components

↓

useAuth()

↓

AuthProvider

↓

authClient

↓

Backend

Components should NEVER call

authClient.getSession()

directly anymore.

---

## 10. TypeScript Quality

Look for:

any

as any

unknown

non-null assertions (!)

These should not be introduced unless absolutely necessary.

Prefer inferred types.

---

## 11. Error Handling

Verify failed session fetches:

do NOT crash the application.

Instead:

session → null

user → null

loading → false

---

## 12. Performance

Ensure:

Provider fetches session once on mount.

It should NOT continuously rerender.

It should NOT repeatedly fetch session.

---

## 13. Build Verification

Run:

npm run lint

npx tsc --noEmit

npm run build

All three must pass.

---

## 14. Engineering Score

Rate the implementation.

Architecture:
/10

Readability:
/10

Type Safety:
/10

Performance:
/10

Scalability:
/10

Maintainability:
/10

Overall:
/10

Only approve if:

Overall ≥ 9/10

Otherwise request changes.

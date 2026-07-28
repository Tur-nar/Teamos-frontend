# AUTH-001 — Authentication Service Layer

**Phase:** Phase 1 — Authentication & Organization Onboarding

**Priority:** 🔴 Critical

**Estimated Difficulty:** Medium

**Estimated Time:** 45–90 minutes

**Status:** 🟡 Ready

**Owner:** Frontend

---

# Objective

Implement the Authentication Service Layer for TM-Management.

This layer acts as the single abstraction between the UI and Better Auth.

After this ticket, **no React component should call `authClient` directly**.

Every authentication-related operation must pass through the service layer.

This keeps the project modular, scalable, testable, and aligned with the project's architecture.

---

# Business Context

TM-Management uses **Better Auth** with **secure cookie-based session authentication**.

Authentication is **not** handled with JWTs stored in localStorage.

The browser automatically manages secure HttpOnly cookies.

The frontend is responsible only for:

- requesting authentication
- sending user input
- receiving responses
- displaying loading states
- displaying success or error states

The frontend never manages authentication tokens directly.

---

# Required Reading

Before implementing this ticket, carefully read the following documents in order:

1. README.md
2. AGENTS.md
3. docs/PROJECT_CONTEXT.md
4. docs/ARCHITECTURE.md
5. docs/API_INTEGRATION.md
6. docs/CODE_STYLE.md
7. docs/ENGINEERING_RULES.md

These documents are the source of truth.

---

# Backend Source of Truth

The backend API documentation for Phase 1 is the contract.

Do NOT invent:

- endpoints
- request bodies
- response bodies
- authentication flow

Use only the documented Better Auth SDK methods.

---

# Files Allowed To Modify

Required

```
src/services/auth/auth.service.ts
```

Optional

```
src/types/auth.ts
```

---

# Files That Must NOT Be Modified

```
src/components/
```

```
src/app/
```

```
src/providers/
```

```
src/hooks/
```

```
middleware.ts
```

```
Navbar.tsx
```

```
AuthButtons.tsx
```

No UI work is part of this ticket.

---

# Existing Architecture

Current architecture:

```
React Component

↓

auth.service.ts

↓

authClient

↓

Better Auth

↓

Backend

↓

Cookie Session
```

Maintain this architecture.

Never bypass the service layer.

---

# Tasks

Implement the following functions inside

```
src/services/auth/auth.service.ts
```

## Authentication

- signUpUser()
- signInUser()
- signOutUser()
- getSession()

---

## Organization

- createOrganization()
- setActiveOrganization()
- listOrganizations()
- inviteMember()
- acceptInvitation()

---

# Engineering Requirements

Every function must:

- be async
- be strongly typed
- use authClient
- return Better Auth responses directly
- contain no UI logic
- contain no React logic

---

# Forbidden

Do NOT

❌ Use Axios

❌ Import client.ts

❌ Add toast notifications

❌ Redirect users

❌ Navigate pages

❌ Manage loading state

❌ Catch errors unless transforming them

❌ Duplicate logic

---

# Expected Folder Structure

```
src/

services/
    auth/
        auth.service.ts
```

---

# Expected Architecture

```
React Component

↓

auth.service.ts

↓

authClient.signIn.email()

↓

Backend
```

Never:

```
React Component

↓

authClient
```

---

# Code Quality Rules

Follow:

- Single Responsibility Principle
- Small functions
- Readable code
- Reusable code
- Strong TypeScript
- No duplicated logic

---

# Deliverables

The implementation should export:

- signUpUser
- signInUser
- signOutUser
- getSession
- createOrganization
- setActiveOrganization
- listOrganizations
- inviteMember
- acceptInvitation

---

# Acceptance Criteria

✅ Project builds successfully

✅ No TypeScript errors

✅ No ESLint errors

✅ No duplicated code

✅ Uses authClient exclusively

✅ No UI logic

✅ Functions are reusable

---

# Review Checklist

Before considering this ticket complete, verify:

## Architecture

- Does every function belong inside the service layer?
- Is the service the only layer communicating with Better Auth?

---

## API

- Are only documented Better Auth SDK methods used?
- Are there any invented endpoints?

---

## Type Safety

- Any use of `any`?
- Any unnecessary type assertions?
- Are types reused where possible?

---

## Separation of Concerns

- Any React code inside the service?
- Any JSX?
- Any routing logic?
- Any toast notifications?

---

## Maintainability

- Can another engineer understand the file quickly?
- Are function names descriptive?
- Is the file organized logically?

---

# AI Deliverables

After implementation, provide:

1. A summary of every function created.
2. Any assumptions made.
3. Any missing frontend types that should exist.
4. Suggested improvements (do not implement them).

---

# Stop Condition

After completing this ticket:

STOP.

Do not begin:

- authentication hooks
- providers
- middleware
- navbar integration
- protected routes

Wait for code review before continuing.

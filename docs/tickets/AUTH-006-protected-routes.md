# AUTH-006 — Protected Routes

## Status

🟡 Planned

---

# Objective

Implement the application's route protection mechanism for **Phase 1 — Authentication & Organization Onboarding**.

This ticket is responsible for ensuring that authenticated and unauthenticated users are routed correctly based on the project's existing authentication architecture.

This is **not** a routing redesign.

This is **not** a permissions system.

This is **not** organization authorization.

It is only responsible for enforcing authentication boundaries.

---

# Background

The project already contains the required infrastructure:

- Better Auth
- Auth Service
- Auth Provider
- Route Registry
- Route Classification Helpers
- proxy.ts

Previous engineering reviews confirmed that these pieces already exist.

The remaining responsibility is to ensure they are correctly integrated into a complete protection flow.

---

# Scope

This ticket includes reviewing and implementing only the following:

- proxy.ts
- src/constants/routes.ts
- Better Auth session lookup
- redirects for protected routes
- redirects for auth-only routes

No other areas of the application are in scope.

---

# Requirements

## Protected Routes

Unauthenticated users must not access protected pages.

Protected routes are determined exclusively through:

- isProtectedRoute()

When an unauthenticated user attempts to access a protected page:

Protected Route

↓

Redirect

↓

/sign-in

---

## Auth-Only Routes

Authenticated users should not remain on authentication pages.

Authentication pages are determined exclusively through:

- isAuthPage()

When an authenticated user visits:

- /sign-in
- /sign-up

they should be redirected to:

/dashboard

---

## Public Routes

Public routes must remain accessible to everyone.

Example:

- /

must never require authentication.

---

## Route Registry

The route registry remains the single source of truth.

Do not hardcode route paths inside proxy.ts.

Continue using:

- isProtectedRoute()
- isAuthPage()

---

## Session Source

Authentication state must continue to come from Better Auth.

Do not introduce:

- manual cookie parsing
- JWT decoding
- duplicated auth state
- custom authentication logic

Reuse the existing architecture.

---

# Out of Scope

The following belong to later tickets:

- Role-based permissions
- Organization authorization
- RBAC
- Permission helpers
- Route metadata expansion
- Multi-tenant routing

Do not implement them.

---

# Acceptance Criteria

The ticket is complete when:

- Protected routes redirect unauthenticated users.
- Auth pages redirect authenticated users.
- Public routes continue working.
- proxy.ts uses the existing route registry.
- No duplicate authentication state is introduced.
- No architectural boundaries are violated.

---

# Files Expected

Review only files relevant to route protection.

Examples include:

- proxy.ts
- src/constants/routes.ts

Only modify additional files if strictly required.

---

# Engineering Principles

Maintain the existing architecture.

Pages

↓

Components

↓

Hooks

↓

Services

↓

Better Auth

↓

Backend

This ticket must not bypass or replace any existing layer.

---

# Definition of Done

- Authentication boundaries are enforced.
- Route registry remains the single source of truth.
- Architecture remains unchanged.
- Lint passes successfully.
- No unnecessary abstractions are introduced.
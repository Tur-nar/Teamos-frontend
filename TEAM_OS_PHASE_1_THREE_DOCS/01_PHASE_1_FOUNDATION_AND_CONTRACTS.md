# TeamOS Phase 1 — Frontend Rebuild

## Purpose

Phase 1 mission, architecture rules, backend boundary, authentication, Better Auth, API contracts, organizations, data model, and shared frontend types/query conventions.

## Important

This is part of the three-document Phase 1 source of truth. Read `01_PHASE_1_FOUNDATION_AND_CONTRACTS.md` first, then use the document relevant to the implementation task.

# TeamOS / TM-Management Frontend — Phase 1 Source of Truth

> **Purpose:** Implementation contract for the Phase 1 frontend agent.
>
> **Source:** Supplied TeamOS/TM-Management architecture, API, and AUTH-007 handoff documents.
>
> **Current frontend workspace:** `~/Developer/teamos-frontend-rebuild`
>
> **Backend state:** The TeamOS/NestJS backend is **not running locally**. Never invent backend behavior or replace the backend with a fake Next.js implementation.

## 1. Phase 1 Mission

Phase 1 = **Authentication + Organization Entry**.

```text
Sign up
  ↓
Authenticated session
  ↓
Organization entry
  ├── Create organization → owner
  └── Accept email invitation → assigned role
  ↓
Set active organization
  ↓
Complete onboarding
  ↓
Dashboard
```

Phase 2 covers departments, teams, supervisors, members, and broader RBAC/domain features. Do not expand Phase 1 into those features.

## 2. Non-Negotiable Architecture

```text
Page
  ↓
Hook
  ↓
Service
  ↓
Better Auth / NestJS API
```

Authentication:

```text
Better Auth session
  ↓
AuthProvider
  ↓
useAuth()
  ↓
Pages / hooks
```

Organization server state:

```text
Better Auth organization APIs
  ↓
organization service
  ↓
TanStack Query
  ↓
useOrganizations()
  ↓
Onboarding UI
```

### Page
Owns JSX, layout, presentation, local form state, interactions, visual loading/error/success states, and page-level navigation.

Must NOT:
- import `authClient` directly
- call Better Auth directly
- call organization APIs directly
- implement TanStack Query directly
- duplicate organization server state

### Hook
Owns `useQuery`, `useMutation`, server-state fetching, mutation orchestration, session refresh, query invalidation, and simple state/actions exposed to pages.

Must NOT own JSX, routing, page layout, or presentation-specific UI.

**Hard rule:** no manual `useEffect` organization/invitation fetching. TanStack Query is the server-state source of truth.

### Service
`auth.service.ts` is the application boundary around Better Auth.

Owns:
- Better Auth calls
- response unwrapping
- Better Auth errors
- domain normalization

Must NOT contain React, hooks, JSX, routing, UI state, toast logic, or TanStack Query.

Do not bypass this layer.

## 3. Backend Boundary

Better Auth:

```text
/api/auth/*
```

NestJS custom API:

```text
/api/v1/*
```

Do not merge these paths.

## 4. Authentication Protocol

Authentication is **cookie-based session management**.

Never:
- store auth/session tokens in `localStorage`
- implement custom JWT authentication
- manually manage the Better Auth cookie
- introduce NextAuth/Auth.js/Clerk/Auth0
- create a second session provider

The browser receives the server session cookie and sends it with credentialed requests.

## 5. Better Auth Client

Documented pattern:

```ts
import { createAuthClient } from "better-auth/react";
import { organizationClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  plugins: [organizationClient()],
});
```

A supplied historical frontend implementation instead used:

```ts
const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

const authBaseUrl = apiBaseUrl?.endsWith("/api")
  ? apiBaseUrl.slice(0, -"/api".length)
  : apiBaseUrl;

export const authClient = createAuthClient({
  baseURL: authBaseUrl,
  basePath: "/api/auth",
  plugins: [
    organizationClient({
      ac,
      roles,
    }),
  ],
});
```

**Do not blindly choose between these while the backend is unavailable.** Keep URL configuration centralized in `src/lib/auth/auth-client.ts` and verify the real backend mount when available.

## 6. Environment

Required public variable:

```env
NEXT_PUBLIC_API_URL=<TeamOS backend base URL>
```

The current rebuild has no `.env`. An `.env.example` may document the variable, but do not invent a real backend URL or commit secrets.

## 7. Expected Dependencies

The supplied architecture expects:

```text
better-auth
@tanstack/react-query
axios
```

The current rebuild does not have them installed yet.

Install only dependencies genuinely required by Phase 1.

## 8. Better Auth Core API

### Sign up

```text
POST /api/auth/sign-up/email
```

```ts
authClient.signUp.email({
  name,
  email,
  password,
});
```

Body:

```json
{
  "name": "Jane Doe",
  "email": "user@example.com",
  "password": "securepassword123"
}
```

User includes `onboarded`.

Backend config requires:

```ts
emailAndPassword: {
  enabled: true,
  requireEmailVerification: true,
}
```

Do not invent undocumented email-verification endpoints.

### Sign in

```text
POST /api/auth/sign-in/email
```

```ts
authClient.signIn.email({ email, password });
```

### Sign out

```text
POST /api/auth/sign-out
```

```ts
authClient.signOut();
```

### Get session

```text
GET /api/auth/get-session
```

SDK:

```ts
authClient.getSession()
```

or session hook:

```ts
authClient.useSession()
```

The user object contains `onboarded`; session may contain `activeOrganizationId`.

## 9. Better Auth Organization API

### Create

```text
POST /api/auth/organization/create
```

```ts
authClient.organization.create({
  name,
  slug,
  logo,
  brandColor,
});
```

Creator becomes `owner`.

### Set active

```text
POST /api/auth/organization/set-active
```

```ts
authClient.organization.setActive({
  organizationId,
});
```

Must happen after organization creation and invitation acceptance.

### List organizations

```text
GET /api/auth/organization/list
```

```ts
authClient.organization.list()
```

### Invite

```text
POST /api/auth/organization/invite
```

```ts
authClient.organization.inviteMember({
  email,
  role,
});
```

Roles:

```text
admin
supervisor
member
```

The Better Auth organization plugin sends the invitation email.

### Accept invitation

```text
POST /api/auth/organization/accept-invitation
```

```ts
authClient.organization.acceptInvitation({
  invitationId,
});
```

### List received invitations

Use:

```ts
authClient.organization.listUserInvitations()
```

Pending invitations are determined by:

```ts
invitation.status === "pending"
```

The identifier is:

```ts
invitation.id
```

**Never invent `organization.pendingInvitationId`.**

## 10. Custom NestJS API

Axios pattern:

```ts
import axios from "axios";

export const client = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
```

Pages must not call Axios directly.

### Upload organization logo

```text
POST /api/v1/upload/org-logo
```

`multipart/form-data`, field `logo`.

Rules:
- session required
- no `x-org-id` required because organization does not yet exist
- max 5 MB
- JPEG/PNG/GIF/WEBP

Response:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Success",
  "data": {
    "url": "https://..."
  }
}
```

### Complete onboarding

```text
PATCH /api/v1/users/me/complete-onboarding
```

No body. No `x-org-id`.

Sets `User.onboarded = true`. Idempotent.

Response:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Onboarding completed",
  "data": {
    "onboarded": true
  }
}
```

### Current user

```text
GET /api/v1/users/me
```

Requires session + active organization. Do not call it merely to obtain `onboarded`; Better Auth session already contains that flag.

### Memberships

```text
GET /api/v1/users
```

Used later for tenant switching.

### Brand color

```text
PATCH /api/v1/users/organization-branding
```

```json
{
  "brandColor": "#2563EB"
}
```

Requires active organization and owner/admin.

## 11. Relevant Data Model

User:

```prisma
onboarded Boolean @default(false)
```

Organization:

```prisma
brandColor String?
```

Better Auth organization config registers `brandColor` as an additional field with `input: true`, so it can be submitted during organization creation.

Better Auth owns organization/member/invitation/session/user/account models. Do not hand-roll competing auth models.

Do not use Better Auth generic Teams as TeamOS Departments.

## 12. Frontend Types

Centralized normalized organization model:

```ts
OrganizationSummary
```

The supplied implementation derives it from the actual Better Auth return type:

```ts
type OrganizationListResult =
  Awaited<ReturnType<typeof authClient.organization.list>>;

type OrganizationRecord =
  NonNullable<OrganizationListResult["data"]>[number];

export type OrganizationSummary = Pick<
  OrganizationRecord,
  "id" | "name" | "slug" | "logo"
>;
```

Invitation fields documented in the supplied frontend material:

```text
id
organizationId
organizationName?
organizationSlug?
email
role
status
expiresAt
createdAt
inviterId?
```

Do not invent fields. Inspect installed Better Auth types when uncertain.


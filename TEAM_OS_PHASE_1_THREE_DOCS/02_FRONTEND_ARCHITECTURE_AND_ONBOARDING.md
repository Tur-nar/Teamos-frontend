# TeamOS Phase 1 — Frontend Rebuild

## Purpose

Frontend layering, AuthProvider, routing, owner onboarding, invitee onboarding, invitations, organization creation, logo upload, completion, and dashboard flow.

## Important

This is part of the three-document Phase 1 source of truth. Read `01_PHASE_1_FOUNDATION_AND_CONTRACTS.md` first, then use the document relevant to the implementation task.

## 13. Query Keys

Use centralized keys:

```ts
export const SESSION_QUERY_KEY = ["auth", "session"] as const;

export const ORGANIZATIONS_QUERY_KEY = ["organizations"] as const;

export const INVITATIONS_QUERY_KEY =
  ["organizations", "invitations"] as const;
```

After create/accept:
- refresh session
- invalidate organization query
- invalidate invitation query as appropriate

## 14. AuthProvider

Intended context:

```ts
export type AuthContextValue = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  refreshSession: () => Promise<void>;
};
```

Infer Better Auth types:

```ts
type SessionData = typeof authClient.$Infer.Session;
type Session = SessionData["session"];
type User = SessionData["user"];
```

`useAuth()` consumes this provider. Do not create another provider.

## 15. Routing Rules

Dashboard redirects to `/onboarding` if:

```text
session.user.onboarded === false
OR
organizations.length === 0
```

Dashboard is allowed if:

```text
session.user.onboarded === true
AND
organizations.length > 0
```

Unauthenticated protected-route access ultimately goes to `/sign-in`.

Before creating/modifying `proxy.ts`:
1. inspect the actual repository
2. verify Next.js 16.4 proxy convention
3. determine intended protected routes
4. avoid duplicate protection
5. never blindly create middleware/proxy logic

Do not hide route flashes with CSS.

## 16. Two-Way Onboarding

### Create

```text
Create workspace
  ↓
Organization name
  ↓
Editable slug
  ↓
Optional brand color
  ↓
Optional logo
  ↓
Create organization
  ↓
Become owner
  ↓
Set active organization
  ↓
Optional teammate invites
  ↓
Complete onboarding
  ↓
Dashboard
```

Slug may be auto-derived from the name.

### Join

```text
Invitation email
  ↓
Sign up/sign in if necessary
  ↓
Actual invitation ID
  ↓
Review invitation
  ↓
Accept
  ↓
Set active organization
  ↓
Complete onboarding
  ↓
Dashboard
```

**No invitation codes.** The user never manually types an invitation ID. The email link may contain `/invite/[invitationId]`; alternatively the authenticated user may discover the invitation through `listUserInvitations()`.

## 17. Invitation Rules

Use the real Better Auth invitation list.

Do not create:

```ts
organization.pendingInvitationId
```

After acceptance:

```text
accept invitation
  ↓
set active organization
  ↓
refresh session
  ↓
invalidate organizations
  ↓
invalidate invitations
  ↓
organization becomes visible
  ↓
invitation leaves pending state
```

If the actual types support multiple pending invitations, do not arbitrarily hide them.

## 18. Create Organization + Logo Sequence

Without logo:

```text
organization.create({ name, slug, brandColor })
  ↓
setActive(organizationId)
```

With logo:

```text
POST /api/v1/upload/org-logo
  ↓
{ url }
  ↓
organization.create({
  name,
  slug,
  logo: url,
  brandColor,
})
  ↓
setActive(organizationId)
```

## 19. Optional Invite Step

Creator may invite 1–5 teammates.

Allowed roles:

```text
admin
supervisor
member
```

The invite step is skippable. Individual invite errors should not unnecessarily block wizard progression.

## 20. Completion

Final API:

```text
PATCH /api/v1/users/me/complete-onboarding
```

Then:

```text
refresh session
→ invalidate relevant queries
→ navigate /dashboard
```

Never fake completion by only changing local state.


# TeamOS Phase 1 — Frontend Rebuild

## Purpose

UI/UX quality, loading/error handling, RBAC, current rebuild state, agent workflow, backend-unavailable constraints, source tensions, non-goals, verification, and definition of done.

## Important

This is part of the three-document Phase 1 source of truth. Read `01_PHASE_1_FOUNDATION_AND_CONTRACTS.md` first, then use the document relevant to the implementation task.

## 21. UI/UX Quality Bar

Professional, modern, intentional, calm, responsive, accessible, production-ready.

Must have meaningful:
- hierarchy
- primary actions
- spacing
- descriptions
- loading
- empty
- success
- error states
- mobile behavior
- keyboard accessibility
- focus states

Avoid:
- excessive gradients
- unnecessary animation
- giant paragraphs
- nested card clutter
- fake statistics
- unnecessary icons/dependencies

Two onboarding choices must be immediately clear:

**Create an organization**
> Start a workspace for your own team.

**Join an organization**
> Accept an invitation and join an existing team workspace.

## 22. Loading / Empty / Error

Create:

```text
Create Organization
        ↓
Creating...
```

Disable during submission.

Join:

```text
Join Organization
        ↓
Joining...
```

Disable during submission.

No org + no invitation: clearly explain the user does not belong to an organization yet and guide them to Create or Join.

Existing organizations: show at least name and slug. Do not invent metadata.

## 23. Error Contract

NestJS errors:

```json
{
  "success": false,
  "statusCode": 400,
  "message": "File size must be less than 5MB"
}
```

Common:
- `400` validation/upload/slug conflict
- `401` missing/expired session
- `403` insufficient role or active-org requirement
- `404` organization not found

Better Auth uses:

```ts
{ data, error }
```

Never guess response shapes.

Never use:

```ts
as any
```

or:

```ts
@ts-ignore
```

or arbitrary casts to suppress incorrect types.

## 24. RBAC Relevant to Phase 1

| Role | Scope |
|---|---|
| `owner` | Full organization control |
| `admin` | Administrative control except other admins/owner |
| `supervisor` | Team-scoped task/target work |
| `member` | Own assigned tasks/self-service |

Do not build Phase 2 RBAC screens.

## 25. Current Rebuild State

Current frontend:
- Next.js 16.4.0
- React 19.3.0
- TypeScript
- Tailwind 4
- shadcn/Radix
- Lucide
- `clsx`
- `tailwind-merge`

Not installed yet:
- `better-auth`
- `@tanstack/react-query`
- `axios`

Currently absent:
- `.env`
- `proxy.ts`
- `middleware.ts`
- local TeamOS backend

Temporary routes exist for:

```text
/sign-in
/sign-up
/onboarding
/dashboard
```

They are placeholders.

## 26. Agent Workflow

### Before coding
Inspect and report:
1. current page behavior
2. routing
3. package state
4. UI components
5. app structure
6. files to change
7. dependencies to add
8. assumptions unverified because backend is offline

### While coding
- follow this architecture
- use real Better Auth SDK methods
- inspect installed Better Auth types
- never guess response shapes
- never create fake backend endpoints
- no second auth system
- no localStorage auth
- no page-level Better Auth calls
- no manual effect-based server-state fetching
- no `as any`
- no `@ts-ignore`
- no weakened TS/ESLint
- no unrelated feature work

### Backend unavailable
Static validation is valid:
- TypeScript
- lint
- component rendering
- structure
- service contract
- query/hook wiring

Do **not** claim real authentication, cookies, organization creation, invitation acceptance, or backend responses were runtime-tested until a real backend is connected.

## 27. Verification

Run both:

```bash
npm run lint
npx tsc --noEmit
```

Both must pass.

When a real backend exists, browser verification must cover:
- unauthenticated `/onboarding`
- authenticated user with no organization
- create organization
- genuine pending invitation
- existing organization
- loading/duplicate prevention
- active organization
- session refresh
- query invalidation
- no redirect loops
- no console errors
- no uncontrolled repeated network requests

## 28. Source-Document Tensions

### Better Auth base URL
One source uses `baseURL: NEXT_PUBLIC_API_URL`; another uses `baseURL + basePath: "/api/auth"` with `/api` stripped if present.

**Resolution:** inspect actual backend mounting when available. Keep URL logic centralized.

### `brandColor`
One older service snippet omitted it, but the newer API/config docs explicitly support it through organization additional fields with `input: true`.

**Resolution:** use the documented current contract and verify installed SDK types.

### Invitation route vs invitation list
Docs support email links such as `/invite/[invitationId]` and also `listUserInvitations()`.

**Resolution:** both use the real invitation ID. No codes, no manually entered IDs, no invented `pendingInvitationId`.

## 29. Explicit Non-Goals

Do not implement:
- departments
- department CRUD
- supervisor management
- member administration screens
- task management
- dashboard analytics
- billing
- notifications
- Socket.io
- Redis
- Recharts
- custom JWT
- localStorage auth
- alternative auth providers
- Better Auth Teams as Departments
- fake backend implementation

## 30. Definition of Done

Phase 1 frontend is structurally complete when:
- sign-up works through the service boundary
- sign-in works through the service boundary
- sign-out boundary exists
- session is exposed through `AuthProvider/useAuth`
- protected routing architecture is established without duplication
- organizations use TanStack Query
- invitations use TanStack Query
- create organization exists
- active org is set after creation
- pending invitation flow exists
- invitation acceptance uses the real invitation ID
- active org is set after acceptance
- completion endpoint is wired
- dashboard transition is wired
- no localStorage auth
- no page directly calls Better Auth
- no guessed Better Auth response shapes
- no `as any`
- no `@ts-ignore`
- lint passes
- TypeScript passes
- backend-dependent runtime claims are withheld until a real backend exists

## 31. Final Principle

The agent is not inventing TeamOS.

```text
Understand contract
      ↓
Inspect frontend
      ↓
Implement cleanly
      ↓
Respect backend boundary
      ↓
Lint + TypeScript
      ↓
Runtime-test only what exists
      ↓
Review before shipping
```

When a contract is unclear: **inspect the supplied source or actual installed/backend types. Do not guess.**

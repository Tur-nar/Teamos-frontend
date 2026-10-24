# AI IMPLEMENTATION PROMPT — AUTH-007

You are implementing **AUTH-007 — Organization Onboarding & Invitation Entry Flow** in the TM-Management frontend.

You are acting as a fast junior developer under senior engineering supervision.

Your job is to **inspect carefully, implement exactly what the ticket requires, avoid unnecessary changes, and verify your work**.

Do not redesign the project.

Do not refactor unrelated code.

Do not invent APIs.

Do not guess.

---

## 1. Read First

Before changing anything, inspect:

```text
AUTH-006 implementation
AUTH-007 ticket
package.json
src/lib/auth/auth-client.ts
src/lib/auth/access-control.ts
src/services/auth/auth.service.ts
src/providers/auth-provider.tsx
src/hooks/use-auth.ts
src/hooks/auth/
src/types/auth.ts
src/types/organization.ts
src/constants/routes.ts
src/lib/query/query-keys.ts
src/app/(onboarding)/
src/app/(dashboard)/
proxy.ts
```

Also inspect the current Git state:

```bash
git status
git diff --stat
git log --oneline --decorate -10
```

Do not reset, revert, checkout, or delete existing work.

---

# 2. Critical Context

AUTH-006 was the stable authentication baseline.

The current branch contains experimental AUTH-007 work.

There is already an onboarding page that references:

```text
@/hooks/organization/use-organizations
```

but that hook may be missing.

If it is missing, **rebuild the missing implementation correctly**.

Do not respond by deleting the onboarding page.

Do not roll back AUTH-006.

Do not recreate the entire authentication system.

---

# 3. Inspect Better Auth Before Coding

The installed dependency is:

```text
better-auth 1.6.24
```

Verify the actual installed APIs.

Run:

```bash
grep -R "listUserInvitations" node_modules/better-auth -n | head -20
grep -R "acceptInvitation" node_modules/better-auth -n | head -20
grep -R "createOrganization" node_modules/better-auth -n | head -20
grep -R "setActiveOrganization" node_modules/better-auth -n | head -20
grep -R "listOrganizations" node_modules/better-auth -n | head -20
```

Inspect the relevant declaration files.

The installed package is the authority.

Do not use examples from random Better Auth documentation if they conflict with the installed version.

---

# 4. Architecture You Must Follow

Every organization operation must follow:

```text
Page
 ↓
Component
 ↓
Hook
 ↓
Service
 ↓
Better Auth Client
```

Never do this:

```tsx
// WRONG
await authClient.organization.acceptInvitation(...)
```

inside a page or component.

Instead:

```text
component
 ↓
useOrganizations()
 ↓
organization.service
 ↓
authClient.organization
```

---

# 5. First Repair the Missing Organization Layer

Check:

```bash
find src/hooks -maxdepth 3 -type f | sort
find src/services -maxdepth 3 -type f | sort
```

If:

```text
src/hooks/organization/use-organizations.ts
```

does not exist, create it.

If organization service infrastructure does not exist, create the smallest necessary service.

Do not create unnecessary abstractions.

---

# 6. Implement Organization Service

Create/reuse:

```text
src/services/organization/organization.service.ts
```

It should encapsulate the required organization operations.

At minimum:

```text
getOrganizations
getPendingInvitations
createOrganization
acceptInvitation
setActiveOrganization
```

Use the actual Better Auth API signatures discovered in step 3.

Do not invent endpoint names.

Do not call backend APIs manually if Better Auth already provides the required operation.

---

# 7. Implement Organization Hook

Create:

```text
src/hooks/organization/use-organizations.ts
```

The hook should expose the organization state and mutations required by the UI.

It should provide equivalents of:

```text
user
loading

organizations
hasOrganizations
isLoadingOrganizations

pendingInvitations
hasPendingInvitations
isLoadingInvitations

createOrganization
isCreating

acceptInvitation
isAccepting

setActiveOrganization
isSettingActiveOrganization

error
```

Use TanStack Query according to the existing project conventions.

Do not create duplicate authentication state.

Use:

```text
useAuth()
```

for authenticated user/session state where appropriate.

---

# 8. Query Keys

Inspect:

```text
src/lib/query/query-keys.ts
```

Use centralized query keys.

If necessary, add:

```text
ORGANIZATIONS_QUERY_KEY
INVITATIONS_QUERY_KEY
```

or equivalent.

Do not hardcode query keys throughout components.

After successful mutations, invalidate/refetch the relevant queries.

---

# 9. Build TWO Onboarding Experiences

This is the most important requirement.

Do NOT implement one generic page where every user gets the same flow.

There are two paths.

---

## PATH A — INVITED USER

Flow:

```text
Authentication
 ↓
Invitation list
 ↓
Select invitation
 ↓
Invitation onboarding
 ↓
Accept invitation
 ↓
Set active organization
 ↓
Organization dashboard
```

The user must be able to see all pending invitations.

Do not automatically accept the first invitation.

---

## PATH B — ORGANIZATION CREATOR

Flow:

```text
Authentication
 ↓
No organization / no invitation
 ↓
Create organization
 ↓
Owner onboarding
 ↓
Explain roles + invitations
 ↓
Set active organization
 ↓
Organization dashboard
```

These paths must remain conceptually separate.

---

# 10. Invitation List

The invitation experience should show all pending invitations.

Each invitation should show information available from the API, such as:

```text
Organization
Role
Status
Expiration
```

Each invitation must preserve its:

```text
invitationId
```

Do not throw away the ID.

Do not assume only one invitation exists.

---

# 11. Invitation Selection

When the user selects an invitation, preserve the selected invitation ID through the flow.

A reasonable route/state design may use:

```text
/onboarding/invitations/[invitationId]
```

if compatible with the existing routing architecture.

However, inspect the existing routing structure first.

Do not create unnecessary routes if an existing clean solution already exists.

---

# 12. Invitation Onboarding Page

The user should see a preamble such as:

```text
You're joining {organization}

You've been invited as {role}.

Once accepted, this organization will become
your active TM-Management workspace.
```

Then:

```text
Accept Invitation
```

The page must clearly identify the organization and role.

---

# 13. Accept Invitation

When the user clicks accept:

```text
acceptInvitation(invitationId)
```

must be called through:

```text
hook → service → Better Auth
```

Never directly from the component.

Wait for the mutation to succeed.

Only after success:

1. refresh organization state,
2. establish the accepted organization as active,
3. redirect to the correct organization dashboard.

If acceptance fails:

- remain on the page,
- display the error,
- do not redirect.

---

# 14. Organization Creation

Users with no organization and no pending invitations should see organization creation.

Required:

```text
Organization Name
Organization Slug
```

Use existing UI primitives.

Do not build a giant form.

After successful creation:

```text
created organization
 ↓
set active organization
 ↓
owner onboarding
 ↓
dashboard
```

---

# 15. Owner Onboarding

After creation, do not immediately dump the user into the dashboard without context.

Give the owner a short onboarding experience explaining:

```text
Your organization is your workspace.
```

Explain:

```text
Owner
Administrator
Supervisor
Member
```

Explain that owners can invite team members.

Keep this informational.

Do not implement full member management in AUTH-007.

---

# 16. Routing

Inspect:

```text
src/constants/routes.ts
proxy.ts
src/app/(onboarding)/
src/app/(dashboard)/
```

before changing routing.

Use the existing route registry where appropriate.

Required behavior:

### Unauthenticated

```text
/onboarding
→ /sign-in
```

### Existing organization

```text
authenticated
→ organization
→ dashboard
```

### Pending invitation

```text
authenticated
→ invitation list
```

### No organization and no invitation

```text
authenticated
→ create organization
```

---

# 17. Avoid Redirect Loops

This is a high-priority concern.

Do not redirect while:

```text
auth loading
organization loading
invitation loading
```

is unresolved.

Avoid:

```text
onboarding → dashboard → onboarding
```

Avoid:

```text
sign-in → onboarding → sign-in
```

Avoid redirects based on incomplete React state.

First determine the state.

Then decide the destination.

---

# 18. Preserve AUTH-006

Do not modify these unless absolutely necessary:

```text
src/providers/auth-provider.tsx
src/hooks/use-auth.ts
src/hooks/auth/*
src/services/auth/auth.service.ts
src/components/auth/*
src/components/layout/Navbar.tsx
src/constants/routes.ts
```

If one must change:

- make the smallest possible change,
- explain why in your final report.

Do not refactor authentication as part of AUTH-007.

---

# 19. Do Not Touch

Unless compilation genuinely requires it, do not modify:

```text
landing page
marketing components
theme system
unrelated UI
RBAC implementation
backend
future organization-management features
billing
notifications
audit logs
```

---

# 20. Type Safety

The current onboarding page previously produced:

```text
Cannot find module '@/hooks/organization/use-organizations'
```

and:

```text
Parameter 'organization' implicitly has an 'any' type.
```

Your implementation must eliminate these errors properly.

Do not solve the second error with:

```ts
organization: any;
```

Use the actual organization type.

---

# 21. Verify API Response Shapes

Do not guess fields such as:

```text
organization.name
invitation.organizationName
invitation.role
```

without checking the actual Better Auth types/response.

If the API returns nested organization information, use that.

If it returns an organization ID and requires a separate lookup, implement the smallest correct solution.

The installed package determines the actual shape.

---

# 22. Run Verification Frequently

After the implementation:

```bash
npx tsc --noEmit
```

Then:

```bash
npm run lint
```

Then:

```bash
npm run build
```

Fix real errors.

Do not suppress errors.

Do not use:

```ts
// @ts-ignore
```

to hide implementation problems.

Do not disable ESLint rules to make the build pass.

---

# 23. Browser Verification

Run the application.

Verify at minimum:

### Case 1

Unauthenticated user:

```text
/onboarding
```

Expected:

```text
/sign-in
```

### Case 2

Authenticated user with no organization/invitation:

Expected:

```text
organization creation
```

### Case 3

Authenticated user with pending invitation:

Expected:

```text
invitation list
```

### Case 4

Multiple invitations:

Expected:

```text
all pending invitations
```

### Case 5

Select invitation:

Expected:

```text
invitation-specific onboarding
```

### Case 6

Accept invitation:

Expected:

```text
correct organization
→ active organization
→ correct dashboard
```

### Case 7

Create organization:

Expected:

```text
organization created
→ active organization
→ owner onboarding
→ dashboard
```

---

# 24. Before Finishing

Run:

```bash
git status --short
git diff --stat
git diff --check
```

Look for:

- accidental deletions,
- unrelated modifications,
- duplicate files,
- debug logs,
- temporary code,
- commented-out experiments,
- unnecessary dependencies.

Remove only the temporary code you introduced during this task.

Do not delete existing project work.

---

# 25. Git Safety

You are NOT authorized to:

```text
git reset --hard
git checkout .
git restore .
git clean -fd
git rebase
git push
```

Do not destroy existing work.

Do not commit.

The human developer will review the diff and decide when to commit.

---

# 26. Final Report

When finished, report exactly:

### Implemented

List what you actually implemented.

### Files Created

List new files.

### Files Modified

List modified files.

### Routing

Explain the final onboarding routing.

### Invitation Flow

Explain:

```text
list → select → accept → active organization → dashboard
```

### Creation Flow

Explain:

```text
create → owner onboarding → active organization → dashboard
```

### Verification

Report:

```text
npx tsc --noEmit
npm run lint
npm run build
```

with PASS/FAIL.

### Remaining Issues

Only list genuine remaining issues.

Do not claim something works if it was not tested.

---

# 27. Most Important Rule

You are implementing a focused ticket.

Do NOT turn this into:

```text
authentication rewrite
organization management system
RBAC rewrite
dashboard rewrite
routing rewrite
```

The target is only:

```text
AUTHENTICATED USER
       ↓
┌────────────────────────────┐
│                            │
│ Pending Invitation?        │
│                            │
└──────────────┬─────────────┘
               │
        Yes ───┴─── No
         ↓           ↓
 Invitation       Organization
   Flow             Creation
     ↓                 ↓
 Accept             Create
     ↓                 ↓
 Active Org       Owner Onboarding
     ↓                 ↓
 Dashboard        Dashboard
```

Build this cleanly.

Preserve AUTH-006.

Avoid unnecessary changes.

Verify everything.

Do not push.

Do not commit.

Stop when AUTH-007 is correctly implemented and verified.

# TeamOS Phase 1 — Three-Document Source of Truth

This Phase 1 specification is intentionally limited to **three documents**. The content comes from the consolidated source of truth; it has been regrouped by implementation responsibility rather than arbitrarily shortened.

## Reading order

### 1. `01_PHASE_1_FOUNDATION_AND_CONTRACTS.md`
Read this first.

Contains:
- Phase 1 mission and scope
- non-negotiable architecture
- backend boundary
- authentication protocol
- Better Auth client configuration
- environment/dependencies
- auth and organization API contracts
- custom NestJS endpoints
- data model
- frontend types/query conventions

### 2. `02_FRONTEND_ARCHITECTURE_AND_ONBOARDING.md`
Read this when implementing frontend behavior.

Contains:
- Page → Hook → Service → Better Auth architecture
- AuthProvider
- routing/guards
- owner onboarding
- invited-member onboarding
- invitation handling
- organization creation
- logo upload
- onboarding completion
- dashboard transition

### 3. `03_QUALITY_AGENT_WORKFLOW_AND_VERIFICATION.md`
Read this during implementation review and before completion.

Contains:
- UI/UX quality bar
- loading/empty/error states
- error contract
- Phase 1 RBAC
- current rebuild state
- agent workflow
- backend-unavailable constraints
- source-document tensions
- explicit non-goals
- verification
- definition of done

## Agent rule

Do not invent endpoints, response shapes, fields, invitation identifiers, roles, or authentication behavior.

Inspect the repository before changing code.

The previous frontend implementation is reference material, not a copy target.

The backend is not currently running locally, so static/type/build validation must not be presented as successful runtime authentication or invitation testing.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know
This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AGENTS.MD
AI coding agent conventions for this codebase. Assume competence, skip basics, follow these without re-asking.

## 1. Project Context
- **Project:** TM-Management
- **Package manager:** npm · **Node:** v26.4.0 · **Next.js:** v16.2.10

## 2. Stack
Next.js (App Router only) · TypeScript strict · shadcn/ui · Tailwind · TanStack Query v5 · Lucide React · Framer Motion / GSAP (§8) · React Hook Form + Zod.
Don't introduce a different UI/animation/data-fetching/icon library without asking. Flag it if something in this stack seems wrong for a task — don't silently swap it.

## 3. Session Workflow (JSM Skills, if installed)
- `/architect` before anything non-trivial — plan, surface decisions, get confirmation before code. Skip only for trivial fixes.
- `/review` after any feature, before calling it done.
- `/imprint` after any UI component — captures visual patterns into `ui-registry.md`. Run `/imprint audit` first in an unfamiliar codebase.
- `/remember restore` at session start, `/remember save` at session end.
- `/recover` when something breaks: targeted fix → hard reset (context polluted, rebuild fresh) → rethink (foundation itself is wrong).

**Default loop:** `/architect → build → /review → ship`, `/imprint` after every UI component, `/remember` at both ends.

## 4. Core Principles
- **Server Components by default.** `"use client"` only for interactivity/hooks/browser APIs — push the boundary as far down the tree as possible.
- **Server state → TanStack Query. Client/UI state → React state.** Never `useState`+`useEffect` to mirror data a query already owns.
- **No premature abstraction.** Duplicate twice before building a generic/config-driven component.
- **Composition over configuration** — small composable components, not 15 boolean props.
- **Verify, don't assume.** Confirm a package exists before installing, confirm a backend shape against real types/`.api.ts` before inventing one, confirm existing patterns before introducing new ones (see §12).

## 5. Folder Structure
```
app/
├── (auth)/                # public routes, no sidebar
├── (dashboard)/layout.tsx # protected routes, shared layout
├── layout.tsx             # root — providers go here
components/
├── ui/                    # shadcn-generated — don't hand-edit
├── common/                # Navbar, Sidebar, PageHeader, EmptyState
├── forms/                 # LoginForm, RegisterForm, etc.
hooks/<feature>/           # useNotes.ts, useCreateNote.ts — one hook per operation
lib/
├── api/client.ts          # Axios instance + interceptors
├── api/<feature>.api.ts   # one file per feature
├── query-client.ts
├── utils.ts               # cn() + helpers
providers/                 # QueryProvider, AuthProvider — composed once in root layout
store/                     # Zustand — global client state only (auth token, current user)
types/<feature>.types.ts   # flat, per-domain — no feature folders
constants/routes.ts        # all route strings, one source of truth
constants/query-keys.ts    # all query key factories, one source of truth
middleware.ts              # route protection at the edge
```
**Type-first at the top level** (`components/`, `hooks/`, `lib/`, `types/` separated by kind), feature-grouped within. `lib/api/`, `types/`, `components/forms/` stay flat — one file per feature, no folder for a single file. If `middleware.ts` already guards a route group, don't re-check auth inside every page.

## 6. shadcn/ui
- Check shadcn first for every UI need (dialog, dropdown, tooltip, select, command palette, etc.) before hand-building or reaching for a native API.
- Never native `alert()`/`confirm()`/`prompt()` — use `Dialog`/`AlertDialog`.
- Toasts through shadcn's Sonner-based toast only — not `react-hot-toast`, not the deprecated `use-toast`.
- `components/ui/` is generated — wrap and extend, don't edit internals (theme-token setup at install time is the one exception).
- `cva` for variants, `cn()` for all conditional classNames — no string concatenation.

## 7. TanStack Query
- **All query keys live in one factory per resource in `constants/query-keys.ts`** — never scattered per feature, never a bare string. A hardcoded key missing its ID param (`['user']` instead of `['user', userId]`) silently collides across different entities in cache — this has shipped as a real production bug (admin dashboard showing the same user for every row). Always include every variable the query depends on.
  ```ts
  export const noteKeys = {
    all: ['notes'] as const,
    list: (filters: NoteFilters) => [...noteKeys.all, 'list', filters] as const,
    detail: (id: string) => [...noteKeys.all, 'detail', id] as const,
  };
  ```
- API functions in `lib/api/<feature>.api.ts`, PascalCase + `Api` suffix (`GetNotesApi`, `CreateNoteApi`), built on the shared `client.ts` instance — don't duplicate interceptor logic per file.
- **One hook per operation under `hooks/<feature>/`, named `use<Verb><Entity>` mirroring the API function it calls.** Never call Axios directly from a component. This exact shape is the one agents drift from most — follow it precisely, don't improvise a variant.

  **Query hook** — return `useQuery` directly, no wrapping, no destructuring inside the hook:
  ```ts
  export const useNotes = () => {
    return useQuery({
      queryKey: noteKeys.lists(),
      queryFn: GetNotesApi,
    });
  };
  ```

  **Mutation hook** — `queryClient` sourced via `useQueryClient()` inside the hook body (not a module-level singleton import, unless invalidation is genuinely needed outside a component); `mutationFn` as a one-line arrow calling the API function; `onSuccess` invalidates the relevant key(s):
  ```ts
  export const useCreateNote = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (payload: CreateNotePayload) => CreateNoteApi(payload),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: noteKeys.lists() });
      },
    });
  };
  ```
  Reach for optimistic updates (`onMutate` + rollback in `onError`) only when the UX genuinely needs it — don't add that complexity by default.
- Never fetch in `useEffect` — if tempted, it's a query.
- Server Components prefetch via `prefetchQuery` + `HydrationBoundary` where SSR matters.
- Handle loading/error/empty states explicitly — no silent `data?.map(...)` on error.

## 8. Animation: Framer Motion vs GSAP
Pick per-task; both can coexist.
- **Framer Motion:** React-state-driven (enter/exit, `AnimatePresence`), small component-scoped interactions.
- **GSAP:** complex sequenced/scrubbed/scroll-driven timelines, canvas/SVG/imperative work, marketing hero choreography.
- Respect `prefers-reduced-motion`. Keep UI-feedback durations 150–300ms. Clean up GSAP contexts/ScrollTriggers on unmount. Lazy-load animation weight on routes that don't need it.

## 9. Icons & Styling
- Lucide React only, sized via `className` not the `size` prop. Icon-only buttons always get `aria-label`.
- Tailwind utility-first, no CSS modules/styled-components. Theme tokens for color, not hardcoded hex. Mobile-first responsive classes.

## 10. Accessibility (non-negotiable)
Semantic HTML (`<button>` not `<div onClick>`) · keyboard-reachable with visible focus · shadcn Form labels, don't bypass · meaningful `alt` text · color never the only signal.

## 11. Security
- **Access token in memory only** (`store/auth.store.ts`, no `persist` middleware, never `localStorage`/`sessionStorage`). Refresh token in an HttpOnly/Secure/SameSite cookie the frontend never touches directly — anything in `localStorage` is readable by any script that runs on the page, including a compromised dependency.
- **Verify a package exists on the real registry before installing** — agents hallucinate plausible package names and attackers pre-register those exact names as malware (slopsquatting).
- Never `dangerouslySetInnerHTML` on unsanitized input — use DOMPurify if rich text is genuinely required.
- Validate external data (API responses, form input, URL params) with Zod at the boundary — a TS return type is not runtime validation.
- Never log tokens, passwords, or full API responses containing PII.

## 12. Performance
`next/image` and `next/font` always, never raw `<img>`/`@font-face`. `next/dynamic` for heavy client-only components (charts, GSAP sections, editors). Don't reach for `useMemo`/`useCallback` without a measured cost. Import specific GSAP/Framer plugins, not the whole library.

## 13. Code Style
Named exports (except Next.js special files). Files kebab-case, components PascalCase. Early returns over nested conditionals. Types flat per-domain in `types/`.

## 14. Testing
- **Stack:** Vitest + React Testing Library (unit/component), Playwright (e2e).
- Every hook/component/API function tests its primary behavior **and** primary failure mode — not just the happy path (see `/review`, §3).
- Test observable behavior (what a user sees/clicks/types), not internal state or private functions.
- A test that only renders and checks it doesn't crash is not a test.
- Lint + typecheck + tests pass before a feature counts as done — no exceptions, no "follow-up."

## 15. Agent Guardrails
- Don't install new dependencies without flagging first; verify on npm before adding one (§11).
- Don't bypass TanStack Query by fetching directly in a component "just this once."
- Don't hand-edit generated shadcn primitives — wrap them.
- Don't default to client components — justify every `"use client"`.
- Don't invent API/DTO shapes — check existing types/`.api.ts` or ask.
- Ask before large structural changes (folder restructures, routing, state architecture); make small/medium changes directly.
- Match existing codebase patterns over "technically more correct" alternatives.
- Don't skip `/architect` or `/review` to move faster.
- Nothing is done without lint + typecheck + tests passing.
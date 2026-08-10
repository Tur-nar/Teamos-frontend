# Engineering Review Template

> Version: 1.0
>
> Status: Official Engineering Review Template
>
> Applies To:
>
> - Frontend Engineers
> - Tech Leads
> - AI Coding Agents
>
> Last Updated:
>
> August 2026

---

# Purpose

This template defines the standard format for engineering reviews conducted within the TM-Management Frontend project.

Every review should follow this structure to ensure consistency, traceability, and evidence-based decision making.

The objective is not to criticize implementation, but to evaluate whether it aligns with the project's engineering standards and architectural goals.

---

# Review Information

| Field | Value |
|--------|-------|
| Module | |
| Feature | |
| Ticket | |
| Review Date | |
| Reviewer | |
| Review Level | Structural / Architecture / Implementation |
| Status | Pending / Approved / Changes Requested |

---

# Review Scope

Describe exactly what is included in this review.

Example:

- Authentication Hooks
- Query Integration
- Session Management

Anything outside this scope should not be evaluated unless it directly affects the implementation.

---

# Files Reviewed

List every file included in the review.

Example:

```text
src/hooks/auth/use-sign-in.ts

src/hooks/auth/use-sign-up.ts

src/hooks/auth/use-sign-out.ts

src/hooks/auth/use-session.ts
```

---

# Documentation Reviewed

Reference every document consulted during the review.

Example:

- ARCHITECTURE.md
- ENGINEERING_RULES.md
- STATE_MANAGEMENT.md
- COMPONENT_GUIDELINES.md
- API_INTEGRATION.md

---

# Architecture Summary

Briefly describe the architecture being reviewed.

Example:

```text
React Component
        │
        ▼
Authentication Hook
        │
        ▼
Authentication Service
        │
        ▼
Better Auth Client
        │
        ▼
Backend
```

---

# Engineering Observations

Record objective observations only.

Each observation should include:

| Observation | Evidence | Impact |
|-------------|----------|--------|
| | | |
| | | |
| | | |

Avoid subjective opinions.

---

# Strengths

Document what has been implemented well.

Examples:

- Clear separation of concerns.
- Consistent naming.
- Strong type safety.
- Good folder organization.
- Reusable abstractions.

---

# Issues Identified

Document engineering issues discovered during the review.

For each issue include:

| Severity | Description | Recommendation |
|----------|-------------|----------------|
| 🟢 | | |
| 🔵 | | |
| 🟡 | | |
| 🟠 | | |
| 🔴 | | |

Severity Guide

🟢 Conforms

Implementation follows project standards.

🔵 Advisory

Optional improvement.

🟡 Improvement Required

Should be addressed before future development.

🟠 Refactor Required

Current implementation increases engineering risk.

🔴 Architectural Violation

Implementation conflicts with documented architecture.

---

# Standards Compliance

Evaluate compliance with project standards.

| Standard | Status |
|----------|--------|
| Architecture | ✅ / ❌ |
| Engineering Rules | ✅ / ❌ |
| Folder Structure | ✅ / ❌ |
| Naming | ✅ / ❌ |
| Type Safety | ✅ / ❌ |
| Documentation | ✅ / ❌ |

---

# Verification

Verification Checklist

- [ ] TypeScript passes
- [ ] ESLint passes
- [ ] Production build succeeds
- [ ] No unnecessary files modified
- [ ] Ticket objectives satisfied

---

# Review Decision

Choose one outcome.

- ✅ Approved
- 🟡 Approved with Minor Improvements
- 🟠 Changes Requested
- 🔴 Rework Required

Provide a brief explanation supporting the decision.

---

# Follow-up Actions

List any agreed actions resulting from the review.

Example:

- Improve naming consistency.
- Refactor duplicated logic.
- Update documentation.
- Create follow-up ticket.

---

# Review Summary

Provide a concise summary of the review.

Include:

- Overall quality
- Architecture compliance
- Major strengths
- Primary concerns
- Final recommendation

This summary should enable another engineer to understand the review without reading the entire report.

---

# Definition of Done

A review is complete when:

- Scope has been fully evaluated.
- Evidence has been documented.
- Verification has been completed.
- A review decision has been recorded.
- Follow-up actions have been identified where necessary.

---

# Engineering Principle

Review the implementation—not the developer.

Every review should improve the quality of the software, strengthen the architecture, and contribute to the long-term maintainability of the project.
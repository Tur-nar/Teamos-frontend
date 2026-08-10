# AI Engineering Operations

> Version: 1.0
>
> Status: Official Engineering Standard
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

This document defines the standard engineering operations used when collaborating with AI coding agents.

Rather than treating AI as a code generator, TM-Management treats AI as an engineering assistant operating within clearly defined responsibilities.

Every AI task should be expressed as a standardized engineering operation.

This ensures consistency, repeatability, and alignment with the project's architecture and engineering standards.

---

# Engineering Philosophy

AI assists engineering.

AI does not replace engineering.

AI should:

- Read documentation before making changes.
- Respect the project architecture.
- Work only within the requested scope.
- Produce clear implementation summaries.
- Avoid unnecessary modifications.

Final engineering decisions remain the responsibility of the project maintainers.

---

# Required Context

Before executing any operation, the AI must review all relevant documentation.

Typical references include:

- README.md
- PROJECT_CONTEXT.md
- FRONTEND_ROADMAP.md
- ARCHITECTURE.md
- ENGINEERING_RULES.md
- COMPONENT_GUIDELINES.md
- STATE_MANAGEMENT.md
- API_INTEGRATION.md
- REVIEW_PROCESS.md
- REVIEW_TEMPLATE.md

Additional documentation should be consulted when relevant to the requested task.

---

# Operation 1 — Implement Ticket

## Purpose

Implement a single approved engineering ticket.

### Inputs

- Ticket
- Current roadmap phase
- Relevant documentation

### Expected Output

- Completed implementation
- Files changed
- Architecture summary
- Verification results
- Implementation summary

---

# Operation 2 — Review Module

## Purpose

Review a module using the project's review template.

### Inputs

- Module scope
- Relevant documentation
- Files under review

### Expected Output

- Completed engineering review
- Observations
- Strengths
- Risks
- Review decision

---

# Operation 3 — Architecture Review

## Purpose

Verify that implementation follows the documented architecture.

### Focus

- Layered architecture
- Dependency direction
- Separation of concerns
- Public interfaces
- Engineering standards

### Expected Output

Architecture review report.

---

# Operation 4 — Documentation Review

## Purpose

Compare documentation against implementation.

### Verify

- Documentation accuracy
- Missing documentation
- Outdated documentation
- Documentation consistency

### Expected Output

Documentation review report.

---

# Operation 5 — Dependency Analysis

## Purpose

Evaluate relationships between modules.

Review:

- Imports
- Dependency direction
- Coupling
- Shared abstractions
- Circular dependencies

### Expected Output

Dependency analysis report.

---

# Operation 6 — Standards Compliance Review

## Purpose

Evaluate implementation against project standards.

Review compliance with:

- Architecture
- Engineering Rules
- Folder Structure
- Component Guidelines
- State Management
- API Integration

### Expected Output

Compliance report.

---

# Operation 7 — Implementation Summary

## Purpose

Summarize completed work after implementation.

The summary should include:

- Ticket implemented
- Files created
- Files modified
- Architectural impact
- Verification performed
- Remaining work

This summary becomes the primary input for engineering review.

---

# AI Operating Rules

AI agents must:

- Work only within the requested scope.
- Avoid modifying unrelated files.
- Preserve existing architecture.
- Prefer reuse over duplication.
- Follow project naming conventions.
- Respect engineering documentation.
- Produce deterministic implementations.

AI agents must not:

- Invent architecture.
- Ignore project documentation.
- Introduce unnecessary abstractions.
- Modify unrelated modules.
- Expand ticket scope.
- Skip verification when requested.

---

# Standard Engineering Workflow

Every engineering operation follows the same sequence.

```text
Roadmap

↓

Ticket

↓

Implementation

↓

Implementation Summary

↓

Engineering Review

↓

Verification

↓

Documentation Update (if required)

↓

Approval

↓

Merge
```

---

# Relationship to Other Documents

This document should be used together with:

- REVIEW_PROCESS.md
- REVIEW_TEMPLATE.md
- ENGINEERING_RULES.md
- ARCHITECTURE.md
- FRONTEND_ROADMAP.md

These documents collectively define how engineering work is planned, implemented, reviewed, and approved.

---

# Definition of Done

An AI engineering operation is complete when:

- The requested scope has been completed.
- Relevant documentation has been followed.
- Implementation respects the architecture.
- Verification has been performed when required.
- A clear implementation summary has been produced.

---

# Engineering Principle

Use AI to accelerate engineering—not to replace engineering judgment.

AI should produce implementations that are easier to review, easier to maintain, and easier to evolve throughout the lifetime of the project.
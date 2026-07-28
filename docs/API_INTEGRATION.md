# API Integration Guide

> Version: 1.0
>
> Status: Official Engineering Documentation
>
> Applies To:
>
> - Frontend Engineers
> - Backend Engineers
> - AI Coding Agents
>
> Last Updated:
>
> July 2026

---

# Purpose

This document defines the official API integration strategy for the TM-Management frontend.

Every request made from the frontend to the backend must follow the architecture defined here.

No engineer or AI agent should bypass these conventions.

---

# Objectives

The API layer should be:

- predictable
- scalable
- type-safe
- testable
- reusable
- secure

The UI should never communicate directly with HTTP endpoints.

Instead:

```
UI

↓

Hooks

↓

Services

↓

API Client

↓

Backend
```

This separation keeps responsibilities clear.

---

# Architecture

The application follows a layered architecture.

```
Component

↓

TanStack Query Hook

↓

Service

↓

Axios Client

↓

Backend API
```

Every layer has exactly one responsibility.

---

# Folder Structure

```
src/

lib/
    api/
        client.ts

services/
    auth/
    organization/
    dashboard/
    projects/
    tasks/

hooks/

types/
```

---

# Layer Responsibilities

---

## 1. UI Components

Responsibilities

- display data
- trigger actions
- never call axios
- never know endpoint URLs

Good

```
const { data } = useProjects()
```

Bad

```
axios.get("/projects")
```

inside a component.

---

## 2. Hooks

Hooks connect UI to services.

Responsibilities

- caching
- loading
- mutations
- optimistic updates
- invalidation

Example

```
useProjects()

useDashboard()

useTasks()

useCreateTask()
```

Hooks should use TanStack Query.

---

## 3. Services

Services communicate with the backend.

Responsibilities

- build requests
- receive responses
- return typed data

Example

```
services/

auth/

organization/

projects/

tasks/
```

A service should never contain UI logic.

---

## 4. API Client

Single axios instance.

Example

```
lib/api/client.ts
```

Responsibilities

- base URL
- timeout
- headers
- interceptors
- authentication

There should only be ONE axios instance.

Never create axios inside components.

---

# Base URL

Never hardcode.

Always use

```
NEXT_PUBLIC_API_URL
```

Example

```
https://api.tm-management.com
```

Development

```
http://localhost:8000
```

---

# Authentication

Authentication uses Better Auth.

The frontend should never manually manage sessions.

Responsibilities

Better Auth

- session
- cookies
- refresh
- logout

Responsibilities

Frontend

- call auth endpoints
- display loading
- handle errors

---

# Endpoint Organization

Every backend module gets its own service.

Example

```
services/

auth/

organization/

dashboard/

projects/

tasks/

calendar/

notifications/
```

Never mix unrelated endpoints.

Bad

```
api.ts
```

containing everything.

---

# Request Flow

Example

User clicks

```
Create Project
```

↓

Component

↓

Hook

↓

Service

↓

Axios

↓

Backend

↓

Database

↓

Backend

↓

Axios

↓

TanStack Query

↓

Component

↓

UI updates

---

# Response Format

The frontend expects consistent API responses.

Preferred success response

```json
{
  "success": true,
  "message": "Project created.",
  "data": {}
}
```

Preferred error response

```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": {}
}
```

The frontend should not assume different formats for different endpoints.

---

# Error Handling

Every service must throw meaningful errors.

Never

```
console.log(error)
```

and ignore it.

Instead

- parse response
- return readable message
- show toast
- log unexpected errors

---

# Loading States

Every request must expose

```
loading

error

success
```

The UI should never freeze while waiting.

Examples

- Skeletons
- Spinners
- Disabled buttons

---

# Caching Strategy

Server state belongs to TanStack Query.

Examples

Projects

```
5 minutes
```

Dashboard

```
1 minute
```

Current User

```
Until invalidated
```

Static Data

```
Infinity
```

---

# Mutations

Create

Update

Delete

must use

```
useMutation()
```

Never

```
fetch()
```

inside components.

---

# Query Keys

Query keys must be centralized.

Examples

```
["user"]

["projects"]

["project", id]

["tasks"]

["dashboard"]

["organization"]
```

Never invent random keys.

---

# Optimistic Updates

Whenever appropriate

- Kanban
- Task movement
- Task status
- Comments

The UI updates immediately before the server confirms.

Rollback if the request fails.

---

# Pagination

Backend should control pagination.

Frontend should send

```
page

limit

search

sort

filters
```

Never download entire datasets unnecessarily.

---

# Filtering

Filtering should happen through query parameters.

Example

```
status=open

priority=high

assignedTo=123
```

---

# File Uploads

Uploads use

```
multipart/form-data
```

Never encode files into JSON.

---

# Authentication Headers

The frontend should never manually attach tokens if Better Auth manages the session.

If an Authorization header is required by another service, it should be added in the Axios interceptor, not inside components.

---

# Axios Interceptors

Interceptors may handle:

- authentication
- request logging
- automatic retries
- global error handling
- unauthorized redirects

Components must remain unaware of these concerns.

---

# Environment Variables

Never hardcode secrets.

Use

```
NEXT_PUBLIC_API_URL
```

and any other approved public variables.

Sensitive values must remain on the backend.

---

# Type Safety

Every endpoint should have matching TypeScript types.

Example

```
Project

Task

User

Organization
```

Avoid using `any`.

---

# Testing

API integrations should be easy to mock.

Components should depend on hooks or services, not Axios directly.

---

# Logging

Development

- readable console logs

Production

- centralized monitoring

Do not leave debugging logs in production code.

---

# AI Agent Rules

An AI modifying the frontend MUST:

- Never call Axios directly from components.
- Never hardcode backend URLs.
- Use the shared API client.
- Use existing services when available.
- Create new services only when introducing a new backend module.
- Use TanStack Query for server state.
- Keep components focused on rendering.
- Respect existing response formats.
- Reuse TypeScript types whenever possible.
- Follow the project folder structure.

If unsure, prefer extending the existing API layer instead of introducing a new pattern.

---

# Future Improvements

Planned enhancements include:

- Request cancellation
- Retry policies
- API versioning
- Offline support
- Background synchronization
- Request deduplication
- Metrics and performance monitoring

---

# Summary

The API layer exists to separate presentation from data access.

The guiding principle is:

```
Components render.

Hooks manage server state.

Services define business operations.

The API client handles HTTP.

The backend owns the data.
```

Every contributor should preserve this architecture as the project evolves.

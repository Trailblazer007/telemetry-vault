# Architecture Overview

This document explains the architectural decisions behind the Telemetry Vault application, including state management, data handling, performance considerations, and future scalability plans.

## State Management Strategy

The application uses local React state (useState) for managing UI-level filters and derived data hooks for querying and aggregating telemetry events.

Why this approach

Filters are page-scoped and do not need global persistence

State changes are predictable and synchronous

Avoids unnecessary complexity from Redux, Zustand, or Context

- Key decisions

UI state (filters) lives in page.tsx

Domain logic lives in useTelemetryQuery

Aggregation logic is isolated into pure functions where possible

This separation keeps the UI simple while making data logic testable and reusable.

### Data Generation and Storage Decisions

Telemetry data is currently stored as in-memory mock data in telemetryData.ts.

Why in-memory data

Enables fast iteration without backend dependencies

Makes aggregation logic deterministic and testable

Keeps the project focused on frontend architecture

### Data shape

Each telemetry event includes:

Timestamp

Event type (log, metric, trace)

Source

Numeric value

This mirrors realistic observability data without overfitting to a specific backend.

### Performance Bottlenecks and Mitigations

Identified bottlenecks

Re-filtering and aggregating data on every render

Rendering large tables with many rows

Sorting numeric data for percentile calculations

### Mitigations applied

useMemo is used in useTelemetryQuery to prevent unnecessary recomputation

Aggregation logic runs only when relevant filters change

Table rendering is isolated and optimized for future virtualization

Current performance profile

Efficient for small to medium datasets

Linear scans are acceptable at current scale

Trade-offs Made
Simplicity vs scalability

Chose simple state management over global solutions

Acceptable for current scope but would evolve with application size

Accuracy vs performance

P95 calculation uses a full sort for clarity

Faster approximations were avoided to keep logic correct and readable

### Flexibility vs strict typing

UI filter types allow "all" values

Domain query types remain strict

Small casting is used at boundaries to keep intent clear

## What Would Break First at 10× Data

At significantly higher data volumes, the first issues would be:

Aggregation cost

Sorting for P95 becomes expensive

Rendering cost

Table rendering would slow without virtualization

Memory usage

Holding all telemetry in memory would no longer scale

These are expected trade-offs for a frontend-only architecture.

## What Would Change With a Backend Later

With a backend in place, the architecture would evolve as follows:

### Data handling

Replace in-memory data with paginated API responses

Move aggregation logic server-side

Fetch only aggregated results or time-bucketed data

State management

Filters synced to URL query parameters

Server-driven cache via React Query or similar

### Performance

Backend computes percentiles and aggregates

Frontend focuses on visualization and interaction

### Benefits

Reduced client computation

Improved scalability

Real-time data support

### Summary

This architecture intentionally prioritizes:

Clear separation of concerns

Testability

Readability

Realistic production patterns

It is designed to scale conceptually, even if the current implementation is frontend-only.

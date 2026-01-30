# Assumptions

This document outlines the assumptions made while building Telemetry Vault in the absence of a real backend API, along with areas that would require validation and potential risks.

## Assumptions Made Due to Missing API

- Telemetry data is small enough to fit in memory on the client

- All telemetry events share a uniform schema

- Timestamps are:
  - Unix epoch in milliseconds

  - Comparable across all event sources

- Numeric value exists for all events, including logs

- Event types are limited to:
  - log

  - metric

  - trace

- Event sources are a finite, known list

- Aggregations (count, avg, p95) are computed over raw event values

- Data does not change in real time once loaded

- No authentication or authorization is required to view telemetry

## What Would Be Validated With Product or Backend

- Event semantics
  - Do logs really have numeric values?

  - Should traces be aggregated differently?

- Aggregation definitions
  - Exact definition of P95

  - Whether percentiles should be approximate or exact

- Time handling
  - Timezone expectations

  - Clock skew across sources

  - Inclusive vs exclusive time ranges

- Filtering behavior
  - Whether "all" should be explicit or implicit

  - Default filter values on initial load

- Source taxonomy
  - Are sources static or dynamic?

  - Can sources be hierarchical?

- Result shape
  - Should queries return raw rows, aggregates, or both?

- Pagination expectations
  - Maximum number of rows allowed in a single response

- Error handling
  - How partial failures should surface in the UI

## What Might Be Wrong

- Percentile calculation may not match backend implementation

- Averaging values across mixed event types may be invalid

- Treating logs as numeric may oversimplify reality

- In-memory filtering may hide performance issues that appear at scale

- Assuming consistent event schemas may break with real data

- UI defaults may not align with actual product expectations

- Source lists may change dynamically in production

- Time range filtering may behave differently once server-side

## Summary

These assumptions were made to enable forward progress and keep the system focused on frontend architecture.
They are expected to evolve once real backend constraints and product requirements are known.

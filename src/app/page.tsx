"use client";

import { useState } from "react";
import { useTelemetryQuery } from "@/hooks/useTelemetryQuery";
import type { EventType } from "@/types/telemetry";
import type { QueryParams } from "@/types/telemetry";
import type { Source } from "@/types/telemetry";
import { TELEMETRY_SOURCES } from "@/data/telemetryData";
import { TelemetryTable } from "@/components/TelemetryTable";

/* ---------- UI-only types ---------- */

type Aggregation = "count" | "avg" | "p95";
type FilterEventType = EventType | "all";
type FilterSource = "all" | Source;

type Filters = QueryParams;

/* ---------- UI constants ---------- */

const EVENT_TYPE_LABELS: Record<FilterEventType, string> = {
  all: "All",
  log: "Errors / Logs",
  metric: "Metrics",
  trace: "Traces",
};

export default function HomePage() {
  const [filters, setFilters] = useState<Filters>(() => {
    const now = Date.now();

    return {
      startTime: now - 60 * 60 * 1000,
      endTime: now,
      type: "all",
      source: "all",
      aggregation: "count",
    };
  });

  const result = useTelemetryQuery(filters);

  return (
    <main>
      <h1>Telemetry Vault</h1>
      <p>
        Aggregation Result: <strong>{result.value}</strong>
      </p>

      <section aria-label="Filters">
        <fieldset>
          <legend>Time Range</legend>

          <label>
            Start
            <input
              type="datetime-local"
              value={new Date(filters.startTime).toISOString().slice(0, 16)}
              onChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  startTime: new Date(e.target.value).getTime(),
                }))
              }
            />
          </label>

          <label>
            End
            <input
              type="datetime-local"
              value={new Date(filters.endTime).toISOString().slice(0, 16)}
              onChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  endTime: new Date(e.target.value).getTime(),
                }))
              }
            />
          </label>
        </fieldset>

        <fieldset>
          <legend>Event Type</legend>

          <select
            value={filters.type}
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                type: e.target.value as FilterEventType,
              }))
            }
          >
            {Object.entries(EVENT_TYPE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </fieldset>

        <fieldset>
          <legend>Source</legend>

          <select
            value={filters.source}
            onChange={(e) =>
              setFilters(
                (f): QueryParams => ({
                  ...f,
                  source: e.target.value as FilterSource,
                }),
              )
            }
          >
            <option value="all">All sources</option>

            {TELEMETRY_SOURCES.map((src) => (
              <option key={src} value={src}>
                {src}
              </option>
            ))}
          </select>
        </fieldset>

        <fieldset>
          <legend>Aggregation</legend>

          <select
            value={filters.aggregation}
            onChange={(e) =>
              setFilters((s) => ({
                ...s,
                aggregation: e.target.value as Aggregation,
              }))
            }
          >
            <option value="count">Count</option>
            <option value="avg">Average</option>
            <option value="p95">P95</option>
          </select>
        </fieldset>
      </section>

      <section aria-live="polite">
        <TelemetryTable rows={result.rows} />
      </section>
    </main>
  );
}

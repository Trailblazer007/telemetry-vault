import { useMemo } from "react"
import { telemetryEvents } from "@/data/telemetryData"
import type { QueryParams, TelemetryEvent } from "@/types/telemetry"

export type TelemetryQueryResult = {
  rows: TelemetryEvent[]
  value: number
}
export function useTelemetryQuery(params: QueryParams): TelemetryQueryResult {
  return useMemo(() => {
    let events: TelemetryEvent[] = telemetryEvents

    // time
    events = events.filter(
      e => e.timestamp >= params.startTime && e.timestamp <= params.endTime
    )

    // type
    if (params.type !== "all") {
      events = events.filter(e => e.type === params.type)
    }

    // source
    if (params.source !== "all") {
      events = events.filter(e => e.source === params.source)
    }

    return {
      rows: events,
      value:
        params.aggregation === "count"
          ? events.length
          : params.aggregation === "avg"
          ? events.reduce((sum, e) => sum + e.value, 0) / (events.length || 1)
          : (() => {
              const sorted = [...events].map(e => e.value).sort((a, b) => a - b)
              const index = Math.floor(sorted.length * 0.95)
              return sorted[index] ?? 0
            })(),
    }
  }, [
    params.startTime,
    params.endTime,
    params.type,
    params.source,
    params.aggregation,
  ])
}
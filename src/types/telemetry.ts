export type EventType = "log" | "metric" | "trace"
export type Source = "api" | "worker" | "db" | "auth" | "frontend"

export type Aggregation = "count" | "avg" | "p95"

export type FilterEventType = EventType | "all";
export type FilterSource = "all" | Source;

export type QueryParams = {
  startTime: number
  endTime: number
  type: FilterEventType
  source: FilterSource
  aggregation: Aggregation
}

export type TelemetryEvent = {
  timestamp: number
  value: number
  type: EventType
  source: Source
}

import type { TelemetryEvent, EventType, Source } from "@/types/telemetry"

const EVENT_TYPES: EventType[] = ["log", "metric", "trace"]
export const TELEMETRY_SOURCES: Source[] = ["api", "auth", "db", "frontend", "worker"]

const EVENT_COUNT = 50_000
const NOW = Date.now()
const ONE_HOUR = 60 * 60 * 1000

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function generateTelemetry(): TelemetryEvent[] {
  const events: TelemetryEvent[] = []

  for (let i = 0; i < EVENT_COUNT; i++) {
    events.push({
      timestamp: NOW - Math.random() * ONE_HOUR * 24, // last 24h
      type: randomItem(EVENT_TYPES),
      source: randomItem(TELEMETRY_SOURCES),
      value: Math.random() * 100,
    })
  }

  return events
}

/**
 * Generated once.
 * Shared across the entire app.
 */
export const telemetryEvents: TelemetryEvent[] = generateTelemetry()

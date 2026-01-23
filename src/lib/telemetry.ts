import { TelemetryEvent } from "./types"

const EVENT_TYPES = ["log", "metric", "trace"] as const
const SOURCES = [
  "auth-service",
  "billing-service",
  "api-gateway",
  "worker",
  "frontend",
]

let cachedData: TelemetryEvent[] | null = null

export function generateTelemetryData(
  count: number = 50000
): TelemetryEvent[] {
  if (cachedData) return cachedData

  const now = Date.now()
  const oneHour = 60 * 60 * 1000

  const data: TelemetryEvent[] = new Array(count)

  for (let i = 0; i < count; i++) {
    data[i] = {
      timestamp: now - Math.floor(Math.random() * oneHour),
      value: Math.random() * 100,
      type: EVENT_TYPES[i % EVENT_TYPES.length],
      source: SOURCES[i % SOURCES.length],
    }
  }

  cachedData = data
  return data
}

export type TelemetryEvent = {
  timestamp: number
  value: number
  type: "log" | "metric" | "trace"
  source: string
}

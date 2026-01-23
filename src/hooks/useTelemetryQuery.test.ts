import { describe, it, expect } from "vitest"
import { renderHook } from "@testing-library/react"
import { telemetryEvents } from "@/data/telemetryData"
import { useTelemetryQuery } from "@/hooks/useTelemetryQuery"

describe("useTelemetryQuery aggregation", () => {
  it("returns correct count", () => {
    const { result } = renderHook(() =>
      useTelemetryQuery({
        startTime: 0,
        endTime: Date.now(),
        type: "all",
        source: "all",
        aggregation: "count",
      })
    )

    expect(result.current.value).toBe(telemetryEvents.length)
  })
})

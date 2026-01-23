import { describe, it, expect } from "vitest"
import { aggregate } from "./aggregate"

describe("aggregate", () => {
  it("count aggregation", () => {
    expect(aggregate([1, 2, 3], "count")).toBe(3)
  })

  it("avg aggregation", () => {
    expect(aggregate([1, 2, 3], "avg")).toBe(2)
  })

  it("p95 aggregation", () => {
    const values = Array.from({ length: 100 }, (_, i) => i + 1)
    expect(aggregate(values, "p95")).toBe(95)
  })
})

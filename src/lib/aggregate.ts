export function aggregate(
  values: number[],
  mode: "count" | "avg" | "p95"
) {
  if (mode === "count") return values.length;

  if (mode === "avg") {
    return values.reduce((a, b) => a + b, 0) / values.length;
  }

  if (mode === "p95") {
    const sorted = [...values].sort((a, b) => a - b)
    const index = Math.ceil(sorted.length * 0.95) - 1
    return sorted[index] ?? 0
  }
}

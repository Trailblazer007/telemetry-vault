import type { TelemetryEvent } from "@/types/telemetry";
import { useState, useMemo } from "react";

type SortKey = "timestamp" | "type" | "source" | "value";
type SortDirection = "asc" | "desc";

type Props = {
  rows: TelemetryEvent[];
};

export function TelemetryTable({ rows }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>("timestamp");
  const [sortDir, setSortDir] = useState<SortDirection>("desc");

  const sortedRows = useMemo(() => {
    const data = [...rows];

    data.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return data;
  }, [rows, sortKey, sortDir]);

  function handleSort(key: SortKey) {
    setSortKey((prevKey) => {
      if (prevKey === key) {
        setSortDir((d) => (d === "asc" ? "desc" : "asc"));
        return prevKey;
      }

      setSortDir("asc");
      return key;
    });
  }

  if (!rows.length) {
    return <p>No data</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => handleSort("timestamp")}>
            Time{sortKey === "timestamp" && (sortDir === "asc" ? " ↑" : " ↓")}
          </th>
          <th onClick={() => handleSort("type")}>
            Type{sortKey === "timestamp" && (sortDir === "asc" ? " ↑" : " ↓")}
          </th>
          <th onClick={() => handleSort("source")}>
            Source{sortKey === "timestamp" && (sortDir === "asc" ? " ↑" : " ↓")}
          </th>
          <th onClick={() => handleSort("value")}>
            Value{sortKey === "timestamp" && (sortDir === "asc" ? " ↑" : " ↓")}
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedRows.map((row) => (
          <tr key={`${row.timestamp}-${row.type}-${row.source}`}>
            <td>{new Date(row.timestamp).toLocaleTimeString()}</td>
            <td>{row.type}</td>
            <td>{row.source}</td>
            <td>{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

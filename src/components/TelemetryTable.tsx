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
    <>
      <table className="telemetry-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("timestamp")}>
              Time{sortKey === "timestamp" && (sortDir === "asc" ? " ↑" : " ↓")}
            </th>
            <th onClick={() => handleSort("type")}>
              Type{sortKey === "timestamp" && (sortDir === "asc" ? " ↑" : " ↓")}
            </th>
            <th onClick={() => handleSort("source")}>
              Source
              {sortKey === "timestamp" && (sortDir === "asc" ? " ↑" : " ↓")}
            </th>
            <th onClick={() => handleSort("value")}>
              Value
              {sortKey === "timestamp" && (sortDir === "asc" ? " ↑" : " ↓")}
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

      <style>{`
        .telemetry-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 1rem;
          font-size: 14px;
        }

        .telemetry-table th,
        .telemetry-table td {
          padding: 10px 12px;
          border-bottom: 1px solid #e5e7eb;
          text-align: left;
        }

        .telemetry-table thead {
          background: #f3f4f6;
        }

        .telemetry-table th {
          cursor: pointer;
          user-select: none;
          font-weight: 600;
        }

        .telemetry-table th:hover {
          background: #e5e7eb;
        }

        .telemetry-table tbody tr:hover {
          background: #f9fafb;
        }

        .telemetry-table td:last-child {
          font-family: monospace;
        }
      `}</style>
    </>
  );
}

"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

type CohortPoint = {
  cohort_label: string;
  month_index: number;
  retention_rate: number;
};

type CohortRetentionChartProps = {
  data: CohortPoint[];
};

const colors = ["#0f172a", "#334155", "#64748b", "#94a3b8"];

export function CohortRetentionChart({ data }: CohortRetentionChartProps) {
  const cohortLabels = Array.from(new Set(data.map((item) => item.cohort_label)));
  const monthIndices = Array.from(new Set(data.map((item) => item.month_index))).sort(
    (a, b) => a - b
  );

  const lineChartData = monthIndices.map((month) => {
    const row: Record<string, string | number | null> = { month: `M${month}` };

    cohortLabels.forEach((label) => {
      const point = data.find(
        (item) => item.cohort_label === label && item.month_index === month
      );

      row[label] = point?.retention_rate ?? null;
    });

    return row;
  });

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <p className="text-sm font-medium text-slate-900">Cohort retention</p>
        <p className="mt-1 text-sm leading-6 text-slate-500">
          This gives me a quick read on whether newer cohorts are holding value
          over time or weakening too early.
        </p>
      </div>

      <div className="h-[340px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={lineChartData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" domain={[0, 100]} />
            {cohortLabels.map((label, index) => (
              <Line
                key={label}
                type="monotone"
                dataKey={label}
                stroke={colors[index % colors.length]}
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

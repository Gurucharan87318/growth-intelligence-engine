"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

type SegmentBarChartItem = {
  name: string;
  attractiveness: number;
};

type SegmentBarChartProps = {
  data: SegmentBarChartItem[];
};

const colors = ["#0f172a", "#334155", "#64748b", "#94a3b8"];

export function SegmentBarChart({ data }: SegmentBarChartProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <p className="text-sm font-medium text-slate-900">Segment comparison</p>
        <p className="mt-1 text-sm leading-6 text-slate-500">
          I use this to compare candidate segments on overall attractiveness before
          moving deeper into growth and economics.
        </p>
      </div>

      <div className="h-[360px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 8, right: 8, left: 12, bottom: 8 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
            <XAxis type="number" domain={[0, 100]} stroke="#64748b" />
            <YAxis
              type="category"
              dataKey="name"
              width={160}
              tick={{ fill: "#0f172a", fontSize: 12 }}
              stroke="#64748b"
            />
            <Bar dataKey="attractiveness" radius={[0, 8, 8, 0]}>
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

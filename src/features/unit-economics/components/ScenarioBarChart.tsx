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

type ScenarioBarChartItem = {
  id: string;
  scenario_label: string;
  payback_months: number;
};

type ScenarioBarChartProps = {
  data: ScenarioBarChartItem[];
};

const colors = ["#0f172a", "#334155", "#64748b", "#94a3b8"];

export function ScenarioBarChart({ data }: ScenarioBarChartProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <p className="text-sm font-medium text-slate-900">Scenario comparison</p>
        <p className="mt-1 text-sm leading-6 text-slate-500">
          I use this to compare how different operating assumptions change CAC payback.
        </p>
      </div>

      <div className="h-[340px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis dataKey="scenario_label" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Bar dataKey="payback_months" radius={[8, 8, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={entry.id} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

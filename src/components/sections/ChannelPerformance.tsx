import type { ChannelPerformanceRow } from "@/types/analytics";

type ChannelPerformanceProps = {
  rows: ChannelPerformanceRow[];
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export function ChannelPerformance({ rows }: ChannelPerformanceProps) {
  return (
    <section className="section-block pt-0">
      <div className="page-shell">
        <div className="glass-card">
          <h2 className="text-2xl font-semibold tracking-tight">
            Channel performance
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Compare acquisition channels by user volume, revenue, average CLV,
            and average order behavior.
          </p>

          <div className="mt-8 overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-3">
              <thead>
                <tr className="text-left text-sm text-slate-500">
                  <th className="px-4 py-2 font-medium">Channel</th>
                  <th className="px-4 py-2 font-medium">Users</th>
                  <th className="px-4 py-2 font-medium">Revenue</th>
                  <th className="px-4 py-2 font-medium">Avg CLV</th>
                  <th className="px-4 py-2 font-medium">Avg Orders</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.acquisition_channel} className="bg-white/90">
                    <td className="rounded-l-2xl px-4 py-4 font-medium text-slate-900">
                      {row.acquisition_channel}
                    </td>
                    <td className="px-4 py-4 text-slate-700">{row.users}</td>
                    <td className="px-4 py-4 text-slate-700">
                      {formatCurrency(row.revenue)}
                    </td>
                    <td className="px-4 py-4 text-slate-700">
                      {formatCurrency(row.avg_clv)}
                    </td>
                    <td className="rounded-r-2xl px-4 py-4 text-slate-700">
                      {row.avg_orders.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

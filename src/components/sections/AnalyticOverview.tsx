import type { OverviewMetrics, ChurnSummary } from "@/types/analytics";

type AnalyticsOverviewProps = {
  overview: OverviewMetrics;
  churnSummary: ChurnSummary;
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export function AnalyticsOverview({
  overview,
  churnSummary,
}: AnalyticsOverviewProps) {
  const cards = [
    {
      label: "Total Users",
      value: overview.total_users.toLocaleString("en-IN"),
    },
    {
      label: "Total Revenue",
      value: formatCurrency(overview.total_revenue),
    },
    {
      label: "Average Order Value",
      value: formatCurrency(overview.average_order_value),
    },
    {
      label: "Average CLV",
      value: formatCurrency(overview.average_clv),
    },
    {
      label: "Purchase Frequency",
      value: overview.average_purchase_frequency.toFixed(2),
    },
    {
      label: "Churn Rate",
      value: `${churnSummary.churn_rate_percentage.toFixed(2)}%`,
    },
  ];

  return (
    <section id="analytics" className="section-block">
      <div className="page-shell">
        <span className="eyebrow">Analytics Snapshot</span>
        <h2 className="section-title mt-6">Core business metrics</h2>
        <p className="section-copy">
          A quick view of growth, customer value, and retention risk based on
          the simulated e-commerce user base.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => (
            <div key={card.label} className="metric-card">
              <p className="text-sm text-slate-500">{card.label}</p>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
                {card.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

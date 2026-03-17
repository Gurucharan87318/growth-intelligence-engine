import { FadeIn } from "@/components/shared/FadeIn";
import type { AnalyticsResponse } from "@/types/analytics";

type ExecutiveSummaryProps = {
  data: AnalyticsResponse;
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export function ExecutiveSummary({ data }: ExecutiveSummaryProps) {
  const topChannel = data.channelPerformance[0];
  const topCustomer = data.highValueCustomers[0];

  const cards = [
    {
      label: "Total Revenue",
      value: formatCurrency(data.overview.total_revenue),
      note: `${data.overview.total_users.toLocaleString("en-IN")} total users`,
    },
    {
      label: "Top Channel",
      value: topChannel?.acquisition_channel ?? "N/A",
      note: topChannel
        ? `${formatCurrency(topChannel.avg_clv)} average CLV`
        : "No data",
    },
    {
      label: "Churn Rate",
      value: `${data.churnSummary.churn_rate_percentage.toFixed(2)}%`,
      note: `${data.churnSummary.churned_users} churned users`,
    },
    {
      label: "Top Customer Value",
      value: topCustomer
        ? formatCurrency(topCustomer.total_revenue)
        : "N/A",
      note: topCustomer ? `User #${topCustomer.user_id}` : "No data",
    },
  ];

  return (
    <section id="summary" className="section-block pt-8">
      <div className="page-shell">
        <FadeIn>
          <div>
            <h2 className="section-title">Executive Summary</h2>
            <p className="section-copy">
              A concise view of growth, customer value, and retention pressure
              from the simulated e-commerce portfolio.
            </p>
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card, index) => (
            <FadeIn key={card.label} delay={index * 0.08}>
              <div className="kpi-card">
                <p className="text-sm text-slate-500">{card.label}</p>
                <p className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">
                  {card.value}
                </p>
                <p className="mt-3 text-sm text-slate-600">{card.note}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

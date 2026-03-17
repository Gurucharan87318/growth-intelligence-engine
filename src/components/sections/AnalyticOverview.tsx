import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LiveDataStatus } from "@/features/shared/components/LiveDataStatus";
import type { ChurnSummary, OverviewMetrics } from "@/types/analytics";

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
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="secondary"
            className="bg-slate-100 text-slate-700 hover:bg-slate-100"
          >
            growth_summary
          </Badge>
          <Badge
            variant="secondary"
            className="bg-slate-100 text-slate-700 hover:bg-slate-100"
          >
            growth_channels
          </Badge>
          <Badge
            variant="secondary"
            className="bg-slate-100 text-slate-700 hover:bg-slate-100"
          >
            growth_cohorts
          </Badge>
        </div>

        <div className="space-y-2">
          <CardTitle className="text-2xl font-semibold tracking-tight text-slate-900">
            Analytics Snapshot
          </CardTitle>

          <p className="text-sm font-medium text-slate-700">
            Live backend-backed business metrics
          </p>

          <p className="max-w-3xl text-sm leading-6 text-slate-500">
            This overview pulls growth, monetization, and retention signals
            directly from structured backend datasets to create a
            decision-ready operating snapshot.
          </p>
        </div>
      </CardHeader>

      <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
          >
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
              {card.label}
            </p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
              {card.value}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type {
  ChannelPerformanceRow,
  ChurnSummary,
  HighValueCustomer,
  OverviewMetrics,
} from "@/types/analytics";

type StrategicRecommendationsProps = {
  overview: OverviewMetrics;
  churnSummary: ChurnSummary;
  channelPerformance: ChannelPerformanceRow[];
  highValueCustomers: HighValueCustomer[];
};

type Recommendation = {
  title: string;
  summary: string;
  action: string;
};

function buildRecommendations({
  overview,
  churnSummary,
  channelPerformance,
  highValueCustomers,
}: StrategicRecommendationsProps): Recommendation[] {
  const topChannel = channelPerformance[0];
  const totalTopCustomerRevenue = highValueCustomers.reduce(
    (sum, customer) => sum + customer.total_revenue,
    0
  );

  const recommendations: Recommendation[] = [];

  if (churnSummary.churn_rate_percentage >= 30) {
    recommendations.push({
      title: "Prioritize retention recovery",
      summary: `Churn is currently ${churnSummary.churn_rate_percentage.toFixed(
        2
      )}%, which suggests a meaningful share of users are becoming inactive.`,
      action:
        "Launch a reactivation flow for users inactive for 30+ days, then test reminder campaigns, personalized offers, and post-purchase nudges.",
    });
  }

  if (topChannel) {
    recommendations.push({
      title: "Double down on the best-performing channel",
      summary: `${topChannel.acquisition_channel} is currently the strongest acquisition channel by revenue contribution.`,
      action:
        "Audit spend quality and conversion behavior for this channel, then reallocate budget toward similar high-yield audiences while monitoring CAC and payback.",
    });
  }

  if (
    overview.total_revenue > 0 &&
    totalTopCustomerRevenue / overview.total_revenue > 0.2
  ) {
    recommendations.push({
      title: "Protect high-value customer revenue",
      summary:
        "A meaningful share of total revenue is concentrated among the highest-value customers in the current analysis layer.",
      action:
        "Introduce VIP retention tactics such as early access, loyalty tiers, concierge support, or personalized cross-sell journeys.",
    });
  }

  recommendations.push({
    title: "Improve monetization from retained users",
    summary:
      "Retention and monetization should be optimized together rather than treated as separate growth levers.",
    action:
      "Test bundles, replenishment prompts, and personalized recommendations to increase repeat purchases and average order value.",
  });

  return recommendations;
}

export function StrategicRecommendations(
  props: StrategicRecommendationsProps
) {
  const recommendations = buildRecommendations(props);

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
            Strategic Recommendations
          </CardTitle>

          <p className="text-sm font-medium text-slate-700">
            What the business should do next
          </p>

          <p className="max-w-3xl text-sm leading-6 text-slate-500">
            These recommendations are synthesized from backend-fed growth,
            retention, channel, and customer value signals. The goal is to turn
            analytical outputs into practical operating actions that a product,
            growth, or strategy team can act on.
          </p>
        </div>
      </CardHeader>

      <CardContent className="grid gap-4">
        {recommendations.map((item, index) => (
          <div
            key={`${item.title}-${index}`}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Recommendation {index + 1}
            </p>

            <h3 className="mt-2 text-lg font-semibold tracking-tight text-slate-900">
              {item.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              {item.summary}
            </p>

            <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Suggested action
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                {item.action}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

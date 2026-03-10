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

  if (totalTopCustomerRevenue / overview.total_revenue > 0.2) {
    recommendations.push({
      title: "Protect high-value customer revenue",
      summary:
        "A meaningful share of total revenue is concentrated among the top customers in the dataset.",
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
    <section className="section-block pt-0">
      <div className="page-shell">
        <div className="glass-card" id="strategic-recommendations">
          <span className="eyebrow">Strategic Recommendations</span>

          <h2 className="mt-6 text-3xl font-semibold tracking-tight">
            What the business should do next
          </h2>

          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
            These recommendations are generated from the current analytics
            outputs and framed as practical growth actions for an e-commerce
            team.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {recommendations.map((item) => (
              <div key={item.title} className="metric-card">
                <p className="text-sm font-medium text-slate-500">Recommendation</p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">{item.summary}</p>
                <div className="mt-4 rounded-2xl bg-violet-50 px-4 py-3 text-sm leading-6 text-slate-700">
                  {item.action}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { AnalyticsOverview } from "@/components/sections/AnalyticOverview";
import { ChannelPerformance } from "@/components/sections/ChannelPerformance";
import { DashboardEmbed } from "@/components/sections/Dashboard";
import { GrowthSimulator } from "@/components/sections/GrowthSimulator";
import { HighValueCustomers } from "@/components/sections/HighValueCustomer";
import { StrategicRecommendations } from "@/components/sections/StrategicRecomm";
import { getAnalyticsData } from "@/lib/analytics/getanalysis";
import { CohortRetention } from "@/components/sections/Cohort";
import { TopNav } from "@/components/sections/NavBar";

export default async function HomePage() {
  const data = await getAnalyticsData();
  const embedUrl = process.env.NEXT_PUBLIC_BI_EMBED_URL;

  return (
    <main>
      <section className="section-block">
        <div className="page-shell">
          <div className="glass-card overflow-hidden">
            <div className="max-w-3xl">
              <span className="eyebrow">Portfolio Case Study</span>

              <h1 className="mt-6 text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
                E-commerce Growth
                <span className="accent-text"> Intelligence </span>
                Dashboard
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                A single-page analytics product that simulates e-commerce growth
                decisions using customer lifetime value, churn detection,
                marketing performance, cohort retention, and revenue scenario
                modeling.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#analytics" className="button-primary">
                  Explore Analytics
                </a>
                <a href="#technical-deep-dive" className="button-secondary">
                  View Architecture
                </a>
              </div>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              <div className="metric-card">
                <p className="text-sm text-slate-500">Business Goal</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">
                  Improve retention and channel efficiency
                </p>
              </div>

              <div className="metric-card">
                <p className="text-sm text-slate-500">Analytics Focus</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">
                  CLV, churn, cohorts, revenue concentration
                </p>
              </div>

              <div className="metric-card">
                <p className="text-sm text-slate-500">Delivery</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">
                  Full-stack dashboard with embedded BI
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AnalyticsOverview
        overview={data.overview}
        churnSummary={data.churnSummary}
      />

      <ChannelPerformance rows={data.channelPerformance} />

      <DashboardEmbed embedUrl={embedUrl} />

 <GrowthSimulator
  totalUsers={data.overview.total_users}
  averageClv={data.overview.average_clv}
  currentChurnRate={data.churnSummary.churn_rate_percentage}
/>

<StrategicRecommendations
  overview={data.overview}
  churnSummary={data.churnSummary}
  channelPerformance={data.channelPerformance}
  highValueCustomers={data.highValueCustomers}
/>

<HighValueCustomers customers={data.highValueCustomers} />

<CohortRetention rows={data.cohortRetention} />

<TopNav />
    </main>
  );
}

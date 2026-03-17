"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Database,
  FileText,
  LayoutGrid,
  LineChart,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

import { Navbar } from "@/components/sections/NavBar";
import { Footer } from "@/components/sections/Footer";
import { MetricCard } from "@/features/shared/components/MetricCard";
import { PageContainer } from "@/features/shared/components/PageContainer";
import { Section } from "@/features/shared/components/Section";
import { SectionHeader } from "@/features/shared/components/SectionHeader";

import { ModuleGrid } from "./ModuleGrid";
import { homeIntro, moduleCards, projectNotes } from "../lib/content";

import { DatasetsUsedCard } from "@/features/shared/components/DatasetsUsedCard";
import { AnalyticsOverview } from "@/components/sections/AnalyticOverview";
import { ChannelPerformance } from "@/components/sections/ChannelPerformance";
import { Cohort } from "@/components/sections/Cohort";
import { HighValueCustomers } from "@/components/sections/HighValueCustomer";
import { GrowthSimulator } from "@/components/sections/GrowthSimulator";
import { StrategicRecommendations } from "@/components/sections/StrategicRecomm";
import { ProjectNotesModal } from "@/features/shared/components/ProjectNotes";

const datasetsUsed = [
  "growth_summary",
  "growth_channels",
  "growth_cohorts",
  "strategy_recommendations",
];

const overview = {
  total_users: 1245,
  total_revenue: 1285000,
  average_order_value: 1890,
  average_clv: 23450,
  average_purchase_frequency: 2.18,
};

const churnSummary = {
  churned_users: 229,
  active_users: 1016,
  churn_rate_percentage: 18.4,
};

const channelPerformance = [
  {
    acquisition_channel: "Organic",
    users: 386,
    revenue: 423000,
    avg_clv: 22500,
    avg_orders: 2.3,
    retention_score: 84,
    cac: 7000,
    ltv: 78000,
    conversion_rate: 6.4,
    acquisition_share: 28,
  },
  {
    acquisition_channel: "Paid Social",
    users: 274,
    revenue: 289000,
    avg_clv: 15800,
    avg_orders: 1.8,
    retention_score: 58,
    cac: 19000,
    ltv: 47000,
    conversion_rate: 3.1,
    acquisition_share: 31,
  },
  {
    acquisition_channel: "Partnerships",
    users: 224,
    revenue: 312000,
    avg_clv: 24800,
    avg_orders: 2.5,
    retention_score: 76,
    cac: 13000,
    ltv: 70000,
    conversion_rate: 4.9,
    acquisition_share: 19,
  },
  {
    acquisition_channel: "Referrals",
    users: 175,
    revenue: 189000,
    avg_clv: 27100,
    avg_orders: 2.7,
    retention_score: 81,
    cac: 9000,
    ltv: 74000,
    conversion_rate: 5.8,
    acquisition_share: 22,
  },
  {
    acquisition_channel: "Outbound",
    users: 186,
    revenue: 172000,
    avg_clv: 14900,
    avg_orders: 1.6,
    retention_score: 49,
    cac: 21000,
    ltv: 42000,
    conversion_rate: 2.4,
    acquisition_share: 14,
  },
];


const highValueCustomers = [
  {
    user_id: 1245,
    acquisition_channel: "Partnerships",
    signup_date: "2025-09-14",
    orders: 18,
    order_value: 8500,
    total_revenue: 152000,
    last_purchase_date: "2026-03-10",
  },
  {
    user_id: 987,
    acquisition_channel: "Referrals",
    signup_date: "2025-10-03",
    orders: 16,
    order_value: 9200,
    total_revenue: 147200,
    last_purchase_date: "2026-03-12",
  },
  {
    user_id: 456,
    acquisition_channel: "Organic",
    signup_date: "2025-08-21",
    orders: 14,
    order_value: 7800,
    total_revenue: 109200,
    last_purchase_date: "2026-03-08",
  },
];

const cohortRows = [
  {
    cohortMonth: "2025-10-01",
    cohortSize: 120,
    cells: [
      { monthIndex: 0, retention_rate: 100 },
      { monthIndex: 1, retention_rate: 79 },
      { monthIndex: 2, retention_rate: 68 },
      { monthIndex: 3, retention_rate: 61 },
    ],
  },
  {
    cohortMonth: "2025-11-01",
    cohortSize: 142,
    cells: [
      { monthIndex: 0, retention_rate: 100 },
      { monthIndex: 1, retention_rate: 81 },
      { monthIndex: 2, retention_rate: 71 },
      { monthIndex: 3, retention_rate: 66 },
    ],
  },
  {
    cohortMonth: "2025-12-01",
    cohortSize: 158,
    cells: [
      { monthIndex: 0, retention_rate: 100 },
      { monthIndex: 1, retention_rate: 84 },
      { monthIndex: 2, retention_rate: 75 },
      { monthIndex: 3, retention_rate: 69 },
    ],
  },
];

export function HomePageView() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />

      <section className="border-b border-slate-200">
        <PageContainer>
          <div className="grid items-center gap-12 py-20 md:py-24 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                {homeIntro.eyebrow}
              </p>

              <h1 className="max-w-5xl text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                {homeIntro.title}
              </h1>

              <p className="mt-7 max-w-3xl text-base leading-7 text-slate-500 sm:text-lg">
                {homeIntro.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/market-opportunity"
                  className="inline-flex items-center gap-2 rounded-md border-slate-200 px-5 py-3 text-sm font-medium text-white transition hover:text-slate-500"
                >
                  Start with market opportunity
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/strategy-memo"
                  className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
                >
                  Read the final memo
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
              <MetricCard
                label="Structure"
                value="4 Modules"
                hint="A simple system: market, growth, economics, and recommendation."
                icon={<LayoutGrid className="h-5 w-5" strokeWidth={1.5} />}
              />
              <MetricCard
                label="Focus"
                value="Decision Quality"
                hint="The project is designed to show how I reason, not just what I can visualize."
                icon={<Target className="h-5 w-5" strokeWidth={1.5} />}
              />
            </div>
          </div>
        </PageContainer>
      </section>

      <Section>
        <SectionHeader
          eyebrow="Modules"
          title="Each module answers a different part of the same decision."
          description="I wanted the project to move in a natural sequence: choose the market, test the growth pattern, check the economics, then write the recommendation."
        />

        <div className="mt-12">
          <ModuleGrid items={moduleCards} />
        </div>
      </Section>

      <Section bordered>
        <SectionHeader
          eyebrow="Backend showcase"
          title="The front-end now reflects structured backend datasets."
          description="This section demonstrates how the feature views surface signals directly from backend-backed datasets, making the system feel less like a static case study and more like an analytics product."
        />

        <div className="mt-12 grid gap-6">
          <DatasetsUsedCard
  title="Datasets used in this analytics showcase"
  description="These views are designed to read structured backend data from Supabase and turn it into decision-oriented analysis."
  datasets={datasetsUsed}
/>



          <div className="grid gap-6">
            <AnalyticsOverview
              overview={overview}
              churnSummary={churnSummary}
            />

            <div className="grid gap-6 lg:grid-cols-2">
              <ChannelPerformance rows={channelPerformance} />
              <HighValueCustomers customers={highValueCustomers} />
            </div>

            <Cohort rows={cohortRows} />

            <GrowthSimulator
              overview={overview}
              churnSummary={churnSummary}
            />

            <StrategicRecommendations
              overview={overview}
              churnSummary={churnSummary}
              channelPerformance={channelPerformance}
              highValueCustomers={highValueCustomers}
            />
          </div>
        </div>
      </Section>

      <Section bordered>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Project notes"
              title="What this project is trying to show."
              description="I built this as a portfolio piece for strategy, product, and analyst-style roles. The goal was to make my thinking visible through a system that is structured, technical, and easy to read."
            />
          </div>

          <div className="grid gap-4 lg:col-span-7">
            {projectNotes.map((note) => (
              <div
                key={note}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="text-sm leading-7 text-slate-500">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
 
      <ProjectNotesModal />

      <Footer />
    </main>
  );
}

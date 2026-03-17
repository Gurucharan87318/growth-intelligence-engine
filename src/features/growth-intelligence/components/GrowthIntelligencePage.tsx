import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BadgeAlert,
  Database,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatasetsUsedCard } from "@/features/shared/components/DatasetsUsedCard";
import { LiveDataStatus } from "@/features/shared/components/LiveDataStatus";
import { PageContainer } from "@/features/shared/components/PageContainer";
import type { GrowthIntelligenceData } from "@/features/growth-intelligence/lib/queries";
import { BackButton } from "@/features/shared/components/BackButton";

const formatMetricValue = (
  value: number | null | undefined,
  unit?: string | null
) => {
  const safeValue = value ?? 0;

  if (unit === "INR") {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
      notation: "compact",
    }).format(safeValue);
  }

  if (unit === "percent") {
    return `${safeValue.toFixed(1)}%`;
  }

  if (unit === "months") {
    return `${safeValue.toFixed(1)} mo`;
  }

  if (unit === "count") {
    return safeValue.toLocaleString("en-IN");
  }

  return safeValue.toLocaleString("en-IN");
};

function TrendIndicator({
  direction,
  changePct,
}: {
  direction: "up" | "down" | "flat" | null;
  changePct: number | null;
}) {
  if (direction === "up") {
    return (
      <div className="flex items-center gap-1 text-sm font-medium text-emerald-600">
        <ArrowUpRight className="h-4 w-4" />
        {(changePct ?? 0).toFixed(1)}%
      </div>
    );
  }

  if (direction === "down") {
    return (
      <div className="flex items-center gap-1 text-sm font-medium text-rose-600">
        <ArrowDownRight className="h-4 w-4" />
        {(changePct ?? 0).toFixed(1)}%
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 text-sm font-medium text-slate-500">
      <ArrowRight className="h-4 w-4" />
      {(changePct ?? 0).toFixed(1)}%
    </div>
  );
}

export function GrowthIntelligencePageView({
  summary,
  channels,
  groupedCohorts,
  projectedUntil,
  bestChannel,
  averageRetentionScore,
  metadata,
}: GrowthIntelligenceData) {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <PageContainer>
        <div className="space-y-10 py-14 md:py-16">
          <BackButton fallbackHref="/" />

          <div className="space-y-4">
            <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-100">
              Growth Intelligence
            </Badge>

            <div className="space-y-3">
              <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
                Growth Intelligence
              </h1>
              <p className="max-w-3xl text-base leading-7 text-slate-500">
                This module diagnoses growth quality through retention, channel efficiency,
                and cohort durability instead of surface-level acquisition volume.
              </p>
            </div>

            <LiveDataStatus source="Supabase backend" />
          </div>

          <DatasetsUsedCard
            title="Datasets used in this module"
            description="This module is powered by growth_summary, growth_channels, growth_cohorts, and backend metadata."
            datasets={["growth_summary", "growth_channels", "growth_cohorts", "module_metadata"]}
          />

          <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {summary.map((metric) => (
              <Card key={metric.id} className="border-slate-200 bg-white shadow-sm">
                <CardHeader className="space-y-3 pb-3">
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle className="text-base font-medium text-slate-600">
                      {metric.label}
                    </CardTitle>
                    <TrendIndicator
                      direction={metric.direction}
                      changePct={metric.change_pct}
                    />
                  </div>

                  <Badge variant="secondary" className="w-fit bg-slate-100 text-slate-700 hover:bg-slate-100">
                    Source: {metadata?.source_label ?? "growth datasets"}
                  </Badge>
                </CardHeader>

                <CardContent className="space-y-3">
                  <p className="text-3xl font-semibold tracking-tight text-slate-900">
                    {formatMetricValue(metric.value, metric.unit)}
                  </p>
                  <p className="text-sm leading-6 text-slate-500">
                    {metric.insight ?? "Backend-synced growth signal."}
                  </p>
                </CardContent>
              </Card>
            ))}
          </section>

          <section className="grid items-start gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl tracking-tight">Performance benchmarking</CardTitle>
                <p className="text-sm leading-6 text-slate-500">
                  Benchmarks growth quality using retention as the primary signal.
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Best channel
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">
                    {bestChannel?.channel_name ?? "Not available"}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Highest retention profile among tracked channels.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Avg retention score
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">
                    {averageRetentionScore}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Useful as a compact read on overall acquisition quality.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-6 text-slate-600">
                  <p className="font-medium text-slate-900">Methodology hint</p>
                  <p className="mt-2">
                    {metadata?.methodology_hint ??
                      "This view compares channels by durability and customer quality rather than only acquisition volume."}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader className="space-y-3">
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-slate-500" />
                  <CardTitle className="text-xl tracking-tight">
                    Acquisition comparison
                  </CardTitle>
                </div>
                <p className="text-sm leading-6 text-slate-500">
                  Compare channels by retention, CAC, LTV, and conversion quality.
                </p>
              </CardHeader>

              <CardContent className="space-y-3">
                {channels.map((channel, index) => (
                  <div
                    key={channel.id ?? `${channel.channel_key ?? "channel"}-${index}`}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-medium text-slate-900">
                          {channel.channel_name ?? "Unnamed Channel"}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          {channel.trend ?? channel.quality_note ?? "Backend-fed channel quality signal."}
                        </p>
                      </div>

                      <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-100">
                        Retention {(channel.retention_score ?? 0).toFixed(0)}
                      </Badge>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-600">
                      <div>CAC: {formatMetricValue(channel.cac, "INR")}</div>
                      <div>LTV: {formatMetricValue(channel.ltv, "INR")}</div>
                      <div>Conv: {(channel.conversion_rate ?? 0).toFixed(1)}%</div>
                      <div>Share: {(channel.acquisition_share ?? 0).toFixed(1)}%</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          <section>
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader className="space-y-3">
                <div className="flex items-center gap-2">
                  <BadgeAlert className="h-4 w-4 text-slate-500" />
                  <CardTitle className="text-xl tracking-tight">
                    Cohort durability
                  </CardTitle>
                </div>
                <p className="text-sm leading-6 text-slate-500">
                  Retention by cohort to show whether product value repeats across acquisition waves.
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="overflow-x-auto">
                  <div className="min-w-[720px]">
                    <div
                      className="grid gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500"
                      style={{
                        gridTemplateColumns: `140px repeat(${projectedUntil + 1}, minmax(72px, 1fr))`,
                      }}
                    >
                      <div>Cohort</div>
                      {Array.from({ length: projectedUntil + 1 }).map((_, month) => (
                        <div key={month} className="text-center">
                          M{month}
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 space-y-2">
                      {groupedCohorts.map((cohort, cohortIndex) => (
                        <div
                          key={`${cohort.cohort_label}-${cohortIndex}`}
                          className="grid gap-2"
                          style={{
                            gridTemplateColumns: `140px repeat(${projectedUntil + 1}, minmax(72px, 1fr))`,
                          }}
                        >
                          <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-medium text-slate-900">
                            {cohort.cohort_label}
                          </div>

                          {Array.from({ length: projectedUntil + 1 }).map((_, month) => {
                            const cell = cohort.points.find(
                              (point) => (point.month_index ?? 0) === month
                            );

                            if (cell) {
                              return (
                                <div
                                  key={month}
                                  className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-center text-sm font-medium text-slate-900"
                                >
                                  {(cell.retention_pct ?? 0).toFixed(0)}%
                                </div>
                              );
                            }

                            return (
                              <div
                                key={month}
                                className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-3 py-3 text-center text-xs font-medium text-slate-400"
                              >
                                Projected
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                  <p className="font-medium text-slate-900">Source credibility</p>
                  <p className="mt-2">
                    Source table: {metadata?.source_table ?? "growth_summary, growth_channels, growth_cohorts"}
                  </p>
                  <p className="mt-1">
                    Freshness note: {metadata?.freshness_note ?? "Loaded from Supabase on request."}
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </PageContainer>
    </main>
  );
}

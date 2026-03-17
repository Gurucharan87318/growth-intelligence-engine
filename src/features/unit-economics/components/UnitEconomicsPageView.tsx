"use client";

import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  SlidersHorizontal,
  Sparkles,
  Target,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { DatasetsUsedCard } from "@/features/shared/components/DatasetsUsedCard";
import { LiveDataStatus } from "@/features/shared/components/LiveDataStatus";
import { PageContainer } from "@/features/shared/components/PageContainer";
import type { UnitEconomicsData } from "@/features/unit-economics/lib/queries";
import { BackButton } from "@/features/shared/components/BackButton";

const formatMetricValue = (value: number | null | undefined, unit?: string | null) => {
  const safeValue = value ?? 0;

  if (unit === "percent") return `${safeValue.toFixed(1)}%`;
  if (unit === "months") return `${safeValue.toFixed(1)} mo`;
  if (unit === "ratio") return `${safeValue.toFixed(2)}x`;

  if (unit === "INR") {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(safeValue);
  }

  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 1,
  }).format(safeValue);
};

function getSliderNumber(value: number | readonly number[]) {
  if (Array.isArray(value)) return value[0] ?? 0;
  return value;
}

const SUMMARY_METRIC_ORDER = [
  "payback",
  "contribution_margin",
  "ltv_cac",
  "gross_margin",
  "blended_cac",
  "average_customer_value",
  "monthly_price",
  "conversion_rate",
];

export function UnitEconomicsPageView({
  summary,
  scenarios,
  levers,
  bestScenario,
  strongestLever,
  scalingSignal,
  metadata,
}: UnitEconomicsData) {
  const summaryMap = useMemo(
    () => new Map(summary.map((item) => [item.metric_key, item])),
    [summary]
  );

  const orderedSummary = SUMMARY_METRIC_ORDER.map((key) => summaryMap.get(key)).filter(
    Boolean
  );

  const basePaybackMetric = summary.find((item) => item.metric_key === "payback") ?? null;
  const basePayback = basePaybackMetric?.value ?? 0;

  const [cacDelta, setCacDelta] = useState(0);
  const [churnDelta, setChurnDelta] = useState(0);

  const simulatedPayback = useMemo(() => {
    const cacFactor = 1 + cacDelta / 100;
    const churnFactor = 1 + churnDelta / 100;
    return Math.max(0.5, Number((basePayback * cacFactor * churnFactor).toFixed(2)));
  }, [basePayback, cacDelta, churnDelta]);

  const paybackDelta = Number((simulatedPayback - basePayback).toFixed(2));

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <PageContainer>
        <div className="space-y-10 py-14 md:py-16">
          <BackButton fallbackHref="/" />
          <div className="space-y-4">
            <Badge
              variant="secondary"
              className="bg-slate-100 text-slate-700 hover:bg-slate-100"
            >
              Unit Economics
            </Badge>

            <div className="space-y-3">
              <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
                Unit Economics
              </h1>
              <p className="max-w-3xl text-base leading-7 text-slate-500">
                This module tracks whether the business model supports scaling by
                combining payback, margin quality, lever analysis, and scenario simulation.
              </p>
            </div>

            <LiveDataStatus source="Supabase backend" />
          </div>

          <DatasetsUsedCard
            title="Datasets used in this module"
            description="This module is powered by economics summary metrics, scenario assumptions, lever rankings, and backend metadata."
            datasets={[
              "unit_economics_summary",
              "unit_economics_scenarios",
              "unit_economics_levers",
              "module_metadata",
            ]}
          />

          <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {orderedSummary.map((metric) => {
              if (!metric) return null;

              const isPayback = metric.metric_key === "payback";
              const displayValue = isPayback ? simulatedPayback : metric.value;

              return (
                <Card key={metric.id} className="border-slate-200 bg-white shadow-sm">
                  <CardHeader className="space-y-2 pb-3">
                    <CardTitle className="text-base font-medium text-slate-600">
                      {metric.label}
                    </CardTitle>

                    <p className="text-xs text-slate-500">
                      {metric.benchmark ?? "No benchmark provided."}
                    </p>

                    <Badge
                      variant="secondary"
                      className="w-fit bg-slate-100 text-slate-700 hover:bg-slate-100"
                    >
                      Source: {metadata?.source_label ?? "unit economics datasets"}
                    </Badge>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <p className="text-3xl font-semibold tracking-tight text-slate-900">
                      {formatMetricValue(displayValue, metric.unit)}
                    </p>

                    {isPayback ? (
                      <div className="flex items-center gap-2 text-sm">
                        {Math.abs(paybackDelta) < 0.01 ? (
                          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                            On baseline
                          </span>
                        ) : (
                          <>
                            {paybackDelta < 0 ? (
                              <ArrowDownRight className="h-4 w-4 text-emerald-600" />
                            ) : (
                              <ArrowUpRight className="h-4 w-4 text-rose-600" />
                            )}
                            <span
                              className={
                                paybackDelta < 0 ? "text-emerald-600" : "text-rose-600"
                              }
                            >
                              {paybackDelta > 0 ? "+" : ""}
                              {paybackDelta.toFixed(2)} mo vs base
                            </span>
                          </>
                        )}
                      </div>
                    ) : null}

                    <p className="text-sm leading-6 text-slate-500">
                      {metric.interpretation ?? "No interpretation provided."}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </section>

          <section className="grid items-start gap-6 lg:grid-cols-[1fr_1fr]">
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader className="space-y-3">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-slate-500" />
                  <CardTitle className="text-xl tracking-tight">
                    What-if simulator
                  </CardTitle>
                </div>
                <p className="text-sm leading-6 text-slate-500">
                  Adjust CAC and churn assumptions to see real-time impact on payback.
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-medium text-slate-700">CAC change</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {cacDelta > 0 ? "+" : ""}
                      {cacDelta}%
                    </p>
                  </div>

                  <Slider
                    value={[cacDelta]}
                    min={-20}
                    max={30}
                    step={1}
                    onValueChange={(value) => setCacDelta(getSliderNumber(value))}
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-medium text-slate-700">Churn pressure</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {churnDelta > 0 ? "+" : ""}
                      {churnDelta}%
                    </p>
                  </div>

                  <Slider
                    value={[churnDelta]}
                    min={-20}
                    max={30}
                    step={1}
                    onValueChange={(value) => setChurnDelta(getSliderNumber(value))}
                  />
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Simulated payback
                  </p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
                    {simulatedPayback.toFixed(2)} mo
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    This creates an interactive operating layer instead of a static economics snapshot.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-white shadow-sm self-start">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl tracking-tight">
                  Economic signal tracking
                </CardTitle>
                <p className="text-sm leading-6 text-slate-500">
                  Read whether the model supports scaling based on the current economics profile.
                </p>
              </CardHeader>

              <CardContent className="space-y-3 pt-0">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Scaling readiness
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">
                    {scalingSignal.level}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {scalingSignal.note}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                  <p className="font-medium text-slate-900">Methodology hint</p>
                  <p className="mt-2">
                    {metadata?.methodology_hint ??
                      "This module combines baseline economics with scenario and lever analysis to estimate operating readiness."}
                  </p>
                  <p className="mt-2">
                    Freshness note: {metadata?.freshness_note ?? "Loaded from Supabase on request."}
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="grid items-start gap-6 lg:grid-cols-[1fr_1fr]">
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl tracking-tight">Lever impact list</CardTitle>
                <p className="text-sm leading-6 text-slate-500">
                  Identifies the operating levers most likely to improve the model.
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                {levers.map((lever, index) => (
                  <div
                    key={lever.id ?? `${lever.lever_key ?? "lever"}-${index}`}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-medium text-slate-900">
                          {lever.lever_name ?? "Unnamed Lever"}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          {lever.lever_type ?? "General"}
                        </p>
                      </div>

                      <Badge
                        variant="secondary"
                        className="bg-slate-100 text-slate-700 hover:bg-slate-100"
                      >
                        Impact {(lever.impact_score ?? 0).toFixed(0)}
                      </Badge>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-slate-600">
                      {lever.recommendation ?? "No recommendation provided."}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600">
                      <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5">
                        Confidence: {(lever.confidence_score ?? 0).toFixed(0)}
                      </span>
                      <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5">
                        Ease: {(lever.ease_score ?? 0).toFixed(0)}
                      </span>
                      <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5">
                        Realization: {(lever.expected_months_to_realize ?? 0).toFixed(0)} mo
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl tracking-tight">
                  Financial scenario mapping
                </CardTitle>
                <p className="text-sm leading-6 text-slate-500">
                  Compare modeled economics under different operating assumptions.
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                {scenarios.map((scenario, index) => (
                  <div
                    key={scenario.id ?? `${scenario.scenario_key ?? "scenario"}-${index}`}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <p className="font-medium text-slate-900">
                        {scenario.scenario_name ?? "Unnamed Scenario"}
                      </p>
                      <Badge
                        variant="secondary"
                        className="bg-slate-100 text-slate-700 hover:bg-slate-100"
                      >
                        {(scenario.payback_months ?? 0).toFixed(1)} mo
                      </Badge>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-600">
                      <div>Margin: {(scenario.contribution_margin_pct ?? 0).toFixed(1)}%</div>
                      <div>LTV/CAC: {(scenario.ltv_cac_ratio ?? 0).toFixed(2)}x</div>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      {scenario.note ?? "No scenario note provided."}
                    </p>
                  </div>
                ))}

              </CardContent>
            </Card>
          </section>

          <section className="grid items-start gap-6 lg:grid-cols-[1fr_1fr]">
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl tracking-tight">Operating takeaway</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4 text-sm leading-6 text-slate-600">
                <p>
                  Best scenario:{" "}
                  <span className="font-medium text-slate-900">
                    {bestScenario?.scenario_name ?? "Not available"}
                  </span>
                </p>
                <p>
                  Strongest lever:{" "}
                  <span className="font-medium text-slate-900">
                    {strongestLever?.lever_name ?? "Not available"}
                  </span>
                </p>
                <p>
                  This page combines economics metrics, scenarios, and levers into an
                  interactive operating surface rather than a passive scorecard.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl tracking-tight">Source credibility</CardTitle>
              </CardHeader>

              <CardContent className="space-y-3 text-sm leading-6 text-slate-600">
                <p>
                  Source table:{" "}
                  <span className="font-medium text-slate-900">
                    {metadata?.source_table ??
                      "unit_economics_summary, unit_economics_scenarios, unit_economics_levers"}
                  </span>
                </p>
                <p>
                  Source label:{" "}
                  <span className="font-medium text-slate-900">
                    {metadata?.source_label ?? "unit economics datasets"}
                  </span>
                </p>
                <p>
                  This page is backend-driven and interprets real stored scenarios rather than
                  using static mock assumptions.
                </p>
              </CardContent>
            </Card>
          </section>
        </div>
      </PageContainer>
    </main>
  );
}

"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, Eye, Landmark, Lightbulb } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatasetsUsedCard } from "@/features/shared/components/DatasetsUsedCard";
import { LiveDataStatus } from "@/features/shared/components/LiveDataStatus";
import { PageContainer } from "@/features/shared/components/PageContainer";
import { getStrategicSignal } from "@/features/strategy-memo/lib/signals";
import type { StrategyMemoData } from "@/features/strategy-memo/lib/queries";
import { BackButton } from "@/features/shared/components/BackButton";

type StakeholderLens = "founder" | "investor";

function rewriteSummaryForLens(baseText: string, lens: StakeholderLens) {
  if (lens === "investor") {
    return `Investor view: ${baseText} The focus is whether the current wedge, retention quality, and payback profile justify scalable capital deployment with contained downside risk.`;
  }

  return `Founder view: ${baseText} The focus is where operating attention should go next so the team sharpens growth quality, economics, and execution without spreading itself too thin.`;
}

export function StrategyMemoPageView({
  sections,
  recommendations,
  executiveSummary,
  strategicInterpretation,
  risksAndLimitations,
  marketThesis,
  growthDiagnosis,
  economicsConclusion,
  growthSummary,
  growthChannels,
  unitEconomicsSummary,
  marketSegments,
  metadata,
}: StrategyMemoData) {
  const [lens, setLens] = useState<StakeholderLens>("founder");

  const primarySignal = useMemo(
    () =>
      getStrategicSignal({
        growthSummary,
        growthChannels,
        unitEconomicsSummary,
        marketSegments,
      }),
    [growthSummary, growthChannels, unitEconomicsSummary, marketSegments]
  );

  const rewrittenExecutiveSummary = executiveSummary?.body
    ? rewriteSummaryForLens(executiveSummary.body, lens)
    : "No executive summary available.";

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
              Strategy Memo
            </Badge>

            <div className="space-y-3">
              <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
                Strategy Memo
              </h1>
              <p className="max-w-3xl text-base leading-7 text-slate-500">
                This module converts market, growth, and economics data into an executive-grade
                interpretation layer with audience-specific framing.
              </p>
            </div>

            <LiveDataStatus source="Supabase backend" />
          </div>

          <DatasetsUsedCard
            title="Datasets used in this module"
            description="This memo is assembled from structured narrative sections, recommendations, and live operating signals from upstream modules."
            datasets={[
              "strategy_memo_sections",
              "strategy_recommendations",
              "growth_summary",
              "growth_channels",
              "unit_economics_summary",
              "market_segments",
              "module_metadata",
            ]}
          />

          <section className="grid items-start gap-6 lg:grid-cols-[1fr_0.9fr]">
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader className="space-y-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-2xl tracking-tight">
                      Executive summary
                    </CardTitle>
                    <p className="text-sm leading-6 text-slate-500">
                      Toggle the stakeholder lens to re-contextualize the same underlying signals for operators and capital allocators.
                    </p>
                  </div>

                  <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1">
                    <Button
                      type="button"
                      variant={lens === "founder" ? "default" : "ghost"}
                      size="sm"
                      className="h-8 rounded-lg px-3"
                      onClick={() => setLens("founder")}
                    >
                      Founder View
                    </Button>
                    <Button
                      type="button"
                      variant={lens === "investor" ? "default" : "ghost"}
                      size="sm"
                      className="h-8 rounded-lg px-3"
                      onClick={() => setLens("investor")}
                    >
                      Investor View
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Eye className="h-4 w-4" />
                    <p className="text-xs font-semibold uppercase tracking-[0.14em]">
                      Stakeholder lens
                    </p>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-slate-700">
                    {rewrittenExecutiveSummary}
                  </p>
                </div>

                {strategicInterpretation?.body ? (
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Lightbulb className="h-4 w-4" />
                      <p className="text-xs font-semibold uppercase tracking-[0.14em]">
                        Strategic interpretation
                      </p>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-slate-700">
                      {strategicInterpretation.body}
                    </p>
                  </div>
                ) : null}
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-white shadow-sm self-start">
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl tracking-tight">
                  Automated diagnosis
                </CardTitle>
                <p className="text-sm leading-6 text-slate-500">
                  Generated from current operating signals rather than a fixed static memo.
                </p>
              </CardHeader>

              <CardContent className="space-y-3 pt-0">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Landmark className="h-4 w-4" />
                    <p className="text-xs font-semibold uppercase tracking-[0.14em]">
                      Primary recommendation
                    </p>
                  </div>

                  <p className="mt-4 text-lg font-semibold text-slate-900">
                    {primarySignal.level}
                  </p>

                  <p className="mt-3 text-sm leading-6 text-slate-700">
                    {primarySignal.recommendation}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                  <p className="font-medium text-slate-900">Methodology hint</p>
                  <p className="mt-2">
                    {metadata?.methodology_hint ??
                      "This memo synthesizes market wedge quality, retention signals, and unit economics into a decision-ready interpretation layer."}
                  </p>
                  <p className="mt-2">
                    Freshness note: {metadata?.freshness_note ?? "Loaded from Supabase on request."}
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="grid items-start gap-4 md:grid-cols-3">
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl tracking-tight">Market Thesis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-slate-700">
                  {marketThesis?.body ?? "No market thesis available."}
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl tracking-tight">Growth Diagnosis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-slate-700">
                  {growthDiagnosis?.body ?? "No growth diagnosis available."}
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl tracking-tight">Economics Conclusion</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-slate-700">
                  {economicsConclusion?.body ?? "No economics conclusion available."}
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="grid gap-4">
            {recommendations.map((item, index) => (
              <Card
                key={item.id ?? `${item.recommendation_key ?? "recommendation"}-${index}`}
                className="border-slate-200 bg-white shadow-sm"
              >
                <CardContent className="p-4 sm:p-5">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-2">
                      <p className="text-lg font-semibold text-slate-900">
                        {item.title ?? "Untitled Recommendation"}
                      </p>
                      <p className="max-w-3xl text-sm leading-6 text-slate-600">
                        {item.rationale ?? "No rationale provided."}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">
                        Impact:{" "}
                        <span className="font-medium text-slate-900">
                          {item.impact ?? "Unknown"}
                        </span>
                      </span>
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">
                        Effort:{" "}
                        <span className="font-medium text-slate-900">
                          {item.effort ?? "Unknown"}
                        </span>
                      </span>
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">
                        Timeline:{" "}
                        <span className="font-medium text-slate-900">
                          {item.timeline ?? "Unknown"}
                        </span>
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>

          <section className="grid items-start gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-xl tracking-tight">
                  <AlertTriangle className="h-4 w-4 text-slate-500" />
                  Risk visibility
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-6 text-slate-700">
                <p>
                  {risksAndLimitations?.body ?? "No explicit risks and limitations provided."}
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl tracking-tight">Source credibility</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm leading-6 text-slate-600">
                <p>
                  Source table:{" "}
                  <span className="font-medium text-slate-900">
                    {metadata?.source_table ??
                      "strategy_memo_sections, strategy_recommendations, growth_summary, growth_channels, unit_economics_summary, market_segments"}
                  </span>
                </p>
                <p>
                  Source label:{" "}
                  <span className="font-medium text-slate-900">
                    {metadata?.source_label ?? "strategy datasets"}
                  </span>
                </p>
                <p>
                  This page synthesizes backend signals into an executive argument rather than
                  displaying static text-only analysis.
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            {sections
              .filter(
                (section) =>
                  ![
                    "executive-summary",
                    "strategic-interpretation",
                    "risks-limitations",
                    "market-thesis",
                    "growth-diagnosis",
                    "economics-conclusion",
                  ].includes(section.section_key ?? "")
              )
              .map((section, index) => (
                <Card
                  key={section.id ?? `${section.section_key ?? "section"}-${index}`}
                  className="border-slate-200 bg-white shadow-sm"
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl tracking-tight">
                      {section.section_title ?? "Untitled Section"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-6 text-slate-700">
                      {section.body ?? "No section body provided."}
                    </p>
                  </CardContent>
                </Card>
              ))}
          </section>
        </div>
      </PageContainer>
    </main>
  );
}

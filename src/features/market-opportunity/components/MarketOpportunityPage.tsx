import { ArrowDownRight, ArrowUpRight, Database, Radar, Target } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatasetsUsedCard } from "@/features/shared/components/DatasetsUsedCard";
import { LiveDataStatus } from "@/features/shared/components/LiveDataStatus";
import { PageContainer } from "@/features/shared/components/PageContainer";
import type { MarketOpportunityData } from "@/features/market-opportunity/lib/queries";
import { BackButton } from "@/features/shared/components/BackButton";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
    notation: "compact",
  }).format(value);

function ScorePill({
  label,
  value,
  positive = true,
}: {
  label: string;
  value: number;
  positive?: boolean;
}) {
  const Icon = positive ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
      <span className="text-sm text-slate-600">{label}</span>
      <div className="flex items-center gap-2">
        <Icon className={`h-4 w-4 ${positive ? "text-emerald-600" : "text-amber-600"}`} />
        <span className="text-sm font-semibold text-slate-900">{value}</span>
      </div>
    </div>
  );
}

export function MarketOpportunityPageView({
  segments,
  topSegment,
  tam,
  sam,
  som,
  averageAttractiveness,
  averageDemandClarity,
  averageExecutionRisk,
  metadata,
}: MarketOpportunityData) {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <PageContainer>
        <div className="space-y-10 py-14 md:py-16">
          <BackButton fallbackHref="/" />
          <div className="space-y-4">
            <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-100">
              Market Opportunity
            </Badge>

            <div className="space-y-3">
              <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
                Market Opportunity
              </h1>
              <p className="max-w-3xl text-base leading-7 text-slate-500">
                This module identifies the most credible market wedge using backend-fed
                segment scoring, opportunity sizing, and execution-aware comparison.
              </p>
            </div>

            <LiveDataStatus source="Supabase backend" />
          </div>

          <DatasetsUsedCard
            title="Datasets used in this module"
            description="This module is powered by structured market segment data and backend metadata for methodology and source credibility."
            datasets={["market_segments", "module_metadata"]}
          />

          <section className="grid gap-5 md:grid-cols-3">
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Database className="h-4 w-4 text-slate-500" />
                  TAM
                </CardTitle>
                <p className="text-sm text-slate-500">
                  Bottom-up market potential across modeled segments.
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold tracking-tight text-slate-900">
                  {formatCurrency(tam)}
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Radar className="h-4 w-4 text-slate-500" />
                  SAM
                </CardTitle>
                <p className="text-sm text-slate-500">
                  Reachable opportunity under current focus and ICP fit.
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold tracking-tight text-slate-900">
                  {formatCurrency(sam)}
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="h-4 w-4 text-slate-500" />
                  SOM
                </CardTitle>
                <p className="text-sm text-slate-500">
                  Near-term capture estimate for the initial wedge.
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold tracking-tight text-slate-900">
                  {formatCurrency(som)}
                </p>
              </CardContent>
            </Card>
          </section>

          {topSegment ? (
            <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <Card className="border-slate-200 bg-white shadow-sm">
                <CardHeader className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-100">
                      Source: {metadata?.source_label ?? topSegment.source_label ?? "market_segments"}
                    </Badge>
                    <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-100">
                      Wedge score: {topSegment.wedge_score}
                    </Badge>
                  </div>

                  <CardTitle className="text-2xl tracking-tight">
                    {topSegment.segment_name}
                  </CardTitle>

                  <p className="max-w-2xl text-sm leading-6 text-slate-500">
                    {topSegment.description ?? "Highest-priority market wedge based on backend scoring logic."}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid gap-3">
                    <ScorePill label="Market attractiveness" value={topSegment.market_attractiveness ?? 0} />
                    <ScorePill label="Demand clarity" value={topSegment.demand_clarity ?? 0} />
                    <ScorePill label="Execution risk" value={topSegment.execution_risk ?? 0} positive={false} />
                    <ScorePill label="Urgency score" value={topSegment.urgency_score ?? 0} />
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                    <p className="font-medium text-slate-900">Methodology hint</p>
                    <p className="mt-2 leading-6">
                      {metadata?.methodology_hint ??
                        topSegment.methodology_hint ??
                        "Uses the top-ranked segment as a grounded working wedge rather than a generic top-down market claim."}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-200 bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl tracking-tight">
                    Segment ranking
                  </CardTitle>
                  <p className="text-sm leading-6 text-slate-500">
                    Compact comparison of candidate wedges using a backend-driven ranking model.
                  </p>
                </CardHeader>

                <CardContent className="space-y-3">
                  {segments.slice(0, 5).map((segment) => (
                    <div
                      key={segment.id}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-medium text-slate-900">{segment.segment_name}</p>
                          <p className="mt-1 text-sm text-slate-500">
                            {segment.geography ?? "Unknown"} • {segment.buyer_type ?? "Unknown"}
                          </p>
                        </div>

                        <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-100">
                          Score {segment.wedge_score}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>
          ) : null}

          <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl tracking-tight">
                  Attractiveness scorecard
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                <ScorePill label="Average attractiveness" value={averageAttractiveness} />
                <ScorePill label="Average demand clarity" value={averageDemandClarity} />
                <ScorePill label="Average execution risk" value={averageExecutionRisk} positive={false} />
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl tracking-tight">
                  Source credibility
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm leading-6 text-slate-600">
                <p>
                  Source table: <span className="font-medium text-slate-900">{metadata?.source_table ?? "market_segments"}</span>
                </p>
                <p>
                  Freshness note: <span className="font-medium text-slate-900">{metadata?.freshness_note ?? "Loaded from Supabase on request."}</span>
                </p>
                <p>
                  This page uses backend-fed records and ranking logic rather than fixed mock copy.
                </p>
              </CardContent>
            </Card>
          </section>
        </div>
      </PageContainer>
    </main>
  );
}

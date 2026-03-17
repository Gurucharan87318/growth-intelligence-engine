"use client";

import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import type { ChurnSummary, OverviewMetrics } from "@/types/analytics";

type GrowthSimulatorProps = {
  overview: OverviewMetrics;
  churnSummary: ChurnSummary;
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

function getSliderNumber(value: number | readonly number[]) {
  if (Array.isArray(value)) {
    return value[0] ?? 0;
  }

  return value;
}

export function GrowthSimulator({
  overview,
  churnSummary,
}: GrowthSimulatorProps) {
  const [targetChurnRate, setTargetChurnRate] = useState(
    Number(churnSummary.churn_rate_percentage.toFixed(2))
  );
  const [revenueLift, setRevenueLift] = useState(10);

  const results = useMemo(() => {
    const currentRetainedUsers =
      overview.total_users * (1 - churnSummary.churn_rate_percentage / 100);

    const projectedRetainedUsers =
      overview.total_users * (1 - targetChurnRate / 100);

    const retainedUserDelta = projectedRetainedUsers - currentRetainedUsers;

    const currentRevenueEstimate =
      currentRetainedUsers * overview.average_clv;

    const projectedRevenue =
      projectedRetainedUsers * overview.average_clv * (1 + revenueLift / 100);

    const revenueDelta = projectedRevenue - currentRevenueEstimate;

    return {
      currentRetainedUsers,
      projectedRetainedUsers,
      retainedUserDelta,
      projectedRevenue,
      revenueDelta,
    };
  }, [
    overview,
    churnSummary.churn_rate_percentage,
    targetChurnRate,
    revenueLift,
  ]);

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
            growth_cohorts
          </Badge>
        </div>

        <div className="space-y-2">
          <CardTitle className="text-2xl font-semibold tracking-tight text-slate-900">
            Growth Scenario Simulator
          </CardTitle>

          <p className="text-sm font-medium text-slate-700">
            Strategy scenarios built on top of current backend metrics
          </p>

          <p className="max-w-3xl text-sm leading-6 text-slate-500">
            This simulator applies scenario assumptions on top of the current
            retention and customer value metrics. It is meant to support
            strategic thinking, not replace a full forecasting model.
          </p>
        </div>
      </CardHeader>

      <CardContent className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-8">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-medium text-slate-700">
                Target churn rate
              </p>
              <p className="text-sm font-semibold text-slate-900">
                {targetChurnRate.toFixed(2)}%
              </p>
            </div>

            <Slider
              value={[targetChurnRate]}
              min={1}
              max={Math.max(1, Math.ceil(churnSummary.churn_rate_percentage))}
              step={0.5}
              onValueChange={(value) =>
                setTargetChurnRate(getSliderNumber(value))
              }
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-medium text-slate-700">
                Revenue uplift per retained user
              </p>
              <p className="text-sm font-semibold text-slate-900">
                {revenueLift}%
              </p>
            </div>

            <Slider
              value={[revenueLift]}
              min={0}
              max={50}
              step={1}
              onValueChange={(value) => setRevenueLift(getSliderNumber(value))}
            />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Scenario logic
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Projected revenue is estimated from retained users multiplied by
              average CLV, then adjusted by the revenue uplift assumption. This
              helps show the directional business impact of improved retention
              and monetization quality.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Current retained users
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {Math.round(results.currentRetainedUsers).toLocaleString("en-IN")}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Projected retained users
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {Math.round(results.projectedRetainedUsers).toLocaleString("en-IN")}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Revenue change
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {formatCurrency(results.revenueDelta)}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Projected revenue
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {formatCurrency(results.projectedRevenue)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

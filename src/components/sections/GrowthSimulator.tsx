"use client";

import { useMemo, useState } from "react";

type GrowthSimulatorProps = {
  totalUsers: number;
  averageClv: number;
  currentChurnRate: number;
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export function GrowthSimulator({
  totalUsers,
  averageClv,
  currentChurnRate,
}: GrowthSimulatorProps) {
  const [targetChurnRate, setTargetChurnRate] = useState(
    Number(currentChurnRate.toFixed(2))
  );
  const [revenueLift, setRevenueLift] = useState(8);

  const results = useMemo(() => {
    const currentRetainedUsers = totalUsers * (1 - currentChurnRate / 100);
    const projectedRetainedUsers = totalUsers * (1 - targetChurnRate / 100);

    const baselineRevenue = currentRetainedUsers * averageClv;
    const projectedRevenue =
      projectedRetainedUsers * averageClv * (1 + revenueLift / 100);

    const retainedUserDelta = projectedRetainedUsers - currentRetainedUsers;
    const revenueDelta = projectedRevenue - baselineRevenue;

    return {
      baselineRevenue,
      projectedRevenue,
      retainedUserDelta,
      revenueDelta,
      currentRetainedUsers,
      projectedRetainedUsers,
    };
  }, [averageClv, currentChurnRate, revenueLift, targetChurnRate, totalUsers]);

  return (
    <section className="section-block pt-0">
      <div className="page-shell">
        <div className="glass-card" id="growth-simulator">
          <span className="eyebrow">Growth Simulator</span>

          <h2 className="mt-6 text-3xl font-semibold tracking-tight">
            Revenue impact simulator
          </h2>

          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
            Adjust churn and revenue uplift assumptions to estimate the business
            impact of better retention and monetization.
          </p>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-8">
              <div>
                <div className="flex items-center justify-between gap-4">
                  <label
                    htmlFor="targetChurnRate"
                    className="text-sm font-medium text-slate-700"
                  >
                    Target churn rate
                  </label>
                  <span className="text-sm font-semibold text-slate-900">
                    {targetChurnRate.toFixed(2)}%
                  </span>
                </div>

                <input
                  id="targetChurnRate"
                  type="range"
                  min={0}
                  max={Math.max(60, Math.ceil(currentChurnRate))}
                  step={0.5}
                  value={targetChurnRate}
                  onChange={(event) =>
                    setTargetChurnRate(Number(event.target.value))
                  }
                  className="mt-3 w-full accent-violet-600"
                />
              </div>

              <div>
                <div className="flex items-center justify-between gap-4">
                  <label
                    htmlFor="revenueLift"
                    className="text-sm font-medium text-slate-700"
                  >
                    Revenue uplift per retained user
                  </label>
                  <span className="text-sm font-semibold text-slate-900">
                    {revenueLift}%
                  </span>
                </div>

                <input
                  id="revenueLift"
                  type="range"
                  min={0}
                  max={30}
                  step={1}
                  value={revenueLift}
                  onChange={(event) =>
                    setRevenueLift(Number(event.target.value))
                  }
                  className="mt-3 w-full accent-pink-500"
                />
              </div>

              <div className="rounded-2xl border border-black/10 bg-white/80 p-5">
                <p className="text-sm text-slate-500">Scenario logic</p>
                <p className="mt-2 leading-7 text-slate-700">
                  Projected revenue is estimated as retained users multiplied by
                  average CLV, then adjusted by the revenue uplift assumption.
                  This is a simple strategy simulation, not a forecasting model.
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="metric-card">
                <p className="text-sm text-slate-500">Current Retained Users</p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
                  {Math.round(results.currentRetainedUsers).toLocaleString(
                    "en-IN"
                  )}
                </p>
              </div>

              <div className="metric-card">
                <p className="text-sm text-slate-500">
                  Projected Retained Users
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
                  {Math.round(results.projectedRetainedUsers).toLocaleString(
                    "en-IN"
                  )}
                </p>
              </div>

              <div className="metric-card">
                <p className="text-sm text-slate-500">Revenue Change</p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
                  {formatCurrency(results.revenueDelta)}
                </p>
              </div>

              <div className="metric-card">
                <p className="text-sm text-slate-500">Projected Revenue</p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
                  {formatCurrency(results.projectedRevenue)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

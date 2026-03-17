"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Info,
  Sparkles,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

import {
  simulateBusinessModel,
  BusinessModelConfig,
  SimulationResult,
} from "@/lib/analytics/simulationMath";

const SIMULATION_NOTE_KEY = "growth-intelligence-simulation-note-v1";

const BUSINESS_MODELS: BusinessModelConfig[] = [
  {
    name: "SaaS",
    defaultCac: 350,
    defaultArpu: 89,
    defaultRetention: 0.92,
    retentionLabel: "Monthly Retention",
    months: 12,
  },
  {
    name: "E-commerce",
    defaultCac: 45,
    defaultArpu: 125,
    defaultRetention: 0.25,
    retentionLabel: "Repeat Purchase Rate",
    months: 12,
  },
  {
    name: "Marketplace",
    defaultCac: 28,
    defaultArpu: 42,
    defaultRetention: 0.68,
    retentionLabel: "Monthly Retention",
    months: 12,
  },
];

const getSliderValue = (value: number | readonly number[]) =>
  Array.isArray(value) ? value[0] ?? 0 : value;

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

function MetricTile({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
        {value}
      </p>
      <p className="mt-2 text-sm leading-6 text-slate-500">{hint}</p>
    </div>
  );
}

function ControlSlider({
  label,
  valueLabel,
  minLabel,
  maxLabel,
  value,
  max,
  step,
  onChange,
}: {
  label: string;
  valueLabel: string;
  minLabel: string;
  maxLabel: string;
  value: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center justify-between gap-4">
        <label className="text-sm font-medium text-slate-700">{label}</label>
        <span className="text-sm font-semibold text-slate-900">{valueLabel}</span>
      </div>

      <div className="mt-4">
        <Slider
          value={[value]}
          onValueChange={(next) => onChange(getSliderValue(next))}
          max={max}
          step={step}
        />
      </div>

      <div className="mt-3 flex justify-between text-xs text-slate-400">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

function SimulationNoteModal({
  open,
  acknowledged,
  setAcknowledged,
  onClose,
  onUnderstood,
}: {
  open: boolean;
  acknowledged: boolean;
  setAcknowledged: (value: boolean) => void;
  onClose: () => void;
  onUnderstood: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close simulation note"
      />

      <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white text-slate-900 shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 bg-slate-50/80 px-6 py-5 sm:px-8">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Simulation Notes
            </h2>
            <p className="mt-1 text-sm font-medium text-slate-500">
              What this simulator does, how to use it, and how to interpret the outputs.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-700"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6 overflow-y-auto px-6 py-6 text-sm leading-7 text-slate-600 sm:px-8">
          <div>
            <h3 className="mb-2 text-base font-bold text-slate-900">
              What this simulator is
            </h3>
            <p>
              This module is a decision-oriented unit economics sandbox. It helps founders,
              operators, and investors see how acquisition cost, monetization, and retention
              interact across three business models: SaaS, E-commerce, and Marketplace.
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-base font-bold text-slate-900">
              What it includes
            </h3>
            <ul className="space-y-2">
              <li>- Business model presets with benchmark-style default assumptions.</li>
              <li>- Live sliders for CAC, ARPU/AOV proxy, and retention behavior.</li>
              <li>- Output cards for LTV, payback period, and LTV/CAC ratio.</li>
              <li>- Strategy insight logic that classifies the model as healthy, warning, or critical.</li>
              <li>- A 12-month payback chart showing cash-out versus cash-in over time.</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-2 text-base font-bold text-slate-900">
              How it works
            </h3>
            <p>
              Each business model starts with a preset configuration. When you switch the model,
              the simulator resets the sliders to defaults that reflect a reasonable starting point
              for that model. After that, every slider change recomputes the outputs immediately.
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-base font-bold text-slate-900">
              Core formulas used
            </h3>
            <ul className="space-y-2">
              <li>- SaaS LTV: ARPU divided by churn, where churn is derived from retention.</li>
              <li>- E-commerce LTV: AOV proxy multiplied by annualized repeat purchase frequency.</li>
              <li>- Marketplace LTV: adjusted ARPU multiplied by retention logic and take-rate style economics.</li>
              <li>- Payback Period: CAC divided by monthly revenue contribution.</li>
              <li>- LTV/CAC: lifetime value divided by acquisition cost.</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-2 text-base font-bold text-slate-900">
              Why these metrics matter
            </h3>
            <p>
              These are the core metrics used to judge whether growth is durable and efficient.
              LTV shows total customer value, CAC shows acquisition cost, payback shows recovery
              speed, and LTV/CAC gives a quick read on whether scaling economics are strong enough.
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-base font-bold text-slate-900">
              How to interpret the strategy insight
            </h3>
            <p>
              The status indicator is not a forecast. It is a directional signal designed to help
              you reason about economic quality. Healthy suggests strong scaling conditions, warning
              suggests the model is workable but needs improvement, and critical suggests CAC or
              retention needs to improve before expansion.
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-base font-bold text-slate-900">
              Important caveats
            </h3>
            <ul className="space-y-2">
              <li>- This is a simulation, not a GAAP financial model.</li>
              <li>- It simplifies real-world factors like variable margin, sales cycles, refunds, and seasonality.</li>
              <li>- Use it to compare scenarios and understand trade-offs, not to produce audited forecasts.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-sky-100 bg-sky-50 p-5">
            <label className="flex items-start gap-3">
              <div className="relative mt-0.5 flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={acknowledged}
                  onChange={(e) => setAcknowledged(e.target.checked)}
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-slate-300 transition-all checked:border-slate-900 checked:bg-slate-900"
                />
                <svg
                  className="pointer-events-none absolute h-3 w-3 text-white opacity-0 peer-checked:opacity-100"
                  viewBox="0 0 14 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 5L4.5 8.5L13 1"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <span className="text-sm font-semibold text-slate-700">
                I understand that this simulation is a directional decision tool and that the
                formulas are simplified to support comparative analysis, not audited forecasting.
              </span>
            </label>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 bg-slate-50/80 px-6 py-5 sm:flex-row sm:px-8">
          <span className="text-xs font-semibold text-slate-400">
            Review the assumptions before using the outputs in a strategy narrative.
          </span>

          <div className="flex w-full items-center gap-3 sm:w-auto">
            <Button
              variant="outline"
              className="h-11 w-full border-slate-200 px-6 font-semibold text-slate-600 hover:bg-white hover:text-slate-900 sm:w-auto"
              onClick={onClose}
            >
              Close
            </Button>

            <Button
              className="h-11 w-full px-6 font-semibold sm:w-auto"
              disabled={!acknowledged}
              onClick={onUnderstood}
            >
              Understood
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BusinessModelSimulator() {
  const router = useRouter();

  const [model, setModel] = useState<BusinessModelConfig>(BUSINESS_MODELS[0]);
  const [cac, setCac] = useState<number>(BUSINESS_MODELS[0].defaultCac);
  const [arpu, setArpu] = useState<number>(BUSINESS_MODELS[0].defaultArpu);
  const [retention, setRetention] = useState<number>(BUSINESS_MODELS[0].defaultRetention);
  const [result, setResult] = useState<SimulationResult | null>(null);

  const [noteOpen, setNoteOpen] = useState(false);
  const [noteAck, setNoteAck] = useState(false);

  const modelMap = useMemo(
    () => new Map(BUSINESS_MODELS.map((item) => [item.name, item])),
    []
  );

  const resetToDefaults = (selectedModel: BusinessModelConfig) => {
    setModel(selectedModel);
    setCac(selectedModel.defaultCac);
    setArpu(selectedModel.defaultArpu);
    setRetention(selectedModel.defaultRetention);
  };

  useEffect(() => {
    const simulation = simulateBusinessModel(cac, arpu, retention, model);
    setResult(simulation);
  }, [cac, arpu, retention, model]);

  useEffect(() => {
    const seen = localStorage.getItem(SIMULATION_NOTE_KEY);
    if (!seen) {
      setNoteOpen(true);
    }
  }, []);

  const healthTone =
    result?.healthStatus === "healthy"
      ? "bg-emerald-500"
      : result?.healthStatus === "warning"
      ? "bg-amber-500"
      : "bg-rose-500";

  return (
    <>
      <SimulationNoteModal
        open={noteOpen}
        acknowledged={noteAck}
        setAcknowledged={setNoteAck}
        onClose={() => {
          setNoteOpen(false);
          setNoteAck(false);
        }}
        onUnderstood={() => {
          localStorage.setItem(SIMULATION_NOTE_KEY, "seen");
          setNoteOpen(false);
          setNoteAck(false);
        }}
      />

      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="mt-0.5 h-9 rounded-xl px-3 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
                  Business Model Simulator
                </h1>
              </div>

              <p className="max-w-3xl text-sm leading-6 text-slate-500">
                Compare how acquisition cost, monetization, and retention change unit economics across different business models.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              className="h-9 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              onClick={() => setNoteOpen(true)}
            >
              <Info className="mr-2 h-4 w-4" />
              Simulation notes
            </Button>

            <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-100">
              {model.name}
            </Badge>
            <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
              Live simulation
            </Badge>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl tracking-tight text-slate-900">
                Input levers
              </CardTitle>
              <p className="text-sm leading-6 text-slate-500">
                Adjust core business assumptions and switch models to reset benchmark defaults.
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="business-model"
                  className="text-sm font-medium text-slate-700"
                >
                  Business Model
                </label>

                <div className="relative">
                  <select
                    id="business-model"
                    value={model.name}
                    onChange={(event) => {
                      const selected = modelMap.get(
                        event.target.value as BusinessModelConfig["name"]
                      );
                      if (selected && selected.name !== model.name) {
                        resetToDefaults(selected);
                      }
                    }}
                    className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 pr-10 text-sm font-medium text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                  >
                    {BUSINESS_MODELS.map((item) => (
                      <option key={item.name} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>

                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 7.5L10 12.5L15 7.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <ControlSlider
                  label="CAC"
                  valueLabel={formatCurrency(cac)}
                  minLabel="₹0"
                  maxLabel="₹1,000"
                  value={cac}
                  max={1000}
                  step={10}
                  onChange={setCac}
                />

                <ControlSlider
                  label="ARPU"
                  valueLabel={formatCurrency(arpu)}
                  minLabel="₹0"
                  maxLabel="₹500"
                  value={arpu}
                  max={500}
                  step={5}
                  onChange={setArpu}
                />

                <ControlSlider
                  label={model.retentionLabel}
                  valueLabel={`${Math.round(retention * 100)}%`}
                  minLabel="0%"
                  maxLabel="100%"
                  value={Math.round(retention * 100)}
                  max={100}
                  step={1}
                  onChange={(value) => setRetention(value / 100)}
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6">
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl tracking-tight text-slate-900">
                  Economic outputs
                </CardTitle>
                <p className="text-sm leading-6 text-slate-500">
                  A compact read on value creation, capital recovery, and scaling quality.
                </p>
              </CardHeader>

              <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <MetricTile
                  label="LTV"
                  value={result ? formatCurrency(result.ltv) : "—"}
                  hint="Estimated lifetime customer value."
                />
                <MetricTile
                  label="Payback"
                  value={result ? `${result.paybackMonths} mo` : "—"}
                  hint="Months needed to recover acquisition cost."
                />
                <MetricTile
                  label="LTV / CAC"
                  value={result ? `${result.ltvToCacRatio}x` : "—"}
                  hint="Core health ratio for scaling quality."
                />
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl tracking-tight text-slate-900">
                  <Sparkles className="h-4 w-4 text-slate-500" />
                  Strategy insight
                </CardTitle>
              </CardHeader>

              <CardContent>
                {result ? (
                  <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <div className="flex items-center gap-2">
                      <span className={`h-3 w-3 rounded-full ${healthTone}`} />
                      <span className="text-sm font-semibold capitalize text-slate-900">
                        {result.healthStatus}
                      </span>
                    </div>

                    <p className="text-sm leading-7 text-slate-600">
                      {result.insight}
                    </p>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-xl border border-slate-200 bg-white p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                          Monthly revenue
                        </p>
                        <p className="mt-2 text-lg font-semibold text-slate-900">
                          {formatCurrency(result.monthlyRevenue)}
                        </p>
                      </div>

                      <div className="rounded-xl border border-slate-200 bg-white p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                          Current model
                        </p>
                        <p className="mt-2 text-lg font-semibold text-slate-900">
                          {model.name}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-500">
                    Adjust the assumptions to generate a strategy signal.
                  </div>
                )}
              </CardContent>
            </Card>

            {result ? (
              <Card className="border-slate-200 bg-white shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-xl tracking-tight text-slate-900">
                    <TrendingUp className="h-4 w-4 text-slate-500" />
                    Payback over time
                  </CardTitle>
                  <p className="text-sm leading-6 text-slate-500">
                    Compare monthly acquisition outflow against revenue inflow over the first 12 months.
                  </p>
                </CardHeader>

                <CardContent className="h-[360px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={result.cashflow}
                      margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid vertical={false} stroke="#e2e8f0" />
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={10}
                        tickFormatter={(value) => `M${value}`}
                        stroke="#64748b"
                        fontSize={12}
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={10}
                        stroke="#64748b"
                        fontSize={12}
                      />
                      <Tooltip
                        formatter={(value: number, name: string) => [
                          formatCurrency(value),
                          name === "cashOut" ? "Cash Out" : "Cash In",
                        ]}
                        cursor={{ fill: "rgba(148, 163, 184, 0.08)" }}
                        contentStyle={{
                          borderRadius: "14px",
                          border: "1px solid #e2e8f0",
                          backgroundColor: "#ffffff",
                          boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
                        }}
                      />
                      <Bar
                        dataKey="cashOut"
                        name="Cash Out"
                        fill="#f87171"
                        radius={[6, 6, 0, 0]}
                      />
                      <Bar
                        dataKey="cashIn"
                        name="Cash In"
                        fill="#34d399"
                        radius={[6, 6, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

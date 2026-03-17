import { createSupabaseServerClient } from "@/lib/supabase/server";

export type UnitEconomicsSummaryMetric = {
  id: number;
  metric_key: string;
  label: string;
  value: number | null;
  unit: string | null;
  benchmark: string | null;
  interpretation: string | null;
  sort_order: number | null;
};

export type UnitEconomicsScenario = {
  id: number;
  scenario_key: string | null;
  scenario_name: string | null;
  payback_months: number | null;
  contribution_margin_pct: number | null;
  ltv_cac_ratio: number | null;
  note: string | null;
  sort_order: number | null;
};

export type UnitEconomicsLever = {
  id: number;
  lever_key: string | null;
  lever_name: string | null;
  lever_type: string | null;
  impact_score: number | null;
  confidence_score: number | null;
  ease_score: number | null;
  expected_months_to_realize: number | null;
  recommendation: string | null;
  sort_order: number | null;
};

export type ModuleMetadata = {
  id: number;
  module_key: string;
  module_name: string | null;
  source_table: string | null;
  source_label: string | null;
  methodology_hint: string | null;
  freshness_note: string | null;
  updated_at: string | null;
};

export type UnitEconomicsData = {
  summary: UnitEconomicsSummaryMetric[];
  scenarios: UnitEconomicsScenario[];
  levers: UnitEconomicsLever[];
  bestScenario: UnitEconomicsScenario | null;
  strongestLever: UnitEconomicsLever | null;
  scalingSignal: {
    level: "Strong" | "Watch" | "Weak";
    note: string;
  };
  metadata: ModuleMetadata | null;
};

function n(value: number | null | undefined) {
  return value ?? 0;
}

export async function getUnitEconomicsData(): Promise<UnitEconomicsData> {
  const supabase = createSupabaseServerClient();

  const [
    { data: summaryData, error: summaryError },
    { data: scenariosData, error: scenariosError },
    { data: leversData, error: leversError },
    { data: metadataData, error: metadataError },
  ] = await Promise.all([
    supabase
      .from("unit_economics_summary")
      .select("*")
      .order("sort_order", { ascending: true }),
    supabase
      .from("unit_economics_scenarios")
      .select("*")
      .order("sort_order", { ascending: true }),
    supabase
      .from("unit_economics_levers")
      .select("*")
      .order("sort_order", { ascending: true }),
    supabase
      .from("module_metadata")
      .select("*")
      .eq("module_key", "unit-economics")
      .maybeSingle(),
  ]);

  if (summaryError) {
    throw new Error(`Failed to load unit economics summary: ${summaryError.message}`);
  }

  if (scenariosError) {
    throw new Error(`Failed to load unit economics scenarios: ${scenariosError.message}`);
  }

  if (leversError) {
    throw new Error(`Failed to load unit economics levers: ${leversError.message}`);
  }

  if (metadataError) {
    throw new Error(`Failed to load unit economics module metadata: ${metadataError.message}`);
  }

  const summary = (summaryData ?? []) as UnitEconomicsSummaryMetric[];
  const scenarios = (scenariosData ?? []) as UnitEconomicsScenario[];
  const levers = (leversData ?? []) as UnitEconomicsLever[];

  const bestScenario =
    scenarios.length > 0
      ? [...scenarios].sort((a, b) => n(a.payback_months) - n(b.payback_months))[0]
      : null;

  const strongestLever =
    levers.length > 0
      ? [...levers].sort((a, b) => n(b.impact_score) - n(a.impact_score))[0]
      : null;

  const payback =
    summary.find((item) => item.metric_key === "payback")?.value ?? 0;

  const contributionMargin =
    summary.find((item) => item.metric_key === "contribution_margin")?.value ?? 0;

  const ltvCac =
    summary.find((item) => item.metric_key === "ltv_cac")?.value ?? 0;

  let scalingSignal: UnitEconomicsData["scalingSignal"];

  if (payback <= 6 && contributionMargin >= 40 && ltvCac >= 3) {
    scalingSignal = {
      level: "Strong",
      note: "Economics are healthy enough to support focused scaling with reasonable efficiency.",
    };
  } else if (payback <= 12 && contributionMargin >= 20 && ltvCac >= 2) {
    scalingSignal = {
      level: "Watch",
      note: "The model is usable but sensitive. Improve one or two core levers before scaling aggressively.",
    };
  } else {
    scalingSignal = {
      level: "Weak",
      note: "Economics do not yet support confident scaling. Tighten CAC, retention, or contribution quality first.",
    };
  }

  return {
    summary,
    scenarios,
    levers,
    bestScenario,
    strongestLever,
    scalingSignal,
    metadata: metadataData as ModuleMetadata | null,
  };
}

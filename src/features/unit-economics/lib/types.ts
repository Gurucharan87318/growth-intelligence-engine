import type { BaseRecord } from "@/features/shared/types/common";

export type UnitEconomicsSummaryMetric = BaseRecord & {
  metric_key: string;
  metric_label: string;
  metric_value: number;
  metric_unit: string;
  metric_hint: string | null;
  sort_order: number;
};

export type UnitEconomicsScenario = BaseRecord & {
  scenario_key: string;
  scenario_label: string;
  payback_months: number;
  ltv_cac_ratio: number;
  gross_margin_percent: number;
  notes: string | null;
  sort_order: number;
};

export type UnitEconomicsLever = BaseRecord & {
  lever_key: string;
  lever_label: string;
  impact_score: number;
  lever_note: string | null;
  sort_order: number;
};

export type UnitEconomicsData = {
  summary: UnitEconomicsSummaryMetric[];
  scenarios: UnitEconomicsScenario[];
  levers: UnitEconomicsLever[];
  bestScenario: UnitEconomicsScenario | null;
  strongestLever: UnitEconomicsLever | null;
};

import type { BaseRecord } from "@/features/shared/types/common";

export type GrowthSummaryMetric = BaseRecord & {
  metric_key: string;
  metric_label: string;
  metric_value: number;
  metric_unit: string;
  metric_hint: string | null;
  sort_order: number;
};

export type GrowthChannel = BaseRecord & {
  channel_name: string;
  customers: number;
  cac: number;
  conversion_rate: number;
  retention_score: number;
  sort_order: number;
};

export type GrowthCohort = BaseRecord & {
  cohort_label: string;
  month_index: number;
  retention_rate: number;
  sort_order: number;
};

export type GrowthIntelligenceData = {
  summary: GrowthSummaryMetric[];
  channels: GrowthChannel[];
  cohorts: GrowthCohort[];
  averageRetentionScore: number;
  bestChannel: GrowthChannel | null;
  cohortLabels: string[];
};

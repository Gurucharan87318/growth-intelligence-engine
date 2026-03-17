import { createSupabaseServerClient } from "@/lib/supabase/server";

export type GrowthSummaryMetric = {
  id: number;
  metric_key: string;
  label: string;
  value: number | null;
  unit: string | null;
  change_pct: number | null;
  direction: "up" | "down" | "flat" | null;
  insight: string | null;
  benchmark: string | null;
  sort_order: number | null;
};

export type GrowthChannel = {
  id: number;
  channel_key: string | null;
  channel_name: string | null;
  acquisition_share: number | null;
  conversion_rate: number | null;
  retention_score: number | null;
  cac: number | null;
  ltv: number | null;
  trend: string | null;
  quality_note: string | null;
  sort_order: number | null;
};

export type GrowthCohort = {
  id: number;
  cohort_key: string | null;
  cohort_label: string | null;
  month_index: number | null;
  retention_pct: number | null;
  revenue_retention_pct: number | null;
  users_count: number | null;
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

export type GroupedGrowthCohort = {
  cohort_label: string;
  points: GrowthCohort[];
};

export type GrowthIntelligenceData = {
  summary: GrowthSummaryMetric[];
  channels: GrowthChannel[];
  cohorts: GrowthCohort[];
  groupedCohorts: GroupedGrowthCohort[];
  bestChannel: GrowthChannel | null;
  averageRetentionScore: number;
  maxMonthIndex: number;
  projectedUntil: number;
  metadata: ModuleMetadata | null;
};

function n(value: number | null | undefined) {
  return value ?? 0;
}

export async function getGrowthIntelligenceData(): Promise<GrowthIntelligenceData> {
  const supabase = createSupabaseServerClient();

  const [
    { data: summaryData, error: summaryError },
    { data: channelsData, error: channelsError },
    { data: cohortsData, error: cohortsError },
    { data: metadataData, error: metadataError },
  ] = await Promise.all([
    supabase.from("growth_summary").select("*").order("sort_order", { ascending: true }),
    supabase.from("growth_channels").select("*").order("sort_order", { ascending: true }),
    supabase
      .from("growth_cohorts")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("month_index", { ascending: true }),
    supabase.from("module_metadata").select("*").eq("module_key", "growth-intelligence").maybeSingle(),
  ]);

  if (summaryError) {
    throw new Error(`Failed to load growth summary: ${summaryError.message}`);
  }

  if (channelsError) {
    throw new Error(`Failed to load growth channels: ${channelsError.message}`);
  }

  if (cohortsError) {
    throw new Error(`Failed to load growth cohorts: ${cohortsError.message}`);
  }

  if (metadataError) {
    throw new Error(`Failed to load growth module metadata: ${metadataError.message}`);
  }

  const summary = (summaryData ?? []) as GrowthSummaryMetric[];
  const channels = (channelsData ?? []) as GrowthChannel[];
  const cohorts = (cohortsData ?? []) as GrowthCohort[];

  const groupedMap = cohorts.reduce((map, row) => {
    const cohortLabel = row.cohort_label ?? "Unknown Cohort";
    const existing = map.get(cohortLabel) ?? [];
    existing.push(row);
    map.set(cohortLabel, existing);
    return map;
  }, new Map<string, GrowthCohort[]>());

  const groupedCohorts: GroupedGrowthCohort[] = Array.from(groupedMap.entries()).map(
    ([cohort_label, points]) => ({
      cohort_label,
      points,
    })
  );

  const bestChannel =
    channels.length > 0
      ? [...channels].sort((a, b) => n(b.retention_score) - n(a.retention_score))[0]
      : null;

  const averageRetentionScore =
    channels.length > 0
      ? Math.round(channels.reduce((sum, item) => sum + n(item.retention_score), 0) / channels.length)
      : 0;

  const maxMonthIndex = cohorts.reduce(
    (max, row) => Math.max(max, n(row.month_index)),
    0
  );

  const projectedUntil = Math.max(5, maxMonthIndex + 2);

  return {
    summary,
    channels,
    cohorts,
    groupedCohorts,
    bestChannel,
    averageRetentionScore,
    maxMonthIndex,
    projectedUntil,
    metadata: metadataData as ModuleMetadata | null,
  };
}

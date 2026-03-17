import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { GrowthChannel, GrowthSummaryMetric } from "@/features/growth-intelligence/lib/queries";
import type { UnitEconomicsSummaryMetric } from "@/features/unit-economics/lib/queries";
import type { RankedMarketSegment } from "@/features/market-opportunity/lib/queries";

export type StrategyMemoSection = {
  id: string;
  section_key: string | null;
  section_title: string | null;
  body: string | null;
  sort_order: number | null;
};

export type StrategyRecommendation = {
  id: string;
  recommendation_key: string | null;
  title: string | null;
  rationale: string | null;
  impact: string | null;
  effort: string | null;
  timeline: string | null;
  owner_view: string | null;
  priority_order: number | null;
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

export type StrategyMemoData = {
  sections: StrategyMemoSection[];
  recommendations: StrategyRecommendation[];
  executiveSummary: StrategyMemoSection | null;
  strategicInterpretation: StrategyMemoSection | null;
  risksAndLimitations: StrategyMemoSection | null;
  marketThesis: StrategyMemoSection | null;
  growthDiagnosis: StrategyMemoSection | null;
  economicsConclusion: StrategyMemoSection | null;
  growthSummary: GrowthSummaryMetric[];
  growthChannels: GrowthChannel[];
  unitEconomicsSummary: UnitEconomicsSummaryMetric[];
  marketSegments: RankedMarketSegment[];
  metadata: ModuleMetadata | null;
};

type RawStrategyMemoSection = {
  id: string;
  section_key: string | null;
  section_label: string | null;
  section_body: string | null;
  sort_order: number | null;
};

type RawStrategyRecommendation = {
  id: string;
  recommendation_key: string | null;
  title: string | null;
  recommendation_body: string | null;
  owner_view: string | null;
  priority_order: number | null;
  impact: string | null;
  effort: string | null;
  timeline: string | null;
  sort_order: number | null;
};


function n(value: number | null | undefined) {
  return value ?? 0;
}

export async function getStrategyMemoData(): Promise<StrategyMemoData> {
  const supabase = createSupabaseServerClient();

  const [
    { data: sectionsData, error: sectionsError },
    { data: recommendationsData, error: recommendationsError },
    { data: growthSummaryData, error: growthSummaryError },
    { data: growthChannelsData, error: growthChannelsError },
    { data: unitEconomicsSummaryData, error: unitEconomicsSummaryError },
    { data: marketSegmentsData, error: marketSegmentsError },
    { data: metadataData, error: metadataError },
  ] = await Promise.all([
    supabase
      .from("strategy_memo_sections")
      .select("id, section_key, section_label, section_body, sort_order")
      .order("sort_order", { ascending: true }),

    supabase
  .from("strategy_recommendations")
  .select("id, recommendation_key, title, recommendation_body, owner_view, priority_order, impact, effort, timeline, sort_order")
  .order("sort_order", { ascending: true }),

    supabase
      .from("growth_summary")
      .select("*")
      .order("sort_order", { ascending: true }),

    supabase
      .from("growth_channels")
      .select("*")
      .order("sort_order", { ascending: true }),

    supabase
      .from("unit_economics_summary")
      .select("*")
      .order("sort_order", { ascending: true }),

    supabase
      .from("market_segments")
      .select("*")
      .order("sort_order", { ascending: true }),

    supabase
      .from("module_metadata")
      .select("*")
      .eq("module_key", "strategy-memo")
      .maybeSingle(),
  ]);

  if (sectionsError) {
    throw new Error(`Failed to load strategy memo sections: ${sectionsError.message}`);
  }

  if (recommendationsError) {
    throw new Error(`Failed to load strategy recommendations: ${recommendationsError.message}`);
  }

  if (growthSummaryError) {
    throw new Error(`Failed to load growth summary for strategy memo: ${growthSummaryError.message}`);
  }

  if (growthChannelsError) {
    throw new Error(`Failed to load growth channels for strategy memo: ${growthChannelsError.message}`);
  }

  if (unitEconomicsSummaryError) {
    throw new Error(`Failed to load unit economics summary for strategy memo: ${unitEconomicsSummaryError.message}`);
  }

  if (marketSegmentsError) {
    throw new Error(`Failed to load market segments for strategy memo: ${marketSegmentsError.message}`);
  }

  if (metadataError) {
    throw new Error(`Failed to load strategy memo metadata: ${metadataError.message}`);
  }

  const sections = ((sectionsData ?? []) as RawStrategyMemoSection[]).map((item) => ({
    id: item.id,
    section_key: item.section_key,
    section_title: item.section_label,
    body: item.section_body,
    sort_order: item.sort_order,
  }));

  const recommendations = ((recommendationsData ?? []) as RawStrategyRecommendation[]).map((item) => ({
  id: item.id,
  recommendation_key: item.recommendation_key,
  title: item.title,
  rationale: item.recommendation_body,
  impact: item.impact,
  effort: item.effort,
  timeline: item.timeline,
  owner_view: item.owner_view,
  priority_order: item.priority_order,
  sort_order: item.sort_order,
}));


  const growthSummary = (growthSummaryData ?? []) as GrowthSummaryMetric[];
  const growthChannels = (growthChannelsData ?? []) as GrowthChannel[];
  const unitEconomicsSummary =
    (unitEconomicsSummaryData ?? []) as UnitEconomicsSummaryMetric[];

  const marketSegments = ((marketSegmentsData ?? []) as RankedMarketSegment[])
    .map((segment) => ({
      ...segment,
      wedge_score:
        n(segment.market_attractiveness) +
        n(segment.demand_clarity) +
        n(segment.urgency_score) -
        n(segment.execution_risk),
    }))
    .sort((a, b) => b.wedge_score - a.wedge_score);

  return {
    sections,
    recommendations,
    executiveSummary:
      sections.find((item) => item.section_key === "executive-summary") ?? null,
    strategicInterpretation:
      sections.find((item) => item.section_key === "strategic-interpretation") ?? null,
    risksAndLimitations:
      sections.find((item) => item.section_key === "risks-limitations") ?? null,
    marketThesis:
      sections.find((item) => item.section_key === "market-thesis") ?? null,
    growthDiagnosis:
      sections.find((item) => item.section_key === "growth-diagnosis") ?? null,
    economicsConclusion:
      sections.find((item) => item.section_key === "economics-conclusion") ?? null,
    growthSummary,
    growthChannels,
    unitEconomicsSummary,
    marketSegments,
    metadata: metadataData as ModuleMetadata | null,
  };
}

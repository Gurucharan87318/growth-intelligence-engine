import { createSupabaseServerClient } from "@/lib/supabase/server";

export type MarketSegment = {
  id: number;
  segment_key: string;
  segment_name: string;
  description: string | null;
  market_attractiveness: number | null;
  demand_clarity: number | null;
  execution_risk: number | null;
  urgency_score: number | null;
  estimated_acv: number | null;
  estimated_users: number | null;
  geography: string | null;
  buyer_type: string | null;
  methodology_hint: string | null;
  source_label: string | null;
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

export type RankedMarketSegment = MarketSegment & {
  wedge_score: number;
};

export type MarketOpportunityData = {
  segments: RankedMarketSegment[];
  topSegment: RankedMarketSegment | null;
  tam: number;
  sam: number;
  som: number;
  averageAttractiveness: number;
  averageDemandClarity: number;
  averageExecutionRisk: number;
  metadata: ModuleMetadata | null;
};

function getNumericValue(value: number | null | undefined) {
  return value ?? 0;
}

function getWedgeScore(segment: MarketSegment) {
  return (
    getNumericValue(segment.market_attractiveness) +
    getNumericValue(segment.demand_clarity) +
    getNumericValue(segment.urgency_score) -
    getNumericValue(segment.execution_risk)
  );
}

export async function getMarketOpportunityData(): Promise<MarketOpportunityData> {
  const supabase = createSupabaseServerClient();

  const [
    { data: segmentData, error: segmentError },
    { data: metadataData, error: metadataError },
  ] = await Promise.all([
    supabase.from("market_segments").select("*").order("sort_order", { ascending: true }),
    supabase.from("module_metadata").select("*").eq("module_key", "market-opportunity").maybeSingle(),
  ]);

  if (segmentError) {
    throw new Error(`Failed to load market opportunity data: ${segmentError.message}`);
  }

  if (metadataError) {
    throw new Error(`Failed to load market module metadata: ${metadataError.message}`);
  }

  const rawSegments = (segmentData ?? []) as MarketSegment[];

  const segments: RankedMarketSegment[] = rawSegments
    .map((segment) => ({
      ...segment,
      wedge_score: getWedgeScore(segment),
    }))
    .sort((a, b) => b.wedge_score - a.wedge_score);

  const topSegment = segments[0] ?? null;

  const tam = segments.reduce(
    (sum, item) =>
      sum + getNumericValue(item.estimated_users) * getNumericValue(item.estimated_acv),
    0
  );

  const sam = Math.round(tam * 0.32);
  const som = Math.round(sam * 0.12);

  const averageAttractiveness =
    segments.length > 0
      ? Math.round(
          segments.reduce((sum, item) => sum + getNumericValue(item.market_attractiveness), 0) /
            segments.length
        )
      : 0;

  const averageDemandClarity =
    segments.length > 0
      ? Math.round(
          segments.reduce((sum, item) => sum + getNumericValue(item.demand_clarity), 0) /
            segments.length
        )
      : 0;

  const averageExecutionRisk =
    segments.length > 0
      ? Math.round(
          segments.reduce((sum, item) => sum + getNumericValue(item.execution_risk), 0) /
            segments.length
        )
      : 0;

  return {
    segments,
    topSegment,
    tam,
    sam,
    som,
    averageAttractiveness,
    averageDemandClarity,
    averageExecutionRisk,
    metadata: metadataData as ModuleMetadata | null,
  };
}

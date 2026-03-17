import type { BaseRecord } from "@/features/shared/types/common";

export type MarketSegment = BaseRecord & {
  slug: string;
  name: string;
  category: string;
  tam_usd_mn: number;
  sam_usd_mn: number;
  som_usd_mn: number;
  market_attractiveness: number;
  competition_score: number;
  demand_clarity: number;
  execution_risk: number;
  notes: string | null;
  sort_order: number;
};

export type MarketOpportunityData = {
  segments: MarketSegment[];
  topSegment: MarketSegment | null;
  averageAttractiveness: number;
  averageDemandClarity: number;
  averageExecutionRisk: number;
};

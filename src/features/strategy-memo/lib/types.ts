import type { BaseRecord } from "@/features/shared/types/common";

export type StrategyMemoSection = BaseRecord & {
  section_key: string;
  section_label: string;
  section_body: string;
  sort_order: number;
};

export type StrategyRecommendation = BaseRecord & {
  priority_order: number;
  title: string;
  recommendation_body: string;
  owner_view: string;
};

export type StrategyMemoData = {
  sections: StrategyMemoSection[];
  recommendations: StrategyRecommendation[];
  executiveSummary: StrategyMemoSection | null;
  strategicInterpretation: StrategyMemoSection | null;
  risksAndLimitations: StrategyMemoSection | null;
};

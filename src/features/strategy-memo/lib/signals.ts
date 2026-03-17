import type { GrowthChannel, GrowthSummaryMetric } from "@/features/growth-intelligence/lib/queries";
import type { UnitEconomicsSummaryMetric } from "@/features/unit-economics/lib/queries";
import type { RankedMarketSegment } from "@/features/market-opportunity/lib/queries";

type StrategicSignalInput = {
  growthSummary: GrowthSummaryMetric[];
  growthChannels: GrowthChannel[];
  unitEconomicsSummary: UnitEconomicsSummaryMetric[];
  marketSegments: RankedMarketSegment[];
};

function n(value: number | null | undefined) {
  return value ?? 0;
}

export function getStrategicSignal({
  growthSummary,
  growthChannels,
  unitEconomicsSummary,
  marketSegments,
}: StrategicSignalInput) {
  const payback =
    unitEconomicsSummary.find((item) => item.metric_key === "payback")?.value ?? 0;

  const ltvCac =
    unitEconomicsSummary.find((item) => item.metric_key === "ltv_cac")?.value ?? 0;

  const weakestChannel =
    growthChannels.length > 0
      ? [...growthChannels].sort((a, b) => n(a.retention_score) - n(b.retention_score))[0]
      : null;

  const grossRetention =
    growthSummary.find((item) => item.metric_key === "gross_retention")?.value ?? 0;

  const topSegment = marketSegments[0] ?? null;

  if (payback > 10 || ltvCac < 3) {
    return {
      level: "High Risk",
      recommendation:
        "CAC is drifting faster than LTV quality. Tighten acquisition efficiency before scaling spend.",
    };
  }

  if (grossRetention < 90 || (weakestChannel && n(weakestChannel.retention_score) < 60)) {
    return {
      level: "Watch",
      recommendation:
        "Retention durability is uneven across channels or cohorts. Improve activation and downstream quality before aggressive expansion.",
    };
  }

  if (topSegment && topSegment.wedge_score < 12) {
    return {
      level: "Watch",
      recommendation:
        "The current market wedge is directionally valid but not yet strong enough to support a highly confident expansion thesis.",
    };
  }

  return {
    level: "Favorable",
    recommendation:
      "Market wedge, growth quality, and unit economics are aligned well enough to support focused expansion through the strongest channels.",
  };
}

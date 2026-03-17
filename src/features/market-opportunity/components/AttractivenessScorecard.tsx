import { BriefcaseBusiness, ShieldAlert, TrendingUp } from "lucide-react";
import { MetricCard } from "@/features/shared/components/MetricCard";

type AttractivenessScorecardProps = {
  averageAttractiveness: number;
  averageDemandClarity: number;
  averageExecutionRisk: number;
};

export function AttractivenessScorecard({
  averageAttractiveness,
  averageDemandClarity,
  averageExecutionRisk,
}: AttractivenessScorecardProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <MetricCard
        label="Average attractiveness"
        value={`${averageAttractiveness}/100`}
        hint="A quick benchmark across the segments I am tracking."
        icon={<BriefcaseBusiness className="h-5 w-5" strokeWidth={1.5} />}
      />

      <MetricCard
        label="Demand clarity"
        value={`${averageDemandClarity}/100`}
        hint="How easy it is to explain value to the buyer in practical terms."
        icon={<TrendingUp className="h-5 w-5" strokeWidth={1.5} />}
      />

      <MetricCard
        label="Execution risk"
        value={`${averageExecutionRisk}/100`}
        hint="Higher means more delivery, GTM, or adoption friction."
        icon={<ShieldAlert className="h-5 w-5" strokeWidth={1.5} />}
      />
    </div>
  );
}

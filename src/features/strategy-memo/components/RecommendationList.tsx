import type { StrategyRecommendation } from "../lib/types";

type RecommendationListProps = {
  recommendations: StrategyRecommendation[];
};

export function RecommendationList({
  recommendations,
}: RecommendationListProps) {
  return (
    <div className="grid gap-4">
      {recommendations.map((recommendation) => (
        <div
          key={recommendation.id}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white tabular-nums">
              {String(recommendation.priority_order).padStart(2, "0")}
            </span>

            <div>
              <h3 className="text-base font-semibold tracking-tight text-slate-900">
                {recommendation.title}
              </h3>

              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                {recommendation.owner_view}
              </p>
            </div>
          </div>

          <p className="mt-4 text-sm leading-7 text-slate-500">
            {recommendation.recommendation_body}
          </p>
        </div>
      ))}
    </div>
  );
}

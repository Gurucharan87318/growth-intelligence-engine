import { BriefcaseBusiness, ClipboardList, Target } from "lucide-react";

import type { StrategyRecommendation } from "../lib/types";

type StakeholderViewsProps = {
  recommendations: StrategyRecommendation[];
};

function getStakeholderIcon(ownerView: string) {
  const normalized = ownerView.toLowerCase();

  if (normalized.includes("founder")) {
    return <BriefcaseBusiness className="h-5 w-5" strokeWidth={1.5} />;
  }

  if (normalized.includes("product")) {
    return <Target className="h-5 w-5" strokeWidth={1.5} />;
  }

  return <ClipboardList className="h-5 w-5" strokeWidth={1.5} />;
}

export function StakeholderViews({
  recommendations,
}: StakeholderViewsProps) {
  const uniqueOwners = Array.from(
    new Set(recommendations.map((item) => item.owner_view))
  );

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {uniqueOwners.map((owner) => {
        const firstRecommendation = recommendations.find(
          (item) => item.owner_view === owner
        );

        return (
          <div
            key={owner}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
              {getStakeholderIcon(owner)}
            </div>

            <h3 className="mt-5 text-lg font-semibold tracking-tight text-slate-900">
              {owner}
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-500">
              {firstRecommendation?.recommendation_body ?? ""}
            </p>
          </div>
        );
      })}
    </div>
  );
}

import type { UnitEconomicsLever } from "../lib/types";

type LeverImpactListProps = {
  levers: UnitEconomicsLever[];
};

export function LeverImpactList({ levers }: LeverImpactListProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <p className="text-sm font-medium text-slate-900">Operating levers</p>
        <p className="mt-1 text-sm leading-6 text-slate-500">
          These are the areas that move the model most if I improve them.
        </p>
      </div>

      <div className="space-y-5">
        {levers.map((lever) => (
          <div key={lever.id}>
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="text-sm font-medium text-slate-900">
                {lever.lever_label}
              </span>

              <span className="text-xs text-slate-500 tabular-nums">
                {lever.impact_score}/100
              </span>
            </div>

            <div className="h-2.5 rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-slate-900"
                style={{ width: `${lever.impact_score}%` }}
              />
            </div>

            {lever.lever_note ? (
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {lever.lever_note}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

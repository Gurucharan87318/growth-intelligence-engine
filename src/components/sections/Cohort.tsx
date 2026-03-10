import type { CohortRetentionRow } from "@/types/analytics";

type CohortRetentionProps = {
  rows: CohortRetentionRow[];
};

function formatMonth(value: string) {
  const date = new Date(value);
  return new Intl.DateTimeFormat("en-IN", {
    month: "short",
    year: "numeric",
  }).format(date);
}

function getIntensity(rate: number) {
  if (rate >= 80) return "bg-violet-700 text-white";
  if (rate >= 60) return "bg-violet-600 text-white";
  if (rate >= 40) return "bg-violet-400 text-slate-950";
  if (rate >= 20) return "bg-violet-200 text-slate-900";
  return "bg-slate-100 text-slate-700";
}

export function CohortRetention({ rows }: CohortRetentionProps) {
  const cohortMap = new Map<string, Map<number, CohortRetentionRow>>();
  let maxMonth = 0;

  for (const row of rows) {
    if (!cohortMap.has(row.cohort_month)) {
      cohortMap.set(row.cohort_month, new Map());
    }

    cohortMap.get(row.cohort_month)!.set(row.month_number, row);
    maxMonth = Math.max(maxMonth, row.month_number);
  }

  const cohorts = Array.from(cohortMap.entries());

  return (
    <section className="section-block pt-0">
      <div className="page-shell">
        <div className="glass-card">
          <span className="eyebrow">Cohort Retention</span>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight">
            Monthly retention heatmap
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
            Each row is a signup cohort and each column shows the percentage of
            users active in that month after signup.
          </p>

          <div className="mt-8 overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-2">
              <thead>
                <tr className="text-left text-sm text-slate-500">
                  <th className="px-3 py-2 font-medium">Cohort</th>
                  <th className="px-3 py-2 font-medium">Size</th>
                  {Array.from({ length: maxMonth + 1 }, (_, i) => (
                    <th key={i} className="px-3 py-2 text-center font-medium">
                      M{i}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cohorts.map(([cohortMonth, monthMap]) => {
                  const firstRow = monthMap.get(0);
                  const cohortSize = firstRow?.cohort_size ?? 0;

                  return (
                    <tr key={cohortMonth}>
                      <td className="rounded-l-2xl bg-white/80 px-3 py-3 font-medium text-slate-900">
                        {formatMonth(cohortMonth)}
                      </td>
                      <td className="bg-white/80 px-3 py-3 text-slate-700">
                        {cohortSize}
                      </td>

                      {Array.from({ length: maxMonth + 1 }, (_, i) => {
                        const cell = monthMap.get(i);

                        return (
                          <td key={i} className="px-1 py-1">
                            <div
                              className={`rounded-xl px-3 py-3 text-center text-sm font-medium ${
                                cell
                                  ? getIntensity(cell.retention_rate)
                                  : "bg-slate-50 text-slate-300"
                              }`}
                            >
                              {cell ? `${cell.retention_rate}%` : "—"}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

import type { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";

type MetricCardProps = {
  label: string;
  value: string;
  hint?: string;
  icon?: ReactNode;
};

export function MetricCard({
  label,
  value,
  hint,
  icon,
}: MetricCardProps) {
  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
              {label}
            </p>
            <p className="text-2xl font-semibold tracking-tight text-slate-900">
              {value}
            </p>
            {hint ? (
              <p className="text-sm leading-6 text-slate-500">{hint}</p>
            ) : null}
          </div>

          {icon ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-2 text-slate-600">
              {icon}
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

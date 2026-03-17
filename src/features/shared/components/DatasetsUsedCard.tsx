import { Database } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type DatasetsUsedCardProps = {
  title?: string;
  description?: string;
  datasets: string[];
};

export function DatasetsUsedCard({
  title = "Datasets used",
  description = "This section is powered by structured backend datasets fetched from Supabase and shaped into decision-ready views.",
  datasets,
}: DatasetsUsedCardProps) {
  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader className="space-y-4">
        <div className="flex items-center gap-2 text-slate-600">
          <Database className="h-4 w-4" strokeWidth={1.75} />
          <span className="text-xs font-semibold uppercase tracking-[0.18em]">
            Backend datasets
          </span>
        </div>

        <div className="space-y-2">
          <CardTitle className="text-xl font-semibold tracking-tight text-slate-900">
            {title}
          </CardTitle>

          <p className="max-w-3xl text-sm leading-6 text-slate-500">
            {description}
          </p>
        </div>
      </CardHeader>

      <CardContent className="flex flex-wrap gap-2">
        {datasets.map((dataset) => (
          <Badge
            key={dataset}
            variant="secondary"
            className="rounded-md bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
          >
            {dataset}
          </Badge>
        ))}
      </CardContent>
    </Card>
  );
}

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function MetricCardSkeleton() {
  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader className="space-y-3 pb-3">
        <Skeleton className="h-4 w-24 rounded-md bg-slate-200" />
        <Skeleton className="h-3 w-40 rounded-md bg-slate-100" />
      </CardHeader>

      <CardContent className="space-y-3">
        <Skeleton className="h-9 w-28 rounded-md bg-slate-200" />
        <Skeleton className="h-4 w-full rounded-md bg-slate-100" />
        <Skeleton className="h-4 w-5/6 rounded-md bg-slate-100" />
      </CardContent>
    </Card>
  );
}

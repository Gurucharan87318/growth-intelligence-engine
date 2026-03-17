import { Skeleton } from "@/components/ui/skeleton";

export function ChartSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <Skeleton className="h-5 w-40" />
      <Skeleton className="mt-4 h-4 w-72" />
      <Skeleton className="mt-8 h-[280px] w-full rounded-xl" />
    </div>
  );
}

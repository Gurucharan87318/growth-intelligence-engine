import { MetricCardSkeleton } from "@/features/shared/components/MetricCardSkeleton";

type MetricsGridSkeletonProps = {
  count?: number;
  className?: string;
};

export function MetricsGridSkeleton({
  count = 4,
  className = "grid gap-5 md:grid-cols-2 xl:grid-cols-4",
}: MetricsGridSkeletonProps) {
  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, index) => (
        <MetricCardSkeleton key={index} />
      ))}
    </div>
  );
}

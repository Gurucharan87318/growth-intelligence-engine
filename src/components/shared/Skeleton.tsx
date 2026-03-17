import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <section className="section-block pt-0">
      <div className="page-shell">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <Skeleton className="h-4 w-24" />
              <Skeleton className="mt-4 h-8 w-36" />
              <Skeleton className="mt-6 h-4 w-28" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

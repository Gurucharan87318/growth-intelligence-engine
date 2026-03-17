import { Skeleton } from "@/components/ui/skeleton";

export function SectionSkeleton({
  cards = 3,
  tall = false,
}: {
  cards?: number;
  tall?: boolean;
}) {
  return (
    <section className="section-block pt-0">
      <div className="page-shell">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="mt-4 h-8 w-64" />
          <Skeleton className="mt-4 h-4 w-96 max-w-full" />

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: cards }).map((_, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <Skeleton className="h-4 w-24" />
                <Skeleton className="mt-4 h-8 w-32" />
                <Skeleton className="mt-6 h-4 w-24" />
                {tall && <Skeleton className="mt-6 h-32 w-full rounded-xl" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

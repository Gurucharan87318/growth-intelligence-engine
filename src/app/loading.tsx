import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main>
      <section className="section-block">
        <div className="page-shell">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="mt-6 h-12 w-2/3 rounded-xl" />
            <Skeleton className="mt-4 h-5 w-1/2 rounded-xl" />

            <div className="mt-10 flex gap-3">
              <Skeleton className="h-11 w-36 rounded-xl" />
              <Skeleton className="h-11 w-32 rounded-xl" />
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 bg-white p-5"
                >
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="mt-4 h-7 w-40" />
                  <Skeleton className="mt-4 h-4 w-32" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-block pt-0">
        <div className="page-shell">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <Skeleton className="h-4 w-24" />
                <Skeleton className="mt-4 h-8 w-28" />
                <Skeleton className="mt-5 h-4 w-24" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block pt-0">
        <div className="page-shell grid gap-4 lg:grid-cols-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <Skeleton className="h-5 w-40" />
              <Skeleton className="mt-4 h-4 w-72" />
              <Skeleton className="mt-8 h-[280px] w-full rounded-xl" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

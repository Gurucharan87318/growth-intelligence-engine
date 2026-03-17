import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PageContainer } from "@/features/shared/components/PageContainer";
import { MetricsGridSkeleton } from "@/features/shared/components/MetricGrid";

export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <PageContainer>
        <div className="space-y-10 py-14 md:py-16">
          <div className="space-y-4">
            <Badge
              variant="secondary"
              className="w-fit bg-slate-100 text-slate-700 hover:bg-slate-100"
            >
              Growth Intelligence
            </Badge>

            <div className="space-y-3">
              <Skeleton className="h-10 w-80 bg-slate-200" />
              <Skeleton className="h-5 w-full max-w-3xl bg-slate-100" />
              <Skeleton className="h-5 w-5/6 max-w-2xl bg-slate-100" />
            </div>

            <Skeleton className="h-9 w-[320px] bg-slate-100" />
          </div>

          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader className="space-y-4">
              <Skeleton className="h-5 w-40 bg-slate-200" />
              <Skeleton className="h-9 w-[280px] bg-slate-100" />
              <Skeleton className="h-4 w-full max-w-2xl bg-slate-100" />
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Skeleton className="h-7 w-32 bg-slate-100" />
              <Skeleton className="h-7 w-36 bg-slate-100" />
              <Skeleton className="h-7 w-36 bg-slate-100" />
            </CardContent>
          </Card>

          <MetricsGridSkeleton count={4} />

          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader className="space-y-3">
                <Skeleton className="h-8 w-52 bg-slate-200" />
                <Skeleton className="h-4 w-full bg-slate-100" />
              </CardHeader>
              <CardContent className="space-y-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="h-28 w-full bg-slate-100" />
                ))}
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader className="space-y-3">
                <Skeleton className="h-8 w-48 bg-slate-200" />
                <Skeleton className="h-4 w-full bg-slate-100" />
              </CardHeader>
              <CardContent className="space-y-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="h-16 w-full bg-slate-100" />
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </PageContainer>
    </main>
  );
}

import { ScrollReveal } from "@/components/shared/Scroll";

type DashboardEmbedProps = {
  embedUrl?: string;
};

export function DashboardEmbed({ embedUrl }: DashboardEmbedProps) {
  return (
    <section id="dashboard" className="section-block pt-0">
      <div className="page-shell">
        <ScrollReveal>
          <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm sm:p-8">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Executive Drill-Down
            </span>

            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900">
              Embedded BI workspace
            </h2>

            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
              A deeper operational view for stakeholder walkthroughs,
              presentation-ready reporting, and interactive slicing beyond the
              native dashboard sections.
            </p>

            <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  title="Embedded BI Dashboard"
                  className="h-[520px] w-full bg-white"
                />
              ) : (
                <div className="flex min-h-[320px] items-center justify-center px-6 text-center text-sm leading-7 text-slate-600">
                  Add <span className="mx-1 font-medium">NEXT_PUBLIC_BI_EMBED_URL</span>
                  in <span className="mx-1 font-medium">.env.local</span> to display
                  the Power BI or Tableau dashboard here.
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

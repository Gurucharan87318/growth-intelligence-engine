type DashboardEmbedProps = {
  embedUrl?: string;
};

export function DashboardEmbed({ embedUrl }: DashboardEmbedProps) {
  return (
    <section className="section-block pt-0">
      <div className="page-shell">
        <div className="glass-card" id="dashboard">
          <span className="eyebrow">Embedded BI Dashboard</span>

          <h2 className="mt-6 text-3xl font-semibold tracking-tight">
            Interactive dashboard view
          </h2>

          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
            This section embeds a BI dashboard to complement the in-app metrics.
            It demonstrates how product analytics outputs can be communicated
            through stakeholder-friendly visual reporting.
          </p>

          <div className="mt-8 overflow-hidden rounded-3xl border border-black/10 bg-white">
            {embedUrl ? (
              <div className="aspect-video w-full">
                <iframe
                  src={embedUrl}
                  title="Embedded business intelligence dashboard"
                  className="h-full w-full"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="flex min-h-[420px] items-center justify-center px-6 text-center text-slate-500">
                Add NEXT_PUBLIC_BI_EMBED_URL in .env.local to display the Power
                BI or Tableau dashboard here.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

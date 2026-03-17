export function Hero() {
  return (
    <section className="section-block pb-10">
      <div className="page-shell">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
            Product Analytics Portfolio
          </p>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Growth Intelligence Engine
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            A strategy-grade analytics experience that turns customer behavior,
            revenue quality, and churn signals into executive-ready decisions.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#summary"
              className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Explore dashboard
            </a>
            <a
              href="#deep-dive"
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              View analytics
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

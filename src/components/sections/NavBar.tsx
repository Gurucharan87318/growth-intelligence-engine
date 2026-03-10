export function TopNav() {
  const links = [
    { label: "Analytics", href: "#analytics" },
    { label: "Cohorts", href: "#cohort-retention" },
    { label: "Dashboard", href: "#dashboard" },
    { label: "Simulator", href: "#growth-simulator" },
    { label: "Strategy", href: "#strategic-recommendations" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/70 backdrop-blur-xl">
      <div className="page-shell flex items-center justify-between py-4">
        <div className="text-sm font-semibold tracking-tight text-slate-900">
          Growth Intelligence
        </div>

        <nav className="hidden gap-6 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-slate-600 transition hover:text-slate-950"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

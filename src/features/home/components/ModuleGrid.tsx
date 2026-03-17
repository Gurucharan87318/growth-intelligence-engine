import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ModuleItem = {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
};

type ModuleGridProps = {
  items: ModuleItem[];
};

export function ModuleGrid({ items }: ModuleGridProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-colors hover:border-slate-300"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            {item.eyebrow}
          </p>

          <h3 className="mt-3 text-xl font-semibold tracking-tight text-slate-900">
            {item.title}
          </h3>

          <p className="mt-3 text-sm leading-7 text-slate-500">
            {item.description}
          </p>

          <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-slate-900">
            Open module
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </div>
        </Link>
      ))}
    </div>
  );
}

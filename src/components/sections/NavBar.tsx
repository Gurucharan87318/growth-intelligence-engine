"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navItems = [
  { href: "/", label: "Overview" },
  { href: "/market-opportunity", label: "Market" },
  { href: "/growth-intelligence", label: "Growth" },
  { href: "/unit-economics", label: "Economics" },
  { href: "/strategy-memo", label: "Memo" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-slate-900 sm:text-base"
        >
          Growth Intelligence Engine
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "text-sm font-medium tracking-tight transition-colors",
                  active ? "text-slate-900" : "text-slate-500 hover:text-slate-900"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/simulate"
          className="inline-flex rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
        >
            Try Simulator
        </Link>
      </div>
    </header>
  );
}

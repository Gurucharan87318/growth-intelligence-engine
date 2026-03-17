import type { ReactNode } from "react";
import { PageContainer } from "./PageContainer";

type SectionProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  bordered?: boolean;
};

export function Section({
  children,
  className = "",
  innerClassName = "",
  bordered = false,
}: SectionProps) {
  return (
    <section
      className={`py-20 md:py-24 ${bordered ? "border-t border-slate-200" : ""} ${className}`}
    >
      <PageContainer className={innerClassName}>{children}</PageContainer>
    </section>
  );
}

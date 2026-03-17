type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div className={isCenter ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
          {eyebrow}
        </p>
      ) : null}

      <h2 className="text-balance text-3xl font-semibold tracking-tight text-slate-900 leading-[1.15] sm:text-4xl md:text-5xl">
        {title}
      </h2>

      {description ? (
        <p className="mt-5 text-base leading-7 text-slate-500 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

import { cn } from "@/lib/utils";

export function Eyebrow({
  className,
  children,
  as: Tag = "span",
}: {
  className?: string;
  children: React.ReactNode;
  as?: "span" | "p" | "div";
}) {
  return (
    <Tag
      className={cn(
        "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brand-accent",
        className,
      )}
    >
      <span aria-hidden className="inline-block h-px w-8 bg-brand-accent" />
      {children}
    </Tag>
  );
}

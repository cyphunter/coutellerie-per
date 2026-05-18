import { cn } from "@/lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: "default" | "accent" | "outline";
};

const TONES = {
  default: "bg-ink/5 text-ink",
  accent: "bg-brand-accent/15 text-brand-accent",
  outline: "border border-rule text-muted",
} as const;

export function Badge({ className, tone = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2.5 py-0.5 text-xs font-medium uppercase tracking-wider",
        TONES[tone],
        className,
      )}
      {...props}
    />
  );
}

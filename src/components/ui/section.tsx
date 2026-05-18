import { cn } from "@/lib/utils";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  as?: "section" | "article" | "div";
  variant?: "default" | "deep" | "ink";
};

const VARIANTS = {
  default: "bg-paper",
  deep: "bg-paper-deep",
  ink: "bg-ink text-paper",
} as const;

export function Section({
  className,
  as: Tag = "section",
  variant = "default",
  ...props
}: SectionProps) {
  return (
    <Tag
      className={cn(
        "py-20 md:py-28",
        VARIANTS[variant],
        className,
      )}
      {...props}
    />
  );
}

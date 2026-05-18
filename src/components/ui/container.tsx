import { cn } from "@/lib/utils";

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: "default" | "narrow" | "wide";
  as?: "div" | "section" | "article" | "main";
};

const SIZES = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
} as const;

export function Container({
  className,
  size = "default",
  as: Tag = "div",
  ...props
}: ContainerProps) {
  return <Tag className={cn("mx-auto px-6", SIZES[size], className)} {...props} />;
}

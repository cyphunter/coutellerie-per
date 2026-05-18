import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";

type CtaSectionProps = {
  eyebrow?: string;
  title: string;
  description: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
};

export function CtaSection({
  eyebrow,
  title,
  description,
  primary,
  secondary,
}: CtaSectionProps) {
  return (
    <section className="relative isolate overflow-hidden bg-brand py-20 text-ink md:py-28">
      {/* Texture verticale subtile pour donner du grain à l'encart cuir */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(180deg, transparent 0 2px, var(--color-ink) 2px 3px)",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        {eyebrow ? (
          <Eyebrow className="justify-center text-brand-accent-soft">{eyebrow}</Eyebrow>
        ) : null}
        <h2 className="mt-6 font-display text-[var(--text-display-lg)] leading-[1.1] text-ink">
          {title}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-ink/80">{description}</p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href={primary.href}
            className="inline-flex h-12 items-center gap-2 rounded-sm bg-brand-accent px-6 text-sm font-medium text-white transition-colors hover:bg-brand-accent-soft hover:text-paper"
          >
            {primary.label}
            <ArrowRight size={16} aria-hidden />
          </Link>
          {secondary ? (
            <Link
              href={secondary.href}
              className="inline-flex h-12 items-center gap-2 rounded-sm border border-ink/30 px-6 text-sm font-medium text-ink transition-colors hover:bg-ink/5"
            >
              {secondary.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}

import { Tv } from "lucide-react";
import { press } from "@/data/press";

export function PressStrip() {
  if (press.length === 0) return null;

  return (
    <section
      aria-labelledby="press-heading"
      className="border-y border-rule bg-paper-deep py-8"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 md:flex-row md:items-center md:justify-between">
        <h2
          id="press-heading"
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brand-accent"
        >
          <Tv size={14} aria-hidden />
          Ils en ont parlé
        </h2>
        <ul className="flex flex-wrap gap-x-10 gap-y-3 text-sm text-ink/80">
          {press.map((item) => (
            <li key={`${item.outlet}-${item.date}`} className="flex flex-col">
              <span className="font-display text-xl leading-tight text-ink">
                {item.outlet}
              </span>
              <span className="text-xs text-muted">
                {item.program} · {item.dateLabel}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

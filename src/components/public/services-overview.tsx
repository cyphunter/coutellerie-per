import Link from "next/link";
import { Hammer, Scissors, Wrench, Scroll, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { services, type Service } from "@/data/services";
import { Eyebrow } from "@/components/ui/eyebrow";

const ICONS: Record<Service["iconName"], LucideIcon> = {
  hammer: Hammer,
  scissors: Scissors,
  wrench: Wrench,
  scroll: Scroll,
};

export function ServicesOverview() {
  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>L'atelier en quatre métiers</Eyebrow>
            <h2 className="mt-4 font-display text-[var(--text-display-lg)] leading-[1.1] text-ink">
              Forger, affûter, restaurer, graver.
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-accent hover:underline"
          >
            Détail des services
            <ArrowRight size={16} aria-hidden />
          </Link>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = ICONS[service.iconName];
            return (
              <li key={service.slug}>
                <Link
                  href={`/services#${service.slug}`}
                  className="group flex h-full flex-col rounded-sm border border-rule bg-paper p-6 transition-colors hover:border-brand-accent"
                >
                  <span
                    aria-hidden
                    className="inline-flex h-12 w-12 items-center justify-center rounded-sm bg-paper-deep text-brand-accent transition-colors group-hover:bg-brand-accent group-hover:text-paper"
                  >
                    <Icon size={22} strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-6 font-display text-2xl text-ink">{service.title}</h3>
                  <p className="mt-3 text-sm text-muted">{service.short}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

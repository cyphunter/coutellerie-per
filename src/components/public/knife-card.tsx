import Image from "next/image";
import type { Knife } from "@/data/knives";
import { KNIFE_CATEGORIES } from "@/data/knives";
import { PlaceholderImage } from "./placeholder-image";

type KnifeCardProps = {
  knife: Knife;
  /** Marquer la carte principale (image plus grande, mise en avant). */
  emphasized?: boolean;
  /** Charger l'image en priorité (above-the-fold, ex: 1ʳᵉ carte de la home). */
  priority?: boolean;
};

export function KnifeCard({ knife, emphasized, priority }: KnifeCardProps) {
  const category = KNIFE_CATEGORIES[knife.category];
  const hasImage = Boolean(knife.imagePath);

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-sm border border-rule bg-paper transition-shadow hover:shadow-lg ${
        emphasized ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden bg-paper-deep ${
          emphasized ? "aspect-[4/3]" : "aspect-[5/3]"
        }`}
      >
        {hasImage ? (
          <Image
            src={knife.imagePath}
            alt={knife.imageAlt}
            fill
            sizes={
              emphasized
                ? "(min-width: 1024px) 800px, (min-width: 768px) 100vw, 100vw"
                : "(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
            }
            priority={priority}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <PlaceholderImage
            seed={knife.slug}
            alt={knife.imageAlt}
            className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}
        <span className="absolute left-4 top-4 inline-flex items-center rounded-sm bg-paper/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink">
          {category.label}
        </span>
        {knife.year ? (
          <span className="absolute right-4 top-4 inline-flex items-center rounded-sm bg-ink/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-paper">
            {knife.year}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <h3 className={`font-display text-ink ${emphasized ? "text-3xl" : "text-2xl"}`}>
            {knife.name}
          </h3>
          <p className="mt-2 text-sm text-muted">{knife.description}</p>
        </div>

        <dl className="mt-auto grid gap-2 text-xs text-muted">
          <div className="flex gap-2">
            <dt className="w-16 shrink-0 font-semibold uppercase tracking-wider text-ink/70">
              Lame
            </dt>
            <dd>{knife.blade}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-16 shrink-0 font-semibold uppercase tracking-wider text-ink/70">
              Manche
            </dt>
            <dd>{knife.handle}</dd>
          </div>
          {knife.totalLength ? (
            <div className="flex gap-2">
              <dt className="w-16 shrink-0 font-semibold uppercase tracking-wider text-ink/70">
                Longueur
              </dt>
              <dd>{knife.totalLength}</dd>
            </div>
          ) : null}
        </dl>

        {knife.price ? (
          <p className="border-t border-rule pt-4 text-sm font-medium text-brand-accent">
            {knife.price}
          </p>
        ) : null}
      </div>
    </article>
  );
}

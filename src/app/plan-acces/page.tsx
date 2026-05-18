import type { Metadata } from "next";
import Link from "next/link";
import { Car, Train, Bike, MapPin, Phone, Clock, ArrowRight } from "lucide-react";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { Eyebrow } from "@/components/ui/eyebrow";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = buildMetadata({
  title: "Plan d'accès",
  description:
    "Comment se rendre à l'atelier Coutellerie Per à Vannes — voiture, train, vélo. Coordonnées GPS et indications pratiques.",
  path: "/plan-acces",
});

const TRANSPORTS = [
  {
    icon: Car,
    title: "En voiture",
    body:
      "Depuis la voie express N165, sortir au centre-ville de Vannes. Stationnement gratuit à proximité (zone bleue), parking longue durée à la Gare ou au port à dix minutes à pied.",
  },
  {
    icon: Train,
    title: "En train",
    body:
      "Gare SNCF de Vannes — desservie par TGV depuis Paris-Montparnasse (2 h 30) et liaisons régionales. L'atelier est à quinze minutes à pied de la gare.",
  },
  {
    icon: Bike,
    title: "À pied ou à vélo",
    body:
      "L'atelier est dans le centre historique. Pistes cyclables sécurisées le long du port et arceaux à vélo à proximité.",
  },
];

export default function PlanAccesPage() {
  const { contact } = siteConfig;
  const mapsUrl = `https://www.google.com/maps?q=${contact.geo.latitude},${contact.geo.longitude}`;
  const osmEmbed = `https://www.openstreetmap.org/export/embed.html?bbox=${contact.geo.longitude - 0.012}%2C${contact.geo.latitude - 0.006}%2C${contact.geo.longitude + 0.012}%2C${contact.geo.latitude + 0.006}&layer=mapnik&marker=${contact.geo.latitude}%2C${contact.geo.longitude}`;

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Plan d'accès", path: "/plan-acces" },
        ])}
      />
      <main id="main-content">
        <section className="border-b border-rule bg-paper-deep py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-6">
            <Eyebrow>Plan d'accès</Eyebrow>
            <h1 className="mt-6 font-display text-[var(--text-display-xl)] leading-[1.05] text-ink">
              Venir à{" "}
              <span className="italic text-brand-accent">l'atelier</span>.
            </h1>
            <p className="mt-8 max-w-2xl text-lg text-muted">
              L'atelier Coutellerie Per est situé en centre-ville de Vannes, à
              quelques pas du port et des remparts. Accès facile en voiture,
              train ou à pied.
            </p>
          </div>
        </section>

        {/* Carte + adresse */}
        <section className="bg-paper py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="overflow-hidden rounded-sm border border-rule bg-paper-deep">
                  <iframe
                    src={osmEmbed}
                    title={`Carte de localisation de l'atelier Coutellerie Per à ${contact.city}`}
                    loading="lazy"
                    className="aspect-[4/3] w-full"
                  />
                </div>
                <div className="mt-4 flex flex-wrap gap-3 text-sm">
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-sm bg-brand-accent px-5 font-medium text-white transition-colors hover:bg-brand-accent-soft hover:text-paper"
                  >
                    Ouvrir dans Google Maps
                    <ArrowRight size={14} aria-hidden />
                  </a>
                  <a
                    href={`https://www.openstreetmap.org/?mlat=${contact.geo.latitude}&mlon=${contact.geo.longitude}#map=17/${contact.geo.latitude}/${contact.geo.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-sm border border-ink/30 px-5 font-medium text-ink hover:bg-ink/5"
                  >
                    Voir sur OpenStreetMap
                  </a>
                </div>
              </div>

              <aside className="lg:col-span-5">
                <h2 className="font-display text-3xl text-ink">L'atelier</h2>
                <dl className="mt-8 space-y-6 text-sm">
                  <div className="flex gap-4">
                    <dt className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-paper-deep text-brand-accent">
                      <MapPin size={18} strokeWidth={1.5} aria-hidden />
                      <span className="sr-only">Adresse</span>
                    </dt>
                    <dd>
                      <address className="not-italic text-ink/90">
                        {contact.address}
                        <br />
                        {contact.postalCode} {contact.city}
                        <br />
                        {contact.region}, {contact.countryName}
                      </address>
                      <p className="mt-2 text-xs text-muted">
                        GPS : {contact.geo.latitude.toFixed(4)}, {contact.geo.longitude.toFixed(4)}
                      </p>
                    </dd>
                  </div>
                  <div className="flex gap-4">
                    <dt className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-paper-deep text-brand-accent">
                      <Phone size={18} strokeWidth={1.5} aria-hidden />
                      <span className="sr-only">Téléphone</span>
                    </dt>
                    <dd>
                      <a
                        href={`tel:${contact.phone}`}
                        className="text-ink/90 hover:text-brand-accent"
                      >
                        {contact.phoneDisplay}
                      </a>
                    </dd>
                  </div>
                  <div className="flex gap-4">
                    <dt className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-paper-deep text-brand-accent">
                      <Clock size={18} strokeWidth={1.5} aria-hidden />
                      <span className="sr-only">Horaires</span>
                    </dt>
                    <dd className="whitespace-pre-line text-ink/90">
                      {contact.openingHoursLabel}
                    </dd>
                  </div>
                </dl>
                <p className="mt-8 text-xs text-muted">
                  {contact.appointmentNote}
                </p>
              </aside>
            </div>
          </div>
        </section>

        {/* Comment venir */}
        <section className="border-t border-rule bg-paper-deep py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <Eyebrow>Comment venir</Eyebrow>
            <h2 className="mt-4 font-display text-[var(--text-display-lg)] leading-[1.1] text-ink">
              Trois manières d'arriver à l'atelier.
            </h2>

            <ul className="mt-12 grid gap-6 md:grid-cols-3">
              {TRANSPORTS.map(({ icon: Icon, title, body }) => (
                <li
                  key={title}
                  className="rounded-sm border border-rule bg-paper p-8"
                >
                  <span
                    aria-hidden
                    className="inline-flex h-12 w-12 items-center justify-center rounded-sm bg-paper-deep text-brand-accent"
                  >
                    <Icon size={22} strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-6 font-display text-2xl text-ink">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-paper py-20">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <Eyebrow className="justify-center">Avant de venir</Eyebrow>
            <p className="mt-6 text-lg leading-relaxed text-ink/85">
              Si vous venez pour un projet précis ou pour déposer un couteau,
              un coup de fil préalable nous permet de réserver le temps qu'il
              faut. Et nous évite de vous faire patienter devant un atelier vide.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex h-12 items-center gap-2 rounded-sm bg-brand-accent px-6 text-sm font-medium text-white transition-colors hover:bg-brand-accent-soft hover:text-paper"
              >
                Prévenir l'atelier
              </Link>
              <a
                href={`tel:${contact.phone}`}
                className="inline-flex h-12 items-center gap-2 rounded-sm border border-ink/30 px-6 text-sm font-medium text-ink hover:bg-ink/5"
              >
                Appeler
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

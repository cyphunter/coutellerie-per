import Link from "next/link";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const { contact, social } = siteConfig;
  const hasSocial = Object.values(social).some(Boolean);

  return (
    <footer className="border-t border-rule bg-paper-deep">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Colonne 1 : identité */}
          <div className="lg:col-span-1">
            <p className="font-display text-2xl text-ink">{siteConfig.name}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.22em] text-brand-accent">
              {contact.city} · Bretagne
            </p>
            <p className="mt-6 max-w-xs text-sm text-muted">
              {siteConfig.baseline}. Atelier d'artisan d'art, pièces uniques sur commande.
            </p>
          </div>

          {/* Colonne 2 : contact */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink">
              Atelier
            </h2>
            <ul className="mt-5 space-y-3 text-sm text-muted">
              <li className="flex items-start gap-2">
                <MapPin size={16} aria-hidden className="mt-0.5 text-brand-accent" />
                <address className="not-italic">
                  {contact.address}
                  <br />
                  {contact.postalCode} {contact.city}
                </address>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={16} aria-hidden className="mt-0.5 text-brand-accent" />
                <a
                  href={`tel:${contact.phone}`}
                  className="hover:text-ink transition-colors"
                >
                  {contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={16} aria-hidden className="mt-0.5 text-brand-accent" />
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-ink transition-colors"
                >
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : horaires */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink">
              Horaires
            </h2>
            <p className="mt-5 flex items-start gap-2 text-sm text-muted">
              <Clock size={16} aria-hidden className="mt-0.5 text-brand-accent" />
              <span className="whitespace-pre-line">{contact.openingHoursLabel}</span>
            </p>
          </div>

          {/* Colonne 4 : navigation */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink">
              Le site
            </h2>
            <nav aria-label="Pied de page" className="mt-5 flex flex-col gap-2 text-sm">
              {siteConfig.navigation.slice(1).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-muted hover:text-ink transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {hasSocial ? (
          <div className="mt-12 flex gap-4 text-sm text-muted">
            {Object.entries(social)
              .filter(([, url]) => url)
              .map(([name, url]) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ink transition-colors"
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </a>
              ))}
          </div>
        ) : null}
      </div>

      <div className="border-t border-rule">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. Tous droits réservés.
          </p>
          <nav aria-label="Liens légaux" className="flex flex-wrap gap-4">
            {siteConfig.footerNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-ink transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

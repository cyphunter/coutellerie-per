"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors",
        scrolled
          ? "border-rule bg-paper/90 backdrop-blur"
          : "border-transparent bg-paper",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link
          href="/"
          className="flex flex-col leading-none"
          aria-label={`${siteConfig.name} — Accueil`}
        >
          <span className="font-display text-2xl tracking-tight text-ink">
            {siteConfig.name}
          </span>
          <span className="text-[10px] uppercase tracking-[0.22em] text-brand-accent">
            {siteConfig.contact.city} · Bretagne
          </span>
        </Link>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-sm">
            {siteConfig.navigation.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "relative inline-flex h-10 items-center text-ink/80 transition-colors hover:text-ink",
                      isActive && "text-ink",
                    )}
                  >
                    {item.label}
                    {isActive ? (
                      <span
                        aria-hidden
                        className="absolute -bottom-0.5 left-0 right-0 h-px bg-brand-accent"
                      />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden lg:flex">
          <Link
            href="/contact"
            className="inline-flex h-10 items-center gap-2 rounded-sm bg-brand-accent px-5 text-sm font-medium text-white transition-colors hover:bg-brand-accent-soft hover:text-paper"
          >
            Demander un devis
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-sm text-ink lg:hidden"
        >
          {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
        </button>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-[68px] bottom-0 z-30 overflow-y-auto bg-paper px-6 py-8 lg:hidden"
        >
          <nav aria-label="Navigation mobile">
            <ul className="flex flex-col gap-1">
              {siteConfig.navigation.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "block border-b border-rule py-4 font-display text-2xl",
                        isActive ? "text-brand-accent" : "text-ink",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="mt-8 flex flex-col gap-3">
            <Link
              href="/contact"
              className="inline-flex h-12 w-full items-center justify-center rounded-sm bg-brand-accent text-white"
            >
              Demander un devis
            </Link>
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="inline-flex h-12 w-full items-center justify-center rounded-sm border border-ink/20 text-ink"
            >
              {siteConfig.contact.phoneDisplay}
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}

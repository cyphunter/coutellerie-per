"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Check, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CONTACT_CATEGORIES } from "@/lib/schemas/contact";
import { cn } from "@/lib/utils";
import { submitContact, type ContactFormState } from "./actions";

const INITIAL: ContactFormState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, INITIAL);
  const params = useSearchParams();
  const presetCategory = params.get("categorie");
  const defaultCategory = CONTACT_CATEGORIES.some(
    (c) => c.value === presetCategory,
  )
    ? presetCategory
    : "devis-creation";

  const fieldErrors =
    state.status === "error" ? state.fieldErrors ?? {} : {};

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="rounded-sm border border-success/40 bg-paper p-8"
      >
        <span
          aria-hidden
          className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-success/15 text-success"
        >
          <Check size={22} strokeWidth={2.5} />
        </span>
        <h2 className="mt-6 font-display text-2xl text-ink">
          Message bien reçu.
        </h2>
        <p className="mt-3 text-muted">{state.message}</p>
        <p className="mt-6 text-sm text-muted">
          Un email de confirmation vous a été envoyé. Si vous ne le trouvez pas,
          pensez à vérifier vos spams.
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <Link
            href="/galerie"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-sm border border-ink/30 px-5 text-sm font-medium text-ink hover:bg-ink/5"
          >
            Voir la galerie en attendant
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="space-y-6">
      {state.status === "error" && !Object.keys(fieldErrors).length ? (
        <div
          role="alert"
          className="rounded-sm border border-error/40 bg-error/5 p-4 text-sm text-error"
        >
          {state.message}
        </div>
      ) : null}

      {/* Honeypot — caché aux humains, lu par les bots */}
      <div className="absolute -left-[9999px]" aria-hidden>
        <label htmlFor="website">Ne pas remplir</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Catégorie */}
      <fieldset className="space-y-3">
        <legend className="text-sm font-medium text-ink">
          De quoi s'agit-il ?
        </legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {CONTACT_CATEGORIES.map((cat) => (
            <label
              key={cat.value}
              className="group relative flex cursor-pointer items-start gap-3 rounded-sm border border-rule bg-paper p-4 text-sm transition-colors hover:border-brand-accent has-[:checked]:border-brand-accent has-[:checked]:bg-brand-accent/5"
            >
              <input
                type="radio"
                name="category"
                value={cat.value}
                defaultChecked={cat.value === defaultCategory}
                className="peer mt-0.5 h-4 w-4 accent-brand-accent"
              />
              <span className="text-ink/85">{cat.label}</span>
            </label>
          ))}
        </div>
        {fieldErrors.category ? (
          <p role="alert" className="text-sm text-error">
            {fieldErrors.category}
          </p>
        ) : null}
      </fieldset>

      {/* Identité */}
      <div className="grid gap-6 sm:grid-cols-2">
        <FormField
          id="name"
          label="Votre nom"
          required
          error={fieldErrors.name}
        >
          <Input
            id="name"
            name="name"
            autoComplete="name"
            required
            aria-invalid={fieldErrors.name ? true : undefined}
            aria-describedby={fieldErrors.name ? "name-error" : undefined}
          />
        </FormField>
        <FormField
          id="email"
          label="Email"
          required
          error={fieldErrors.email}
        >
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={fieldErrors.email ? true : undefined}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
          />
        </FormField>
      </div>

      <FormField
        id="phone"
        label="Téléphone (optionnel)"
        error={fieldErrors.phone}
        help="Recommandé pour les demandes urgentes ou les pièces sur-mesure."
      >
        <Input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          aria-invalid={fieldErrors.phone ? true : undefined}
        />
      </FormField>

      {/* Sujet & message */}
      <FormField
        id="subject"
        label="Sujet"
        required
        error={fieldErrors.subject}
      >
        <Input
          id="subject"
          name="subject"
          required
          placeholder="Ex : Couteau pliant cabestan, manche if des landes"
          aria-invalid={fieldErrors.subject ? true : undefined}
        />
      </FormField>

      <FormField
        id="message"
        label="Votre message"
        required
        error={fieldErrors.message}
        help="Décrivez votre projet ou votre demande — usage, dimensions, matériaux, contraintes, délai."
      >
        <Textarea
          id="message"
          name="message"
          required
          rows={8}
          minLength={20}
          maxLength={5000}
          aria-invalid={fieldErrors.message ? true : undefined}
        />
      </FormField>

      {/* RGPD */}
      <div className="flex items-start gap-3 rounded-sm border border-rule bg-paper-deep p-4">
        <Checkbox id="consent" name="consent" required />
        <Label htmlFor="consent" className="text-sm leading-relaxed text-ink/85">
          J'accepte que ces informations soient utilisées pour répondre à ma
          demande, conformément à la{" "}
          <Link
            href="/confidentialite"
            className="underline underline-offset-2 hover:text-brand-accent"
          >
            politique de confidentialité
          </Link>
          . Aucune donnée n'est transmise à un tiers.
        </Label>
      </div>
      {fieldErrors.consent ? (
        <p role="alert" className="text-sm text-error">
          {fieldErrors.consent}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className={cn(
          "inline-flex h-12 items-center gap-2 rounded-sm bg-brand-accent px-6 text-sm font-medium text-white transition-colors",
          pending ? "opacity-60" : "hover:bg-brand-accent-soft hover:text-paper",
        )}
      >
        <Send size={16} aria-hidden />
        {pending ? "Envoi en cours…" : "Envoyer le message"}
      </button>

      <p className="text-xs text-muted">
        Les champs marqués d'un astérisque sont obligatoires. Vos données ne
        sont utilisées que pour vous répondre.
      </p>
    </form>
  );
}

function FormField({
  id,
  label,
  required,
  help,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  help?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-ink">
        {label}
        {required ? <span aria-hidden className="text-brand-accent"> *</span> : null}
      </Label>
      {children}
      {help && !error ? <p className="text-xs text-muted">{help}</p> : null}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs text-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

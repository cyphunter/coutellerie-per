import { z } from "zod";

export const CONTACT_CATEGORIES = [
  { value: "devis-creation", label: "Demande de devis (création sur-mesure)" },
  { value: "affutage", label: "Affûtage d'un couteau" },
  { value: "restauration", label: "Restauration d'un couteau ancien" },
  { value: "visite", label: "Visite de l'atelier" },
  { value: "autre", label: "Autre demande" },
] as const;

export const contactSchema = z.object({
  name: z.string().min(2, "Nom trop court").max(120, "Nom trop long"),
  email: z.string().email("Email invalide").max(254),
  phone: z
    .string()
    .max(20)
    .regex(/^[\d\s+()-]*$/, "Numéro invalide")
    .optional()
    .or(z.literal("")),
  category: z.enum([
    "devis-creation",
    "affutage",
    "restauration",
    "visite",
    "autre",
  ]),
  subject: z.string().min(3, "Sujet trop court").max(200),
  message: z.string().min(20, "Message trop court (20 caractères minimum)").max(5000),
  /** Honeypot anti-spam (champ caché, doit rester vide). */
  website: z.string().max(0).optional().or(z.literal("")),
  /** Consentement RGPD — case à cocher obligatoire, non pré-cochée. */
  consent: z.literal(true, {
    message: "Vous devez accepter la politique de confidentialité.",
  }),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactCategory = ContactInput["category"];

export function getCategoryLabel(value: ContactCategory): string {
  return CONTACT_CATEGORIES.find((c) => c.value === value)?.label ?? value;
}

/**
 * Company-wide facts used across the site (header, footer, metadata).
 * Values in [brackets] are placeholders that Prosperous Logic still needs to supply.
 */
export const site = {
  name: "Prosperous Logic Solutions",
  legalName: "Prosperous Logic Solutions LLC",
  shortName: "Prosperous Logic",
  url: "https://plogic.us",
  tagline: "Qualify / Write / Price / Win",
  description:
    "Government contract capture, proposal writing, and pricing for small and mid-size contractors.",
  contact: {
    email: "info@plogic.us",
    /** Display format, e.g. "(303) 555-0100". Hidden on the site while empty. */
    phone: "",
    /** Full company LinkedIn URL. Hidden on the site while empty. */
    linkedin: "",
    location: "Remote, nationwide",
  },
} as const;

export type NavItem = { label: string; href: string };

/** Single-page site for now: nav items point at sections on the home page. */
export const mainNav: NavItem[] = [
  { label: "Services", href: "/#services" },
  { label: "Approach", href: "/#approach" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export const primaryCta: NavItem = { label: "Book a consult", href: "/#contact" };

/** tel: link for a display-format phone number, e.g. "(303) 555-0100" -> "tel:3035550100". */
export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

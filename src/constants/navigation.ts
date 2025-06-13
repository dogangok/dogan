export const MAIN_NAVIGATION = [
  { label: "Conversations", href: "/creators", target: "_self" },
  { label: "Architecture", href: "/architecture", target: "_self" },
  { label: "Interiors", href: "/interiors", target: "_self" },
  { label: "Furniture", href: "/furniture", target: "_self" },
  { label: "Homewares", href: "/homewares", target: "_self" },
  { label: "Moods", href: "/moods", target: "_self" },
  {
    label: "Shop",
    href: "https://minimalissimo.shop",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  { label: "About", href: "/about", target: "_self" },
] as const;

export const FOOTER_LINKS = [
  { label: "Contacts", href: "/about" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Privacy", href: "/privacy" },
] as const;

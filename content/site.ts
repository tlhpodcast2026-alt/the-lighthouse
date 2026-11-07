/**
 * Site-wide settings. Edit these first.
 */
export const site = {
  name: "The Lighthouse",
  url: "https://lhvoice.org",
  description:
    "Clear teaching on the Kingdom of God, daily Bible study and prayer. A teaching ministry of Pastor Johnson Jayeola.",
  pastor: "Pastor Johnson Jayeola",
  channelUrl: "https://www.youtube.com/@tlh2026",
  channelHandle: "@tlh2026",

  /** Public ministry email. Leave empty to hide it. */
  contactEmail: "",

  /**
   * Form endpoint (for example a Formspree form URL such as
   * "https://formspree.io/f/abcdwxyz"). When set, prayer requests,
   * testimonies, contact messages and speaking invitations are sent there.
   * When empty, visitors get a ready-to-copy message instead.
   */
  formEndpoint: "",

  /** Newsletter endpoint (Formspree, Buttondown, etc.). Empty = sign-up shows a "coming soon" note. */
  newsletterEndpoint: "",

  /** Online giving link (Stripe Payment Link, PayPal, Tithe.ly...). Empty = Give page explains giving is coming. */
  givingUrl: "",

  bookUrl:
    "https://www.amazon.com/s?k=Winning+Every+Day+The+Principle+of+KOR+Johnson+Jayeola",
};

export const nav = {
  primary: [
    { href: "/teachings", label: "Teachings" },
    { href: "/study", label: "Bible Study" },
    { href: "/prayer", label: "Prayer" },
    { href: "/library", label: "Library" },
    { href: "/resources", label: "Resources" },
  ],
  more: [
    { href: "/news", label: "News & Commentary" },
    { href: "/events", label: "Events & Live" },
    { href: "/community", label: "Community" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/brand", label: "Brand & design system" },
  ],
};

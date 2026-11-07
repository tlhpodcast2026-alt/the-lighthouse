"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookIcon, HomeIcon, LibraryIcon, ListenIcon, PrayIcon } from "./Icons";
import { isActive } from "./Header";

const TABS = [
  { href: "/", label: "Home", Icon: HomeIcon },
  { href: "/teachings", label: "Listen", Icon: ListenIcon },
  { href: "/study", label: "Study", Icon: BookIcon },
  { href: "/prayer", label: "Pray", Icon: PrayIcon },
  { href: "/library", label: "Library", Icon: LibraryIcon },
];

/** App-style bottom navigation on phones. */
export default function TabBar() {
  const pathname = usePathname() || "/";
  return (
    <nav
      aria-label="Quick"
      className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-5 border-t border-line backdrop-blur-md md:hidden"
      style={{
        background: "color-mix(in srgb, var(--color-paper) 94%, transparent)",
        padding: "6px max(8px, env(safe-area-inset-right, 0px)) calc(6px + env(safe-area-inset-bottom, 0px)) max(8px, env(safe-area-inset-left, 0px))",
      }}
    >
      {TABS.map(({ href, label, Icon }) => {
        const active = isActive(pathname, href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={active ? "grid justify-items-center gap-0.5 py-1 text-[11px] text-sage" : "grid justify-items-center gap-0.5 py-1 text-[11px] text-ink-3"}
          >
            <Icon width={22} height={22} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/content/site";
import { LogoLink, Wordmark } from "./Logo";
import { cx } from "@/lib/format";

export function isActive(pathname: string, href: string) {
  const p = pathname.replace(/\/$/, "") || "/";
  return href === "/" ? p === "/" : p === href || p.startsWith(href + "/");
}

export default function Header() {
  const pathname = usePathname() || "/";
  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMoreOpen(false);
    setSheetOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setMoreOpen(false); setSheetOpen(false); }
    };
    document.addEventListener("click", onDoc);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("click", onDoc); document.removeEventListener("keydown", onKey); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = sheetOpen ? "hidden" : "";
  }, [sheetOpen]);

  const moreActive = nav.more.some((l) => isActive(pathname, l.href));

  return (
    <>
      <header
        className={cx(
          "sticky z-50 border-b backdrop-blur-md transition-colors",
          scrolled ? "border-line" : "border-transparent",
        )}
        style={{ top: "env(safe-area-inset-top, 0px)", background: "color-mix(in srgb, var(--color-paper) 88%, transparent)" }}
      >
        <div className="wrap flex h-16 items-center gap-6">
          <LogoLink />
          <nav aria-label="Main" className="ml-auto hidden items-center gap-0.5 lg:flex">
            {nav.primary.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(pathname, l.href) ? "page" : undefined}
                className="rounded-full px-3 py-2 text-sm text-ink-2 hover:bg-paper-2 hover:text-ink aria-[current=page]:bg-paper-2 aria-[current=page]:text-ink"
              >
                {l.label}
              </Link>
            ))}
            <div className="relative" ref={moreRef}>
              <button
                type="button"
                aria-expanded={moreOpen}
                aria-controls="more-menu"
                onClick={() => setMoreOpen((o) => !o)}
                className={cx("rounded-full px-3 py-2 text-sm hover:bg-paper-2 hover:text-ink", moreActive ? "bg-paper-2 text-ink" : "text-ink-2")}
              >
                More
              </button>
              {moreOpen && (
                <div id="more-menu" className="absolute right-0 top-[calc(100%+8px)] grid min-w-[220px] rounded-2xl border border-line bg-white p-2 shadow-[0_18px_40px_-18px_rgba(36,39,43,.25)]">
                  {nav.more.map((l) => (
                    <Link key={l.href} href={l.href} className="rounded-lg px-3 py-2 text-sm text-ink-2 hover:bg-paper-2 hover:text-ink">
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>
          <Link href="/give" className="btn btn-primary btn-sm ml-2 hidden lg:inline-flex">Give</Link>
          <button
            type="button"
            className="ml-auto rounded-full border border-line px-3.5 py-1.5 text-sm lg:hidden"
            aria-expanded={sheetOpen}
            onClick={() => setSheetOpen(true)}
          >
            Menu
          </button>
        </div>
      </header>

      {sheetOpen && (
        <div className="fixed inset-0 z-[70] overflow-auto bg-paper" style={{ paddingTop: "env(safe-area-inset-top, 0px)" }} role="dialog" aria-modal="true" aria-label="Menu">
          <div className="wrap pb-20 pt-4">
            <div className="mb-6 flex h-12 items-center justify-between">
              <Link href="/"><Wordmark /></Link>
              <button type="button" onClick={() => setSheetOpen(false)} aria-label="Close menu" className="grid h-9 w-9 place-items-center rounded-full border border-line">✕</button>
            </div>
            <nav aria-label="Mobile" className="grid">
              {[{ href: "/", label: "Home" }, ...nav.primary, ...nav.more, { href: "/give", label: "Give" }].map((l) => (
                <Link key={l.href} href={l.href} className="border-b border-line py-2 font-serif text-[2rem] leading-tight">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

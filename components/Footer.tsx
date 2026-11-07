import Link from "next/link";
import { site } from "@/content/site";
import { LogoLink } from "./Logo";

const cols: { title: string; links: { href: string; label: string; external?: boolean }[] }[] = [
  { title: "Learn", links: [
    { href: "/teachings", label: "Teachings & Podcast" },
    { href: "/study", label: "Bible Study" },
    { href: "/resources", label: "Free Resources" },
    { href: "/library", label: "Books" },
    { href: "/news", label: "Commentary" },
  ] },
  { title: "Pray & gather", links: [
    { href: "/prayer", label: "Prayer" },
    { href: "/community", label: "Community" },
    { href: "/events", label: "Events & Live" },
    { href: site.channelUrl, label: `YouTube ${site.channelHandle}`, external: true },
  ] },
  { title: "Ministry", links: [
    { href: "/about", label: "About" },
    { href: "/about#speaking", label: "Speaking invitations" },
    { href: "/give", label: "Give" },
    { href: "/contact", label: "Contact" },
    { href: "/brand", label: "Brand" },
  ] },
];

export default function Footer() {
  return (
    <footer className="mt-18 border-t border-line pb-24 md:pb-0">
      <div className="wrap py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-1">
            <LogoLink />
            <p className="mt-4 max-w-[36ch] text-sm text-ink-2">
              A teaching ministry of Pastor Johnson Jayeola. Revealing and teaching the Kingdom of God with clarity, depth and love.
            </p>
            <p className="mt-4 font-serif italic text-ink-2">“You are the light of the world.” Matthew 5:14</p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink-3">{c.title}</h4>
              <nav className="grid gap-1.5">
                {c.links.map((l) =>
                  l.external ? (
                    <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="text-sm text-ink-2 hover:text-ink">{l.label}</a>
                  ) : (
                    <Link key={l.href} href={l.href} className="text-sm text-ink-2 hover:text-ink">{l.label}</Link>
                  ),
                )}
              </nav>
            </div>
          ))}
        </div>
        <div className="cap mt-12 flex flex-wrap justify-between gap-4 border-t border-line pt-6">
          <span>© {new Date().getFullYear()} The Lighthouse. Study reader: King James Version (public domain). Home verse: ESV.</span>
          <span>Built for daily study and prayer.</span>
        </div>
      </div>
    </footer>
  );
}

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PageHeader, SectionHead } from "@/components/blocks";
import { Mark, Wordmark } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Brand & design system",
  description: "The Lighthouse logo system, colour, typography and components.",
};

const SWATCHES = [
  ["Warm white", "#FBFAF6", "Page ground"],
  ["Sand", "#F4F0E8", "Surfaces, bands"],
  ["Stone", "#E9E1D3", "Dividers on sand"],
  ["Charcoal", "#24272B", "Text, primary buttons"],
  ["Sage", "#46695F", "Links, active states"],
  ["Ember", "#C9853A", "The light — sparingly"],
];

function Tile({ label, children, dark = false, sand = false }: { label: string; children: ReactNode; dark?: boolean; sand?: boolean }) {
  return (
    <div className={`relative grid min-h-[220px] place-items-center rounded-2xl border p-8 ${dark ? "border-ink bg-ink" : sand ? "border-line bg-paper-2" : "border-line bg-white"}`}>
      <span className="eyebrow absolute left-4 top-3.5" style={dark ? { color: "rgba(251,250,246,.6)" } : undefined}>{label}</span>
      {children}
    </div>
  );
}

export default function BrandPage() {
  return (
    <div className="wrap pb-18">
      <PageHeader eyebrow="Brand & design system" title="Quiet, clear, unmistakable.">
        The Lighthouse identity is built from three shapes: a horizon, a tower and a point of light. Everything else is restraint.
      </PageHeader>

      <section className="py-12">
        <SectionHead title="Logo system" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Tile label="Primary lockup"><Wordmark scale={1.6} /></Tile>
          <Tile label="Symbol"><Mark size={110} /></Tile>
          <Tile label="App icon & favicon" sand>
            <div className="flex items-end gap-6">
              <span className="grid h-24 w-24 place-items-center rounded-[22px] bg-[#EFE8DB] shadow-[0_10px_24px_-14px_rgba(36,39,43,.4)]"><Mark size={72} /></span>
              <span className="grid h-12 w-12 place-items-center rounded-[11px] bg-[#EFE8DB]"><Mark size={36} /></span>
              <span className="grid h-4 w-4 place-items-center rounded bg-[#EFE8DB]"><Mark size={14} /></span>
            </div>
          </Tile>
          <Tile label="Reverse (on charcoal)" dark><Wordmark reverse scale={1.4} /></Tile>
          <Tile label="Clear space = x (diameter of the light)">
            <div className="relative p-7 outline-1 outline-dashed outline-ember"><span className="absolute left-2 top-1.5 text-[10px] text-ember">x</span><Wordmark /></div>
          </Tile>
          <Tile label="Meaning">
            <p className="mt-6 text-sm text-ink-2">
              <b className="font-medium text-ink">Horizon</b> · the world we are sent into.<br />
              <b className="font-medium text-ink">Tower</b> · standing on Scripture, a firm foundation.<br />
              <b className="font-medium text-ink">Light</b> · the Kingdom revealed. The only warm colour, always on top.
            </p>
          </Tile>
        </div>

        <p className="eyebrow mt-8">Usage</p>
        <div className="mt-3 grid grid-cols-[repeat(auto-fit,minmax(min(100%,180px),1fr))] gap-4">
          {[
            [<Mark key="a" size={44} />, "Do: minimum 16px symbol, 96px lockup width."],
            [<Mark key="b" size={44} className="-rotate-12" />, "Don't rotate, skew or animate the tower."],
            [<span key="c" className="grid h-11 w-11 place-items-center rounded-lg bg-[linear-gradient(135deg,#7b4bd1,#d1a94b)]"><Mark size={34} /></span>, "Don't place on gradients or photos."],
            [<Mark key="d" size={44} className="drop-shadow-[0_0_6px_#C9853A]" />, "Don't add glows or effects. The light is enough."],
          ].map(([el, cap], i) => (
            <figure key={i} className="m-0 grid justify-items-center gap-3 rounded-[10px] border border-line bg-white p-4">
              {el}
              <figcaption className="text-center text-xs text-ink-2">{cap}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="py-12">
        <SectionHead title="Colour" action={<p className="cap">Ember is used once per screen at most.</p>} />
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,160px),1fr))] gap-6">
          {SWATCHES.map(([n, h, u]) => (
            <div key={n} className="overflow-hidden rounded-[10px] border border-line bg-white">
              <div className="h-[84px]" style={{ background: h }} />
              <p className="px-3 py-2.5 text-xs"><b className="block text-sm font-medium">{n}</b><span className="tabular-nums">{h}</span> · {u}</p>
            </div>
          ))}
        </div>
        <p className="cap mt-4">
          Highlight set for study: <span className="rounded bg-hl-sand px-2 py-0.5">Sand</span> <span className="rounded bg-hl-sage px-2 py-0.5">Sage</span> <span className="rounded bg-hl-sky px-2 py-0.5">Sky</span>
        </p>
      </section>

      <section className="py-12">
        <SectionHead title="Typography" />
        {[
          ["Display · Newsreader Light", <span key="1" className="font-serif text-[2.75rem] font-light leading-[1.1]">The Kingdom is at hand.</span>],
          ["Scripture · Newsreader", <span key="2" className="font-serif text-xl leading-[1.8]"><sup className="cap font-sans">33</sup> But seek ye first the kingdom of God, and his righteousness.</span>],
          ["Interface · Instrument Sans", <span key="3">Clear, calm and legible at every size. Used for navigation, controls and body copy.</span>],
          ["Label · Sans 500, tracked", <span key="4" className="eyebrow">Teachings &amp; Podcast</span>],
        ].map(([label, sample]) => (
          <div key={String(label)} className="grid items-baseline gap-1 border-t border-line py-4 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-4">
            <span className="cap">{label}</span>{sample}
          </div>
        ))}
      </section>

      <section className="py-12">
        <SectionHead title="Components" />
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" className="btn btn-primary">Primary</button>
          <button type="button" className="btn btn-sage">Confirm</button>
          <button type="button" className="btn btn-ghost">Secondary</button>
          <span className="link">Text link →</span>
          <span className="chip" aria-pressed="true">Selected</span>
          <span className="chip">Chip</span>
          <span className="pill-live">Live on YouTube</span>
          <span className="tag">Series tag</span>
        </div>
        <p className="cap mt-5">Spacing: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 72 · 112. Radius: 10 for controls, 16–20 for panels, full for buttons. Hairlines 1px warm grey.</p>
      </section>
    </div>
  );
}

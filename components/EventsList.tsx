"use client";

import { useEffect, useState } from "react";
import { EVENTS, nextOccurrence, type RecurringEvent } from "@/content/events";
import { site } from "@/content/site";

/** Upcoming live sessions, calculated in the visitor's browser. */
export default function EventsList() {
  const [items, setItems] = useState<{ e: RecurringEvent; when: Date | null }[]>(EVENTS.map((e) => ({ e, when: null })));
  useEffect(() => {
    setItems(EVENTS.map((e) => ({ e, when: nextOccurrence(e) })).sort((a, b) => (a.when?.getTime() ?? 0) - (b.when?.getTime() ?? 0)));
  }, []);
  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return (
    <div>
      {items.map(({ e, when }) => (
        <div key={e.title} className="grid grid-cols-[60px_minmax(0,1fr)] items-center gap-6 border-t border-line py-6 last:border-b sm:grid-cols-[72px_minmax(0,1fr)_auto]">
          <div className="rounded-xl border border-line bg-white py-2 text-center">
            <b className="block font-serif text-[2rem] font-normal leading-none tabular-nums">{when ? when.getDate() : "·"}</b>
            <span className="text-[11px] uppercase tracking-[0.12em] text-ink-3">{when ? when.toLocaleDateString("en-US", { month: "short" }) : e.rule === "first" ? "Monthly" : "Weekly"}</span>
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="pill-live">{e.kind}</span>
              <span className="cap">{e.rule === "first" ? `First ${weekday[e.weekday]}` : weekday[e.weekday]} · {e.time}</span>
            </div>
            <h3 className="mt-2 text-2xl">{e.title}</h3>
            <p className="mt-1 max-w-[60ch] text-sm text-ink-2">{e.blurb}</p>
          </div>
          <a className="btn btn-ghost btn-sm col-start-2 justify-self-start sm:col-start-auto" href={site.channelUrl} target="_blank" rel="noopener noreferrer">Watch on YouTube</a>
        </div>
      ))}
    </div>
  );
}

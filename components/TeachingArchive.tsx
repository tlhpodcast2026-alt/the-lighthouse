"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SERIES, TEACHINGS, TOPICS, seriesById } from "@/content/teachings";
import { formatDate } from "@/lib/format";
import { useStored } from "@/lib/useStored";
import { SearchIcon } from "./Icons";

type Sort = "new" | "old" | "short";

export default function TeachingArchive() {
  const [q, setQ] = useState("");
  const [series, setSeries] = useState("");
  const [topic, setTopic] = useState("");
  const [format, setFormat] = useState("");
  const [sort, setSort] = useState<Sort>("new");
  const [notes] = useStored<Record<string, string>>("tnotes", {});

  const list = useMemo(() => {
    const query = q.trim().toLowerCase();
    const out = TEACHINGS.filter(
      (t) =>
        (!series || t.series === series) &&
        (!topic || t.topic === topic) &&
        (!format || t.format === format) &&
        (!query || [t.title, t.ref, t.topic, t.summary, seriesById(t.series).name].join(" ").toLowerCase().includes(query)),
    );
    return out.sort((a, b) => (sort === "old" ? a.id - b.id : sort === "short" ? a.mins - b.mins : b.id - a.id));
  }, [q, series, topic, format, sort]);

  const clear = () => { setQ(""); setSeries(""); setTopic(""); setFormat(""); setSort("new"); };

  return (
    <>
      <div role="group" aria-label="Series" className="grid auto-cols-[minmax(240px,1fr)] grid-flow-col gap-4 overflow-x-auto pb-3 [scroll-snap-type:x_mandatory]">
        {SERIES.map((s) => {
          const n = TEACHINGS.filter((t) => t.series === s.id).length;
          const on = series === s.id;
          return (
            <button
              key={s.id}
              type="button"
              aria-pressed={on}
              onClick={() => setSeries(on ? "" : s.id)}
              className={`flex min-h-[170px] snap-start flex-col justify-between rounded-2xl border bg-white p-6 text-left ${on ? "border-ink shadow-[inset_0_0_0_1px_var(--color-ink)]" : "border-line hover:border-ink-3"}`}
            >
              <span className="cap tabular-nums">{n} teaching{n === 1 ? "" : "s"}</span>
              <span>
                <h3 className="text-2xl">{s.name}</h3>
                <p className="mt-1.5 text-sm text-ink-2">{s.blurb}</p>
              </span>
            </button>
          );
        })}
      </div>

      <div className="sticky z-10 mt-6 grid gap-4 border-y border-line bg-paper py-5" style={{ top: "calc(64px + env(safe-area-inset-top, 0px))" }}>
        <div className="relative">
          <SearchIcon width={18} height={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-3" />
          <label htmlFor="tq" className="sr-only">Search teachings</label>
          <input id="tq" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search teachings, scripture or topics" className="input rounded-full! pl-11" />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Topic">
            <button type="button" className="chip" aria-pressed={!topic} onClick={() => setTopic("")}>All topics</button>
            {TOPICS.map((t) => (
              <button key={t} type="button" className="chip" aria-pressed={topic === t} onClick={() => setTopic(t)}>{t}</button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <label htmlFor="tfmt" className="sr-only">Format</label>
            <select id="tfmt" value={format} onChange={(e) => setFormat(e.target.value)} className="input w-auto! rounded-full! px-3.5! py-1.5! text-sm!">
              <option value="">Video &amp; audio</option><option>Video</option><option>Audio</option>
            </select>
            <label htmlFor="tsort" className="sr-only">Sort</label>
            <select id="tsort" value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="input w-auto! rounded-full! px-3.5! py-1.5! text-sm!">
              <option value="new">Newest first</option><option value="old">Oldest first</option><option value="short">Shortest first</option>
            </select>
          </div>
        </div>
      </div>

      <div aria-live="polite">
        <p className="cap py-3.5 tabular-nums">
          {list.length} of {TEACHINGS.length} teachings
          {series && <> · {seriesById(series).name} <button type="button" className="link" onClick={() => setSeries("")}>Clear</button></>}
        </p>
        {list.length ? (
          list.map((t) => (
            <Link key={t.id} href={`/teachings/${t.id}`} className="group grid grid-cols-[36px_minmax(0,1fr)] items-center gap-4 border-b border-line py-4 sm:grid-cols-[56px_minmax(0,1fr)_auto]">
              <span className="font-serif text-2xl text-ink-3 tabular-nums">{String(t.id).padStart(2, "0")}</span>
              <div className="min-w-0">
                <span className="tag">{seriesById(t.series).name}</span>
                <h3 className="my-0.5 text-[1.1875rem] group-hover:text-sage">{t.title}</h3>
                <span className="cap">
                  {t.ref} · {t.topic}
                  {notes[String(t.id)] && <> · <span className="text-ember">Your notes</span></>}
                </span>
              </div>
              <span className="col-start-2 flex gap-4 text-sm text-ink-3 tabular-nums sm:col-start-auto">
                <span>{t.format}</span><span>{t.mins} min</span><span>{formatDate(t.date, { month: "short", day: "numeric" })}</span>
              </span>
            </Link>
          ))
        ) : (
          <div className="py-12 text-center text-ink-2">
            <p className="font-serif text-2xl text-ink">Nothing matches that search.</p>
            <p className="mt-2">Try a book of the Bible, like “Matthew”, or clear the filters.</p>
            <button type="button" className="btn btn-ghost mt-4" onClick={clear}>Clear filters</button>
          </div>
        )}
      </div>
    </>
  );
}

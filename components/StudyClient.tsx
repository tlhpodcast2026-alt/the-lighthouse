"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PASSAGES, PLANS, verseRef, verseText } from "@/content/scripture";
import { copyToClipboard, cx } from "@/lib/format";
import { useStored } from "@/lib/useStored";
import { CheckIcon } from "./Icons";

type Hl = "sand" | "sage" | "sky";
const HL: Hl[] = ["sand", "sage", "sky"];
const key = (p: string, v: number) => `${p}:${v}`;
const parse = (k: string): [string, number] => { const [p, v] = k.split(":"); return [p, Number(v)]; };

export default function StudyClient() {
  const params = useSearchParams();
  const [planId, setPlanId] = useStored<string>("plan", "foundations");
  const [dayMap, setDayMap] = useStored<Record<string, number>>("day", {});
  const [doneMap, setDoneMap] = useStored<Record<string, number[]>>("done", {});
  const [hl, setHl] = useStored<Record<string, Hl>>("hl", {});
  const [notes, setNotes] = useStored<Record<string, string>>("notes", {});
  const [passageOverride, setPassageOverride] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [flash, setFlash] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const readerRef = useRef<HTMLElement>(null);
  const [noteDraft, setNoteDraft] = useState("");

  // Deep links: /study?p=mat5 (a passage) or /study?plan=praylikethis
  useEffect(() => {
    const p = params.get("p");
    const plan = params.get("plan");
    if (p && PASSAGES[p]) setPassageOverride(p);
    if (plan && PLANS.some((x) => x.id === plan)) { setPlanId(plan); setPassageOverride(null); }
  }, [params, setPlanId]);

  const plan = PLANS.find((p) => p.id === planId) ?? PLANS[0];
  const di = Math.min(dayMap[plan.id] ?? 0, plan.days.length - 1);
  const done = doneMap[plan.id] ?? [];
  const day = plan.days[di];
  const pk = passageOverride ?? day.passage;
  const passage = PASSAGES[pk];
  const pct = Math.round((done.length / plan.days.length) * 100);

  function say(msg: string) { setFlash(msg); window.setTimeout(() => setFlash(""), 2200); }
  function goDay(i: number) {
    setDayMap((m) => ({ ...m, [plan.id]: i }));
    setPassageOverride(null);
    setSelected(null);
    readerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function toggleDone() {
    const isDone = done.includes(di);
    setDoneMap((m) => ({ ...m, [plan.id]: isDone ? done.filter((x) => x !== di) : [...done, di] }));
    if (!isDone) say(`Day ${di + 1} complete`);
  }
  function highlight(c: Hl) {
    if (!selected) return;
    setHl((m) => { const n = { ...m }; if (n[selected] === c) delete n[selected]; else n[selected] = c; return n; });
  }
  function openNote() {
    if (!selected) return;
    setNoteDraft(notes[selected] ?? "");
    dialogRef.current?.showModal();
  }
  function saveNote() {
    if (!selected) return;
    const v = noteDraft.trim();
    setNotes((m) => { const n = { ...m }; if (v) n[selected] = v; else delete n[selected]; return n; });
    dialogRef.current?.close();
    say(v ? "Note saved" : "Note removed");
  }
  function clearVerse() {
    if (!selected) return;
    setHl((m) => { const n = { ...m }; delete n[selected]; return n; });
    setNotes((m) => { const n = { ...m }; delete n[selected]; return n; });
  }
  async function copyVerse() {
    if (!selected) return;
    const [p, v] = parse(selected);
    say((await copyToClipboard(`“${verseText(p, v)}” ${verseRef(p, v)} (KJV)`)) ? "Copied" : "Copy isn't available here");
  }
  const saved = Array.from(new Set([...Object.keys(hl), ...Object.keys(notes)])).filter((k) => PASSAGES[parse(k)[0]]);
  async function copyAll() {
    if (!saved.length) return say("No notes yet");
    const text = saved.map((k) => { const [p, v] = parse(k); return `${verseRef(p, v)} — “${verseText(p, v)}”${notes[k] ? `\nNote: ${notes[k]}` : ""}`; }).join("\n\n");
    say((await copyToClipboard(text)) ? "Copied all notes" : "Copy isn't available here");
  }

  const dayBtn = "grid w-full grid-cols-[24px_minmax(0,1fr)] items-center gap-3 rounded-lg px-2.5 py-2 text-left hover:bg-paper-2";

  return (
    <div className="grid items-start gap-8 pb-18 pt-8 md:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[270px_minmax(0,1fr)_300px]">
      {/* Plans */}
      <aside>
        <p className="eyebrow">Reading plan</p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {PLANS.map((p) => (
            <button key={p.id} type="button" className="chip" aria-pressed={p.id === plan.id} onClick={() => { setPlanId(p.id); setPassageOverride(null); setSelected(null); }}>
              {p.name}
            </button>
          ))}
        </div>
        <p className="mt-3 text-sm text-ink-2">{plan.blurb}</p>
        <div className="mt-3 h-1 overflow-hidden rounded bg-sand" aria-label="Plan progress"><i className="block h-full bg-sage transition-[width]" style={{ width: `${pct}%` }} /></div>
        <p className="cap mt-1.5 tabular-nums">{done.length} of {plan.days.length} days complete</p>
        <div className="mt-3 grid gap-0.5">
          {plan.days.map((d, i) => {
            const isDone = done.includes(i);
            const current = i === di && !passageOverride;
            return (
              <button key={i} type="button" onClick={() => goDay(i)} aria-current={current ? "true" : undefined} className={cx(dayBtn, current && "bg-white shadow-[0_0_0_1px_var(--color-line)]")}>
                <span className={cx("grid h-5 w-5 place-items-center rounded-full border-[1.5px]", isDone ? "border-sage bg-sage text-white" : "border-sand")}>
                  {isDone && <CheckIcon width={12} height={12} />}
                </span>
                <span>
                  <b className="font-medium">Day {i + 1}</b>
                  <small className="block text-xs text-ink-3">{d.focus ? verseRef(d.passage, d.focus) : PASSAGES[d.passage].ref}</small>
                </span>
              </button>
            );
          })}
        </div>
        <p className="eyebrow mt-7">All passages</p>
        <div className="mt-3 grid gap-0.5">
          {Object.entries(PASSAGES).map(([k, p]) => (
            <button key={k} type="button" onClick={() => { setPassageOverride(k); setSelected(null); }} aria-current={passageOverride === k ? "true" : undefined} className={cx(dayBtn, passageOverride === k && "bg-white shadow-[0_0_0_1px_var(--color-line)]")}>
              <span className="h-5 w-5 rounded-full border-[1.5px] border-dashed border-sand" />
              <span><b className="font-medium">{p.ref}</b><small className="block text-xs text-ink-3">{p.title}</small></span>
            </button>
          ))}
        </div>
      </aside>

      {/* Reader */}
      <article ref={readerRef} className="scroll-mt-24 rounded-[20px] border border-line bg-white p-[clamp(20px,5vw,56px)]">
        <p className="eyebrow">{passageOverride ? "Passage study" : `${plan.name} · Day ${di + 1}`} · KJV</p>
        <h2 className="mt-2.5 text-[2.75rem] font-light">{passage.ref}</h2>
        <p className="mt-1 font-serif text-lg italic text-ink-2">{passage.title}</p>

        <p className="mt-8 max-w-[66ch] font-serif text-xl leading-[1.85]">
          {passage.verses.map(([n, text]) => {
            const k = key(pk, n);
            const isFocus = !passageOverride && day.focus === n;
            return (
              <span key={k}>
                <span
                  role="button"
                  tabIndex={0}
                  aria-label={`Verse ${n}`}
                  aria-pressed={selected === k}
                  onClick={() => setSelected(selected === k ? null : k)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelected(selected === k ? null : k); } }}
                  className={cx("verse", hl[k] && `hl-${hl[k]}`, selected === k && "is-selected", isFocus && "is-focus")}
                >
                  <sup>{n}</sup>{text}{notes[k] && <span className="note-dot" title="Has a note" />}
                </span>{" "}
              </span>
            );
          })}
        </p>

        {selected && (
          <div role="toolbar" aria-label="Verse tools" className="fade-up sticky z-[4] mt-6 flex flex-wrap items-center gap-3 rounded-[18px] bg-ink py-2 pl-[18px] pr-2.5 text-paper shadow-[0_18px_40px_-16px_rgba(36,39,43,.5)] md:rounded-full" style={{ bottom: "calc(16px + env(safe-area-inset-bottom, 0px) + var(--tabbar, 0px))" }}>
            <span className="text-sm font-medium">{verseRef(...parse(selected))}</span>
            <span className="flex gap-1.5">
              {HL.map((c) => (
                <button key={c} type="button" aria-label={`Highlight ${c}`} onClick={() => highlight(c)} className="h-[26px] w-[26px] rounded-full border-2 border-white/40 hover:border-paper" style={{ background: `var(--color-hl-${c})` }} />
              ))}
            </span>
            <button type="button" className="rounded-full px-2.5 py-1.5 text-sm hover:bg-white/10" onClick={openNote}>{notes[selected] ? "Edit note" : "Add note"}</button>
            <button type="button" className="rounded-full px-2.5 py-1.5 text-sm hover:bg-white/10" onClick={copyVerse}>Copy</button>
            {(hl[selected] || notes[selected]) && <button type="button" className="rounded-full px-2.5 py-1.5 text-sm hover:bg-white/10" onClick={clearVerse}>Clear</button>}
            <button type="button" aria-label="Close" className="rounded-full px-2.5 py-1.5 text-sm hover:bg-white/10" onClick={() => setSelected(null)}>✕</button>
          </div>
        )}

        {!passageOverride ? (
          <div className="mt-12 grid max-w-[66ch] gap-4">
            <div className="rounded-[10px] bg-paper-2 px-6 py-4"><p className="eyebrow">Reflect</p><p className="mt-1.5 font-serif text-lg">{day.question}</p></div>
            <div className="rounded-[10px] bg-sage-soft px-6 py-4"><p className="eyebrow">Pray</p><p className="mt-1.5 font-serif text-lg">{day.prayer}</p></div>
            <div className="flex flex-wrap items-center gap-2.5">
              <button type="button" className={done.includes(di) ? "btn btn-ghost" : "btn btn-sage"} onClick={toggleDone}>
                {done.includes(di) ? "Completed ✓ — mark as not done" : `Mark day ${di + 1} complete`}
              </button>
              {di < plan.days.length - 1 && <button type="button" className="btn btn-ghost" onClick={() => goDay(di + 1)}>Next day →</button>}
            </div>
          </div>
        ) : (
          <div className="mt-12"><button type="button" className="btn btn-ghost" onClick={() => setPassageOverride(null)}>← Back to {plan.name}</button></div>
        )}
        <p className="cap mt-4 min-h-[1.4em]" role="status" aria-live="polite">{flash}</p>
      </article>

      {/* Notes */}
      <aside className="md:col-span-2 xl:col-span-1">
        <div className="flex items-baseline justify-between">
          <p className="eyebrow">My notes &amp; highlights</p>
          <button type="button" className="link text-sm" onClick={copyAll}>Copy all</button>
        </div>
        <p className="cap mt-1.5">Tap a verse to highlight it or add a note. Saved on this device.</p>
        <div className="mt-3">
          {saved.length ? saved.map((k) => {
            const [p, v] = parse(k);
            return (
              <div key={k} className="border-b border-line py-3">
                <span className="text-xs font-semibold tracking-[0.04em] text-sage">
                  {verseRef(p, v)}
                  {hl[k] && <span className="ml-1.5 inline-block h-2 w-2 rounded-full shadow-[0_0_0_1px_var(--color-sand)]" style={{ background: `var(--color-hl-${hl[k]})` }} />}
                </span>
                <q className="mt-1 block font-serif text-sm text-ink-2 [quotes:none]">{verseText(p, v)}</q>
                {notes[k] && <p className="mt-1 text-sm">{notes[k]}</p>}
              </div>
            );
          }) : (
            <p className="border-b border-line py-3 text-ink-2">No highlights yet. Try tapping verse 33 in Matthew 6, or any verse that speaks to you.</p>
          )}
        </div>
      </aside>

      <dialog ref={dialogRef} className="sheet-dialog m-auto" aria-labelledby="note-title">
        {selected && (
          <form method="dialog" onSubmit={(e) => { e.preventDefault(); saveNote(); }}>
            <div className="flex items-start justify-between gap-4 px-6 pt-6">
              <div><span className="tag">Note</span><h2 id="note-title" className="mt-1.5 text-[2rem]">{verseRef(...parse(selected))}</h2></div>
              <button type="button" aria-label="Close" className="grid h-[34px] w-[34px] place-items-center rounded-full border border-line" onClick={() => dialogRef.current?.close()}>✕</button>
            </div>
            <div className="p-6">
              <p className="scripture text-ink-2">{verseText(...parse(selected))}</p>
              <label htmlFor="vnote" className="label mt-4 block">Your note</label>
              <textarea id="vnote" className="input mt-1.5" value={noteDraft} onChange={(e) => setNoteDraft(e.target.value)} autoFocus />
            </div>
            <div className="flex flex-wrap justify-end gap-2 px-6 pb-6">
              {notes[selected] && <button type="button" className="btn btn-ghost" onClick={() => { setNoteDraft(""); setNotes((m) => { const n = { ...m }; delete n[selected]; return n; }); dialogRef.current?.close(); say("Note deleted"); }}>Delete note</button>}
              <button type="submit" className="btn btn-sage">Save note</button>
            </div>
          </form>
        )}
      </dialog>
    </div>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import { GUIDED_PRAYER, PRAYER_CATEGORIES } from "@/content/scripture";
import { site } from "@/content/site";
import { cx } from "@/lib/format";
import { submitForm } from "@/lib/submit";
import { useStored } from "@/lib/useStored";
import { CopyBlock } from "./ui";

type Entry = { cat: string; text: string; at: number; answered: boolean; shared: boolean };

export function GuidedPrayer() {
  const [i, setI] = useState(0);
  const g = GUIDED_PRAYER[i];
  const last = i === GUIDED_PRAYER.length - 1;
  return (
    <div className="relative flex min-h-[340px] flex-col justify-between gap-6 overflow-hidden rounded-[20px] bg-ink p-[clamp(24px,5vw,48px)] text-paper">
      <span aria-hidden="true" className="pointer-events-none absolute -right-[120px] -top-[120px] h-[360px] w-[360px] rounded-full" style={{ background: "radial-gradient(circle, rgba(201,133,58,.4), transparent 65%)" }} />
      <p className="eyebrow relative" style={{ color: "rgba(251,250,246,.6)" }}>Guided prayer · The Kingdom prayer · Matthew 6:9–13</p>
      <div className="relative" aria-live="polite">
        <p key={i} className="fade-up font-serif text-[clamp(1.6rem,3.4vw,2.4rem)] font-light leading-tight">{g.line}</p>
        <p className="mt-4 max-w-[52ch] text-paper/75">{g.prompt}</p>
      </div>
      <div className="relative flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-1.5" aria-label={`Step ${i + 1} of ${GUIDED_PRAYER.length}`}>
          {GUIDED_PRAYER.map((_, n) => <i key={n} className={cx("h-1.5 w-1.5 rounded-full", n <= i ? "bg-ember" : "bg-white/25")} />)}
        </div>
        <div className="flex gap-2">
          {i > 0 && <button type="button" className="btn btn-sm border-white/30 bg-transparent text-paper" onClick={() => setI(i - 1)}>Back</button>}
          <button type="button" className="btn btn-sm bg-paper text-ink" onClick={() => setI(last ? 0 : i + 1)}>{last ? "Amen · Start again" : "Continue"}</button>
        </div>
      </div>
    </div>
  );
}

export function PrayerRequestAndJournal() {
  const [journal, setJournal] = useStored<Entry[]>("journal", []);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [cat, setCat] = useState("");
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [share, setShare] = useState<"journal" | "team">("journal");
  const [sendState, setSendState] = useState<"sent" | "failed" | "unconfigured" | "sending" | null>(null);
  const [error, setError] = useState("");
  const [confirmDel, setConfirmDel] = useState<number | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!text.trim()) { setError("Write your request before saving."); return; }
    setError("");
    setJournal((j) => [{ cat, text: text.trim(), at: Date.now(), answered: false, shared: share === "team" }, ...j]);
    setStep(3);
    if (share === "team") {
      setSendState("sending");
      setSendState(await submitForm(`Prayer request — ${cat}`, { category: cat, name, request: text.trim() }));
    } else setSendState(null);
  }
  function reset() { setStep(1); setCat(""); setText(""); setName(""); setShare("journal"); setSendState(null); }

  const message = `Prayer request — ${cat}\n${name ? `From: ${name}\n` : ""}\n${text}`;

  return (
    <div className="grid items-start gap-12 md:grid-cols-2">
      <div id="request" className="scroll-mt-24">
        <p className="eyebrow">Prayer request</p>
        <h2 className="mt-2 text-[2rem]">What can we pray for?</h2>
        <p className="mt-2.5 max-w-[46ch] text-ink-2">Three short steps. Your request is saved to your journal first, so you choose whether and when to share it.</p>

        <div className="panel mt-6">
          <div className="mb-6 flex gap-2" aria-label={`Step ${step} of 3`}>
            {[1, 2, 3].map((n) => <i key={n} className={cx("h-[3px] flex-1 rounded", n <= step ? "bg-sage" : "bg-sand")} />)}
          </div>

          {step === 1 && (
            <>
              <p className="mb-3 font-medium">What is this prayer about?</p>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2">
                {PRAYER_CATEGORIES.map(([c, d]) => (
                  <button key={c} type="button" aria-pressed={cat === c} onClick={() => { setCat(c); setStep(2); }}
                    className="rounded-[10px] border border-line bg-white p-3.5 text-left hover:border-ink-3 aria-pressed:border-sage aria-pressed:bg-sage-soft">
                    <b className="block font-medium">{c}</b><span className="text-xs text-ink-3">{d}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <form onSubmit={onSubmit} className="grid gap-4" noValidate>
              <div className="grid gap-1.5">
                <label htmlFor="prText" className="label">Your request <span className="cap">· {cat}</span></label>
                <textarea id="prText" className="input" value={text} onChange={(e) => setText(e.target.value)} placeholder="Write as much or as little as you like." aria-invalid={!!error} autoFocus />
                {error && <span className="text-sm text-[#9a3b2e]">{error}</span>}
              </div>
              <div className="grid gap-1.5">
                <label htmlFor="prName" className="label">First name <span className="cap">(optional)</span></label>
                <input id="prName" className="input" value={name} onChange={(e) => setName(e.target.value)} autoComplete="given-name" />
              </div>
              <fieldset className="grid gap-2">
                <legend className="label mb-2">Who should see this?</legend>
                {([["journal", "Just me", "Keep it in my private prayer journal."], ["team", "The prayer team", "Save it, then send it to Pastor Johnson and the team to pray with you."]] as const).map(([v, h, d]) => (
                  <label key={v} className={cx("grid cursor-pointer grid-cols-[20px_minmax(0,1fr)] gap-3 rounded-[10px] border bg-white p-3.5", share === v ? "border-sage bg-sage-soft" : "border-line")}>
                    <input type="radio" name="share" value={v} checked={share === v} onChange={() => setShare(v)} className="mt-1 accent-sage" />
                    <span><b className="font-medium">{h}</b><br /><span className="text-sm text-ink-2">{d}</span></span>
                  </label>
                ))}
              </fieldset>
              <div className="flex justify-between gap-2">
                <button type="button" className="btn btn-ghost" onClick={() => setStep(1)}>Back</button>
                <button type="submit" className="btn btn-sage">Save request</button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div>
              <p className="font-serif text-2xl">Saved to your journal.</p>
              <p className="mt-2 text-ink-2">“Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.” <span className="cap">Philippians 4:6</span></p>
              {share === "team" && sendState === "sending" && <p className="mt-4 text-sm">Sending to the prayer team…</p>}
              {share === "team" && sendState === "sent" && <p className="mt-4 text-sm text-sage">Sent to the prayer team. We are praying with you.</p>}
              {share === "team" && (sendState === "unconfigured" || sendState === "failed") && (
                <div className="mt-4">
                  <p className="mb-2 text-sm">
                    {sendState === "failed" ? "We couldn't send it just now. " : "One more step to reach the team: "}
                    {site.contactEmail ? <>send it to <b className="select-all">{site.contactEmail}</b>, or </> : "copy it and send it to us "}
                    through <a className="link" href={site.channelUrl} target="_blank" rel="noopener noreferrer">The Lighthouse on YouTube ({site.channelHandle})</a>.
                  </p>
                  <CopyBlock text={message} label="Copy request" />
                </div>
              )}
              <button type="button" className="btn btn-ghost btn-sm mt-4" onClick={reset}>New request</button>
            </div>
          )}
        </div>
      </div>

      <div id="journal" className="scroll-mt-24">
        <p className="eyebrow">My prayer journal</p>
        <h2 className="mt-2 text-[2rem]">Remember what He has done</h2>
        <p className="cap mt-2">Private to this device.</p>
        <div className="mt-4">
          {journal.length === 0 && <p className="border-b border-line py-3 text-ink-2">Your journal is empty. Requests you save will appear here, and you can mark them answered.</p>}
          {journal.map((j, idx) => (
            <div key={j.at} className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 border-b border-line py-4">
              <div className="min-w-0">
                <span className="tag">{j.cat}</span>{" "}
                <span className="cap tabular-nums">{new Date(j.at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                {j.answered && <span className="ml-2 rounded-full bg-sage-soft px-2.5 py-0.5 text-xs text-sage">Answered</span>}
                <p className={cx("mt-1.5", j.answered && "text-ink-3")}>{j.text}</p>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <button type="button" className="link" onClick={() => setJournal((all) => all.map((x, n) => (n === idx ? { ...x, answered: !x.answered } : x)))}>
                  {j.answered ? "Undo" : "Answered"}
                </button>
                <button
                  type="button"
                  className={confirmDel === idx ? "text-ember" : "text-ink-3 hover:text-ink"}
                  onClick={() => {
                    if (confirmDel === idx) { setJournal((all) => all.filter((_, n) => n !== idx)); setConfirmDel(null); }
                    else { setConfirmDel(idx); window.setTimeout(() => setConfirmDel((c) => (c === idx ? null : c)), 3000); }
                  }}
                >
                  {confirmDel === idx ? "Tap again to remove" : "Remove"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

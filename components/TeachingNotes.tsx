"use client";

import { useEffect, useRef, useState } from "react";
import type { Teaching } from "@/content/teachings";
import { useStored } from "@/lib/useStored";
import { CopyButton } from "./ui";

/** Personal notes on a teaching, saved on the visitor's device as they type. */
export default function TeachingNotes({ teaching }: { teaching: Teaching }) {
  const key = String(teaching.id);
  const [notes, setNotes, loaded] = useStored<Record<string, string>>("tnotes", {});
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState("Saved on this device.");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (loaded) setDraft(notes[key] ?? "");
    // load once when storage is ready
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  function onChange(v: string) {
    setDraft(v);
    setStatus("Saving…");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setNotes((prev) => {
        const next = { ...prev };
        if (v.trim()) next[key] = v; else delete next[key];
        return next;
      });
      setStatus("Saved on this device.");
    }, 500);
  }

  const exportText = `${teaching.title} — The Lighthouse\n${teaching.ref}\n\n${teaching.points.map((p, i) => `${i + 1}. ${p}`).join("\n")}\n\nMy notes:\n${draft}`;

  return (
    <div className="grid gap-1.5">
      <label htmlFor="tn" className="sr-only">Your notes on this teaching</label>
      <textarea id="tn" className="input" value={draft} onChange={(e) => onChange(e.target.value)} placeholder="Write what stood out to you. Notes save on this device as you type." />
      <span className="text-xs text-ink-3" role="status">{status}</span>
      <div className="mt-2"><CopyButton text={exportText} label="Copy notes with outline" /></div>
    </div>
  );
}

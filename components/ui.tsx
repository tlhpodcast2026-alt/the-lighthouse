"use client";

import { useRef, useState } from "react";
import { copyToClipboard } from "@/lib/format";

/** A block of text with a Copy button. Falls back to selecting the text. */
export function CopyBlock({ text, label = "Copy", className = "" }: { text: string; label?: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "copied" | "selected">("idle");
  async function onCopy() {
    const ok = await copyToClipboard(text);
    if (ok) setState("copied");
    else if (ref.current) {
      const range = document.createRange();
      range.selectNodeContents(ref.current);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
      setState("selected");
    }
    window.setTimeout(() => setState("idle"), 2400);
  }
  return (
    <div className={className}>
      <div ref={ref} className="copybox">{text}</div>
      <div className="mt-3 flex items-center gap-3">
        <button type="button" className="btn btn-sage btn-sm" onClick={onCopy}>{label}</button>
        <span className="cap" role="status" aria-live="polite">
          {state === "copied" ? "Copied" : state === "selected" ? "Selected — press Ctrl/⌘ + C" : ""}
        </span>
      </div>
    </div>
  );
}

export function CopyButton({ text, label = "Copy", className = "btn btn-ghost btn-sm" }: { text: string; label?: string; className?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className={className}
      onClick={async () => {
        const ok = await copyToClipboard(text);
        setDone(ok);
        window.setTimeout(() => setDone(false), 2000);
      }}
    >
      {done ? "Copied" : label}
    </button>
  );
}

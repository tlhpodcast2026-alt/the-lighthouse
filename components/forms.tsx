"use client";

import Link from "next/link";
import { useState, type FormEvent, type ReactNode } from "react";
import { site } from "@/content/site";
import { submitForm } from "@/lib/submit";
import { CopyBlock } from "./ui";

export type Field = {
  id: string;
  label: string;
  type?: "text" | "email" | "date" | "textarea" | "select" | "checkbox";
  required?: boolean;
  options?: string[];
  autoComplete?: string;
  half?: boolean;
};

/**
 * A form that sends to site.formEndpoint when configured,
 * or prepares a ready-to-copy message when it isn't.
 */
export function ComposeForm({ subject, fields, submitLabel }: { subject: string; fields: Field[]; submitLabel: string }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [missing, setMissing] = useState<string | null>(null);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed" | "unconfigured">("idle");

  const set = (id: string, v: string) => setValues((s) => ({ ...s, [id]: v }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const miss = fields.find((f) => f.required && !(values[f.id] ?? "").trim());
    if (miss) { setMissing(miss.id); document.getElementById(miss.id)?.focus(); return; }
    setMissing(null);
    setState("sending");
    const data: Record<string, string> = {};
    fields.forEach((f) => { data[f.label] = values[f.id] ?? (f.type === "select" ? f.options?.[0] ?? "" : ""); });
    setState(await submitForm(subject, data));
  }

  const message = `${subject}\n\n${fields
    .map((f) => {
      const v = values[f.id] ?? (f.type === "select" ? f.options?.[0] ?? "" : "");
      if (f.type === "checkbox") return `${f.label}: ${v === "yes" ? "yes" : "no"}`;
      return v ? `${f.label}: ${v}` : "";
    })
    .filter(Boolean)
    .join("\n")}`;

  return (
    <form className="panel grid grid-cols-1 gap-4 sm:grid-cols-2" onSubmit={onSubmit} noValidate>
      {fields.map((f) => (
        <div key={f.id} className={f.half ? "grid gap-1.5" : "grid gap-1.5 sm:col-span-2"}>
          {f.type === "checkbox" ? (
            <label className="flex items-start gap-2.5 text-sm">
              <input id={f.id} type="checkbox" className="mt-1 accent-sage" checked={values[f.id] === "yes"} onChange={(e) => set(f.id, e.target.checked ? "yes" : "")} />
              {f.label}
            </label>
          ) : (
            <>
              <label htmlFor={f.id} className="label">{f.label}{!f.required && <span className="cap"> (optional)</span>}</label>
              {f.type === "textarea" ? (
                <textarea id={f.id} className="input" value={values[f.id] ?? ""} onChange={(e) => set(f.id, e.target.value)} aria-invalid={missing === f.id} />
              ) : f.type === "select" ? (
                <select id={f.id} className="input" value={values[f.id] ?? f.options?.[0]} onChange={(e) => set(f.id, e.target.value)}>
                  {f.options?.map((o) => <option key={o}>{o}</option>)}
                </select>
              ) : (
                <input id={f.id} type={f.type ?? "text"} className="input" value={values[f.id] ?? ""} onChange={(e) => set(f.id, e.target.value)} autoComplete={f.autoComplete} aria-invalid={missing === f.id} />
              )}
              {missing === f.id && <span className="text-sm text-[#9a3b2e]">Please fill in {f.label.toLowerCase()}.</span>}
            </>
          )}
        </div>
      ))}
      <div className="sm:col-span-2">
        <button type="submit" className="btn btn-primary" disabled={state === "sending"}>{state === "sending" ? "Sending…" : submitLabel}</button>
      </div>
      {state === "sent" && <p className="text-sage sm:col-span-2" role="status">Thank you. Your message has been sent.</p>}
      {(state === "unconfigured" || state === "failed") && (
        <div className="sm:col-span-2" role="status">
          <p className="mb-2 text-sm">
            {state === "failed" ? "We couldn't send it just now. " : "Ready to send. "}
            {site.contactEmail ? <>Send it to <b className="select-all">{site.contactEmail}</b>, or message us on </> : "Copy it and send it to us through "}
            <a className="link" href={site.channelUrl} target="_blank" rel="noopener noreferrer">YouTube {site.channelHandle}</a>.
          </p>
          <CopyBlock text={message} label="Copy message" />
        </div>
      )}
    </form>
  );
}

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<ReactNode>("No noise. Unsubscribe any time.");
  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) { setMsg("Enter an email address like name@example.com."); return; }
    if (!site.newsletterEndpoint) {
      setMsg(<>Thank you. Email sign-up opens soon. Until then, <a className="link" href={site.channelUrl} target="_blank" rel="noopener noreferrer">subscribe on YouTube</a> to get every new teaching.</>);
      return;
    }
    setMsg("Subscribing…");
    const r = await submitForm("Newsletter sign-up", { email }, site.newsletterEndpoint);
    setMsg(r === "sent" ? "You're subscribed. Look for the first letter this week." : "We couldn't subscribe you just now. Please try again.");
  }
  return (
    <div>
      <form className="flex flex-wrap gap-2" onSubmit={onSubmit} noValidate>
        <label htmlFor="nlEmail" className="sr-only">Email address</label>
        <input id="nlEmail" type="email" className="input flex-[1_1_220px] rounded-full!" placeholder="you@example.com" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type="submit" className="btn btn-sage">Subscribe</button>
      </form>
      <p className="cap mt-2.5" role="status">{msg}</p>
    </div>
  );
}

export function GiveBox() {
  const PRESETS = [25, 50, 100, 250];
  const [freq, setFreq] = useState<"once" | "monthly">("once");
  const [amt, setAmt] = useState(50);
  const [other, setOther] = useState("");
  const [note, setNote] = useState(false);
  const label = `Give $${amt}${freq === "monthly" ? " monthly" : ""}`;
  const seg = "rounded-full px-[18px] py-2 text-sm aria-pressed:bg-white aria-pressed:shadow-[0_1px_3px_rgba(36,39,43,.12)]";
  return (
    <div className="panel p-[clamp(20px,4vw,40px)]">
      <div className="inline-flex rounded-full bg-paper-2 p-1" role="group" aria-label="Frequency">
        <button type="button" className={seg} aria-pressed={freq === "once"} onClick={() => setFreq("once")}>One time</button>
        <button type="button" className={seg} aria-pressed={freq === "monthly"} onClick={() => setFreq("monthly")}>Monthly</button>
      </div>
      <div className="mt-5 grid grid-cols-4 gap-2">
        {PRESETS.map((a) => (
          <button key={a} type="button" aria-pressed={amt === a && !other} onClick={() => { setAmt(a); setOther(""); }}
            className="rounded-[10px] border border-line bg-white py-3.5 text-lg tabular-nums aria-pressed:border-ink aria-pressed:shadow-[inset_0_0_0_1px_var(--color-ink)]">
            ${a}
          </button>
        ))}
      </div>
      <div className="mt-3 grid gap-1.5">
        <label htmlFor="gOther" className="label">Other amount (USD)</label>
        <input id="gOther" type="number" min={1} inputMode="decimal" className="input tabular-nums" placeholder="Enter amount" value={other}
          onChange={(e) => { setOther(e.target.value); const v = parseFloat(e.target.value); if (v > 0) setAmt(Math.round(v * 100) / 100); }} />
      </div>
      {site.givingUrl ? (
        <a className="btn btn-primary mt-5 w-full" href={site.givingUrl} target="_blank" rel="noopener noreferrer">{label}</a>
      ) : (
        <button type="button" className="btn btn-primary mt-5 w-full" onClick={() => setNote(true)}>{label}</button>
      )}
      <p className="cap mt-3" role="status">
        {note
          ? <span className="text-ink">Thank you. Online giving isn&apos;t connected yet. Your gift of ${amt}{freq === "monthly" ? " per month" : ""} can be arranged by <Link className="link" href="/contact">contacting the ministry</Link> until card giving opens.</span>
          : "Secure card and bank giving is handled by a trusted payment provider."}
      </p>
    </div>
  );
}

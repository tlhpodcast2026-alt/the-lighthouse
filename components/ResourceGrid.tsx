"use client";

import Link from "next/link";
import { useRef, useState, type RefObject } from "react";
import { RESOURCES, type Resource } from "@/content/publishing";
import { useStored } from "@/lib/useStored";
import { CopyBlock } from "./ui";

export function ResourceDialog({ resource, onClose, dialogRef }: { resource: Resource | null; onClose: () => void; dialogRef: RefObject<HTMLDialogElement | null> }) {
  return (
    <dialog ref={dialogRef} className="sheet-dialog m-auto" aria-labelledby="res-title" onClose={onClose}>
      {resource && (
        <>
          <div className="flex items-start justify-between gap-4 px-6 pt-6">
            <div><span className="tag">{resource.type}</span><h2 id="res-title" className="mt-1.5 text-[2rem]">{resource.title}</h2></div>
            <button type="button" aria-label="Close" className="grid h-[34px] w-[34px] flex-none place-items-center rounded-full border border-line" onClick={() => dialogRef.current?.close()}>✕</button>
          </div>
          <div className="max-h-[70vh] overflow-auto p-6">
            <CopyBlock text={resource.text} label="Copy text" />
          </div>
          {(resource.open || resource.file) && (
            <div className="flex flex-wrap justify-end gap-2 px-6 pb-6">
              {resource.file && <a className="btn btn-ghost" href={resource.file} download>Download</a>}
              {resource.open && <Link className="btn btn-sage" href={resource.open.href} onClick={() => dialogRef.current?.close()}>{resource.open.label}</Link>}
            </div>
          )}
        </>
      )}
    </dialog>
  );
}

/** Opens a single resource by id (used outside the Resources page). */
export function OpenResourceButton({ id, label, className = "btn btn-ghost btn-sm" }: { id: string; label: string; className?: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [res, setRes] = useState<Resource | null>(null);
  return (
    <>
      <button type="button" className={className} onClick={() => { setRes(RESOURCES.find((r) => r.id === id) ?? null); requestAnimationFrame(() => ref.current?.showModal()); }}>{label}</button>
      <ResourceDialog resource={res} onClose={() => setRes(null)} dialogRef={ref} />
    </>
  );
}

export default function ResourceGrid() {
  const [filter, setFilter] = useState("");
  const [saved, setSaved] = useStored<string[]>("saved", []);
  const [open, setOpen] = useState<Resource | null>(null);
  const ref = useRef<HTMLDialogElement>(null);
  const types = Array.from(new Set(RESOURCES.map((r) => r.type)));
  const list = RESOURCES.filter((r) => !filter || (filter === "saved" ? saved.includes(r.id) : r.type === filter));

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-1.5">
        <button type="button" className="chip" aria-pressed={!filter} onClick={() => setFilter("")}>All</button>
        {types.map((t) => <button key={t} type="button" className="chip" aria-pressed={filter === t} onClick={() => setFilter(t)}>{t}</button>)}
        <button type="button" className="chip" aria-pressed={filter === "saved"} onClick={() => setFilter("saved")}>Saved ({saved.length})</button>
      </div>
      {list.length === 0 ? (
        <p className="py-12 text-center text-ink-2">Nothing saved yet. Tap “Save” on any resource to keep it here.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((r) => {
            const isSaved = saved.includes(r.id);
            return (
              <div key={r.id} className="flex flex-col gap-3 rounded-2xl border border-line bg-white p-6">
                <div className="flex aspect-[4/3] max-w-full flex-col gap-1.5 overflow-hidden rounded-[10px] bg-paper-2 p-4" aria-hidden="true">
                  <span className="cap">{r.type}</span>
                  <b className="mb-1.5 font-serif text-lg font-normal leading-tight">{r.title}</b>
                  {[90, 70, 82, 55].map((w) => <i key={w} className="block h-[5px] rounded bg-sand" style={{ width: `${w}%` }} />)}
                </div>
                <h3 className="text-2xl">{r.title}</h3>
                <p className="text-sm text-ink-2">{r.blurb}</p>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                  <span className="cap">{r.size}</span>
                  <span className="flex gap-2">
                    <button type="button" className="btn btn-ghost btn-sm" aria-pressed={isSaved} onClick={() => setSaved((s) => (isSaved ? s.filter((x) => x !== r.id) : [...s, r.id]))}>{isSaved ? "Saved" : "Save"}</button>
                    <button type="button" className="btn btn-primary btn-sm" onClick={() => { setOpen(r); requestAnimationFrame(() => ref.current?.showModal()); }}>Open</button>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <ResourceDialog resource={open} onClose={() => setOpen(null)} dialogRef={ref} />
    </>
  );
}

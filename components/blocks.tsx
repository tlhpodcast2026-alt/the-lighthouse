import Link from "next/link";
import type { ReactNode } from "react";
import type { Article, Book } from "@/content/publishing";
import { formatDate } from "@/lib/format";
import { Mark } from "./Logo";

export function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <header className="pb-8 pt-14 md:pt-18">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-3 max-w-[20ch] text-[2.75rem] leading-[1.1]">{title}</h1>
      {children && <p className="mt-4 max-w-[56ch] text-lg text-ink-2">{children}</p>}
    </header>
  );
}

export function SectionHead({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="mt-2 text-[2rem]">{title}</h2>
      </div>
      {action}
    </div>
  );
}

export function BookCover({ book, large = false }: { book: Book; large?: boolean }) {
  return (
    <div
      className="relative flex aspect-[2/3] w-full max-w-full flex-col justify-between overflow-hidden rounded-[4px_10px_10px_4px] px-4 py-6"
      style={{
        background: book.bg,
        color: book.fg,
        maxWidth: large ? 280 : undefined,
        boxShadow: "inset 6px 0 0 rgba(0,0,0,.08), 0 24px 40px -24px rgba(36,39,43,.45)",
      }}
    >
      {book.own ? (
        <Mark size={large ? 28 : 20} reverse />
      ) : (
        <svg width={large ? 28 : 20} height={large ? 28 : 20} viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="6" fill={book.accent} /></svg>
      )}
      <div>
        <div className="font-serif leading-[1.05] tracking-[-0.01em]" style={{ fontSize: large ? "2.1rem" : "1.25rem" }}>{book.title}</div>
        {book.subtitle && (
          <div className="mt-2 font-serif italic" style={{ color: book.accent, fontSize: large ? "1.05rem" : ".8rem" }}>{book.subtitle}</div>
        )}
      </div>
      <div className="text-[10px] uppercase tracking-[0.2em] opacity-80">{book.author}</div>
    </div>
  );
}

export function ArticleCard({ a }: { a: Article }) {
  return (
    <Link href={`/news/${a.id}`} className="group flex flex-col gap-3 border-t border-ink pt-4">
      <span className="tag">{a.category}</span>
      <h3 className="text-2xl group-hover:text-sage">{a.title}</h3>
      <p className="text-sm text-ink-2">{a.deck}</p>
      <span className="cap tabular-nums">{formatDate(a.date)} · {a.mins} min read</span>
    </Link>
  );
}

export function Kor({ compact = false }: { compact?: boolean }) {
  const items = compact
    ? [["Knowing", "Truth first."], ["Own", "Faithful stewardship."], ["Repeat", "Daily consistency."]]
    : [
        ["Knowing", "Know God and His Word. Winning starts with truth."],
        ["Own", "Take responsibility for what has been entrusted to you."],
        ["Repeat", "Do it again tomorrow. Faithfulness is built daily."],
      ];
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-3">
      {items.map(([h, d]) => (
        <div key={h} className="border-t border-ink pt-3">
          <b className="block font-serif text-[2rem] font-normal">{h}</b>
          <span className="text-sm text-ink-2">{d}</span>
        </div>
      ))}
    </div>
  );
}

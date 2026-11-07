import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES } from "@/content/publishing";
import { site } from "@/content/site";
import { formatDate } from "@/lib/format";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ id: String(a.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const a = ARTICLES.find((x) => x.id === Number(id));
  return a ? { title: a.title, description: a.deck } : {};
}

export default async function ArticlePage({ params }: Props) {
  const { id } = await params;
  const a = ARTICLES.find((x) => x.id === Number(id));
  if (!a) notFound();
  return (
    <div className="wrap pb-18 pt-8">
      <Link className="link" href="/news">← News &amp; Commentary</Link>
      <article className="mx-auto mt-8 max-w-[66ch]">
        <span className="tag">{a.category}</span>
        <h1 className="mt-2.5 text-[2.75rem] leading-[1.1]">{a.title}</h1>
        <p className="scripture mt-3 text-ink-2">{a.deck}</p>
        <p className="cap mb-8 mt-4 border-b border-line pb-4 tabular-nums">{site.pastor} · {formatDate(a.date)} · {a.mins} min read</p>
        <div className="space-y-4 text-[1.0625rem] leading-[1.75]">{a.body.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}</div>
        <div className="mt-8 rounded-2xl bg-paper-2 p-6">
          <p className="eyebrow">Pray about this</p>
          <p className="mt-1.5 font-serif text-lg">Take two minutes to bring this to God. <Link className="link font-sans text-base" href="/prayer">Open guided prayer →</Link></p>
        </div>
      </article>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard, PageHeader } from "@/components/blocks";
import { ARTICLES } from "@/content/publishing";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "News & Commentary",
  description: "Calm, scriptural commentary on current questions, through a Kingdom lens.",
};

export default function NewsPage() {
  const [lead, ...rest] = ARTICLES;
  return (
    <div className="wrap pb-18">
      <PageHeader eyebrow="News & Commentary" title="The week's questions, through a Kingdom lens.">
        Calm, scriptural commentary on what is happening in the world, written to help you think and pray, not to add to the noise.
      </PageHeader>
      {lead && (
        <Link href={`/news/${lead.id}`} className="group grid gap-8 border-b border-line pb-12 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div><span className="tag">{lead.category}</span><h2 className="mt-2.5 text-[2.75rem] group-hover:text-sage">{lead.title}</h2></div>
          <div><p className="scripture text-ink-2">{lead.deck}</p><p className="cap mt-3 tabular-nums">{formatDate(lead.date)} · {lead.mins} min read</p></div>
        </Link>
      )}
      <div className="grid gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">{rest.map((a) => <ArticleCard key={a.id} a={a} />)}</div>
    </div>
  );
}

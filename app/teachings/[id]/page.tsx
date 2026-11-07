import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PlayIcon } from "@/components/Icons";
import TeachingNotes from "@/components/TeachingNotes";
import { PASSAGES } from "@/content/scripture";
import { site } from "@/content/site";
import { TEACHINGS, seriesById, teachingById } from "@/content/teachings";
import { formatDate } from "@/lib/format";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return TEACHINGS.map((t) => ({ id: String(t.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const t = teachingById(Number(id));
  return t ? { title: t.title, description: t.summary } : {};
}

export default async function TeachingPage({ params }: Props) {
  const { id } = await params;
  const t = teachingById(Number(id));
  if (!t) notFound();
  const s = seriesById(t.series);
  const siblings = TEACHINGS.filter((x) => x.series === t.series && x.id !== t.id);
  const watchUrl = t.url || site.channelUrl;

  return (
    <div className="wrap pb-18 pt-8">
      <Link className="link" href="/teachings">← All teachings</Link>
      <div className="mt-6 grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_340px]">
        <article>
          <span className="tag">{s.name} · Episode {t.id}</span>
          <h1 className="mt-2.5 max-w-[20ch] text-[2.75rem] leading-[1.1]">{t.title}</h1>
          <p className="cap mt-2.5 tabular-nums">{formatDate(t.date)} · {t.mins} min · {t.format} · {t.ref}</p>

          <div className="relative mt-6 grid gap-6 overflow-hidden rounded-2xl bg-ink p-6 text-paper">
            <span aria-hidden="true" className="pointer-events-none absolute -right-[90px] -top-[90px] h-[300px] w-[300px] rounded-full" style={{ background: "radial-gradient(circle, rgba(201,133,58,.45), transparent 65%)" }} />
            <div className="relative flex items-center gap-4">
              <a href={watchUrl} target="_blank" rel="noopener noreferrer" aria-label={`Play ${t.title} on YouTube`} className="grid h-16 w-16 flex-none place-items-center rounded-full bg-paper text-ink">
                <PlayIcon width={22} height={22} />
              </a>
              <div className="min-w-0"><p className="font-medium">{t.title}</p><p className="text-sm opacity-70">{site.pastor} · The Lighthouse Podcast</p></div>
            </div>
            <div className="relative h-[3px] rounded bg-white/20" />
            <div className="relative flex justify-between text-sm opacity-75 tabular-nums"><span>0:00</span><span>Plays on YouTube {site.channelHandle}</span><span>{t.mins}:00</span></div>
          </div>

          <div className="mt-8 max-w-[66ch]">
            <p className="scripture">{t.summary}</p>
            <h2 className="mb-3 mt-8 text-2xl">Study notes</h2>
            <ol className="list-decimal space-y-2 pl-5 text-[1.0625rem] leading-relaxed">{t.points.map((p) => <li key={p}>{p}</li>)}</ol>
            <h2 className="mb-3 mt-8 text-2xl">For reflection or small groups</h2>
            <ul className="list-disc space-y-2 pl-5 text-[1.0625rem] leading-relaxed">{t.questions.map((q) => <li key={q}>{q}</li>)}</ul>
            <h2 className="mb-3 mt-8 text-2xl">Your notes</h2>
            <TeachingNotes teaching={t} />
          </div>
        </article>

        <aside className="grid gap-6">
          <div className="border-t border-line pt-4">
            <p className="eyebrow">Key scripture</p>
            {t.passage ? (
              <Link href={`/study?p=${t.passage}`} className="flex justify-between border-b border-line py-2.5 font-serif text-lg hover:text-sage">
                <span>{PASSAGES[t.passage].ref}</span><span className="cap">Open in study →</span>
              </Link>
            ) : (
              <p className="border-b border-line py-2.5 font-serif text-lg">{t.ref}</p>
            )}
          </div>
          <div className="border-t border-line pt-4">
            <p className="eyebrow">More in {s.name}</p>
            {siblings.length ? siblings.map((x) => (
              <Link key={x.id} href={`/teachings/${x.id}`} className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-line py-3">
                <h4 className="text-base group-hover:text-sage">{x.title}</h4><span className="cap tabular-nums">{x.mins} min</span>
              </Link>
            )) : <p className="cap mt-2">More coming soon.</p>}
          </div>
          <div className="border-t border-line pt-4">
            <p className="eyebrow">Subscribe</p>
            <p className="mb-3 mt-2 text-sm text-ink-2">New teachings every week on YouTube.</p>
            <a className="btn btn-primary btn-sm" href={site.channelUrl} target="_blank" rel="noopener noreferrer">YouTube {site.channelHandle}</a>
          </div>
        </aside>
      </div>
    </div>
  );
}

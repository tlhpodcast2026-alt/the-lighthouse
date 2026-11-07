import Link from "next/link";
import { ArticleCard, BookCover, Kor, SectionHead } from "@/components/blocks";
import EventsList from "@/components/EventsList";
import { NewsletterForm } from "@/components/forms";
import { Beacon, TodayPanel } from "@/components/home";
import { BookIcon, NoteIcon, PlanIcon, PlayIcon, PrayIcon } from "@/components/Icons";
import { ARTICLES, BOOKS } from "@/content/publishing";
import { site } from "@/content/site";
import { TEACHINGS, seriesById } from "@/content/teachings";

const tones = { ink: "#24272B", sage: "#2F4A43", stone: "#3A3833" } as const;

export default function Home() {
  const latest = TEACHINGS[0];
  const more = TEACHINGS.slice(1, 4);
  const s = seriesById(latest.series);

  return (
    <>
      <div className="wrap">
        <section className="grid items-start gap-8 pb-12 pt-12 md:pt-18 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-12">
          <div>
            <p className="eyebrow">A teaching ministry of {site.pastor}</p>
            <h1 className="mt-4 text-[length:var(--text-display)] font-light leading-[1.05] tracking-[-0.025em]">
              Clear teaching on the <em className="text-sage">Kingdom of God.</em> A quiet place to study and pray.
            </h1>
            <p className="mt-6 max-w-[46ch] text-lg text-ink-2">
              The Lighthouse reveals the Kingdom with clarity, depth and love, and helps you build a daily life of Bible study and prayer around it.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="btn btn-primary" href="/study">Start today&apos;s reading</Link>
              <Link className="btn btn-ghost" href={`/teachings/${latest.id}`}><PlayIcon /> Latest teaching</Link>
            </div>
          </div>
          <TodayPanel />
        </section>
      </div>

      <section className="relative overflow-hidden bg-paper-2 py-28" aria-labelledby="why">
        <Beacon />
        <div className="wrap relative">
          <div className="max-w-[820px]">
            <p className="eyebrow" id="why">Why a lighthouse</p>
            <blockquote className="mt-5 font-serif text-[clamp(1.9rem,4vw,3rem)] font-light leading-[1.15] tracking-[-0.02em]">
              A lighthouse does not chase ships. It simply keeps shining, and those looking for the way home find it.
            </blockquote>
            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              <div><h3 className="mb-2 font-sans text-sm font-semibold">Our mission</h3><p className="text-ink-2">To reveal and teach the Kingdom of God with clarity, depth and love, standing on Scripture.</p></div>
              <div><h3 className="mb-2 font-sans text-sm font-semibold">Our approach</h3><p className="text-ink-2">Teaching first. No noise, no hype. Just the Word, explained carefully, and tools to help you live it daily.</p></div>
              <div><h3 className="mb-2 font-sans text-sm font-semibold">Our foundation</h3><p className="font-serif text-lg text-ink-2">“You are the light of the world. A city set on a hill cannot be hidden.” <span className="cap">Matthew 5:14</span></p></div>
            </div>
          </div>
        </div>
      </section>

      <div className="wrap">
        <section className="py-18">
          <SectionHead eyebrow="The podcast" title="Latest teaching" action={<Link className="link" href="/teachings">Full archive →</Link>} />
          <div className="grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
            <Link href={`/teachings/${latest.id}`} className="relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-2xl p-6 text-paper" style={{ background: tones[s.tone] }}>
              <span aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full" style={{ background: "radial-gradient(circle, rgba(201,133,58,.55), rgba(201,133,58,0) 65%)" }} />
              <span className="relative text-xs uppercase tracking-[0.14em] opacity-70">Episode {latest.id} · {s.name}</span>
              <span className="relative flex items-end justify-between gap-4">
                <h3 className="max-w-[16ch] text-[clamp(1.6rem,3vw,2.3rem)] font-light">{latest.title}</h3>
                <span className="grid h-14 w-14 flex-none place-items-center rounded-full bg-paper text-ink"><PlayIcon width={22} height={22} /></span>
              </span>
            </Link>
            <div>
              <p className="scripture text-ink-2">{latest.summary}</p>
              <div className="mt-6">
                {more.map((t) => (
                  <Link key={t.id} href={`/teachings/${t.id}`} className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-t border-line py-4 last:border-b">
                    <div><span className="tag">{seriesById(t.series).name}</span><h4 className="mt-1 text-[1.1875rem] group-hover:text-sage">{t.title}</h4></div>
                    <span className="cap tabular-nums">{t.mins} min</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <hr className="border-line" />
        <section className="py-18">
          <SectionHead eyebrow="Daily practice" title="Study and prayer, every day" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { href: "/study", Icon: PlanIcon, h: "Reading plans", p: "Short, guided plans through the Kingdom passages, with progress that remembers where you stopped.", go: "Open plans" },
              { href: "/study?p=mat6b", Icon: NoteIcon, h: "Highlight & notes", p: "Tap any verse to highlight it or write a note. Your notes stay with you across every study.", go: "Start studying" },
              { href: "/prayer", Icon: PrayIcon, h: "Guided prayer", p: "Pray through the Lord's Prayer at your own pace, with a prompt for each movement.", go: "Pray now" },
              { href: "/prayer#request", Icon: BookIcon, h: "Prayer requests", p: "Write a request, keep it in your journal and send it to the prayer team when you're ready.", go: "Share a request" },
            ].map(({ href, Icon, h, p, go }) => (
              <Link key={h} href={href} className="entry">
                <span className="glyph"><Icon /></span>
                <h3 className="text-2xl">{h}</h3>
                <p className="text-sm text-ink-2">{p}</p>
                <span className="mt-auto text-sm font-medium text-sage">{go} →</span>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <section className="bg-paper-2 py-18">
        <div className="wrap grid items-center gap-8 md:grid-cols-[minmax(0,280px)_minmax(0,1fr)] md:gap-12">
          <BookCover book={BOOKS[0]} large />
          <div>
            <p className="eyebrow">New from Pastor Johnson</p>
            <h2 className="mt-2.5 text-[2.75rem]">Winning Every Day</h2>
            <p className="mt-1.5 font-serif text-2xl text-ink-2">The Principle of KOR</p>
            <p className="mt-4 max-w-[54ch] text-ink-2">A practical, scriptural framework for daily victory. Three words that turn truth into a way of life.</p>
            <Kor />
            <div className="mt-7 flex flex-wrap gap-3">
              <a className="btn btn-primary" href={site.bookUrl} target="_blank" rel="noopener noreferrer">Find it on Amazon</a>
              <Link className="btn btn-ghost" href="/library">See the library</Link>
            </div>
          </div>
        </div>
      </section>

      <div className="wrap">
        <section className="py-18">
          <SectionHead eyebrow="News & Commentary" title="Through a Kingdom lens" action={<Link className="link" href="/news">All commentary →</Link>} />
          <div className="grid gap-6 md:grid-cols-3">{ARTICLES.slice(0, 3).map((a) => <ArticleCard key={a.id} a={a} />)}</div>
        </section>
        <hr className="border-line" />
        <section className="py-18">
          <SectionHead eyebrow="Live" title="This week" action={<Link className="link" href="/events">All events →</Link>} />
          <EventsList />
        </section>

        <section className="pb-18" id="newsletter">
          <div className="panel grid items-center gap-8 p-[clamp(24px,5vw,48px)] md:grid-cols-2">
            <div>
              <p className="eyebrow">The Lighthouse letter</p>
              <h2 className="mt-2 text-[2rem]">One email a week. A teaching, a reading, a prayer.</h2>
            </div>
            <NewsletterForm />
          </div>
        </section>
      </div>
    </>
  );
}

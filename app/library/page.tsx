import type { Metadata } from "next";
import { BookCover, Kor, PageHeader, SectionHead } from "@/components/blocks";
import { OpenResourceButton } from "@/components/ResourceGrid";
import { BOOKS } from "@/content/publishing";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Books & Library",
  description: "Winning Every Day: The Principle of KOR by Johnson Jayeola, and recommended reading on the Kingdom and prayer.",
};

export default function LibraryPage() {
  const [own, ...shelf] = BOOKS;
  return (
    <div className="wrap pb-18">
      <PageHeader eyebrow="Books & Library" title="Read deeper.">
        Pastor Johnson&apos;s book, and a short shelf of trusted reading on the Kingdom and prayer.
      </PageHeader>
      <section className="grid items-center gap-8 rounded-2xl bg-paper-2 p-[clamp(24px,5vw,48px)] md:grid-cols-[minmax(0,280px)_minmax(0,1fr)] md:gap-12">
        <BookCover book={own} large />
        <div>
          <p className="eyebrow">By {own.author}</p>
          <h2 className="mt-2.5 text-[2.75rem]">{own.title}</h2>
          <p className="font-serif text-2xl text-ink-2">{own.subtitle}</p>
          <p className="mt-3.5 max-w-[54ch] text-ink-2">{own.note}</p>
          <Kor compact />
          <div className="mt-6 flex flex-wrap gap-3">
            <a className="btn btn-primary" href={site.bookUrl} target="_blank" rel="noopener noreferrer">Find it on Amazon</a>
            <OpenResourceButton id="kor" label="KOR companion guide" className="btn btn-ghost" />
          </div>
        </div>
      </section>
      <section className="pt-18">
        <SectionHead eyebrow="Recommended reading" title="The shelf" />
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,190px),1fr))] gap-x-6 gap-y-8">
          {shelf.map((b) => (
            <div key={b.title} className="grid content-start gap-3">
              <BookCover book={b} />
              <div>
                <h3 className="text-[1.1875rem]">{b.title}</h3>
                <p className="cap">{b.author}</p>
                <p className="mt-1.5 text-sm text-ink-2">{b.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

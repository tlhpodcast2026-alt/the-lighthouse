import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/blocks";
import EventsList from "@/components/EventsList";
import { OpenResourceButton } from "@/components/ResourceGrid";

export const metadata: Metadata = {
  title: "Events & Live",
  description: "Live Bible study, Sunday teaching and monthly prayer nights on YouTube.",
};

export default function EventsPage() {
  return (
    <div className="wrap pb-18">
      <PageHeader eyebrow="Events & Live" title="Study and pray together, live.">
        Every live session streams on YouTube. Join from anywhere, ask questions in the chat, and find the replay in the teaching archive.
      </PageHeader>
      <EventsList />
      <section className="grid gap-6 pt-18 md:grid-cols-2">
        <div className="panel">
          <p className="eyebrow">Before you join</p>
          <h3 className="mt-2 text-2xl">Bring your notes</h3>
          <p className="mt-2 text-sm text-ink-2">Open the Teaching Note Sheet so you can follow along and keep what you learn.</p>
          <div className="mt-4"><OpenResourceButton id="notes" label="Open note sheet" /></div>
        </div>
        <div className="panel">
          <p className="eyebrow">Invite Pastor Johnson</p>
          <h3 className="mt-2 text-2xl">Speaking &amp; teaching</h3>
          <p className="mt-2 text-sm text-ink-2">For conferences, churches, retreats and podcasts.</p>
          <Link className="btn btn-ghost btn-sm mt-4" href="/about#speaking">Send an invitation</Link>
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/blocks";
import { ComposeForm } from "@/components/forms";
import { CalendarIcon, ListenIcon, PrayIcon } from "@/components/Icons";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Community",
  description: "Prayer requests, testimonies and live study groups.",
};

export default function CommunityPage() {
  return (
    <div className="wrap pb-18">
      <PageHeader eyebrow="Community" title="You don't have to walk alone.">
        Share what God has done, ask for prayer, and find a group to study with.
      </PageHeader>
      <div className="grid gap-6 md:grid-cols-3">
        <Link className="entry" href="/prayer#request">
          <span className="glyph"><PrayIcon /></span><h3 className="text-2xl">Prayer requests</h3>
          <p className="text-sm text-ink-2">Write a request in three short steps. Keep it private or send it to the prayer team.</p>
          <span className="mt-auto text-sm font-medium text-sage">Share a request →</span>
        </Link>
        <Link className="entry" href="/events">
          <span className="glyph"><CalendarIcon /></span><h3 className="text-2xl">Tuesday Bible Study</h3>
          <p className="text-sm text-ink-2">An open, live study through the current reading plan, every Tuesday on YouTube.</p>
          <span className="mt-auto text-sm font-medium text-sage">See times →</span>
        </Link>
        <a className="entry" href={site.channelUrl} target="_blank" rel="noopener noreferrer">
          <span className="glyph"><ListenIcon /></span><h3 className="text-2xl">Podcast community</h3>
          <p className="text-sm text-ink-2">Join the conversation in the comments and community posts on YouTube.</p>
          <span className="mt-auto text-sm font-medium text-sage">Open YouTube →</span>
        </a>
      </div>

      <section id="testimony" className="grid items-start gap-12 pt-18 md:grid-cols-2">
        <div>
          <p className="eyebrow">Testimonies</p>
          <h2 className="mt-2 text-[2rem]">Tell us what God has done.</h2>
          <p className="mt-2.5 max-w-[46ch] text-ink-2">
            “And they overcame him by the blood of the Lamb, and by the word of their testimony.” Revelation 12:11. Shared testimonies are read by the team and, with your permission, may be featured here.
          </p>
          <div className="mt-6 rounded-2xl bg-paper-2 p-6">
            <p className="font-serif text-lg">Featured testimonies will appear here once they are shared and approved.</p>
          </div>
        </div>
        <ComposeForm
          subject="Testimony for The Lighthouse"
          submitLabel="Share testimony"
          fields={[
            { id: "tsName", label: "Name", required: true, autoComplete: "name" },
            { id: "tsText", label: "Your testimony", type: "textarea", required: true },
            { id: "tsOk", label: "You may share this on The Lighthouse with my first name.", type: "checkbox" },
          ]}
        />
      </section>
    </div>
  );
}
